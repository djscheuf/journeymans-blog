---
title: Recent Trends with Copilot
categories:
  - Software Development
tags:
  - ai
  - quality
  - leadership
date: 2024-01-30 09:30:00
photos: 
  - img/post_img/man_think_ai.jpg
description: Some new Copilot research revealed a troubling trend. How might this trend develop?
---
Visual Studio Magazine recently posted an article on [some new Copilot research](https://visualstudiomagazine.com/articles/2024/01/25/copilot-research.aspx). It revealed discovered a troubling trend. Use of CoPilot correlates to an increase in code-churn. Their data measured code churn by code committed today gets replaced in two weeks or less. This pattern usually appears in repositories cheifly delivered by itinerant developers (read: contractors). The research's abstract concludes with this line:
> [sic] _AI-generated code resembles an itinerant contributor, prone to violate the DRY-ness [don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) of the repos visited._

I am inclined to view this result as somewhat inevitable. Consider how they marketed these AI code tools! And don't forget what strengths computers have in general. AI Code Gen got sold as a potential replacement for writing common code solutions. Much like the work a Jr Developer would do. So, of course, we should expect it to used, like a spam-able solution generator. Consider also that Computers are just potent calculators. Their strength is in repeated sequences of concrete computational steps. So any challenge that rewards 'lots' in a short time will naturally favor the machine.

Consider the normal alternatives a Develop faces. One option is 'write it yourself'. That is a high effort answer. Or you can 'check if someone already solved it for you', which is lower effort. The 'check' version often results in reuse, and thereby DRY code. If the solution already exists, and is tested, it is much easier to simply reuse it... usually. But AI-CodeGen shifted the effort equations! AI Code-Gen added an even lower effort alternative: 'Have someone else write it quickly and tweak it yourself'. So much for patterns of human behavior.

At the present, I suspect the use of AI Code-gen will continue to develop in a few ways. One possible path is 'Churn and Burn'. It is like some patterns the Serverless Community already encourages. Build an small application, just enough to solve today's problem. Then when you need something new, tear it down. Build a new, small app to solve the new problem. Use of AI Code-Gen could be a game-changer here. But it will need a very different model of development than many companies apply today. It could be successful if discipline remains high. Proper problem breakdown and solid service interaction layers are key.

Another possible path would treat AI like 'Power Tools'. I would expect some of the more bespoke style shops might favor this route. You might use clever AI Tools to rapidly generate a Rev 1 prototype. You might even allow some limited customer interaction if you are brave. Then the humans step in. They build a functional Rev 2. They'd use CodeGen to augment their own productivity. "Power Tool" Shops would keep the code high-quality through manual oversight an intervention. They might also dabble in customized AI for their uses. I wrote a little [on this pattern last year](/blog/ai-software-future/).

Both patterns leverage computers where they are superior. Computers are excellent calculators, but as of yet do not think. Whether you use a hammer to chip and carve stone, or simply to break rock, depends on what the wielder chooses.
