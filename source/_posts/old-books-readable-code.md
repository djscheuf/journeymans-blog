---
title: What Old Books taught me about readable code
categories:
  - Software Development
  - Quality
tags:
  - ai
  - books
  - effectiveness
date: 2025-11-04 09:30:00
used-hotpot: true
photos: 
  - img/post_img/frustration.jpg
description: Have you ever read some old code, and immediately thought "Why on earth would the call it _that_!?" We can learn a trick from some old books to help write better code today!
---
Have you ever read some old code, and immediately thought "Why on earth would the call it _that_!?" Knowing that old code has a [high WTFPM](https://www.osnews.com/story/19266/wtfsm/) score doesn't help us write better code today. For that, we need to go deeper.

The question we need to answer is _"why is code ,written long ago, harder to read?"_ Don't go off half-cocked! It is not because we are better than our fore-fathers at writing readable code. We are still human after all. Instead it is something about our language. (No, not C, the human one). It is an attribute of our language I was recently shown. And I found it whilst reading an old book.

The translator was explaining why the 5th book in [Musashi's Book of Five Rings](https://www.amazon.com/Complete-Book-of-Five-Rings-audiobook/dp/B00NLNUZRG/) was often called the "Book of Void". He explained how the original meaning carries deep cultural and historical context. So modern readers lack the reference that the meaning originally came from. Thus the translator had to provide more description beyond direct translation. This same phenomena is also why reading older code today is more difficult. We have lost some of the context as the language, both in our use, and in the company's use. Great, now we understand that the code is less readable because English changed! But what do we do about it _today_? 

Well, there are a couple things we can do, because we have new tools. For example, One thing LLMs are pretty good at is Text Summarization. A brief analysis of your old code by Claude , will give you a better idea of what that one weirdly named variable is for. It can even tell you how it relates to the rest of the system! And it will do so faster than you could by digging.

WE can use this same technique (Text-Summarization of Code) proactively too! Claude can summarize today's code for future you. And if it produces a summary (or _ahem_ Documentation) that you accept, why not store it too?

And if it produces a poor summary? That means our code isn't very reasonable. And we should consider a refactor. With local tooling, Developers could even get readability feedback before Code Review! Faster Feedback equals faster learning.

One artifact you may consider developing is a ['Ramp-up Dossier'](https://youtube.com/shorts/nlRNc2YbwR4). Put top-level summary information in it. Things like what business problem the project solves. Include terms and definitions specific to the project domain. And add it to your repository, just like you add 'How to Run' instructions to your ReadMe.

Use AI to deliver an incremental documentation. Make it easier for future historians/maintainers to understand your intent. And leverage the tools of today to help capture the cultural context before it shifts again!
