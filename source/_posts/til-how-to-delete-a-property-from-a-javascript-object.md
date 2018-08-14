---
title: TIL... How to delete a property from a javascript object
tags:
  - javascript
  - lodash
  - omit
  - react
  - redux
url: 1529.html
id: 1529
categories:
  - TodayILearned
  - Work Projects
date: 2018-04-24 15:00:47
---

While working in a reducer, I found I needed to close/remove an entry from a dictionary. After a brief amount of digging I found that I did not have to write this functionality myself. The kind folk of Lodash have you covered. Simple \_omit\_ the property. Like so:

import omit from 'lodash/omit'

default export (object)=>omit(object,removedKey);

Lodash/Omit kindly returns a new object, _omitting_ the given key.