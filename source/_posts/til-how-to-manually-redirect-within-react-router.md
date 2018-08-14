---
title: TIL... How to manually redirect within React-Router
tags:
  - history
  - react
  - react-router
  - redirect
  - redux
  - spa
  - til
url: 1512.html
id: 1512
categories:
  - TodayILearned
  - Work Projects
date: 2018-04-03 15:00:49
---

While working on a SPA react application, I noticed that every time I returned from one screen to the first, I was resetting the Redux state. Given we were using React-Router to handle 'pseudo' links, I was very confused. As it turns out, the way I was redirecting was the culprit. The SPA was supported by an MVC controller, and route. Since we were using React-Router, we had a catch-all route so that the controller would still render the same action despite route changes. Normally, routes are changed within the SPA using RouterLink or similar constructs. Since my redirect was happening as part of an action I was changing the window.history. That was what caused the problem. I found later that I was causing the browser to fix a new request to the server, rather than relying on the React-Router to determine the course. Thankfully, components rendered by a Router receive a prop called history. This props.history is managed by the React-Router, and pushing to it will cause the Router to handle the redirect, thus preserving the Redux state.