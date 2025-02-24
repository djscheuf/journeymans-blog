---
title: Safely Proof Core Changes
categories:
  - Software Development
tags:
  - testing
  - effectiveness
  - agile
date: 2025-03-04 09:30:00
photos: 
  - img/post_img/checklist.png
description: Eventually, you need to replace the algorithm running your business. By that time, it will be in an older style, and likely bear some risk in replacement. So had do you safely approach this problem?
---
Eventually, you need to replace the algorithm running your business. By that time, it will be in an older style, and likely bear some risk in replacement. So had do you safely approach this problem?
How do you guide a team on to a safe start? Recall that we write software for the results it produces.
To replace the algorithm, we'll want proof. The new must get the same results as the old!

That means tests. We feed both new and old the same scenario.Then we measure the output from both for variation.These tests allow us to prove our solution works. Now tests are all well as good, but they aren't enough. The rest of the system calls to your algorithm! And We've all seen spaghetti code!
Distant sectors of code calling obscure algorithms.

So with tests in hand, the next element we need to start is 'control'. We must establish control of the flow of execution before the input to the old algorithm. That might mean wrapping it in a new 'service' class. It might mean refactoring calls to go to a new API instead, or getting a new dependency from the DI container. But 'control' is the goal.

With control, and proof, the team is finally in a position to start replacing the algorithm.With control, they can replace it in full or in part. With proof, they can experiment with different alternatives. Control, and proof are the starting foundation. They allow for safely replacing your mission-critical algorithm or sub-system.

What is more, these changes can be almost invisible to your customers. Take the time to understand the results you want. And leverage the information flow in your system to create the space you need.