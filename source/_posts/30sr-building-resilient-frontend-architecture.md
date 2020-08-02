---
title: 30 Second Review - Building Resilient Frontend Architecture
categories:
  - Personal Development
  - Lessons Learned
tags:
  - 30sec-review
  - front-end
  - resilient
  - architecture
date: 2020-08-05 09:00:00
photos:
  - img/post_img/office_politics.jpg
---

I've been working in Web Frontends for the last 4 ish  years. I've worked in React, and more recently in Angular. Time and  again, I find myself starting what should have been a trivial problem in  the hydra-like faces. As I became more experienced in React, I learned  to solve most of these problems by intelligent application of the same architecture thinking I'd use on the  back end. While most of the same practices can apply to Angular, I am still learning some tricks.

And so it was that I found this [goto; Conference Talk - Building Resilient Frontend Architecture](https://youtu.be/TqfbAXCCVwE).  At first I snickered, as I hadn't thought that way before. But I  thought the concept had some merit. I can happily say that I was not  disappointed by either the talk or the concept. Here's some of what I  learned:


## 1. The True cost of Architecture isn't in the initial development


The  true cost of architectural decisions aren't felt at the moment  we develop the initial system. Sure that can be costly, but it's  an investment, much like a normal agile sprint. We spent some time  to create a return. And after all, we can't choose to hold on to that  time and spend it later. It all has to be used. 


Instead,  the cost of an architectural decision visits itself on the unsuspecting  developer in maintenance costs. Every time we make a change to the  system, does it resist the change? How much rework do I need to do when I  move on of the pieces? How hard is it from me to track down the source  of a bug in a complex system?  These are the questions which illuminate  what your architecture decisions are costing you. Ideally, good  Architecture speeds up your expected changes, or at least does not  impede them. Bad on the other had has a tendency to product hydras.


And it was this statement which completed a line of reasoning that I've been dancing around for a while. Prior to this, I could  sense when a given architecture at a given micro or macro level would  lead to pain. I could usually even point to a scenario, or location in  the system where the pain would be felt. But It was difficult for me t  rationalize the anticipation of a day-to-day pain, with the cost paid  for a decision in the past. Potentially long in the past. Having this  model helps balance that.


## 2. Think of Architecture as 'Enabling Constraints'


This  idea blew my mind at the time! Now to clarify, the speaker did not mean architecture is the means to enable more constraints on the system. Her  point was that Architecture can be considered as a set of constraints  which enable better development!


Think  of Object Oriented Programming for a moment. The basic format of this  concept requires us to organize our code and our data into Classes.  Coming from a procedural world, that is definitely less free, in a  sense.  Now instead of a program simply being a set of variables and the instructions to execute on them, you have a bunch of classes separating different parts of the functionality. I can 100% hear the  procedural devs arguing that 'Following OOP will make our code harder to read! Why!? Because it will put all the functions I need to know about in a  bunch of different files!' I've heard this very argument before, though in different circumstances. 


Now think about what OOP gave back to us? It allows us to rely on  abstraction in our code. It allows us to decouple parts of the system,  and limit the blast-radius of changes! Because we chose to restrict how new  functionality might be added to the system, and how we talk about it, we  gain an ability of tremendous value!


And  this is what the speaker was referring to. When we choose an  intelligent set of constraints to enforce on ourselves, we gain new ways  of interacting with and relying on the system we built. I've actually  heard [this echoed in a couple other talks I've seen.](https://youtu.be/0if71HOyVjY) (Don't worry I've got a 30 second review coming for those too!)


## 3. Favor Decoupled over Dry Code


This idea caught me off guard initially. Wait... why wouldn't I want my system to be dry? If my system is 'wet', that is it has literal  copy-pasted code, won't I have more surface for bugs to appears, and  worse, to fix!? Thankfully the speaker elaborated further. 


She suggests that when making the code dry-er would couple two otherwise unrelated modules, think twice. Preferably,  avoid it. She was speaking to situations where say a dialog for adding  to an order is used in a couple places. 

This dialog might need to be slightly different in one of the places. So we extend the dialog and add  some ifs and other branching. Maybe we need it to flow a little  differently in one spot, like maybe we need to check some condition  before adding the item to the order.All these little branches and  conditions increase the likelihood that a change for one use case of the  dialog, negatively impacts the other. It makes the code more brittle,  especially as the uses drift.


Considering  the alternative case, where instead of sharing the component, we choose to have a copy. Now as we develop, when use case A suddenly needs to  display a little different, we just make the change in Use Case A's  dialog. Then when Use Case B's dialog needs an additional step to it's  work flow. The change is again isolated to Use Case B's dialog. Now  the impact of the drifting changes is much more limited. So that  mistakes in the implementation only impact the group that made them!

Now in truth, we might find out we copied a bug from the initial instance. Then we would need to fix it twice. But if A and B have drifted like we said, it's equally possible that the way to fix the bug in both may be different too. It would be that while adding that second step for B, the bug was resolved by the change of flow. Or we might need to fix it in both in the same way. But now the big that was introduced by the second step in B's dialog doesn't keep A's dialog from working.

For my part, I had to grapple with this idea for a long time. Early in my  career, when I worked mostly in the back-end, DRY was a life-saver. I would end up using a module twice only to find a bug later. DRY would save me the pain of maintaining the code in two places because I could fix it  in the shared location. 

As I started to take on work in the Front-End, I  found myself experiencing more of the situation the speaker refers  to. I would develop some module in one sprint. Next sprint, I'd get a  similar, but slightly different user story, so I'd share the module and  extend it. Then a few sprints later, I'd come back to the shared module,  to find it full of ifs and branches, and it would be a convoluted mess.


So, for my part, my experience would support the speaker's suggestion: keep the code a little more moist to avoid some  brittleness. The analogy of lips in winter comes to mind. When your lips  get to dry due to the cold, and the wind, they'll eventually crack,  just from talking. Keep them a little moist, and they'll remain resilient to the various changes they have to undergo for  speaking, eating, and the like.


I'd  invite the reader to definitely review this talk. Weigh the  speaker's advice against your experience. Maybe even put it to the test!  I know I plan to.

