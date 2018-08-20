---
title: TIL... How to use Map and Reduce
tags:
  - clean-code
  - functional
  - map-reduce
  - redux
categories:
  - TodayILearned
  - Work Projects
date: 2018-05-22 15:00:44
photos:
  - img/post_img/knowledge_base.jpg
---

While working on a React app, I needed to translate a bit of Redux shape into one needed by an Api. Due to the normalization we imposed on the Redux state, I had to navigate to the desired information through a couple of lists. These entities each had a list of ids of children, and I needed the grand-children of a given entity. 

Instead of manually composing this list, I found map and reduce were far better suited to the task, as you might imagine. In order to get the list of grandchildren, I first mapped the list of children ids to a list of lists of grand-child ids. These lists were accessed through the children. 

Then I took the list of lists and reduced it , effectively merging it into a single, long list of all grandchildren. Helpful hint, always include an initial value for the list. It helps avoid bugs when inputs are empty. 

Finally I mapped the list of grand-child ids to the grandchildren themselves. As an experiment I did try to manually iterate through the lists without Map and reduce, and found that those three lines replaced something like 12-15 lines. Further, the 12-15 line code was... obtuse at best. Got to love it when succinct code is also easier to understand.