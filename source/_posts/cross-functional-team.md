---
title: What does a Cross-Functional Team look like?
categories:
  - Software Development
  - agile
tags:
  - teams
  - scrum
  - cross-functional
  - teambuilding
date: 2021-02-10 09:00:00
photos:
  - img/post_img/child_programmers.jpg
---

> Scrum Teams are cross-functional, meaning the members have all the skills necessary to create value each Sprint. They are also self-managing, meaning they internally decide who does what, when, and how. - The Scrum Guide

Teams in Scrum are supposed to be cross-functional, and self-organizing. Consider a typical development team. There usually 4 or so big roles: Developer, quality-assurance or Testing, and Business Analyst/Interface, and if you are lucky DevOps. Or if we want to boil away the titles:

- Roles for Doing the Work,
- Roles for Ensuring the Work is Well Done,
- Roles for representing the end user,
- and Roles making the work accessible to end user.

Well and good, but the team definition in Scrum suggests that we do not need an individual per role. It merely states that all the necessary skills are available on the team. So we might have a DevLead who also acts as the Business Interface. Or maybe the Business Analyst is busy QA-ing the Developers work on a small team. Whatever the division, the team should be organized to get the work done the most effectively. This got me thinking about what that might look like. What would it look like to have a cross-functional team? One where the team could change who was doing what work, beyond their traditional role?

My experience has been on developer heavy teams. The developers usually outnumbering the BA and QA 2 to 1. So my perspective has been shaped wondering how the Developer might help either the BA or the QA. In the past I've recommended that a Developer can act as QA Jr. for a sprint. Such a developer can help cover the testing load, or else help write automation for the QA for instance. But look at the places where the most common wastes occur in a team's process. I think there are few more behaviors and actions I can propose.

Much of the waste in an agile Process sneaks in through Bugs. Most bugs, if you dig deep enough, root themselves in a miscommunication, or unspoken assumption. Thus clarity of understanding should help limit the occurrence of bugs. ... So how can we increase clarity? And what is the right place in the process to do so? We need clarity both of the intent of a story, and it's surrounding context. My current solution to this goes back to TDD, or BDD.

If the developer can't write out the expected behaviors in English, listing actions, expected pre-conditions and expected effect, then they don't understand the story well-enough. That's a fine start, but not quite sufficient. One developer can usually describe those element to another developer in short order. But what about uncovering unspoken assumptions? A conversation between two developers is likely to leave them unspoken. There is a decent probability that the assumption is shared.

For assumption busting, I usually turn to my QA. Memes abound of a QA walking into a bar and ordering <null> beers. Breaking assumptions is kinda what they do. We want them breaking these assumptions _before_ any code hits the page! We want them in a discussion with the developers about those test cases, _before_ code is written. Which usually means we need them available first thing in the sprint. So much for bugs by unspoken assumption.

What about Bugs by miscommunication? These bugs are often more painful to discover. Often they only come-out after the Developer has completed what they thought the story meant. Only then you find out the story meant something else. Sometimes they come out because an unanticipated edge is discovered. Naturally in such an event, the developer makes a call either skip it or fix it. Finally, there are those rare occasions where a story has assumptions baked right in.

So do we start adding a plethora of detail to our story, ensuring that excruciating exactness is thereby captured? No, I think we'd find our velocity rapidly consumed in the efforts to maintain the novel length stories if we took that path. At present, I tend to lean towards simplicity where possible. In my experience, casting the entirely of a story's description into a simple format and language was the most effective instrument in creating shared understanding. That means that Developers and QAs should be deeply involved in writing up the stories with their BA!

What then should our intrepid BA do, if they _'cannot write stories without their Developers and QA in tow'_? Ok that might be pushing it a bit far. Why not try this: Let the BA write _just_ the Story. Simply **So that** ... **As a** ... **I want to** ... . It covers the core intent, and the guess at the desired action, along with the context of _who_ the value is for. I would make the same argument I did earlier. If a team member cannot express those details on their own, then they don't truly understand the intent.

But given this skeleton, work with the team to define scenarios, and some limited edge cases. You don't need to know everything to get a good idea for what it entails. Why not utilize the Given When Then format for the scenarios? Ideally your Developers will already be familiar with it. And it succinctly communicates the core information of each possible application of the story's intent. In so constructing a User Story, a BA can help strip away the clutter. You can help to clearly communicate intent, and desired value to those who do the work. Further, the BA aides the QA by priming the pump on a couple basic tests for the end of the ticket.

Having explored just bugs, and briefly touching on roles, I want to point out a couple of broad implications. I started by asking what does a cross-functional team look like, and highlighted that even in our language we can slip into the assumption about a Role and function. QA is generally the title given to one whose primary role has been ensuring the work is well done. But we can sometimes box the _activity_ or behaviors of that role into _just_ testing completed code. Taking a broader lens, the behaviors I suggested of helping to suss out unspoken assumptions, is part of _'Ensuring Work is well done'_. Consider the BAs 'typical' duties, writing up User Stories is definitely in the bounds. But is that behavior sufficient for the Role of _'Representing the End User'_ ?

I used Bugs from Miscommunication as a thought experiment to highlight ways in which that representation might be made better. So what does a cross-functional team look like? It looks like every member of the team taking extreme ownership of their role with a focus on delivering value. It looks like team member's taking responsibility not just for their own parts but for the impact of that part on the final product. They don't just own the output of their step, but strive to improve the quality of the input to their step too!
