---
title: Build Tools Not Just Answers
categories:
  - Engineering
tags:
  - ai
  - effectiveness
  - process
date: 2026-12-22 09:30:00
photos:
  - img/post_img/tool_kit.jpg
description: AI promises great productivity gains.
---

~580 Words | ~3min Read

AI promises great productivity gains. But look at the most common use pattern: open the chat, ask the question, get the answer, close the tab. Next month the same problem comes back, and we open the chat again. Are we using AI in a way that leaves us bound to the agent for life?

There are really two usage patterns here. There's the "AI do the work". There's the "AI create a tool to do work". Most people use the first one. It's the obvious one, and it works... right up until you need the same result a second time.

Here's the thing worth knowing. AI excels at transformation tasks, changing data from one form to another. [Summarization, translation, reframing, etc.](/blog/ai-transformation-verbs/). It's not great at computation or repeatable execution. [But it can generate the script for you](/blog/ai-as-tool-makers-tool/)! Computational work is not stuff you want to hand to the AI directly. The AI might do it okay the first time, but if you need it consistent every time, you need a script.

Say you've got a quarter's worth of time-sheets, and they're all kinds of peculiar. You could ask the AI to slice and dice the spreadsheet and find the weird entries. Or you could say: "write me a script that, when I feed it this file, spits out the report I want. Top ten by hours, bottom ten, anyone whose hours aren't consistent week to week." Now the messy time-sheet problem isn't a question you ask once. It's a report you can run every quarter, without spending a single token.

In short, the mindset shift is this: "you need a script to give you the answer. You use the AI to give you the script." Personally, the number of little utility scripts I've got has skyrocketed! And each one of them keeps producing results without me paying tokens for the same answer twice.

So how do you spot the opportunity? It starts embarrassingly simply. Write down your prompts before you give them to the AI. Not because you'll nail them the first time, but because a prompt might be a reusable asset. When you catch yourself reaching for a similar prompt a few weeks later, that's the signal. You've found something repeatable.

From there, ask what part of the work is truly deterministic and what part varies. If it's "get this from the database" or "transform this file" and it's the same way every time, that's probably a script! If the sequence is stable, even if the steps are variable, that's an agentic workflow. You're just stringing agentic actions together with deterministic connections. The trap is trying to make a single wonder-prompt solve all of it. Route as much as you can to plain automation. Use agentic reasoning only where it's actually needed.

None of this requires new knowledge. You already know how to break work into steps and classify them. Which pieces have clear inputs and outputs? Which need judgment? Which still need you? That's the same decomposition discipline engineers apply to any problem. You just point at the AI conversation instead.

Now there's a payoff beyond durability. Tokens cost money. Every outcome you move out of the agent and into a script is an outcome you stop paying tokens for over and over. You keep the productivity gain AI gave you the first time, without the forever-high token bill.

So next time you prompt, ask yourself: "how do I get this result again next time?"
