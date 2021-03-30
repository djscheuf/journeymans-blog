---
title: Code Is Read - Use Less RAM
categories:
  - Software Development
  - Lessons Learned
tags:
  - readability
  - craftsmanship
  - information
date: 2021-03-31 09:00:00
photos:
  - img/post_img/pcb_ram.jpg
---

RAM, or random access memory, is your computer's active memory stash. It's faster to get things from RAM than it is to go all the way to the hard disk, or SSD and read it there. So generally, if your computer has more RAM, it can support more and more memory-intensive application simultaneously. But back in the day, RAM was not so plentiful. and the programmers had to use some clever tricks, as well as maintain rigid memory discipline to get the most out of the hardware they had available. While numerous fascinating techniques were developed to overcomes these challenges, most are moot nowadays, with the advent of managed languages. Most, but not all, as we still need to be mindful of how much memory our processes are using for heavy processing. In the context of code readability however, the hardware RAM is not the most valuable RAM to consider.

Consider this, how much of the code you write actually makes it into the compiled source which we deploy to production? Whether it is optimized by the compiler, or minified by the bundler, not much of our actual written source code makes it onto the production machine. Sure, the behavior remains consistent, but in truth, I'd bet that even the basic instructions for the back-end likely code shifted in some compiler optimization to save 2 or 3 byte-code instruction cycles. Now before this causes concern, all these behaviors are a good thing. We want our code optimized for memory efficiency, or for instruction efficiency. That's why we use compilers, which separate us, the human developer, for the deepest layers of the machine -code. But it does help to highlight a point I made last week. when discussing who your customers are, as a developer. Restated here, other developers, including yourself in 6 months, are the direct customers of the code you’re writing today. And this should change how you write code!

If the compiler is optimizing away your variable names, and generally doing little register-shifting tricks to eke out a cycle or two or performance gain, we can safely say that the code we write is not for the compiler. If that's the case... why does the community often suggest exiting a method sooner? Consider this example:

```csharp
int ComputeBill(Invoice invoice){
    if ((invoice.BillTo != null && invoice.Ratesheet != null) || (invoice.SpecialCase && invoice.RateSheet == null) {

        var rate = invoice.SpecialCase ? findRateForSheet(invoice.RateSheet, invoice.BillTo) : findSpecialRate(invoice);

        var lineCost = computeLineCosts(invoice, rate, invoice.BillTo);

        invoice.TotalBill = computeTaxes(lineCost, invoice.BillTo.Region);

        return invoice.TotalBill;
    } else {
        return 0;
    }
}
```

Leaving aside the fact that this code doesn't apply the recommendation from last week, you can see that in order to understand what this method does, you need to read the _entire_ method, because until you've read both branches of the If loop, you cannot predict what the result of a particular invocation will yield. Consider this small refactor:

```csharp
int ComputeBill(Invoice invoice){

    var canComputeTotalBill = (invoice.BillTo != null && invoice.Ratesheet != null) || (invoice.SpecialCase && invoice.RateSheet == null);

    if(!canComputeTotalBill)
        return 0;

    var rate = invoice.SpecialCase ? findRateForSheet(invoice.RateSheet, invoice.BillTo) : findSpecialRate(invoice);

    var lineCost = computeLineCosts(invoice, rate, invoice.BillTo);

    invoice.TotalBill = computeTaxes(lineCost, invoice.BillTo.Region);

    return invoice.TotalBill;
}

```

I've only done two steps here. I extracted the conditional into the variable 'canComputeTotalBill' and I pulled the else portion of the original if-loop up. But I'd argue this method is much less daunting to read and easier to understand. This simple example highlights how the order, structure and flow of our code impacts readability. Consider how much context you need to keep track of at a given moment when reading the original form of that method. Initially, you need to keep in mind, what structure and potential values the 'invoice' parameter might hold. You need to manually evaluate the conditional, which is really 5 or so different conditions you'll need to mentally parse. Then, you need to keep in mind the 'SpecialCase' property, to determine which rate finding method you'll use. And after that it's somewhat easy to follow. But depending on what you resolved those 5 conditional booleans as, you need to either read on, or jump to the else block, which is blessedly brief.

Now consider, the second form. You still need to keep in mind the structure and possible values of the 'invoice' parameter. But you can _almost_ ignore those 5 booleans, because of the variable name. Either you can or you cannot compute the total. If not, immediately exit. No further worries. Moreover, you know now that you can forget about all those parts related to 'canComputeTotalBill', and proceed into the actual computation only focusing on the 'invoice' parameter again, as we read through finding rate, computing line cost and total bill. While not perfectly so, the changes in the second form allow the reader to carry less of the code with him as he seeks to understand the behavior of the method.

