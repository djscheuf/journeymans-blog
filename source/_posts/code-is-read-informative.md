---
title: Code Is Read - Be Informative
categories:
  - Software Development
  - Lessons Learned
tags:
  - quality
  - effectiveness
date: 2021-03-24 09:00:00
photos:
  - img/post_img/book.jpg
---

Donald Knuth is oft quoted having said that naming things is one of the hard problems in Computer Science. Making this all the more critical is the simple fact of how many things we name every time we sit down to code. Did you just declare a variable? Congrats you named something. Did you extract a method while refactoring? Yup, you had to name it. With all these names flying about, I'll even occasionally label something _'temp'_... The problem comes when temp is no longer just a temporary storage point, but has been utilized in three new methods as part of a large algorithm expansion... and it's still just called temp.

The problem with this kind of use is that we failed to fully refactor with the understanding that ['Code is read more often than it is written'](/blog/repost-code-read-more-than-written/). Put another way, we lost sight of how our product is or is not service our customer. Customers? You mean the business people who'll use our software? Why would they care about our variable names?

Ok, your Business Users are definitely one class of Customer. But if you really think about it, they consume the by product of your code, the behavior it produces. If they could get the behavior without the code, they'd probably be happy to trade. No, when I say you lost sight of your customer, I meant the developer on the other side of your IDE. They will be working on expanding your project in a month, and happen upon that function you wrote, that grew and grew... and they will have no idea what to do. Now here's the scary part... that other developer in the future? They just might be you!

Does this clearer view of who our customers are really help us write more readable code? Well, let's focus on variable names for a moment, consider the following code:

```csharp
    var temp =
        theInvoice.Total > 1000;

    if(temp)
        // do something
```

What did that say? Most developers could resolve that description to say that temp is a boolean variable whose value is true when the invoice's total is greater than 1000. We might even assume that the total and the 1000 are in units of dollars.

Now, you might be tempted to rename the variable like this:

```csharp
    var totalIsGreaterThan1000 =
        theInvoice.Total > 1000;

    if(totalIsGreaterThan1000)
        // do something
```

Does that actually improve readability? Personally, I would argue: No , it does not. Further, it's actually making the code more brittle and less easy to change. Consider what would happen if the business realizes that an invoice of 1000$ is actually the break point? That they want to 'do something' when the total exactly at 1000$ too? The developer who needs to make that change might just change a single character:

```csharp
    var totalIsGreaterThan1000 =
        theInvoice.Total >= 1000;

    if(totalIsGreaterThan1000)
        // do something
```

Suddenly your variable name, is not only wrong, it is down-right misleading! By naming our variable after the evaluation, the literal instruction that produced it's value, we made the name weaker. It's suffering form a weakness we also observe in comments on the code. It is a well known trouble with comments, that they tend to rot, because as the code changes underneath them, they are often overlooked, leading to misleading, or down right wrong comments.

Now if that isn't enough to convince you consider another case. What if we decide to make the 1000$ configurable? Maybe the business wants to control that value through the UI. The code which once read:

```csharp
    var totalIsGreaterThan1000 =
        theInvoice.Total > 1000;

    if(totalIsGreaterThan1000)
        // do something
```

would read:

```csharp
    var temp = Get_TEMP_FromDataBase();

    var totalIsGreaterThan1000 =
        theInvoice.Total > temp;

    if(totalIsGreaterThan1000)
        // do something
```

Now I want to pause here. I have intentionally left this extraction in _'temp'_ because doing so allows me to highlight an aspect of the code, which points to how we _might_ find better names. That 1000$, which I am now calling temp means something. The business has some name for that value. And if you listen closely, they'll describe their process for whether or not to 'do something' by comparing the invoice total to that value.

Suppose it was a credit limit? then a natural way to name the extracted configurable credit limit might be:

```csharp
    var creditLimit= getCreditLimit();

    var totalIsGreaterThan1000 =
        theInvoice.Total > creditLimit;

    if(totalIsGreaterThan1000)
        // do something
```

The current state of the example demonstrates another reason to avoid naming our variables after the instruction that first gave them value. Do we know if the creditLimit is still 1000$ anymore? With the limit now being configurable, there's no way we can tell, and the variable name is now rather confusing.

The reason you should avoid naming a variable after it's originating instructions, is that it is a form of repetition in your code. While writing code, and functions and classes, we are often advised: [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). DRY for short. Because by making your code WET, you are increasing the chance for incidental drift, multiplying the space for bugs, and generally contributing to waste. Now, not _all_ instances of repetition are ill-advised. But as a general rule of thumb, DRY-er code is more maintainable.

In the Pragmatic Programmer, the author's suggest [an expanded view of DRY](http://media.pragprog.com/titles/tpp20/dry.pdf) should be taken. Don't just avoid repeating your code, and instructions. Avoid repeating your data, your information, and decisions! Applying DRY then to variable names, on the concept of information, we can see all the symptoms of WET code, in affect on the variable name when we repeated the literal instructions of origin.

So... what should we do instead? I believe the best approach will involve a larger context. Look at the code again, and tell me what concept or decision is captured in the boolean totalIsGreaterThan1000:

```csharp
    var creditLimit = getCreditLimit();

    var totalIsGreaterThan1000 =
        theInvoice.Total > creditLimit;

    if(totalIsGreaterThan1000)
        // do something
```

I'll give you a hint, look at the last line.

'Do Something' , specifically if \_\_\_, then do something. This entire time, totalIsGreaterThan1000 or temp or totalGreaterThanCreditLimit, has really been about whether or not I should 'do something'. That variable represents in computer terms, the decision to do or not to do. Considering the wider context of the code, and how the variable is to be used, we gained some insight. Maybe we could name the variable DoSomething:

```csharp
    var creditLimit = getCreditLimit();

    var doSomething =
        theInvoice.Total > creditLimit;

    if(doSomething)
        // do something
```

If this were a language like Ruby, when you can use ? in a variable/property name I might jump for that, but in this example, I would suggest helping that conditional read like a sentence in English. Maybe something like:

```csharp
    var creditLimit = getCreditLimit();

    var shouldDoSomething =
        theInvoice.Total > creditLimit;

    if(shouldDoSomething)
        // do something
```

Now when I read this over, I understand each snippet of code reasonably well, and somewhat independently. If I am just interested in changing when I 'should do something', I can easily change the evaluation which tells me whether I do something:

```csharp
    var creditLimit = getCreditLimit();

    var shouldDoSomething =
     theInvoice.Total >= creditLimit;

    if(shouldDoSomething)
        // do something
```

I am no longer susceptible to accidental mis-information due to changing how I decide 'should do something'.
Further the meaning of that variable and how it was used didn't really change. Instead it's now in line with what the Business' thinking on the topic is. First they thought they should do something when total > 1000. Now they want to configure total capped exactly at 1000, so should do something means total is greater or equal to the limit.

I would take a moment to highlight to you some steps you can take to find better variable names. First, please really name your variables, don't just leave them as 'temp'. You can certainly start there, until the wider context is understood, but don't leave your work incomplete. Once you have a little context for what you are doing, look to that context, the the human-language meaning, and especially the informational intent behind the line or lines of code you are writing. Remember DRY applies to functionality, and to information! Finally, aim to make your code read like a form of prose. The closer we can bring our code to the business language, the easier it will be for us to translate what they are asking us to build into actual code. And the easier it will be for you to understand that the one variable means when you come back to this code in 6 months. Your future self will thank you!
