---
title: Vocabulary for Architecture Planning
categories:
 - Software Development
 - Architecture
tags:
 - communication
 - patterns
 - architecture
 - planning
date: 2020-04-27 09:00:00
photos: 
 - img/post_img/lego_blocks.jpg
---

I've been playing around the Software Architecture space for a few years now. I've dived deeper particularly in the last year and a half. My client recently formed an Architecture Review Board. Here, I found a new tool for planning Architecture. Specifically, vocabulary for planning at an enterprise scale.

Now, the CIO's first assignment to the members was to collect _'patterns'_. Our mandate is to plot the course of the client's software architecture. but to do so we need to know where we stand. The kind of patterns we were looking for ranged from _'how do two apps communicate with each other'_, to _'what technology are our apps built on?'_. The patterns also included the common way for updating data. In our case, it is complete object models, rather than a patch.

Armed with these patterns, our next task was to classify them. Which is where I was introduced to the titular Vocabulary for Architecture Planning. We divided our patterns into three buckets: **Current**, **Deprecated**, and **Future**. Current patterns are easy; Are you using them now? Do you plan to continue to do so? If yes, then it's a current pattern.

The Deprecated patterns were a subject of some debate. Patterns that I would have filed in Deprecated, others insisted were still Current. But the label caused us to have a much needed discussion. We discussed the use of the patterns themselves, without having to discuss each use case. The fact that the label caused so much commotion proved that we needed the labels. 

There was one more label which I hope we will discuss more soon; Future patterns. When the group met to collect our answers to the _'patterns'_ question, we had little time for such discussion. From a practical stand-point, I understand why future patterns weren't discussed as much.

There is the temptation to get lost in the fun of talking about future possibilities. But down-to-earth discussions on the future has great power as well. A sound vision of the future, along with a shared plan for next steps can galvanize a department in some pretty astounding ways! It may not seem like a lot, but introducing a couple terms had a large impact. For us, it provided tools to talk about our patterns. Eventually they will provide the means for us to plan the architecture for the future. 

Before I go, I'll share how I am using these terms now. At least, until I learn better.
Pattern - An Architectural pattern can include, but is not limited to the following:
- Component to component communication patterns
- Security models
- Service platform (API, Console, Web, Service, etc.)
- Technology platform (frameworks and libraries)
- DevOps Process
- Database design and modeling tendencies 
- Infrastructure designs

A Current Pattern - An intentionally employed known pattern. New occurrences of the pattern expected.

A Deprecated Pattern - A known pattern designated for removal. New occurrences of the pattern strongly discouraged.

A Future Pattern - A next-step pattern presented for consideration, but not yet adopted. Expect a POC as first Occurrence within the infrastructure.