---
title: TIL... Another way that IE is 'special'
tags:
  - ie
  - internetexplorer
  - learn
  - learning
  - til
  - web
url: 1500.html
id: 1500
categories:
  - TodayILearned
  - Work Projects
date: 2018-03-27 15:00:10
---

Today I learned another way in which InternetExplorer is _'special'_. One of my team-mates was hunting down a bug in a recent project of ours. A critical link on the page was not working in IE. Strange thing was that Chrome was able to handle it just fine. Turns out the link had use back-slashes(\\) rather than forward-slash(/) after the link protocol. As a result IE was unable to redirect to the next page properly. The solution was simple enough, swap the \ with / and viola IE is happy again. Oh the joys of milti-browser support :P