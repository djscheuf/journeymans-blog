---
title: Software Engineers Aren't Translators Anymore
categories:
  - Software
tags:
  - ai
  - transformation
  - career
date: 2026-01-13 09:30:00
description: AI has compressed the translation work of software development, shifting the role from writing code to managing the context that informs it.
---

~400 Words | ~1.5min Read

Years ago, I wrote that [software developers are translators](/blog/software-developers-are-translators/). We translated human intent into machine instructions. But I don't think that quite true anymore. AI has now compressed much of the labor in the translation effort. So what's left?

Plenty! Translation was never just about selecting the words (or code) that directly matched our intent. It was always nuanced. What had already been said? DRY. What should we avoid saying? Constraints. To inform our work, humans continually accumulate context to make our work possible. We sit in meetings with and ask question to our product owners. We learn the business domain. We understand the existing architecture. We know "how we usually do things around here." All this context lives in our heads. And we built it up over weeks, months, years.

But the AI agent wasn't in that meeting with the product owner. It doesn't know what was said, how it was said, or even what "it" refers to in the first place! When you tell the agent "update the user flow like we discussed," the agent has no idea what was discussed... Unless you tell it. It's like that [exercise where kids try to write the instructions for PB&J](https://www.youtube.com/watch?v=j-6N3bLgYyQ). The instructions fail spectacularly because all the implicit knowledge is missing.

Formerly machines couldn't do anything, unless you told them _what_ and _how_ to do it. Now, AI is in the same state. It cannot write code to match your intent and needs, unless you tell it what those are, and do so effectively. Thankfully we have already developed processes to manage that at human-scale:
- BDD to provide rapid feedback at a Code-to- Behavior Intent level
- Scrum to provide rapid feedback at a System-to-Product Intent level
- even the Lean Business Case approach can provide feedback at the Tool to Business Intent level.

Now, to create the most value, we must create consistent results. To inform the agent, we must capture human-maintainable, machine-readable context. And that context has to be more than just 'requirements'! Finally, we must provide the agent with tools for continuously check what it built!

If you want to dive deeper into the frameworks that can help structure this work, check out the [BMAD method](https://docs.bmad-method.org/) or [ASDLC](https://asdlc.io/). I also touched on how you can lead your team in adopting these techniques this talk on [Technical Leadership in the Age of AI](https://www.youtube.com/watch?v=VjYTGtolnE8&list=PL2I3mxniQ45SNCUKKM1_PrG84aY3eEm7H&index=1)
