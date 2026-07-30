---
title: Reverse-Engineer Before You Rewrite
categories:
  - Engineering
tags:
  - ai
  - testing
  - decision-making
date: 2026-09-29 09:30:00
description: Legacy codebases lack tests because they're legacy. Here's how to use AI to reverse-engineer business rules and build the guardrails that make a safe, AI-accelerated rewrite possible.
photos:
  - /img/post_img/code_wall.jpg
---

~900 Words | ~3.5min Read

Your legacy application is seven or eight major versions behind. It's blocking feature releases. The upgrade path is brutal. Manual rewrite takes 18 to 24 months. So you look at AI and think: can we just rewrite this faster?

The answer is yes. But only if you do the hard work first.

Here's what nobody talks about: legacy codebases lack tests because they're legacy. That's what made them legacy. So when you hand your codebase to an AI agent and say "rewrite this," the agent has no guardrails. No proof that what it builds actually does what the original did. It will generate code at incredible speed. But without tests, you're vibe-coding at scale. You'll ship bugs you didn't know existed. You'll break functionality nobody remembered was there. You'll spend months debugging instead of shipping.

The solution isn't to skip the hard work. It's to use AI to compress it.

Before you can safely use AI to rewrite your system, you need to know what your system actually does. Not theoretically. Not from five-year-old documentation. From the code itself.

This is where reverse-engineering comes in. You extract the business rules from your existing codebase. Then translate them into a format both humans and AI agents understand. The format matters: Given-When-Then acceptance criteria. "Given this situation, when this action happens, then these expectations hold." This isn't new. It's how acceptance criteria have always worked. But now you're deriving them from code instead of writing them from scratch.

Take a file or module from your legacy system. Give an AI agent a prompt [like this]([[Business Rule Extractor]]). Provide context! Tell it about the domain, the personas the application serves, and what the code is likely doing. If this is a payments module touching account balances, say so. The AI will translate the code back into English requirements. Perhaps not the originals, but close to what informed its original development.

But test your prompt before you trust the output. Run it on a small piece of code. Review what comes back. Adjust the prompt. Run it again. This is not a one-shot process. You're training yourself to extract business rules effectively. You need to learn how to specify the relevant context. The AI is helping you do extract the rules faster than you could manually.

Once you have the business rules again, here's the next step: Define what "done" means before you start. Is an agentic rewrite actually benefitial for your situation? Or is it just a supposed time saver? Look at your upgrade path. If you're already going to have to rewrite core components anyway, AI rewrite might win. If you can step-by-step upgrade without major rewrites, take a hard look at the economics. Slower might be better. Do the analysis. Token costs are real. Team capability matters. Timeline flexibility matters.

Start with critical components. Authentication. Payments. Your Core business logic. Use your structured extraction prompts to pull out the business rules. Take those business rules and turn them into automated tests. These will validate that your rewritten application exhibits equivalent behavior. They're your proof against regression. Without them, you have no way to know if the rewrite actually works.

Define your target state explicitly. What code standards are you targeting? What version of the framework? What browsers must it support? What performance characteristics matter? Work backwards from your goal, not forwards from your existing constraints.

Now you have context, guardrails, and tests. You can feed these into your Agentic development workflow. Build the equivalent application in your target tech stack. You and the AI can now operate with confidence because You knows what "done" means.

Testing was never about catching bugs. It was always about creating alignment between your intent and your execution. With AI generating code at scale, testing becomes your confidence engine. And that starts by knowing your expectations.

This is how you compress timelines from 18-24 months down to 6-9 months. Not by skipping the hard work. By using AI to accelerate the hard work. The reverse-engineering. The test writing. The validation. So the actual rewrite can happen faster and safer.

AI won't transform your business. Motivated people making clever use of AI might. But only if they do the work right. This approach requires discipline. Your team needs existing prompt engineering experience. You need a thoroughly vetted SDLC workflow for agentic development. You need business stakeholders who can review reversed-engineered rules and confirm they're accurate.

And here's the hard truth: unless you're doing this process yourself, with your own people, you're at risk. When vendors promise to "do this for you," take a second look! Without a process like this, they'll end up with incomplete, unmaintainable code. And you'll be left holding the bag. The knowledge of why your application works the way it does lives in your organization. Keep it there.

The simplest first step is to pick one critical component. Something that matters. Run this process on it. Extract the business rules. Write tests. See what it costs in tokens. See how long it takes. See if the AI can actually rebuild it correctly. This is your proof-of-concept. This is how you learn whether this approach makes sense for your situation.

You don't have to do everything at once. You don't have to commit to a full rewrite. Start with a piece. Build confidence. Then decide if the economics work for the rest.
