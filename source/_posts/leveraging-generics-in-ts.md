---
title: Leveraging Generics in Typescript
photos:
  - img/post_img/angular_logo.png
categories:
  - Software Development
  - agile
tags:
  - angular
  - typescript
  - generics
  - investment
date: 2020-09-07 09:00
---

My client was extending their data-model a while back. And it afforded one of those rare opportunities for a language feature to really shine! At it's core they were adding ... 'Something' to their data model related to many different 'item' entities. The business feature was to be able to show them those 'items' as grouped by 'Something'.

Now for context, our UI is written in Angular 8, which naturally means typescript. Since we're dealing with many 'item' types, generics are the natural fit. Sounding like a College Class design problem yet? Since the functionality for grouping by 'Something' will apply to many types, we decided to create a separate dedicated helper class. The 'Grouper' houses this logic to re-use, and to test. To describe our results, we created a 'SomethingWithItems' generic class. It is a Something's group of Items as an object. More importantly, returning our grouped results as a list of SomethingWithItems, we can leverage simple loops in the components which provide the UI for those 'Item' entities.

So far we have something like this:

```typescript
export class SomethingDto {
    name: string;
    id: number;
}

export class ItemDto {
    id: number;
    data: any;
    // some linkage to a Something model
}

export class SomethingWithItems {
    something: SomethingDto;
    items: any[];
}

export class Grouper {
    groupBySomething(...): SomethingWithItems { ... }
}
```

To be truthful, we didn't land on the generics solution at first. Since we were in typescript, and knew we would be dealing with a bunch of entities, we start slowly. The initial implementation of the Grouper had functions specific to the Item entity. As we started to put in place the second of these Item entities, many similarities jumped out. For Example, each of the Item entities, had a Something property, though they weren't all exposed the same way. Some only kept the SomethingId, while others had the whole SomethingDto. While somewhat disparate in their handling, the basic premise for 'Having Something' was clear. But the different exposures made each Item's Grouper function a little different.

So our code now looks like this:

```typescript
export class SomethingDto {
  name: string;
  id: number;
}

export class ItemDto {
  id: number;
  data: any;
  somethingId: number;
  somethignName: string;
}

export class AltItemDto {
  id: number;
  data: any;
  something: SomethingDto;
}

export class SomethingWithItems {
  something: SomethingDto;
  items: any[];
}

export class Grouper {
  groupBySomethingForItem(items: ItemDto[]): SomethingWithItems {
    const groups = new Array<SomethingWithItems>();
    items.forEach((i) => {
      var somethingName = i.somethingName;
      // find group,
      // add item to group,
      // iterate;
    });
    return groups;
  }

  groupBySomethingForAltItem(items: AltItemDto[]): SomethingWithItems {
    const groups = new Array<SomethingWithItems>();
    items.forEach((i) => {
      var somethingName = i.something.name;
      // find group,
      // add item to group,
      // iterate;
    });
    return groups;
  }
}
```

To simplify, we introduced the IHaveSomething interface to the ItemDtos. This allowed us to expose each Item's Something in the same format. We opted for returning a SomethingDto, with enough data to identify it, even if it wasn't enough to recreate the object in the database. We primarily used this exposure of the Something for display purposes. So this design was suitable for our needs.

In code that looked like this:

```typescript

export interface IHaveSomething {
    getSomething(): SomethingDto;
}

export class ItemDto extends IHaveSomething {
    id: number;
    data: any;
    somethingId: number;
    somethignName: string;

    getSomething(): SomethingDto {
        return new SomethingDto(this.somethingId, this.somethingName);
    }
}

export class AltItemDto extends IHaveSomething {
    id: number;
    data: any;
    something: SomethingDto;

    getSomething(): SomethingDto {
        return this.something;
    }
}

export class SomethingWithItems {
    something: SomethingDto;
    items: IHaveSomething[];
}

export class Grouper {
    groupBySomething(items: IHaveSomething[]): SomethingWithItems { ... }
}

```

Now the goal was to return a list of groups of Items, grouped by Something. So we thought it prudent to specify the 'SomethingWithItems' type as our output of the Grouper. But do you know what you get to use when you only specify that the Items in a SomethingWithItems are an IHaveWitness type? Just the way to display the Witness for each of those items... but none of the type safe properties. This presented a problem when we wired the SomethingWithItems groups into our existing display. We had to convert each Item into some type in order to get at the properties we wanted to continue displaying.

This left us with the most interesting typing challenge of this story. None of us at the time had any idea how to tell Typescript we wanted to be able to return a specific type that happened to conform to a given interface. We knew how to specify a generic function, like

```typescript
group<T>(input: T, things: any) : T {...}
```

We also knew how to specify that a class implemented a certain interface:

```typescript
export class Thing1 extends Thing2 {...}
```

Turns out that was all we needed to know. After some tinkering and educated guess work, we landed on the following:

```typescript

export class IHaveSomething { ... }

expoxt class SomethingWithItems<T>{
    something: SomethingDto;
    items: T[];
    constructor(something: SomethingDto, item: T){
        this.something = something;
        this.items = new Array<T>(item);
    }
}

export class Grouper{
    groupBySomething<T extends IHaveWitness>(items: T[]) : SomethingWithItems<T>[] { ... }
}
```

And with that, our code provided the type-safety we desired. And it still allows us to generically handle a variety of Items so long as they implemented IHaveSomething. I would expect the reader to ask after hearing this: was it worth the time it took to figure the implementation out? Couldn't you have just copied and pasted the grouping more quickly? Did you really need a generic handling for only 2 or 3 item types?

Well, perhaps we could have done it a little faster. The general rule of thumb for refactoring is a repetition of 3 or more. You gain the benefit primarily in development of the 'more' part, and some in maintenance. We knew we'd be writing for four distinct types, while we were developing the second. We developed the generic solution for the second. Thus we leveraged what we learned from the first, and we expedited the third and fourth additions. While the second implementation did take us longer, the third and fourth was trivially easy due to the work taken in the second.

Moreover, shortly after the release of the third Item type, we encountered a change in the data model. Before the change, we lumped every Item that didn't have a Something into a 'General' bucket. Now the design included a 'General' Something to specifically link these Items. Which meant we had to change the grouping Logic. We had manually added that 'General' bucket to the front of the list before. Now we had to do the same for the 'General' Something group.

If we had played the copy-paste game, we'd need to make those changes in 3 or 4 places. Instead, we were able to make minor changes to the common grouping function and fix the issue once, for all 4 Item types. We reaped the investment of code re-use within 1 sprint of implementing the refactor. Now I could claim precognition... but in truth none of the team anticipated the need for that data model change.

The principles for agility encourage flexibility and responsiveness to changing circumstances. Our exploration of generics in Typescript, was an investment. And it paid dividends very quickly. That is, the time we spent in intelligent, limited refactor enhanced our teams ability to react to change. In posting this discussion here, I hope the tool will do the same for you!
