---
title: TIL... Combine Reducers also splits state...
tags:
  - redux
  - testing
  - til
categories:
  - Software Development
  - Lessons Learned
date: 2018-05-15 15:00:18
---

While starting work on a greenfield project, I was of course writing new reducers. This time, we were trying to follow a better paradigm as outlined [here](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape). As it happens I was writing the byId reducer for an action when I learned a wonderful, simplifying fact. As you know Reducers take current state and an action, returning a modified state. But what is the state handed to the function? As it turns out, CombineReducers, also splits out the relevant part of state for the given reducers. For example, take the following Redux State:

```javascript
root: {
  entities: {
    item: {
      byId:{},
      allIds:[]
    },
    thing: {},
    box: {},
  },
  uiState:{}
}
```

If you compose root from an entities and uiState reducer, then the entities reducer gets only the entities part of state. Going deeper you can similarly compose the entities reducer from item, thing and box. The item reducer will only get the item part of state, and will not see anything related to thing or box. As a result of this behavior, you can write very simple reducers. And of course it is super easy to write tests for reducers composed in this manner.