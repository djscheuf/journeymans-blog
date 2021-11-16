---
title: Demystifying Types - Discriminant Unions
categories:
 - Software Development
 - Types
tags:
 - functional-programming
 - types
 - api-design
date: 2021-11-17 09:00:00
photos: 
 - img/post_img/combination.jpg
---

I have been playing around with types in TypeScript recently as part of working on a UI package to do data grids. We were leveraging [react table](https://react-table.tanstack.com/). I was wrapping it's types under new ones specific to the design system we're using the package in. As a result of playing with these types I found that I had learned. I finally understood one of the biggest value cases for a [discriminant union](https://fsharpforfunandprofit.com/posts/discriminated-unions/). Now if you're not familiar with a discriminant union don't worry. Let's see an example where it becomes useful. Let's consider what it would mean to sort a table by a column of data. Suppose you are creating a Table component. You may write several standard sorting algorithms for common types. Things like numbers, dates, alphanumeric strings.  Maybe you'll provide an on/off toggle for sorting too. Then the user can control which columns they want sorting on. But when you present the interface to the user, how do you control which sort algorithm they use?

You could use a type like:

```ts
type ColunnDefinition = {
    ...
    sortType: string;
   disableSorting: boolean;
}
```

But if you leave it as a string, you leave yourself vulnerable to _any_ string. The value might not link to the algorithms you support. Had I approached this challenge a few weeks ago, I would suggest using an Enum, something like this:


```ts
enum SortTypeEnum {
	ALPHANUMERIC = 1,
	DATETIME =2,
	NUMBER = 3
}

type ColumnDefinition = {
	...
	sortType: SortTypeEnum ;
    disableSorting: boolean;
}
```


And for the most part this solution works pretty well in the standard case. You get control of which algorithms your user has access to. There is little chance for them to pass you some value you don't support. 

But as we all know, if you give a dev a sorting table, he'll ask you if he can sort this column he has in a special way. Maybe he has a complex id string( e.g. HOUTX-0095, DALTX-0192, SEAOR-2029).  Something that combines a plant code and then a delivery route. The user might want to sort by the plant code part first and then by the delivery route.  So how can you extend the enum caseto support custom sorting functions? You could just add another property to take a custom sorting function:

```ts
enum SortTypeEnum {
	ALPHANUMERIC = 1,
	DATETIME =2,
	NUMBER = 3
}

type Row = {...}

type ColumnDefinition = {
	...
	sortType: SortTypeEnum;
	disableSorting: boolean;
	customSortFn: (a:Row, b:Row, isDesc: boolean) => number;
}
```

But in doing so you now end up in a messy realm. What do you do if the Table is set to sort, but the user fails to provide either a sortType or a customSortFn ? What happens if the user provides both? Which one do you use?

All these questions arise because we added an extra property. Recall that we added the prop to extend our functionality. We wanted both our standard implementation _and_ the user's customization. Potentially you could remove the sortType property entirely, and just provide a function property for sorting... But then your users will need you to export each of your sorting algorithms in an accessible way in order to provide the same level of functionality... But once we expose that API, we are less free to change without breaking your users. 

This is once case where a discriminant union can be of help. A Discriminant Union is a way to specify a limited set of acceptable types for a property. But it can also specific a limited set of acceptable values too. Consider again the sort algorithms you already implemented, AlphaNumeric, Numeric and DateTime. You can specific a Discriminant Union for the values as such:

```ts
	type BasicSortTypes = "alphanumeric" | "numeric" | "datetime";
```

But wait! That's not all! Ok, toning down the inner infomercial guy, Discriminant Unions can do more. If they just stopped with values then we're no better than using an Enum. The next step would be to take multiple different types and specify a union around those. Something like:

```ts
	type Row = {...}
	
	type BasicSortTypes = "alphanumeric" | "numeric" | "datetime";
	type CustomSortFunction = (a:Row, b: Row, isDesc: boolean) => number;
	
	type ValidSortTypes= BasicSortTypes | CustomSortFunction;
```

If we complete our example using the above union, we arrive at this:
```ts
	type Row = {...}

	type BasicSortTypes = "alphanumeric" | "numeric" | "datetime";
	type CustomSortFunction = (a:Row, b: Row, isDesc: boolean) => number;
	
	export type ValidSortTypes= BasicSortTypes | CustomSortFunction;

	export type ColumnDefinition = {
		...
		sortType: ValidSortTypes;
		 disableSorting: boolean;
	}
```

Discriminant Unions, used like this are superior to purely using Enums.  They are distinctly different from Inheritance and other Object Oriented Design Principles too. By applying a union here, You gain better control of what your User's can hand to your code,. And You provide a simplified control flow, because you removed the ambiguity. It did need some mental flexibility in describing _what_ a ValidSortType is.  But once you're able to describe the kind of thing it is to the compiler, you can rely on the typing system. It will check for mistakes and protect both you and the user's systems from such bugs. Here are some examples and what one might expect to see:

```ts
import { ColumnDefinition} from 'my-types';

const cols = new Array<ColumnDefinition>();

cols.push({
	...,
	sortType="numeric",
	disableSorting: false
}); // Succeeds

cols.push({
	...,
	sortType="doge",
	disableSorting: false
}); // Fails to compile, 'doge' is not assignable to Type ValidSortType

const sortByModifiedBy = (left: Row,b right:Row,isDesc: boolean) => { 
	const diff = left.ModifiedById - right.ModifiedById;
	return isDesc? 0-diff: diff;
}

cols.push({
	...,
	sortType: sortByModifiedBy ,
	disableSorting: false
}); // Provided ModifiedBy is on Row, then will compile.

cols.push({
	...,
	sortType=(a,b,isDesc) => { return isDesc? b.prop-a.prop: a.prop-b.prop},
	disableSorting: false
}); // Should compile, with TS able to interpret the types. Provided that prop is on type Row.

```

I hope you find this exploration helpful, even if you don't find yourself implementing any Discriminant Unions in the future. At least you'll know what that crazy format means the next time you investigate a type you don't recognize. 