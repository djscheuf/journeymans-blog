---
title: Sharpening the Agent Axe
categories:
  - Engineering
tags:
  - ai
  - process
  - effectiveness
date: 2026-03-03 09:30:00
description: Learn how to iteratively refine AI prompts and workflows by asking the AI to improve its own instructions, turning documentation maintenance into a collaborative process.
photos:
  - /img/post_img/tool_kit.jpg
---

~560 Words | ~2min Read

I used to have several thousand-line documents for implementation prompts. Everything from how I do TDD to how I like things named. They wasted a ton of tokens and slowed startup down. Worse, the AI would lose things in the middle.

So I asked the AI to help me tune them. Using the [[202602021535 - BPI - Active Partner Prompt Pattern|Active Partner]] pattern, I pointed it at the original document and asked what could be improved. It asked me a simple question: "What's the document mostly used for?"

That question stopped me cold. I realized I'd crammed two completely different ideas into the same note. Workflow planning needed different instructions than implementation execution. The moment I saw that, something else clicked: AI is not human. Humans get better from several examples and explanations. AI only needs one explanation and one proper example of the pattern.

This is how you [[202306061429 - BPI - Leadership Thru Documentation|lead AI through documentation]]. But leadership doesn't depend on telling it every last thing. There's give and take.  The way the AI needs instructions is different than how you'd instruct a junior engineer. Several honed prompts good at their one thing, is better than one mammoth context document for all purposes!

But you can break that large context down, like refactoring. Think of this as code review, but for your instructions. Test the extracted prompt out. See if it at least achieves something close to the end goal. Then give the agent feedback on how it could be better, or ask the agent to help rewrite the prompt. Start small and iterate.

Note, your feedback matters! Vague feedback produces vague results. But supporting materials transform abstract feedback into concrete guidance. "This is what you did last time. Here's why it was a problem. Here's one that looks better." Or Even asking "I'm worried this is wasting tokens, do you need all of this?" . It works because AI can spot repetition, you're just asked it to apply DRY to the prompt and context.

Extract a targeted prompt or workflow. And run it. See how far you can go. Worst case, the workflow doesn't work and you toss it out. In that case run the sharpening loop immediately to improve it. Consider what happens if you do this two or three times on a story. Even if you spend two hours sharpening, the story will still get done. And with AI it will be delivered faster if you're clever and built the kind of harness the AI needs.

If you're worried, cut off a smaller piece. Run an experiment. 

"I'm going to try X with AI. Here's the prompt I think will work... Here's what good output looks like... Here's when I need to stop it..." 

Be clear on that ahead of time. The thinking work has to go up front because AI compresses the generative effort.

When should you do this kind of work? I typically sharpen my axe before I start the next story. There is a liminal space between "I finished one" and "I'm about to start the next,". In there, I clean up my workspace. [[201907160854 The Tale of Hurly Burly|I sharpen my axe]]. Keep the axe sharp. Refine your prompts, making them clearer. Improving the prompt so the AI makes a few less mistakes next time compounds!
