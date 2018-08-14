---
title: TIL... How to set Entity Id without using Reflection
tags:
  - c++
  - csharp
  - entity-framework
  - integration-tests
  - reflection
  - testing
url: 1520.html
id: 1520
categories:
  - TodayILearned
  - Work Projects
---

While writing some integration tests using an In-Memory Database, I found I needed to set the id of an entity post-construction. Normally I'd use Reflection for this, since the Property is protected.

var prop = depOption.GetType().GetProperty("Id");

            prop.SetValue(depOption, 2);

 return depOption;

To my joy, I was informed there is another option! Use the EntitySetter like so:

**EntitySetter.SetIdOf(object, desiredObjectId);**