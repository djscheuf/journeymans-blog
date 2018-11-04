---
title: 'Learn C# - Principles II'
tags:
  - c++
  - csharp
  - learning
  - principles
  - python
  - software
  - software dev
  - tim peters
  - workshop
  - zen
url: 420.html
id: 420
categories:
  - Innovation Fridays
  - Software Development
date: 2016-06-09 15:00:25
---

Last week, I posted the first part of my Learn C# principles discussion. There I covered those principles which I believe would be less subjective and more widely held. This week, I am delving into some more personal principles which I find have improved my code greatly. However, to begin our discussion this week, I will speak on a concept that I believe many will again agree on. One thing that almost every new programmer should know is that many problems that they will encounter have already been solved. Of course , as with any system with multiple solutions, some are better than others. The best of these have been codified into a series of [Design Patterns](http://http//c2.com/cgi/wiki?DesignPatternsBook) produced by the "[Gang of Four](http://http//c2.com/cgi/wiki?GangOfFour)". To be completely honest, I wished that I had found out about these far earlier than I did as they would have saved me a lot of frustration in creating some of these patterns for myself. But patterns like the Adapter, or the Facade I find myself using quite frequently. But more importantly they changed how I look at the problems that I am trying to solve. I spend more time thinking of the responsibilities, than of the methods. As a result I have gotten better about following the Single Responsibility Principle, mentioned last week. In general, I believe that most developers would agree that these patterns are helpful, though some are more esoteric than others. Now seeing as I am instructing the C# course, I thought it would be best to reveal any potential hidden biases I have so that the students at least have a hope of separating what I personally believe to be good, from what is generally held to be good. This is most likely an over-abundance of caution but I truly wish to do right by those who have sought my instruction on the subject. The first place where I recognized that I might be slightly biases was in my experience with Python. Python is a wonderful language to pick-up and a very powerful, albeit not particularly performant. But while I was learning to speak Python, I came across a peculiar text which espoused some principles for software development that I hold to this day. The text is called the [Zen of Python](https://www.python.org/doc/humor/#the-zen-of-python), and goes like this:

>Beautiful is better than ugly.
>Explicit is better than implicit.
>Simple is better than complex.
>Complex is better than complicated.
>Flat is better than nested.
>Sparse is better than dense.
>Readability counts.
>Special cases aren't special enough to break the rules.
>Although practicality beats purity.
>Errors should never pass silently.
>Unless explicitly silenced.
>In the face of ambiguity, refuse the temptation to guess.
>There should be one-- and preferably only one --obvious way to do it.
>Although that way may not be obvious at first unless you're Dutch.
>Now is better than never.
>Although never is often better than right now.
>If the implementation is hard to explain, it's a bad idea.
>If the implementation is easy to explain, it may be a good idea.
>Namespaces are one honking great idea -- let's do more of those!
>-Tim Peters

Admittedly this may require some additional explanation. I have found that it is easiest to look at in terms of paired ideas. For example, take lines 2 through 7, which cover such pairs as Explicit/Implicit, Simple/Complex, and Sparse/Dense. All of these are talking about how our code ought to read. Referring back to the text, it is better to Explicitly state what a function does, than to execute implicitly. This is idea of explicit effects is not merely held for python but can also be heard as have no "side-effects". That is one possible interpretation of this line. But what makes the line so powerful is that it embodies the principle rather than the specific case. Another instance where the principle applied is repeated within the text itself: _"Errors should never pass silently. Unless explicitly silenced."_ So, as I have attempted to express there are a couple of larger principles explained nicely here with more specific guidelines towards their implementation. The easiest to see is that a developer ought to be expressive in their code, this theme runs throughout the poem. The second theme is that a developer ought to be pragmatic, which is somewhat shown in Practicality beats Purity, and in "Never is often better than right now." It is another way of showing YAGNI, or _"you aren't gonna need it"._ These two are often held in a delicate tension, on one hand there is the pragmatic solution: Sparse is better than dense; but this is contrasted immediately with the Expressive side, Readability Counts. Python has been gifted with some humorous supporters throughout the years, including Time Peters, who wrote the Zen. I have found the kernels of truth laid underneath the clever words in several instances of quips about Python. I would heartily encourage every developer to read through them and make their own judgement. But if I can I would draw attention one other Python quip, which I find very humorous and also truthful. This quip is called "[Python vs. Perl according to Yoda](https://www.python.org/doc/humor/#python-vs-perl-according-to-yoda)" and it goes something like this:
```
Subject: Python versus Perl: A humorous look

From: larry (funkster@midwinter.com)

Date: 10 Jul 1999 01:45:07 -0700

This has been percolating in the back of my mind for a while.

It's a scene from \_The Empire Strikes Back\_ reinterpreted to serve

a valuable moral lesson for aspiring programmers.

--

EXTERIOR: DAGOBAH -- DAY

  With Yoda strapped to his back, Luke climbs up one of

  the many thick vines that grow in the swamp until he

  reaches the Dagobah statistics lab. Panting heavily, he

  continues his exercises -- grepping, installing new

  packages, logging in as root, and writing replacements for

  two-year-old shell scripts in Python.

YODA: Code! Yes. A programmer's strength flows from code

  maintainability. But beware of Perl. Terse syntax... more

  than one way to do it... default variables. The dark side

  of code maintainability are they. Easily they flow, quick

  to join you when code you write. If once you start down the

  dark path, forever will it dominate your destiny, consume

  you it will.

LUKE: Is Perl better than Python?

YODA: No... no... no. Quicker, easier, more seductive.

LUKE: But how will I know why Python is better than Perl?

YODA: You will know. When your code you try to read six months

  from now.
```

To get to the meat of it, Perl, which came before Python, encouraged some bad programming habits, like default variables and others which made it difficult to understand the code. Referring back to the Zen, it was not very expressive, since the syntax is terse.Additionally the "true path" of execution is difficult to determine since one cannot know how code will execute without some significant additional context, like the default variable values. And sadly, as Yoda describes, if a programmer falls into these traps in the early stage of a project, it becomes much more difficult to come back, if not completely impossible. To cap all this, the script offers a humorous test to determine whether or not you are following good patterns. If you can read your code in six months and know what you were trying to do, then perhaps you have done well. This sits along a similar vein with the Zen's "If the implementation is easy to explain...". And I find it gratifying to find the self-consistency of the Python supporters in this. I am happy for both examples in order to see the many facets of the delicate balance between expressive and pragmatic code. This concludes the principles which I attempt to adhere to in my coding, and the ones which I will be utilizing in the workshop.As I had said before, I am trying to teach the principles first to help the future coding and learning to become easier. Looking back, I realize that some of this desire to teach principles first comes from some bad experiences that I had during my early college development days. As Yoda says, "If once you start down the dark path, forever will it dominate your destiny..." . I am hoping to same the participants this agony, and frustration. This basically covers the ideals that I hold for my software development and my general understanding of them. As always I thank you for your time, and hope that you learned something!
###### //Edits//

###### 11JUN2016 - SpellChecking and Minor Grammar/Readability Refactor