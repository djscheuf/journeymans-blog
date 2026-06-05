---
title: How to decompose workflows for AI Augmentation
categories:
  - Engineering
tags:
  - ai
  - process
  - architecture
date: 2026-07-07 09:30:00
description: Learn how to decompose workflows into discrete steps to identify where AI excels at transformation tasks, where it needs tools for math, and where human judgment must remain in control.
photos:
  - /img/post_img/lego_blocks.jpg
---

~690 Words | ~3min Read

[AI doesn't replace entire jobs](/blog/ai-replaces-tasks-not-jobs/). It replaces tasks within those jobs. But most of us look at our work as monolithic activities. "Evaluate this solution." "Analyze these requirements." "Research the market." When you see work this way, AI integration feels impossible. How do you hand off something that requires judgment from start to finish?

You need task decomposition. Break work into progressively smaller, clearer steps. And build explicit understanding of what each step accomplishes. This reveals which pieces AI can handle and which require human control.

Let's take a simplified example first. Consider solution evaluation in business analysis. You're assessing whether a delivered solution meets its targets. Seems entirely human, right? Judgment, domain knowledge, analytical thinking and all that. But watch what happens when you decompose it.

List the steps to evaluate. 
- First, you define the metrics and their targets. 
- Then you measure the solution performance on each metric. 
- Then you compare those measurements to your targets. 
- Finally, you document the benchmark results.

Now at each step, as this: Is this a transformation task?

Step four, documenting results, clearly is. You're taking numbers and slapping them into words or graphs. AI can handle it, as long as you control the data format and output structure.

But step one? Defining what to measure? God help you if you let AI do that. That's judgment. What metrics matter to you and your business? That takes understanding business context and stakeholder needs. So, keep that human.

Step two gets interesting. Measuring performance sounds mechanical, but AI is bad at math. Don't ever let it do calculations directly! However, if you give it a tool... Like a script that performs the math consistently.  Then your agent can call that tool repeatedly across multiple solutions. You just need guardrails to ensure it's calling legitimate calculations.

Step three, comparing to targets, hits the same issue. Is 2.0 seconds above or below a 1.5 second target? AI might get that wrong. Yey, Hallucinations!  But if you hand it a script that "compares to target, return 'above/below by X amount,'" now it's just routing data to a tool. That works.

Notice what happened. You identified transformation tasks where AI excels. Judgment tasks that must stay human. Math tasks where AI needs tools. Further, you saw Fan-out points. Those spots where the same action repeats across multiple solutions. This is where a multi-agent patterns make sense.

Between each step, you must define how those agents will communicate! You need file outputs and tests. File outputs prevent context loss. Each step writes its results to a file. It could be CSV, markdown, or whatever. But the next step reads that file! And Each AI agent gets its own context without depending on chat history. 

Tests validate the output before moving forward. Did the measurement step produce measurements for all metrics? Did the comparison step check all targets? You test the output, not 'trust' the AI. You ensure that the process bails out when it hits an error. And you fix the pipeline to reduce and eliminate those errors!

The hardest part is knowing where to draw the trust line. For simple pass/fail tests, you can create a programmatic check. For nuanced grading, you need to define that rubric upfront. What does "good" look like? This is the define-before-you-prompt discipline. Define good, then write the prompt.

Sometimes the right answer isn't an agent at all. It's a script. If the task is deterministic, same inputs always produce same outputs, just write a script. You can even use AI to help you transform your English into that script!

Write down your process steps. Be specific. Use clear verbs. Ask at each step: Is this transformation? Is this math? Is this judgment? Identify fan-out points where the same action repeats across multiple items. Define what "good" looks like at each step before writing any prompts. And use file outputs between steps to prevent context loss. Add tests to validate outputs before proceeding!

Task decomposition is like writing a recipe. Remember the old peanut butter sandwich experiment! You have to be more specific than you expect! By adding checks between each step, you ensure your bot is on the right track before continuing.

So... Which workflow could you decompose this week?
