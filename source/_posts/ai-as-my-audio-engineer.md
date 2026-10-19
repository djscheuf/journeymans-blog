---
title: AI as My Audio Engineer
categories:
  - Software
tags:
  - ai
  - effectiveness
  - learning
date: 2026-11-24 09:30:00
description: AI's real power lies in transformation tasks—translating articles, documentation, and a clear goal into a working config. Here's how I turned AI into an audio engineer to tune my podcasting setup, and what it taught me about owning the questions and the definition of done.
photos:
  - /img/post_img/headphones.jpg
---

~490 Words | ~2min Read

I've written before about how [AI transforms time](/blog/ai-as-adapter/) across skill domains. Today I have a live example: I turned my [AI into an audio engineer](https://github.com/djscheuf/ai-audio-engineer).

A while back I decided to set my podcasting mic back up. I shelved it during an office move. I've played around [with podcasting before](https://open.spotify.com/show/36jPtU3rHKEE16CjwEoq8V), surprise to no one, but I never had an ideal audio setup. I had the mic, I did some post processing, which was fine. This time I wanted to eke out as much delicious sound quality as possible.

Now, I'm no audio engineer. But I didn't need to be one. I needed to know what I wanted and where the knowledge lived.

So I stitched that knowledge together. Some basic AI research turned up [Easy Effects](https://easyeffects.org/), an audio processor, for my system. Separately, I found articles on what makes a good podcasting EQ and basic audio engineering. Then I used a [prompt to summarize the key points](https://github.com/djscheuf/ai-audio-engineer/blob/main/.agents/skills/article-summary/SKILL.md (credit to my friend [Jonathan Camara](https://www.linkedin.com/in/jonathancamara/) for the prompt). While those summaries were running, I started a new thread. I used my [create-knowledge-skill](https://github.com/djscheuf/ai-audio-engineer/blob/main/.agents/skills/create-knowledge-skill/SKILL.md) prompt to turn the Easy Effects documentation into a skill. The skill gave my AI rich context on the exact tool I was using.

Then I made two asks. One: ["get me a podcaster sound"](https://github.com/djscheuf/ai-audio-engineer/blob/main/configs/Podcaster.json). Two: ["help me reproduce an old-timey AM radio effect"](https://github.com/djscheuf/ai-audio-engineer/blob/main/configs/OldTimeyRadio_Corrected.json). To my delight, it succeeded at both. It could do this because Easy Effects just needed a JSON file. The expertise of an entirely different domain, translated into the settings for my particular tool.

Here's what the experience reinforced. AI is an adapter, predicting based on the average of all the information we trained it on. Which means it gives you access to the average level of output from every other specialty. [AI's sweet spot is 'transformation' tasks](blog/ai-transformation-verbs/). Think translate, summarize, etc. This whole workflow was nothing but transformation verbs! Articles transformed into summaries. Documentation transformed into into a skill. Finally a goal plus known inputs transformed into a config file.

But the average only helps if you know the right questions to ask and what done looks like. I knew the effect I wanted before I asked for anything. The human owns the questions and the definition of done. AI is a toolmaker's tool, best used as a composed system rather than a single wonder prompt.

And it worked well enough that it wasn't just in my head. Since then I've gotten consistent comments on calls. Have you ever been in radio? If you haven't done a podcast, you really should.

So here's the question worth sitting with: what domain do you know you're weak in, but want to get better at? Make a list. Figure out the questions you'd ask about what better looks like. Then compile the resources, the articles, the docs. Build the rich context that lets AI ratchet its own ability in that subdomain.

[AI won't transform your work](blog/ai-wont-transform/). Motivated people making clever use of it might.
