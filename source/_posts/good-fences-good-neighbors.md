---
title: APIs and the Walls They Build - Do Good Fences Make Good Neighbors?
categories:
  - Software Development
  - Architecture
tags:
  - software design
  - organization
date: 2024-11-06 12:30:00
photos: 
  - img/post_img/castle.jpg
description: In the Mending Wall, Robert Frost repeats that 'good fences make good neighbors'. An API is a software's fence, but what does it mean to be 'good neighbors' in this sense? And how does the shape of our API impact how our teams interact?
canonical_url: https://www.improving.com/thoughts/apis-and-the-walls-they-build-do-good-fences-make-good-neighbors/
---

Good fences make good neighbors. In his poem, [Mending Wall](https://www.poetryfoundation.org/poems/44266/mending-wall), Robert Frost repeats this line. Two neighbors repair their mutual fence. By doing so together, they ensure that neither has moved the property line. This fence separates their mutual domains. Their fence likely had a handful of approved entry points between them. In software, we'd call such a fence an API. 

Application Programming Interfaces, or APIs, are the way one developer interacts with another's code. This could be as simple as a class interface.  Or it could be as complex as the facade on a library, or even the REST API of a vendor's microservice. Just like that fence, there are a handful of approved entry points.  And the API makes a clear distinction between what is mine, and what is not. This is incredibly useful, but also potentially limiting. What happens when I'm using another internal team's API, and discover a bug just beyond the entry point? This API marks a clear distinction between mine and theirs. So, I can't just reach into their yard and fix it... can I? After all, it's clearly on their side of the fence. 

Software Engineering depends heavily on abstraction. We tend to wrap lots of details in metaphorical boxes. Then we interact with that abstraction/box in more predictable ways. Sometimes, I stack my boxes with my neighbors to build our box fort. It can be incredibly helpful with large systems, but what does it do to our communication? In the example above, the abstraction, aka the fence, encouraged me to *not* fix the bug and leave it for my neighbor. In another way, my system design encouraged a pattern of human communication. That's [Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law) hard at work! Organizations tend to develop systems that mirror the organization's own communication structure! 

Some organizations take this issue by the horns. [Amazon](https://www.amazon.com/)’s famous Team APIs memo is one such example. By raising this API issue from a mere Software challenge to a ‘how we do business’ challenge, Bezos fundamentally changed how his organization would run. Apocryphally, that memo laid the groundwork for the giant which is AWS. But it doesn’t take the CEO to write a memo for your software to constrain the future of your company. Consider the banks. Most banks today are still running COBOL applications from the late 1970s and 1980s. About $3 Trillion in daily transactions touch those systems today. Incredibly successful but that software now constrains the way the business can operate. 

This reveals a new question we should ask ourselves when designing software. "Does this Architecture encourage the kinds of behaviors the company needs?" Our designs can either foster better communication or hinder it.  What does it mean to be 'good neighbors' in your organization? Do you want mutual support, like with [InnerSource Commons](https://innersourcecommons.org/)? Or do you believe in strong API fences and a strong separation of duties? What you mean by 'good fences', tells you what you mean by 'good neighbors'. 
