---
title: TIL ... How to spoof my domain...
tags:
  - domain
  - learn
  - learning
  - spoof
  - third-party
  - til
url: 1493.html
id: 1493
categories:
  - Software Development
  - Lessons Learned
date: 2018-03-06 16:00:17
---

Before we begin today, I want to provide a quick update, as my blog has been inactive for a while. I started a new position in September of last year, right after Harvey force myself and my family out of out apartment. Thankfully all is well, but it has taken some time for me to get back on my feet. During this absence, I have met many new colleagues, and found several new mentors. One such mentor is [Claudio Lassala](https://www.linkedin.com/in/ClaudioLassala/). to say the least he is impressive. And among the things I have learned from him is a better way to find blog-post topics and a new form in which to show them. I am going to give this new form a try for a while in my 'Today I Learned...' series going forward. If you are interested in seeing his execution, he keeps a blog full of excellent resources here: [https://lassala.net/](https://lassala.net/) Without further ado, Today I learned how to spoof my domain, so that third-party(s)  will trust my test environment. I was working on integrating a third-party script for product reviews. But during my testing,  I found the node never loaded. Peeking into the dev-tools I saw the reason. The third-party response indicated that localtest.me was not configured in their system. This made some sense, given I was using a pre-compiled script from my client. It appeared that needed to convince the third-party API that I was in fact part of my client's network. After some searching and instruction by senior team members, I found a solution. I needed to add a hostfile entry for test.{clientComain}.com. Then I had to add an IIS bind to my test site so it would response to test.{clientDomain}.com. Run the app again, and viola! It works like magic. I hope you found this quick summary to be helpful.  If you are having trouble finding your hostfile. I found mine in C:\\Windows\\System32\\drivers\\etc. Be warned, I do not know the full implications of editing the Hostfile. Beyond here be dragons.