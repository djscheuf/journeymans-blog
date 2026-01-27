---
title: Delete Over Deprecate
categories:
  - Engineering
tags:
  - ai
  - process
  - effectiveness
date: 2026-01-27 09:30:00
photos:
  - img/post_img/library.jpg
description: Deprecated code becomes a liability with AI coding assistants because AI treats all discoverable code as valid examples to follow, making aggressive deletion more important than traditional deprecation strategies.
---

~520 Words | ~2min Read

Brownfield codebases can feel like an archeological dig site. You'll turn up some record from the past which declares itself the 'current state' of the kingdom. A README explaining an architecture that no longer exists. An ADR documenting the 'latest' decision, reversed three sprints ago and never updated. A diagram showing services that you deprecated last year.

For human developers, these artifacts are annoying but manageable. We learn to ignore the outdated stuff, ask the team what's actually true, and move on. But with the growing use of AI for development, these kinds of deprecated documents pose a new risk.

The AI wasn't in the conversation when you decided to change direction. It doesn't know that README is outdated. Consider what happens when you ask the agent to explore your codebase. It will treats all discoverable documentation as potentially valid. That deprecated architecture guide? The AI will try to follow it. That old ADR? It'll inform the AI's recommendations. Your documentation is feeding forward context. But if it's misleading, you're actively polluting your AI teammate's understanding.

Imagine having a long, insightful conversation with you AI coding assistant. You've built up a rich shared context, and you can feel the solution tantilizingly close. Only then you discover, that the Agent has been working from incorrect, and out-dated assumptions the whole time! Humans can entirely ignore a document labelled deprecated. But even we have trouble 'forgetting' what we once knew. Your AI agent has an even harder time once the deprecated document is in.

What's worse, Documentation can be [a form of leadership](/blog/leadership-thru-documentation/). Capturing your process, your decisions, and your targets all advance the team. Where once those documents lead people, they will increasingly lead your agents as well. Misleading Documentation then, is [like following a wavering guide](/blog/wavering-guide/)! So what do we do?

We should intentionally and regularly cull our repositories of misleading documentation! Delete it, don't just deprecate it! Git preserves the history. If you're worried about losing something, delete it in a dedicated PR. But get it out of the active codebase!

Use the junior developer litmus test. If a team member onboarding today saw this document, would it help them contribute to the project? If not, delete it. Better yet, use AI to help audit what's there. Ask your agent to analyze your existing documentation. Ask it to identify what's accurate versus what contradicts the actual codebase.

Think of it like code review, but for context documentation. We check for quality improvements and testing as part of code review. We should also test for up-to-date documentation. As for quality, ask: Can a human read and maintain this? Can a machine consume and apply it?

Make documentation updates part of your workflow. As you complete work, update the associated documentation so it's always accurate. Or have the Agent simply update what's there as part of making it's changed. Delete the old patterns. Don't leave breadcrumbs that lead your AI teammate astray.

Deleted can't pollute. Deprecated can. Please, choose wisely.
