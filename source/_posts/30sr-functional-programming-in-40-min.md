---
title: 30 Second Review - Functional Programming in 40 minutes
categories:
  - Personal Development
  - Lessons Learned
tags:
  - 30sec-review
  - functional-programming
  - goto
date: 2020-08-24 09:00:00
photos:
  - img/post_img/office_politics.jpg
---

Functional Programming has been a topic of curiosity since I first heard about it some 4 years ago. At the time, the available content on it was so steeped in high-level mathematical concepts that I couldn't muster the will to dig in. A couple years later a friend showed me some of the libraries that supported Functional Programming, like lodash. After seeing a few examples, something clicked. I became enamored with the format. I was able to simplify many functions which I had previously implemented as a series of for-loops. With fp at my side, they collapsed into a handful of lines, and generally were clearer to boot! But I never got much farther that using some basic data manipulation functions like map, reduce, filter and the like. I wasn't sure where to go...So when I happened upon a video for [a goto; Conference talk on 'Functional Programming in 40min' ](https://youtu.be/0if71HOyVjY), I had to check it out. And I am pleased to say it was well worth my time. I particularly like the speakers approach to the topic.

1. You don't have to forget everything you know to do functional programming

The speaker broke down the concept of a program nicely. He demonstrated that 'functional programming' only replaces a part of the whole set of skills for programming. It is like the impact of switching from C# to another language, in a way. That is of course not a perfect analogy. But I appreciated the speaker's breakdown and explanation of where fp fits in the whole. I'd encourage the reader to [watch it themselves](https://youtu.be/0if71HOyVjY), as I cannot do it justice here.

2. Functional programming is a set of 'enabling constraints'

Later, the speaker specifically calls out the arbitrary nature of Functional programming. The Idea of immutable data and idempotent functions can feel very confining. But the arbitrary constraints are applied for a purpose. They exist to make other problems easier. He shared a great example of how these ['enabling constraints'](/2020/08/05/30sr-building-resilient-frontend-architecture/) work. Take a common case of a multi-threaded application: two threads changing the same value. He explains how Haskell handles two threads trying to update the same value. He called it an atom, I think. The run-time would try to run both functions. And as is the way with computers, one would finish first and update the value. So what do you do then? Well since the functions are idempotent, you re-run the function with the updated value. This works because there are no side-effects! Now I'll refer the reader to the talk again, as I cannot do the explanation full justice here. I'd need to go learn Haskell to really do that... which I might just....

3. Functional programming interacts with a stateful world via bridges

As the speaker rounded on the close of his talk, he pointed to the last property of fp that gave me reservations. How do I get this really constrained tool to work in a world stuff is changing and remembered!? It was actually here that the speaker provided the example I mentioned above. I admit this part now has me more curious. These bridges are the crux of any particular functional language. The rest is just syntactic sugar. Armed with this knowledge, I think I can make a better attempt this time around as I explore functional programming.
