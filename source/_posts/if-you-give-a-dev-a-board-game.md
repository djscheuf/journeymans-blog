---
title: If you give a Dev a board game...
tags:
  - board game
  - board games
  - code
  - development
  - games
  - performance
  - personal projects
  - programming
  - python
  - simulate
  - simulation
  - software
url: 1398.html
id: 1398
categories:
  - Software Development
  - Side Projects
date: 2017-01-31 16:30:38
---

From my first lecture on C, I have been tinkering with side projects. I've done projects purely for exploration and entertainment, like a text-based adventure games. More recently I've done utility projects like a script to correct [QIF](https://en.wikipedia.org/wiki/Quicken_Interchange_Format) formatted text. Recently I took on a project of a larger scope.

A while back,I read an [article about a simulation of Machikoro](https://boardgamegeek.com/thread/1301080/complete-simulation-machi-koro-strategies). It is a ‘city-building game’, with rules that are easy to translate to code. In particular, the idea of using the simulator to ‘evolve’ an optimal strategy for the game captivated me. This was applying Machine-learning to a board game. I figured 'I could do that', and got to work. I encountered many distractions and set-backs, including a new baby. But this month I am pleased to admit that I have hit a milestone.

To support the ‘evolution’ aspect, I had to be able to run thousands of simulations in a reasonable amount of time. And after a bit over a month of concerted effort, I made it. I took my code from being a collection of classes to a library and simulator able to run 1000 games in 15 seconds.

I started back in December with classes to represent the deck of cards, a strategy for play, and a player state. The first step after this was to create a basic _AI*_ to act upon the player state, and a given strategy. Borrowing from the article I had found, I decided to make the strategy more static. The decision logic reduced to constant decisions like 'always yes', or 'always the cheapest available'. Then the _AI_ only needed to use the _Strategy_ to answer queries from the _Game_.

###### *Note: I am capitalizing and _italicizing_ Class names for ease of identification.

After the simplified _AI_ was complete, I got to work on the _Game_, which would simulate a single game. I decided that I wanted to use [fluent APIs](https://github.com/djscheuf/FluentPyTestAPI) to instantiate a _Game_. I spend a good chunk of time to get these write, but it helped to make the main routine clearer. While I developed the _Game_, I decided to abstract the mechanisms of the game. This allowed me to separate the calculations from the sequence in which they are applied. I extracted the _Engine_ to handle things like calculating which _AI_ if any has won, or how much money this _AI_ gets with this dice roll. Meanwhile the _Game_ can manage whose turn it is, and who rolls the dice.

Testing both the _Game_ and the _Engine_ were somewhat arduous, but it was time well spent. I caught numerous bugs, and infinite loops before I ever ran a full simulation. Thankfully the _Deck_, _State_, and _AI_ were all similarly tested. But I do wish that I had adhered more tightly to [TDD](https://en.wikipedia.org/wiki/Test-driven_development). Instead I was very eager to getting the core functionality working.

Once these pieces were in place, I initiated my [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html), branching Master, Dev, and a new Feature. After pushing version 1.0 to Git, I started work on a new Feature, multi-game simulation! And while I tinkered with a Simulator, I realized that my fluent APIs had a bug. So I went back to Dev, and produced a [Hotfix](https://en.wikipedia.org/wiki/Hotfix), which was merged into Master. From there I re-based the Feature, and continued my work.

With the _Simulator_, I needed to initialize a _Game_, but also to be able to run it N times, without interference from the previous rounds. So I had a two-pronged approach, I would accumulate the results of each game, and I would allow a _Game_ to be reset. Learning from my forebears, I was sure to include randomization of the first-player when I reset. This removed the skewing of First-move advantage from my results. With the core _Game_ working and fluently initialized, I was able to simple inject it into a _Simulator_ to run.

The original simulator was able to run 1000 games in around 80 seconds. This performance is alright, but my personal dev box has 8 cores and the _Simulator_ was maxing out just one. So to improve performance , I began to look into Python multi-threading. I found two similar flavors of concurrent operations in Python.

I elected to try [Tasks](https://docs.python.org/3/library/asyncio-task.html) first, as it seemed similar to Microsoft’s Task Parallel Library. Sadly I was not quite right about that. The _BatchSimulator_’s performance was terrible. For some reason it never used multiple cores. The original time for the _BatchSimulator_ was 150 seconds for 1000 games. While it is likely this was user error, it was enough to discourage me from pursuing Tasks further.

So I turned to [concurrents](https://docs.python.org/3/library/concurrent.futures.html). And with concurrents, I had much better luck. In this case I spawned some sub-processes. I created the _Coordinator_ to provide each fork with its own copy of the given _Game_, and an assigned number of games to run. Then each fork created its own _Simulator_, and ran the given number of games. Once each _Simulator_ completed, the _Coordinator_ would accumulate the results. After all the forks completed, the coordinator calculates the final statistics. This provides an overall winner. To make this easier, I extracted the _SimulationResults_ class. I then added public methods for merging and calculations. By leveraging sub-processes, and existing code, the _Coordinator_ was able to run at least 1000 games in ~16 seconds. Now I say at least, because the _Coordinator_ divides the games evenly among the sub-processes. So to ensure that at least 1000 games are run, it must round up on the division of games per sub-process. But having more data is never a bad thing.

I was able to push and close this Feature recently, and I am very pleased with the progress. I went from single game simulation to rather performant 1000 game simulation in a month. I now have something to show for my ideas and my work. This milestone leaves me at a good break point. I can either continue working on the simulator to pursue the machine-learning angle. Or I can change focus and return to this project later. At the moment, I don’t know what direction I will turn. But I wanted to take a step back and look at what I have accomplished, and share my ‘geeking out’ a bit.

If anyone is interested in the source, you can find it [here](https://github.com/djscheuf/Machikoro-Simulator).