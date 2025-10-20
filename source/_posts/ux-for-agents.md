---
title: Your API is UX for AI-Agents
categories:
  - Software Development
tags:
  - ai
  - organizations
  - effectiveness
date: 2025-10-21 09:30:00
photos: 
  - img/post_img/man_think_ai.jpg
description: Do your user's know when they can't undo something in your application? Human machines signal this well, but how do we do this for agentic interactions?
used-hotpot: true
---

~500 word | ~2 min read

Do your user's know when they can't undo something in your application?  Broadly we can divide operations into two categories: Reversible, and _'Irreversible'_. To be fair this is actually a spectrum. Some things are very difficult to undo, others are not. Like the difference between undoing that typo I jsut made. Or having to do the whole return policy with my Amazon package. 

In industrial applications _'irreversible'_ actions get some extra pomp. The _'big scary'_ actions of the machine usually have some extra guards in place. Something like an activation key, plus a flip-up cover, and a big flashing light. These accompaniments are not merely to hype up the operator. They are signals. They mark the state of the machine, and the action you are about to take, as important. 

The designers draw the operator's attention to it. We apply Experience Design in many arenas. In the industrial setting,  this design is for safety. In e-commerce, this can be to improve average sales value, or click-thru rate i.e. profit. But there's a new field emerging even as we speak. 

Our APIs are about to become the new 'User' Experience. With the advent of AI Agents, a new paradigm of application interaction is opening up. [Some entrepreneurs running their business via Cursor Agents](https://youtu.be/ZvZ4aUXBtzU). And if you've heard anything about vibe-coding, this should scare you!

Imaging you're using the AI to product a profitability report. It uses your bank's API to check on your small business account. Maybe your telling it to "complete the purchase..." and fat finger the prompt. You intended to complete a purchases report. But now you've sent the agent into the wild to "complete the purchase". What purchase? God Only Knows. But that poor bot is going to try!

A fat-finger prompt might turn a simple analysis into a irreversible action. You could make an argument that the user of the agents is accepting those risks. Caveat Emptor, and all that. But that won't prevent a few vocal users from deriding poor API or service design which allowed it! And they will have a point. 

Consider the industrial setting again. The Designer knows the 'dangerous' states of the machine. And it is their responsibility to inform the user. After all, the operator typically can't see the internal state of the machine. At least, they cannot without intentional signalling. So it is with with our new systems. 

As Agentic interactions become more common, we will need a new form of Experience Design. As engineers, and system designers, we need a new level of rigor. We must identify our own 'irreversible' operations, and draw firm lines. Ideally, we provide a space for human oversight with these. Or we make the 'irreversible' operations easier to undo. 

You can't take back what you said. Nor can you can take back what you wrote in an email ... unless you are fast enough. Email has an outbox. And for a configurable amount of time, you can undo a written email. What might this look like for operations like 'Checkout'?
