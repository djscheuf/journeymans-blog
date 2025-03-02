---
title: A Primer on how to read code for the Non-Developer
categories:
  - Professional Development
  - Communication
tags:
  - primer
  - code
  - read
  - basics
date: 2021-01-27 09:00:00
photos:
  - img/post_img/code_wall.jpg
---

Early last year, my brother had an odd request for me. He's a Patent Lawyer and he wanted pointers on how to read source code for an application. Now any developer worth his salt would agree, that is a tall order. It takes a long while to develop the skill to read most programming languages, just like in early childhood it takes a few years to get the hang of reading a normal human language.

But it sounded like a fun challenge so I gave it a shot. Naturally I included some caveats, but the results are a good place to start. So I would like to share my Primer on 'How to Read Source Code' for a non-developer. But first, the caveats:

**Warnings:**
This advise cannot constitute an exhaustive list of all facets of reading code. There are too many languages, syntaxes, and obsturfication engines available. These factors render such a document nigh impossible. That said, this should provide at least a starting point.

## Basic Knowledge:

Source code represents, loosely speaking, the instructions to a computer to perform a certain action. Most Modern languages do not provide a down-to-the-metal description however. This is commonly left to the compiler to determine based upon numerous factors related to where the code will be run. Bear in mind that since source code is often treated as an instruction set to the computer, it is not often written in a way which is easy or accessible to the human reader. That said there are some common building blocks among languages which are helpful to recognize.

Often times Source code comes with comments. These are usually written in the developer's native (human) language and can serve as a human readable explanation of the code they are associated with. Be warned: Comments cannot always be trusted. While they may be the easiest for you to read, comments often are written by one developer only to become irrelevant or downright misleading as another develop modifies the code. the only way to truly tell if the comments are still accurate is to understand what the code in question is doing, including it's supporting modules. As a result, comments may be a poisoned apple for non-coders.

## Common Building blocks:

### 1. Methods

[Methods](https://en.wikipedia.org/wiki/Method_(computer_programming)) encapsulate a set of instructions for the computer to execute. 'Calling' a method will cause the instructions to be executed. Methods may take some variable information which may change the affect of the instructions in the method. Information passed into a Method is called a parameter. These parameters may even change the behavior of the method. Method calling will appear something like this:

```csharp
howManyThings = 3;
shouldExecuteLogging = true;
countTheThingsResult = countTheThingsWithLogging(howManyThings, shouldExecuteLogging);
```

Methods may call other methods. Since the method is an encapsulation, it usually returns a result of the instructions it executed, but it is not required to. Be aware that certain methods may call themselves.

```csharp
doThisRepeatedlyOnASmallerAndSmallerWindow(someList, startPosition, endPosition){
    // do something here
   doThisRepeatedlyOnASmallerAndSmallerWindow(someList, startPosition+1,endPosition-1);
}
```

These are called [recursive](https://en.wikipedia.org/wiki/Recursion), and will make the above instruction very difficult to follow. Usually they are used on a large set of information and each time it is called the set of information considered is reduced.

### 2. Loops

Loops are the way Code represents changes in the path of execution, either a decision point or a place where we tell the computer to repeat some action. They come in a few varieties. Here are the most common:

**a. If Loops:**
if you see the keyword, 'if' in the code, you are looking at an if-loop. If statements are used to control which instructions are executed. The common form looks like :

```csharp
if (some condition){
 doThisIfTheConditionIsMet();
} else {
doThisIfTheConditionIsNotMet();
}
alwaysDoThis();
```

This 'loop' has two branches, one for the code that the computer should run if the condition is met, and one for when the condition is not. The most common form does not include this second branch. This may be interpreted as the equivalent:

```csharp
if (some condition){
doThisIfTheConditionIsMet();
} else {
// do Nothing;
}
alwaysDoThis();
```

If loops are the most basic form of 'flow-control', and may often represent decision points in the source code. Please understand that not all If branches are equal. But you may use this knowledge as a starting point, if you keep in mind that there will be special cases.

**b. for loops:**
For loops and ForEach loops are another common building block. They represent a repeated segment of code. The loop takes a known, at run-time, list of data, and 'iterates' through it. Each element in the list is used in the body of the For loop. A common structure may appear like:

```csharp
// someList is created, and given data
foreach( entry in someList){
    doSomethingWithEach(entry);
}
```

The key element here is that For loops represent repeated actions. While the actions are not always operating the data in the list, that represents an unusual case. ForLoops run the repeated instructions a known number of times at run-time. That is, before entering the for-loop we can determine the number of times it will run, based on the inputs.

**c. while Loops:**
While loops also represent repeated institutions. But are often used for indeterminate loops. The common form of the while loop may appear like:

```csharp
while( someConditionRemains) {
    repeatedlyDoThis();
}
afterWhileLooopInstruction();
```

The loop will continue to execute _while_ the condition is met. If a repetition is about to start, and the condition is no longer met, the loop will exit, and resume instruction execution at the 'afterWhileLooopInstruction()'.

### 3. Paradigms

Each language has it's own style and means of expression, though the above items often are expressed in similar ways. But programming languages also can be grouped by their paradigm. The paradigm for lack of a better explanation is the basic model by which the programming language organizes it's instructions. There are numerous of these paradigms in current use. But for most common purposes the most useful one to know about is Object Oriented Programming.
Object Oriented Programming - As the name suggested, Object Oriented Programming aims to encapsulate related data and behaviors together in 'classes' or Objects. The common pattern for object oriented programming may look like:

```csharp
theCar = new Car('Red');
{...}
theCar.refuel(gasoline);
theCar.driveTo(location);
theCar.honk();
{...}
```

This structure can be loosely interpreted as a terse sentence, if written well. {Subject}.{thingtodo}. So theCar.honk(), may be expected to execute the instructions necessary to cause theCar to honk. While this is not always certain it can be used as a starting point. The instructions to honk, may have side-effects. In such an event honk will do more than just honk. Higher quality code bases will have fewer of these side-effects. But be aware that they may exist.

## Reading Instructions:

With this knowledge of common patterns, you get a rudimentary grasp of what the source code instructions are telling the computer to do. There are numerous caveats and shortcomings in this list, but if you apply this knowledge along the following lines you can improve your understanding of the intent of the source code.

1. Find the entry point of the application.

   - Some applications may have many entry points, such as a Server for a website. Finding the entry point is key to understanding the flow of instructions executed.

2. Look for the Objects. Look for Nouns.

   - These usually will point to objects. (see paradigms). Object Oriented Programming usually consists of interacting with these objects. The methods called on the object (see theCar.honk()) can be interpreted as verbs carried out by the nouns. If the objects treated as nouns or actors, a reasonable approximation of the instruction intent can be gathered, provided the methods are well named.
   - Be wary of Side-Effects

3. Explore the called Methods.

   - Since methods represent a set of instructions to follow, you can understand the flow of instructions by substituting the instructions within a method wherever it is invoked. This will require careful assignment of the parameters, and does not completely represent the affects of the method, but will provide an approximation.
   - Be wary of Recursion, which makes such an approximation difficult
   - Be wary of Side-effects.

Now, all this said, I know I glossed over a number of items in the original, and I have learned a little better since. So I am planning to refine this idea further. So if you have any suggestions or pointers, or if you'd like to chat with me further specifically on this, [tag me by email](mailto:daniel@scheufler.tech). I'd love to chat. Otherwise I hope this proves useful to you in your endeavors!
