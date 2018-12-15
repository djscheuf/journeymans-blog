---
title: TIL... About jest.resetAllMocks()
categories:
  - Software Development
  - Lessons Learned
tags:
  - javascript
  - jest
  - testing
  - mocks
date: 2018-12-18 10:00:00
photos: 
  - img/post_img/clipart_confusion.png
---

This iteration I was writing an Integration style test in Jest. I needed to verify that certain mocks _weren't_ called in the Unhappy Path of the test. But because the Happy Path tests called them, they had 'old' call data in the mock.

After a bit of research I found my answer: tell Jest to reset the mocks. All you have to do is add:
```javascript
describe('when *your test step*'()=>{
  afterEach(()=>{
      jest.resetAllMocks();
  })
  it('then *your validation*',()=>{...});
});
```

And as the name implies Jest dumps the 'old' call data. And now I can verify my Unhappy Paths.