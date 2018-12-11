---
title: When one teaches two learn
categories:
  - Professional Development
  - Leadership
  - Mentorship
tags:
  - mentorship
  - redux
  - jest
  - tdd
photos:
  - img/post_img/knowledge_base.jpg
date: 2018-12-08 10:00:00
---

[Claudio](https://lassala.net/) and I gave a talk on WebUI testing last TechFest (_link pending_). While reflecting on it, I uncovered another valuable lesson I learned.
At the time, We had reached a point where only UI work remained.  So Claudio and I paired up.

At the time, I was going to be extending one of our existing Thunks. At the time, we inconsistent in testing our Thunks. Claudio's sense of good practice tingled. So he insisted we write tests for the existing thunk before we enhance it. At the time, I didn't know the best practices for testing javascript. Thus he and I set out to learn them.

We started by sculpting GWT cases for the code. This provided an opportunity for me to explain the functions of the existing Thunk. While teaching Claudio about some of the 'how' the framework worked, I learned more about it myself. For example, I gained a new respect for the synchronous nature of `dispatch()`. In particular, the impact of long running Thunks stood out.

During this same time Claudio was teaching me better test practices. We worked together to refine our techniques. Since then, we have continued to refine our technique. We've produced snippets for javascript testing to improve the ease and speed of test writing!

As I reflect on this experience, one phrase repeats itself in my mind: *__'When One teaches Two learn'__*. As I mentioned, my own understanding of Redux improved. By explaining its operations and how affected the Thunk to Claudio, I learned the framework at a deeper level.

When I discussed this observation with him, he shared a practice he had developed. He looks for someone to teach a concept to as soon as he learns it. For one thing, being so close to having learned it he remembers what it is like to not know. Moreover, he gains a deeper understanding through teaching it than he started with. 

Having now experience this phenomena, teaching-after-learning is a most excellent practice! I plan to look for ways to share my knowledge with others. And I hope that this brief dialog encourages you likewise. _'Let us share the light of knowledge, as it will kindle our own flame to even greater incandescence!'_