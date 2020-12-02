---
title: Quick Update & TIL... agGrid changes the datatype of selected rows
categories:
  - Software Development
  - Lessons Learned
tags:
  - angular
  - aggrid
  - javascript
  - comparisons
photos:
  - img/post_img/clipart_confusion.png
date: 2020-12-02 09:00:00
---

Howdy all, Last post I promised some Postman Video Tutorials after the Thanksgiving Break. As one might expect, attempting to record audio with 3 tiny children at home usually means waiting until late at night. As a result, I have far less time than I needed to produce decent quality tutorials, even given my pre-planning. I am still working on the first few, and hope to deliver them in the next week, but that series will need longer to truly complete. In the meantime, I thought I'd share a funny bug I found the day before Thanksgiving!

---

On the Wednesday before Thanksgiving, the office was quiet. It was getting towards the end of the day when my QA tagged me on a story I thought complete. He showed me a screenshot of the bug, and the test data he'd used. I went and repeated the designated steps only to get a different result.

We were testing a function to disable a button based on the conditions of some selected data. But upon digging into his screenshot I noticed one key difference. When filtering for the test data, he has used a keyword search, where I had used a difference field. As a result, his key phrase was highlighted in our grid on the front-end. 

Our front-end is an Angular application, and the grid in question was an [agGrid (v. 21.2.2)](https://www.ag-grid.com/), which provided the highlight of key-word functionality. It was also the component providing the 'selected row' which I was driving the disable button logic on. We were using a hidden field on the row to drive the logic. It was a status id, so we could have our logic not rely on a string comparison to the display value. 

And there was the problem. I was using a === comparison on the Id, against a number, like 123. Normally when you selected the row, that Id property would also be a number, 123. But agGrid was changing the return type in a somewhat subtle way, as part of supporting the highlight function. Instead of returning the values of the selected row in their original type, the highlight function appears to convert them all to strings, for the Id went from 123, to _"123"_. I nearly missed it while debugging in the browser!

But with ===,  "123" is not the same as 123, so it would fail and thus fail to disable the button. In the end I chose to solve the problem by always converting the Id property to a number before running the comparison. This ensured that whether the user had search for a keyword or not, I could always rely on the operations underneath. I think it would also be possible to have used the == operator... but I preferred having the explicit conversion and then exact comparison rather than to implicitly convert as part of the comparison. Anyway, I hope that helps you in the future, I know it wasn't something I would ever have thought to look for until I found it!