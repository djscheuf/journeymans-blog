---
title: You must unlearn
categories:
  - Software Development
tags:
  - ai
  - learning
  - effectiveness
date: 2025-10-07 09:30:00
photos: 
  - img/post_img/blueprint.jpg
description: You must unlearned what you have learned. With new tools, come new ways of working. To use the new, you must first unlearn the old!
---

~400 word | ~2 min read
Yoda once said _"You must unlearn what you have learned."_ Aside from leading into one of the most popular quotes of all time, it's also sound advice. 
Critical to life-long learning is knowing when it is time to unlearn. But those times are often difficult to recognize. 

One hallmark is when a new technologies allows for a paradigm shift in your work. Electrification. Computers. The Internet. Each of these offered fundamentally different ways for us to do business. Each required unlearning former rules of business. Before the electric light, staying open past dark was expensive, and dim. After Electric light, not only could work hours expand, so could leisure! And today, we're seeing the next one. 

To be clear, [AI Won't transform your Orgnaization](/blog/ai-wont-transform). But those clever people using AI might. The key to reinventing your process is unlearning old habits. 
This means replacing your old 'go-to' approach the new options you have available. 

I recently experienced this very thing. I had a large [Stored Procedure](https://en.wikipedia.org/wiki/Stored_procedure), or SPROC, that I was trying to systematically extract information from. Stuff like 'What Tables does it read and write?' 'What other SPROCs do you call?'. And I wanted a program to do this, rather than a human. I went and reached for Abstract-Syntax Trees. 
You know, read the code, and reconstruct what it's doing. Only... that wasn't super efficient.

In fact, it would take 15minutes of processing to create the [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)! I originally thought it was just an algorithm issue. So I was spinning my wheels debugging, and tuning. When along came a colleague who asked me a question: _"Why don't you just feed it to an LLM, and ask for structured output?"_ Cue facepalm, and a quick Proof-Of-Concept. 2 Hours later, I had a full, working, and fast replacement!

The thought never occurred to me. Despite the fact that I know the LLM could have read the SPROC. More over, I have personally used an LLM to do exactly that in another project! But I hadn't unlearned my knee-jerk problem solving approach. I've so familiar with Code, that my reaction was 'throw code at it'. 

With new tools, we must unlearn our old working techniques. This creates the space our tools need to create the value we seek. The old techniques served us well. But they baked in mitigation for old limitations. And now the limitations have changed. We should too. 
