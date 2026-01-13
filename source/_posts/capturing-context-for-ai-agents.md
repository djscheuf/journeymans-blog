---
title: Capturing Context for AI Agents
categories:
  - Engineering
tags:
  - ai
  - process
  - learning
date: 2026-01-13 09:30:00
photos: 
  - img/post_img/office_politics.jpg
description: A practical guide to mapping your development process, identifying implicit knowledge, and creating machine-readable context documents that help AI agents produce better code.
---

~760 Words | ~3min Read

I recently wrote about how [software engineers aren't translators anymore](/blog/not-translators-anymore/). AI has compressed the translation work. But the context we accumulate in our heads hasn't gone anywhere. The agent wasn't in the meeting with the product owner. It doesn't know what "it" refers to when you say "update it like we discussed."

So how do you actually start capturing that context? Here's what's worked for me.

### Step 1: Map Your Process
Start by writing down your actual development process. Not the ideal process from some methodology book. Your real process.

For me, it looks something like this:
- Receive story or feature request
- Clarify requirements with product owner
- Design approach (architecture, patterns)
- Write tests (BDD)
- Write code
- Review and refine
- Deploy

Your process will differ. That's fine. Just write it down. Even a rough list helps.

### Step 2: Identify Context at Each Step
Now go through each step and ask: what context do I reference here?

When I clarify requirements, I reference:
- Business domain knowledge
- User personas and their goals
- Existing feature behavior
- Technical constraints

When I design the approach, I reference:
- Existing architecture patterns
- Coding standards
- Performance requirements
- Security considerations

When I write tests, I reference:
- Expected behavior specifications
- Edge cases we've hit before
- Testing patterns we use

Write these down for your process. You'll start seeing patterns.

### Step 3: Watch for Implicit Knowledge
This is the hard part. The context you don't realize you're using.

Watch for pronouns. When you think "update it" or "make it work like that," what are "it" and "that"? When you say "we always do it this way," what's the "way"?

Watch for assumptions. "Obviously we should..." What makes it obvious? "Everyone knows that..." What do they know?

Watch for shortcuts. "Just follow the existing pattern." Which pattern? Where is it? What makes it the right pattern?

Remember that [PB&J sandwich exercise](https://www.youtube.com/watch?v=j-6N3bLgYyQ) where kids write instructions for their dad? The instructions fail because all the implicit knowledge is missing. "Spread the peanut butter" assumes you know to open the jar first, to use a knife, to spread it on bread, not the counter.

Capture these when you notice them. Keep a running list.

### Step 4: Create Your First Context Document
Pick one area to start. I recommend architecture or coding standards because they're referenced constantly.

For a brownfield project, have AI help you document what already exists. Give it your codebase and ask it to generate an architecture document based on the patterns it sees. Not what should be, but what is.

For a greenfield project, declare upfront what the architecture should look like. What patterns will you follow? What standards will you maintain?

Either way, structure it as a document. Markdown works well. Include:
- Overview: What is this system/component?
- Key Patterns: What architectural patterns are we using? (Clean Architecture, CQRS, etc.)
- Structure: How is the code organized?
- Examples: Point to exemplary code that demonstrates the patterns
- Constraints: What must we avoid or maintain?

### Step 5: Treat It Like Code Review
Think of this as code review, but for context documentation. Review it with your team:
- Can a human read and maintain this?
- Can a machine consume and apply it?
- Does it capture the implicit knowledge that lives in people's heads?
- Is it accurate? Complete? Useful?

Update it when you discover gaps. Version control it like code.

### Step 6: Use It With Your AI Agent
Now feed this context to your AI agent when you work. Reference the architecture document when generating new features. Reference the coding standards when reviewing generated code.

The agent will produce code that meshes with your existing patterns because it's working from the same context you accumulated.

### Start Small, Iterate
You don't need to capture everything at once. Start with one context area, and one document. Use it for a sprint. See what's missing. Add it.

I've been iterating on this for months. Each sprint, I discover new context that needs capturing or refining. Each sprint, the results get better because the agent has better context. 

The frameworks can help structure this work. Check out the [BMAD method](https://docs.bmad-method.org/) or [ASDLC](https://asdlc.io/) for more comprehensive approaches. And if you want to dive deeper into knowledge management practices, I gave a talk on [Personal Knowledge Management](https://www.youtube.com/watch?v=rluFxA1BvX4&list=PL2I3mxniQ45SNCUKKM1_PrG84aY3eEm7H&index=17) that covers the foundations.

The work hasn't changed. The tool changed. Now we need to make our accumulated context explicit so the tool can use it.
