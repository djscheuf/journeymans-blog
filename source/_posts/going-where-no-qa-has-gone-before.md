---
title: Going where no QA has gone before!
tags:
  - BDD
  - behavior-driven development
  - development
  - quality
  - TDD
  - test-driven development
  - tools
  - testing
url: 1489.html
id: 1489
categories:
  - Software Development
  - Testing
date: 2017-04-18 16:30:00
---

As a developer having QA you can rely on is great! They are welcome friends helping us cultivate our precious software. But there are dark places which even a QA cannot shine a light. When your software has no interface, what can a QA do, but wish you luck? But what if there was a way for QAs to interact with otherwise UI-less software? Enter Cucumber, a tool that allows QA to shine a light in dark places. I rediscovered Cucumber, while researching test automation frameworks. Cucumber is a framework for Behavioral Driven Development. After experimenting for a time, I realized Cucumber opens a whole realm of possibilities. Cucumber encourages the expression of program actions in the human tongue. With a proper translation mechanism, Cucumber could act as a mediator between QA and the UI-less software.  Cucumber translates the human tongue into functions through the Gherkin language. For example, a tester would define a test case like this:

> _**Scenario: Messages are saved until the consumer arrives**_ _Given the queues are empty_ _And I publish a message to the queue with ‘SomeDetails’_ _When Alice subscribes to the queue_ _Then Alice should receive a message with ‘SomeDetails’_

It is fairly easy to understand the behavior that is being described in this scenario. Cucumber ties the keywords Given, When, and Then to functions which execute the described action using a Regex Match string. This can include free-hand parameters such as ‘SomeDetails’.  Properly designed, the Givens and Whens can be setup to be repeatable and re-compose-able. Doing so allows the QA to describe more complex scenarios with different combinations of the same simple behaviors. As a result, once the initial steps are available, a QA could test to their hearts content with little developer support. Cucumber improves the documentation of a product. Test document expected behaviors in a common tongue. This makes them available to all parts of the company. But great care must be taken to ensure that the compose-able parts function precisely as described and without side-effects. Imperfections in the design or the aforementioned side-effects will destroy test-validity and erode trust in the test cases written using Cucumber. Cucumber was designed to improve TDD, enabling members of a team to describe the function of a program in a human tongue. This same feature creates a tool for empowering QA. Given careful planning and design, you can compose a terse but flexible set of instructions. These allow a QA to test projects they could never touch before! By blending the skills of a developer and a QA, we can reap the best of all our talents. All it takes is an investment to allow our friend in QA to come with us!
