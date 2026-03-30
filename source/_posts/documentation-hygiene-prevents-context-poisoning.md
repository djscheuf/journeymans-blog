---
title: Documentation Hygiene Prevents Context Poisoning
categories:
  - Engineering
tags:
  - ai
  - architecture
  - process
date: 2026-03-31 09:30:00
photos:
  - /img/post_img/knowledge_base.jpg
description: Outdated documentation isn't just annoying anymore—it's context poison that actively contaminates every AI-generated code prompt with patterns you no longer intend to use.
---

~410 Words | ~2min Read

I was cleaning up documentation today when I discovered something unsettling. Several of my ADRs contained code examples of patterns I'd long since superseded. One ADR was completely obsolete! I chose a different path months ago, but the document remained. It even had implementation examples I definitely didn't want my AI agent following! If the agent referenced these during planning, it would build patterns I'd explicitly decided to abandon!

That's when it hit me: outdated documentation isn't just annoying anymore. It's context poison.

When was the last time you ate something from your fridge that had been sitting there for weeks? Documentation rots the same way. But here's the critical difference: a junior developer can ask questions, and recognize when documentation doesn't match reality. Your AI coding buddy can't. It trusts what's written. It has no informational immune system to protect it from misleading context.

This brought to mind something from my post on [Delete Over Deprecate](/blog/delete-over-deprecate/): deleted can't pollute, deprecated can. The same principle applies to documentation. As long as that outdated examples exist, you're weighting the statistical probability. That is your AI is more likely to generate code matching those old patterns. You're actively poisoning every future prompt.

ADRs solidify tacit knowledge. They capture the decisions and trade-offs your team made during design. But you should also review them over time as part of knowledge curation. And here's the trick: the right thing to do now may be eliminating some of that solidified information! We have to recognize when the right thing to do is delete components from the ADR, not just mark them deprecated.

So what changed? Documentation hygiene became a new form of maintenance. "Either you'll schedule this maintenance, or the machine will schedule it for you." It will get scheduled when the AI inevitably produces terrible results. You'll pay the maintenance burden trying to fix bad outputs, and redo work. Or worse: you won't catch it soon enough because the AI will produce code that works but doesn't match your intent!

The solution is simpler than it sounds. Treat documentation cleanliness as part of code review. Before you merge, ask: do the current docs match the implementation we're about to merge in? If not, correct it. Keep your documentation and current context marching in lockstep with your code.

You have to be your AI's information immune system. Delete context poison! Prune your documentation regularly, or accept that you're feeding your AI teammate a steady diet of poisoned apples.
