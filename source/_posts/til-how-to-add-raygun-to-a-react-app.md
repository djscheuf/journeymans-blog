---
title: TIL... How to add Raygun to a React App
tags:
  - history
  - raygun
  - react
  - react-router
  - telemetry
  - featured
categories:
  - Software Development
  - Lessons Learned
photos:
  - img/post_img/retro_raygun.jpg
date: 2018-04-10 15:00:12
---

We were preparing to roll-out our brand spanking-new React App. Naturally once our app is out in the wild we wanted to have telemetry on it. The client's go-to telemetry provider was Raygun. I was blessed and impressed with how excellent Raygun's documentation was! It was so accurate and easy to follow, I can't put it in better words myself. However I did run into one sticky issue while integrating. Specifically, integrating the React-Router pages and Raygun's page-view logging. To be sure, Raygun provides a good method for doing this, one simply adds a listener to the props.history object provided by React-Router. Prior to using Raygun the app relied on BrowserRouter, which creates a history object under the hoop. But the Router object allows the developer to provide a history object. So the easiest way to attach the Raygun listener is to call createBrowserHistory, and then attach to the history object before giving it to the Router. Also if you are using a baseUrlName in you app, be sure to pass that to the createBrowserHistory call!