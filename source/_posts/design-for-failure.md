---
title: Design For Failure
categories:
  - Software Development
  - Architecture
tags:
  - security
  - testing
  - architecture
  - design
date: 2024-04-09 09:30:00
photos: 
  - img/post_img/submarine.jpg
description: Not too long ago, my KitchenAid Stand Mixer stopped, and my wife and I repaired it. But while repairing it, the intentional design for failure challenges me. 
---
Not too long ago, my KitchenAid Stand Mixer stopped, and my wife and I repaired it. But while repairing it, the intentional design for failure challenges me. The Engineers put some serious thought into their mixer design! The plastic gear that had shredded, stopping my mixer, was designed to do fail. This allowed it to protect to other critical all-metal assemblies in the mixer. Moreover, the engineers made it straight forward to replace in the event of this failure!

This same intentional design principles applies in software development. Though, I see it applied more reactively rather than proactively. Throwing a Try-Catch block around a finicky API Call isn't as effective as designing [circuit breakers](https://martinfowler.com/bliki/CircuitBreaker.html) into your app from the start. This object lesson has me taking a deeper look at Designing for Failure in practice. I hope it likewise encourages you! My brother, an Industrial Engineer, recommended [Failure Modes and Effects Analysis](https://en.wikipedia.org/wiki/Failure_mode_and_effects_analysis) as a good tool. While my initial research is light, it looks to be an insightful instrument!
 