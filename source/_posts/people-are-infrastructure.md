---
title: People Are Part of the Support Infrastructure
categories:
  - Software
tags:
  - architecture
  - organizations
  - learning
date: 2026-10-13 09:30:00
description: People carry the tacit knowledge that keeps software running. Treating them as replaceable costs removes critical infrastructure and defers the bill to outages, maintenance fires, and late-night calls.
photos:
  - /img/post_img/bookshelf.jpg
---

~840 Words | ~3.5min Read

Every application has infrastructure you can see and infrastructure you can't. Servers are easy to spot. They hum in a data center or show up on a cloud bill. Consider all the deployment pipelines, the run-books, and the config files. These are less obvious infrastructure, but just as important. We take care of what we can see. We forget what we can't.

But what's missing from that list we usually check? People. We know to look for run-books, and configs. We forget to ask about the people on the team.

Knowledge lives in people's heads, not in a repo. Your systems the most fragile knowledge is in your team's heads. Someone remembers that weird system quirk from three years ago. Someone knows which setting actually works, no matter what the docs say. Someone carries the context that turns a two week outage into a two hour fix. None of that shows up on an infrastructure diagram. It still keeps your application running.

Here's the part that's easy to miss. You can't write down what you don't know you know. That's not a documentation problem. It's a bigger problem than that. Knowledge transfer sessions try to close the gap before someone leaves. Even the good ones miss things. Consider how many small, rare tasks you know how to do. Nobody thinks to write them down, until you're the one covering for someone out sick. How do you find the gaps in your knowledge transfer plan!? Most find them during production outage, at the worst possible time.

This is where the certain budget conversation can go wrong. With the wrong lens, you can see people as cost centers. Salaries and benefits are visibly expensive. The knowledge inventory those people carry are less visible. The relationship networks, and the thousand ticket-less tiny operating decisions are invisible. Those things are real. They have value. The moment someone walks out the door, they disappear.

On paper, swapping expensive engineers for cheaper IT support seems sensible. But you're not swapping for a cheaper version of the same thing. You're removing infrastructure. The knowledge walks out the door with the person who had it. Or it degrades when the engineer moves on to other projects. What you save in salary, you pay back with interest. You pay for it in maintenance fires and late night calls. The new team isn't less capable. They're missing the map that was never drawn.

There's an old line about maintenance: either you schedule it, or the machine schedules it for you. The same is true of people. Either you schedule the knowledge transfer, or it happens at 2am, during an outage, after the person who could explain it is already gone. That's not a failure of the new team. That's a failure of the system that let the knowledge leave without a hand-off.

This isn't a new problem. We already have tools for it. We just have to use them before the fire starts.

Write decisions down as you make them. An ADR captures more than the choice. It captures the context, the tradeoffs, the things you knew at the time. That record becomes a conversation starter for the next person. It's how you turn personal memory into team memory.

Review incidents while they're fresh, not months later when nobody remembers the details. A post-mortem is not a blame exercise. It's a learning exercise. Done well, it encodes what the team now knows into something the team can keep. The person who lived through it won't be there forever. The lesson should be.

Let the team that builds a system be the ones who run it, if you can. Building and operating are not separate functions. When one team writes the code and another keeps it alive, the second team starts from behind. They inherit decisions they never made. You can't capture everything in a knowledge transfer session. You always miss something, and usually that's the thing that breaks.

Do real knowledge transfer, not a checklist. A checklist gets you an email with attachments. Real transfer means pairing, shadowing, and asking the stupid questions while the expert is still around. It means capturing the rare tasks, the edge cases, and the things people do without thinking.

Whether you're the one asked to cut costs, or the one holding that knowledge, the same choice applies. When do you want to pay for the knowledge maintenance? Before the outage, or during? Writing yourself out of being "the only one who knows" feels risky. It isn't. Being the one who made the team able to run without you, is worth more than being the one nobody can replace. It protects the product. It protects you too. It frees you to do bigger work than keeping a fragile system alive.

People are part of your infrastructure, whether you plan for it or not. That Knowledge Infrastructures has maintenance dues! Paying doesn't always mean money. Sometimes it means time, attention, and the discipline to write things down while they're still fresh.
