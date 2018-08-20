---
title: TIL... How to handle User input with a generic function
tags:
  - crud
  - generic
  - react
  - User Interface
categories:
  - TodayILearned
  - Work Projects
date: 2018-05-01 15:00:06
---

While writing a CRUD screen with validation in React, I found I was writing similar, if not the same state-altering functions for each input box. Some functions needed additional validation while others did not. After discussing some team-members, the suggestion was made to use the following:

```javascript
handleUserInput(e) {
 const name = e.target.name;
 const value = e.target.value;
 this.setState({ [name]: value });
}
```

Paired with code like this for the inputs:

```javascript
<TextInput
 id="saleName"
 name="saleName"
 placeholder={''}
 value={this.state.saleName}
 onChange={this.handleUserInput}
/>
```

Then just set the name property on the tag to the same property name in state.