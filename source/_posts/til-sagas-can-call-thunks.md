---
title: TIL... Sagas can call Thunks
categories:
  - Software Development
  - Lessons Learned
tags:
  - javascript
  - redux
  - redux-saga
  - thunks
  - sagas
date: 2019-06-10 09:00:00
photos: 
  - img/post_img/clipart_confusion.png
---
This week I fought a bug that didn't want to die. I spent nearly half the week struggling to overcome it, only to be turned back at every turn. The bug dealt with the timing of several events on Page Load. The end result of the bug was that our Price would never load. You'd just see this endless spinner. _Thinking... Thinking... Thinking..._

**Sigh** Thankfully in diagnosing the bug, we did find out a way to get our price to load: The user had to interact with the app. Once the user makes a selection, everything is fine. the only problem was that if the price spinner keeps going, the user thinks the app broke and they leave! ... Great! No help there... Unless you do a hack.

This is how I found out that Redux Sagas can indeed call a Thunk. For context, Sagas can be compared to event listeners. They operate asynchronously. So API calls or other time intensive operations are good fodder for a Saga, since they don't block the UI. Thunks are synchronous. So if you _want_ to block the UI for a sequence of operations, use a Thunk. This is not their only use but it is the pertinent one for this context.

In the case of this bug, I needed to _simulate_ user interaction. So at first we tried the `delay()` effect from Redux-sagas. For whatever reason that effect never resolved so we couldn't capitalize on it. Which is when we decided to use `setTimeout()` in a Thunk. And finally after 3 days of beating my head against a wall, we bypassed the bug!

Now to be clear, I do not advocate such hacks involving timing! I personally think they indicate a deeper issue in your program. As a result they merit de-tangling your event sequences. But that was not the call the client made in this case. The bug was holding up their release. But it did not impact the critical features. Thus they accepted the maintenance overhead and other costs in the meantime. And as a result I, and the team learned we could mix Thunks and Sagas. Small Silver-lining.