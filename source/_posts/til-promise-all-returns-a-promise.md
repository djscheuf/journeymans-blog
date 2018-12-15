---
title: TIL... Promise.all() returns a Promise
categories:
  - Software Development
  - Lessons Learned
tags:
  - javascript
  - promise
  - async
date: 2018-12-17 10:00:00
photos: 
  - img/post_img/code_wall.jpg
---

This iteration, while writing a series of API calls, I ran into a somewhat silly mistake. I was forking an array of Ids to a set of Promises calling an API using those ids. 

I wanted to wait until each call had completed. Then I'd collect the results and returning the aggregate. But what I found was that none of the Promises were resolving in the test.

That's when I discovered I'd made a mistake in my usage of [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). Promise.all actually returns_another_ promise which resolves when all the given promises resolve. It is not a blocking call. **facepalm**

So I refactoring the forking function into an async function and awaited on the Promise.all() line. Lo and behold, all the forked promises resolved. I hope this note helps you dodge or resolve a similar goof in the future!