Code is read more often than it is written. But we _read_ code in order to understand its behavior, and its intent. So, if we seek to write code that is easy to read, we ought to also write code which is easier to understand. To build an understanding of a body of code, you begin by building a mental cache of information. You'll store parameter structures, property values, incidental computational results, branch decisions, and some of the wider context around how the method or class you are reading is being used in the application at large. All this takes the human equivalent of computer RAM to remember and to employ in understanding. This wet-RAM is the most valuable kind of RAM to consider when writing our code.

The structure of the code, as we just demonstrated, impacts the wet-RAM demanded of the reader to understand the code and its behavior. Simple refactors and informative variable names allow the reader to take certain cognitive short-cuts, thus reducing the wet-RAM we utilize. As a result, it should be clear that 'exit fast' is _not_ for the compiler, but for the human-reader on the other side of the IDE. Thankfully, we can do more than just 'exit fast' to aid the comprehension of our readers.

Consider software design patterns. Originally enumerated by the Gang of Four, these repeating structures and behaviors of code belong in every developer's toolbox! And to their credit, the

Gang of Four did a bang-up job in naming the various patterns. Take the 'Factory' for instance. Just from its name, you can derive its intended purpose: It makes other things, right? Ding-ding-ding! So, if I showed you the following:

```csharp
void TravelByCar(int distance) {
    var car = factory.MakeOne('red','shiny','loud');
    car.goZoomZoom(distance);
}
```

You could probably tell me from the name that the 'factory' object, is likely an instance of a CarFactory. When its MakeOne function is called, you'd expect to get an instance of Car somehow configured by the 'red', 'shiny', and 'loud' parameters. Maybe a muscle car or something. Because you were able to understand the intent of the class and the instance by the name given to them, you didn't need to think about any of the details contained inside the factory. Inherently this is the functional benefit from using the pattern while you are writing your code. But on the reading side, presuming your code does as it says, when reading through code like the above, I can more or less ignore what is under the covers of the factory object because it's not germane to the context I may be focusing on, like whether I need to put some limit on the 'distance' parameter, like ensuring it is greater than 0, since it is passed directly to 'goZoomZoom' on the 'car' object.

But be careful with this. Take a page from Uncle Bob's Clean Code. Beware of side-effects. Consider the following Adapter:

```csharp
public class Thing1 {
    void thingsToDo( Action<string> do, string theThing){
        do(theThing);
    }
}

public class Thing2Adapter {
    readonly Thing1 _thing1;
    string defaultThing = 'something';

    public Thing2Adapter(Thing1 thing1){
        _thing1 = thing1
    }

    public void thingsToDo(Action<string> do, string theThing = ""){
        defaultThing = string.IsNullOrEmpty(theThing)? defaultThing : theThing;

        _thing1.thingsToDo(do, defaultThing);
    }
}
```

Certainly the adapter is providing a different signature to your application for Thing1, and that might be useful. But what would happen if you called thingsToDo with the following 'theThing's : "", "somethingElse", "" ? The side-effect of this particular order of calls would do something, somethingElse, and then somethingElse again on the third pass, because the default would change. Now, that might be intentional functionality, or it might be a bug. But it is certainly not what I expect an adapter to do with an optional parameter. And as a result, whenever I read code that uses the Thing2Adapter in the future, I must bear an additional cognitive burden, and remember that the sequence of calls can change the default behavior. You can see a similar comprehension tax when you run into leaky abstractions.

This touches on a subject I will need more time to dive into. But I will explain it just briefly, in order to effectively reduce the wet-RAM utilization, your reader needs to be able to be able to trust your code. Trust that it does what is seems to say it is doing, and that the variables are used in accordance with their implied meaning given by the names. That is 'canComputeTotalBill' governs a computation loop, and not some odd display logic somewhere. I'll leave the rest of that discussion for another time.

With the advent of managed languages, we no longer need to spend so much of our discipline in managing the memory taken by our variables. Instead, we can focus on efficiently utilizing the wet-RAM of our readers when writing our code. Since the main goal of reading code is to comprehend it, and certain structures and names make that more difficult, if we want to write read-able code we should intentionally change the structure and flow of our code to optimize for the comprehension burden of our readers. We can do this by 'exiting fast', by capturing complex conditionals in an informatively names variable, and by leveraging common patterns identifiers in the names of our variables and our classes. While doing so, we must remain vigilant to steward the trust of the reader in our code to do precisely as it says it is doing. Leaky abstractions, and side-effects will force the reader to take in more context than is necessary to trust their understanding of our code. Thankfully, foreknowledge and consideration of these pitfalls will allow you to write more readable code almost immediately.
