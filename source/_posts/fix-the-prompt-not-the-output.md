---
title: Fix the Prompt, Not the Output
categories:
  - Engineering
tags:
  - ai
  - process
  - effectiveness
date: 2026-08-18 09:30:00
description: "When AI produces bad output, the instinct is to fix it in place—but that builds on poisoned context. Learn why throwing away the result and fixing the prompt instead is the discipline that turns AI into a reliable, repeatable process."
photos:
  - /img/post_img/man_think_ai.jpg
---

~360 Words | ~1.5min Read

Any one using AI has seen this at least once: The AI takes the scenic route and declares it's arrived. But it definitely hasn't done the work. Your natural instinct kicks in: talk it through the fix. Guide it from where it is to where it needs to be. That's what you'd do with a junior developer.

But there's a problem. Once AI makes a mistake, that error is baked into the context. Every word you add to coach it through the correction builds on poisoned context. No amount of correction can completely overwrite it. The flawed understanding is always there, pulling predictions in the wrong direction.

If your output is bad, don't fix the output. Fix the prompt, not the output. Throw away the bad result. Diagnose what went wrong in the prompt or context. Regenerate from solid ground.

Think of it like code review, but for your prompts and context. A prompt going awry is exploratory testing. A novel situation revealed a novel bug. You don't patch symptoms in production. You fix the root cause and redeploy. Same discipline applies here. When AI produces wrong output, unwind the change and fix the foundation.

Now this requires some serious git discipline. Commit after each discrete change, not after multiple. That way you roll back a small unit, not a whole bunch of slop. Build reusable prompts for specific workflow actions. When output is wrong, diagnose the root cause in the prompt or context rather than patching the result.

It's slower at first. You're choosing to go slower now to build control systems and a knowledge base. But improving the prompt so the AI makes fewer mistakes next time compounds. You're not optimizing for more AI work per swing. You're optimizing for correct AI work at every stroke. [Keep the axe sharp](202511080650%20-%20BPI%20-%20Sharpening%20the%20Agent%20Axe).

Your job is to recognize when the foundation is faulty and stop building on it. Pour the foundation first. When you recognize the fault, fix that before building the house. It's harder to fix foundation problems after the house is already there.

Fix the prompt, not the output. This discipline turns agentic development into a reliable, repeatable process.
