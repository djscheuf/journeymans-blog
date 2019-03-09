---
title: TIL... About jest.resetAllMocks() safety
categories:
  - Software Development
  - Lessons Learned
tags:
  - javascript
  - jest
  - testing
  - mocks
date: 2019-02-27 09:00:00
photos: 
  - img/post_img/clipart_confusion.png
---

I was extending some test cases, and found I needed to ensure the mocks weren't polluted between test cases. Pretty standard stuff right?

So I threw a reset into my WHEN so that each assertion could avoid pollution with the others. Here's what I did:
```javascript
describe('WHEN blah',()=>{ 
  
  beforeEach(()=>{/* do some test step*/ jest.resetAllMocks();});
  describe('THEN some assertion',()=>{
    ... 
  });
};
```

Did you see it? I didn't either, at first. I was flumuxed when my more tests started failing than before. Eventually I realized my error. I had put the reset **AFTER** my action step. I was resetting the Mocks before they coudl be checked.

Needless to say there were several facepalm moments that day.