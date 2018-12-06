---
title: When Testing changes your Design
categories:
  - Software Development
tags:
  - tdd
  - jest
  - redux
date: 2017-02-21 16:39:27
---

While teaching Claudio React/Redux, we went to test some reducers, and noticed many of them were difficult to test and often the test case came out bloated.

THe normal structure of a Reducer is a case within a larger Switch statement. As we began to test I came to understand how this could be better but was trying to figure out a clean way to handle the default case.

Turns out myself and others had found the same problema dn they had some solutions. Part of it was to extract the cases into functions. This TDD naturally lead us to as it made the reducer more testable, and ecouraged us not to bloat the function where possible.

The second part was to abstract the switch into a dictionary and to manually handle the default case. Thankfully a clever friend of mine had a solution: Lodash.identity.

But of curious note that I didn't feel the urge to find a better way. I was mostly just vaguely uncomfrotable with the file, and therefore with the framework. 

Testing encouraged me to better compartmentalize my actions allowing me a better understanding of the whole, and what the whole could be. And that little tip of the scale allowed me to find and choose a better path.