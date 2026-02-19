---
title: Identifying Irreversible Operations
categories:
  - Software
tags:
  - architecture
  - ai
  - process
date: 2026-03-03 09:30:00
description: A systematic exercise to identify which operations in your system are truly irreversible and design appropriate safeguards before AI agents start driving your systems.
photos:
  - /img/post_img/hammer_and_egg.jpg
---

~490 Words | ~2min Read

Soon your users will begin using AI agents to drive your systems, whether you like it or not. The question isn't if, but when. And when they do, you need to know which operations in your system are truly irreversible.

You might already have some experience [mapping processes](/blog/ai-transformation-verbs/). Now apply that same skill to a new question: what happens when an AI makes a mistake in your system? [Which actions can you undo](/blog/ux-for-agents/), and which ones can't you take back?

Here's a systematic exercise to find out.

**Start with Event Mapping**

Borrow from [Event Modeling](https://youtu.be/Pin_B-AbdXE). Gather your team and brainstorm every event that occurs in your system. Capture them in a simple format: `{Object} {Verb-past tense}`. For example: `Order Submitted`, `Payment Processed`, `Email Sent`, `Account Deleted`.

Don't filter yet. Just capture everything. The goal is to get all the state-changing events visible.

**Classify by Impact and Cost**

Now ask three questions about each event:

1. **What does this event do to the system state?** Does it change data? Trigger external actions? Affect other systems?

2. **What would it take to reverse this?** Consider [second-order effects](https://en.wikipedia.org/wiki/Systems_thinking). Reversing `Order Submitted` might be simple. But what about `Payment Processed`? That might trigger accounting entries, inventory updates, shipping notifications. Each of those creates more work to undo.

3. **Who would need to be involved to reverse it?** Here's where [Conway's Law](https://www.improving.com/thoughts/apis-and-the-walls-they-build-do-good-fences-make-good-neighbors/) matters. An action that crosses team boundaries becomes harder to reverse, not because it's technically impossible, but because coordination is expensive. If reversing an event requires three teams and two approval chains, it's effectively irreversible for practical purposes.

Don't forget the temporal dimension. Some events become irreversible after a certain point. `Email Sent` certainly can't be unsent once the recipient reads it. `Report Generated` might be fine to regenerate, unless it's already been distributed to stakeholders.

**Determine Your Mitigations**

Once you've classified your events, you can design appropriate safeguards:

- **Time delays** - Add a buffer before the action executes. `Account Deletion Scheduled` gives you time to catch mistakes.
- **Human approval queues** - Route high-impact operations through a review step before execution.
- **Strong validation and state controls** - Make the system confirm intent. "Are you sure you want to delete 10,000 records?" isn't just annoying, it's a safety mechanism.

The goal isn't to make everything reversible. Some operations should be hard to undo. The goal is to know which ones those are, and to make sure your system's safety mechanisms match the actual risk.

Start by mapping one critical workflow. Identify the events. Ask what each one does to system state, what it would take to reverse, and who would need to be involved. You'll quickly see which operations need stronger guardrails.

This exercise improves safety for AI agents, but it also improves your process for humans. The changes you make to protect against agentic mistakes will make your system safer and clearer for everyone.
