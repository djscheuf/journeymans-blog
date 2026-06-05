---
title: Continuous Compliance with AI
categories:
  - Engineering
tags:
  - ai
  - security
  - process
date: 2026-07-21 09:30:00
description: AI software factories enable one programmer to go from idea to PR automatically, but SOC 2 demands separation of duties. The solution isn't forcing humans back into the loop—it's embedding adversarial compliance agents directly into the pipeline.
photos:
  - /img/post_img/checklist.png
---

~420 Words | ~1.5min Read

SOC 2 compliance demands separation of duties. Those who implement code cannot test it. Those who test cannot review. Those who review cannot approve deployment. This structure emerged for good reason. It prevents any single person from pushing unchecked changes to production. Just keep in mind, every system is perfectly tuned to get the results it does.

But something is changing. AI software factories now enable one programmer to go from idea to pull request automatically. What once took a team of plays, is now A series of agents. One write code, another run tests, and yet another opens the PR. And all of this without human intervention. Code might never sees human eyes if automated checks pass. Meanwhile, Your approval processes were designed for a slower development cadence. And AI just accelerated that cadence 10x.

So what does compliance look like, if design, code, test, and review are all just AI agents?

The answer is not to force humans back into the loop! That is the trap. DevOps faced this same tension years ago. Back then, continuous integration threatened traditional change control. The resolution was not insisting humans stay involved. It was shift-left. We embedded quality checks directly into the pipeline. We made quality continuous.

Compliance needs the same evolution. We need adversarial agents embedded in the pipeline. Test agents are adversarial to implementation agents. In the same way, We need security and compliance agents checking at multiple points. Not a single approval gate at the end. Multiple automated validation points throughout the flow. Is the design secure? Is the implementation secure? We need to integrate compliance checkpoints directly into the pipeline. Let's stop treating compliance as post-hoc documentation.

This approach needs cross-departmental, cross-silo compliance teams. That means a new culture, and a new approach. It means designing pipelines with tight compliance feedback loops! That means feedback reaches agents as close to the incorrect actions as possible. To do that, we have to define what secure and compliant mean in measurable, automatable terms. This is the only way for our process to remain 'continuous'. Continuously secure, continuously accessible, continuously integrated, continuously deployed, continuously compliant.

Yesterday's culture created today's structure. Today's structure constrains tomorrow's culture. Since our business challenges keep shifting, so should our culture and our structures. We must rebuild out approach to compliance in the face of new tools. It is not whether we can maintain compliance with agentic development pipelines. It is a question of how we build compliance in from the ground up!
