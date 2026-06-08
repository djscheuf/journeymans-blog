---
title: Self-Validating AI Workflows
categories:
  - Engineering
tags:
  - ai
  - testing
  - process
date: 2026-06-09 09:30:00
description: AI that claims code is 'fully tested' but doesn't compile teaches us the same lesson Waterfall did - slow feedback loops compound errors. Build self-validating workflows that give AI immediate feedback at the speed it operates, catching bugs when they're cheapest to fix.
photos:
  - /img/post_img/checklist.png
---

~710 Words | ~3min Read
I've had it happen more times than I'd like to admit... I ask an AI to build a feature. It churns through the work, and comes back saying "Done! Fully tested and ready to go." Then I run the code and it doesn't even compile! The tests "pass" in the AI's mind, but they're testing nothing, or were never run! The feature is half-baked. The confidence is completely misplaced.

This experience brought something into sharp focus for me. I was making the same mistake that Waterfall made decades ago! I was waiting until the entire feature was "done" to validate it. By then, the AI had compounded errors across the whole system. It built assumptions on top of faulty foundations, and created a mountain of rework.

For the AI that's like waiting 20 years to get feedback on your first grade math test! By then, you've built an entire mathematical understanding on a shaky foundation. You can't go back and fix addition—you have to unwind everything you've built on top of it. The damage compounds.

This is the core problem with slow feedback loops. Their delay make it nearly impossible to get anything right. Every error cascades. Every wrong assumption becomes the basis for the next decision. And when feedback finally arrives, you're staring at a pile of re-work.

The insight here is that feedback loops aren't just nice to have. They're the fundamental mechanism that determines whether a system (human, team, or AI) can learn and improve. It's "agile" all over again! The tighter the loop, the faster correction happens. The longer the delay, the more errors accumulate. And to rub salt in this wound, I already learned this lesson when I learned the agile methodology! Agile compressed feedback loops compared to Waterfall. But it's not just agile either! [Lean manufacturing](https://en.wikipedia.org/wiki/Toyota_Production_System) obsesses over rapid iteration. Even The Air Force has had to learn this! Col. John Boyd's [OODA loop](https://en.wikipedia.org/wiki/OODA_loop) (Observe, Orient, Decide, Act) works precisely because speed through the cycle creates competitive advantage.

With AI moving at inhuman velocity, we can't afford human-speed feedback loops. If we wait for code review, we've already wasted enormous amounts of AI effort. But the solution isn't to trust the AI more! It's to give the AI the ability to validate itself, immediately, at the speed it operates.

This means teaching AI to test its own work as it builds. Write the test first, then the code. Run the test immediately. If it fails, fix it before moving on. That's simple for code work, just TDD it!

But it's a harder field for design. We can create a rubric upfront. Then have the AI grade its own output against that rubric and iterate. We just need to interpret the 'TDD' process for design artifacts.

As for keeping AI following the right steps, that's about process tracking. We need a plan first. Then we teach AI to maintain a plan. That is, have the AI update the plan as it completes tasks. That way the AI can recognize when it's actually done versus when it just thinks it's done.

The most effective teams I've seen build validation directly into their workflows. They don't treat testing as an afterthought or a gate at the end. They make it a non-negotiable step that happens immediately after work is created. They give the AI deterministic feedback. Be it tests that pass or fail, rubrics that score, or checklists that verify. They arm AI to self-correct without waiting for human judgment.

This requires upfront investment. You have to define what "done" means. You have to write the tests, create the rubrics, build the validation scripts. And it will feel like we're going back to Waterfall, with Big Design Up Front. But those investments pays back immediately. You start catching bugs at the moment they're created. That's when they're cheapest to fix. Instead of massive rework, you get right-work or small re-work. Instead of waiting for a costly human review at the very end, you get rapid self-correction at every step.

The principle is simple: give your agents tight feedback loops at the speed they operate. Then they'll self-correct faster than any human review could ever catch the error. That's how you remove unintentional rework and build sustainable AI-augmented development.

P.S. If you'd like a look at an example of this self-validating system, [check out this repo](https://github.com/djscheuf/agentic-dev-ecosystem-template/releases/tag/v2.0).