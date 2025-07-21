---
title: Count On Novel Failure
categories:
  - Software Development
tags:
  - organizations
  - effectiveness
date: 2025-07-22 09:30:00
photos: 
  - img/post_img/hammer_and_egg.jpg
description: Failure is inevitable. In just the snap of a finger, an otherwise stable system can disintegrate. Murphy's Law applies to everyone.  But setting allusions aside, what should you do? 
---

> Author's Note: I'm launching a newsletter! If you'd like to be the first notified, with content like this send direct to you: [Sign up Today](https://subscribepage.io/nOrcj7)! 
> I'll still post to the blog, but the newsletter will always receive it first! Hope to see you _Next Iteration_!

~390 word | ~1.5 min read

Failure is inevitable. In just the snap of a finger, an otherwise stable system can disintegrate. Murphy's Law applies to everyone.  But setting allusions aside, what should you do?

Count on Novel Failure. Count on something new going wrong, eventually. Typically organization respond to a failure incident with the equivalent of saying _"That will NEVER happen AGAIN!"_ They add [Process Gates](https://en.wikipedia.org/wiki/2024_Delta_Air_Lines_disruption), sign-offs, entire new teams or checks.  Accumulating layers of bureaucratic scar-tissue doesn't help. Instead it usually calcifies your organization.

This is not to say that mitigating or eliminating certain classes of failure is a poor investment. Rather, our typical approach to such mitigation optimizes for the wrong outcome. Even if we successfully eliminated all the failures we've seen before, we can count on novel failure. Something new will go wrong eventually. Just consider [CrowdStrike](https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages)! Who would have thought that an enterprise anti-virus would introduce a kernel-level bug in all their clients!? Or that such a tool would [bring Airplanes out of the sky](https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages#Air_transport)!?

You might say _"They'll never let that happen again!"_ Count on Novel Failure.
They might never make _that_ mistake again. But eventually the emergent complexity of our systems will strike again!

So instead of taking the approach of ensuring "_That will NEVER happen AGAIN_", let's deal with reality. If we count on novel failure, the reality is we will eventually have to **recover**.  When something goes wrong, how fast, and how well, can we recover?

Consider CrowdStrike again. Most airlines were able to recover. [One couldn't](https://en.wikipedia.org/wiki/2024_Delta_Air_Lines_disruption). And they were the biggest losers out of that event in the industry.  Would your company have fared better?

There are many patterns of infrastructure that will support recovery.
But if you aren't already there, it will take time to evolve. There is a simpler way to start. What does it take to go from source code to a running instance of production?

  - How fast could you go from nothing to a production-replacement?
  - Do you know what your current production version is?
  - Could you rebuild it, if the archive was lost?
  - Do you know what the network connections look like?
  - Or how to get that virtual machine trusted by your private network?

Count on Novel Failure. Don't accumulate bureaucratic scar-tissue. Instead optimize for recovery.  Build towards more resilient design. Start by nailing down your path to production. 
