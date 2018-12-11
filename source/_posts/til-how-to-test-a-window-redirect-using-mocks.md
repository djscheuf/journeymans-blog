---
title: TIL... How to test a window-redirect using Mocks
tags:
  - jest
  - location
  - mocking
  - mocks
  - redirect
  - window
categories:
  - Software Development
  - Lessons Learned
photos:
  - img/post_img/library.jpg
date: 2018-06-26 15:30:59
---

I was testing an action, which upon completion needed to redirect the user to a new page. Normally, in javascript you can redirect using :

```javascript
window.location = "newPath";
```

But that's hard to test for. Thankfully there is a better way:

```javascript
window.location.assign("newPath");
```

You can then mock the assign function and test for that call! My thanks to the creators of jest for that [insight](https://github.com/facebook/jest/issues/890)!
