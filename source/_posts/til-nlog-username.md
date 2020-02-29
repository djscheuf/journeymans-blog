---
title: TIL...How to nLog UserName
categories:
  - Software Development
  - Lessons Learned
tags:
  - nlog
  - username
  - logging
date: 2020-02-29 09:00:00
photos: 
  - img/post_img/clipart_confusion.png
---

A couple weeks ago, a colleague came to me with a challenge. As we were closing in on release, he was trying to shore up our audit logging. Unfortunately our audit log did not include _who_ was performing the logged action. Since it was in the middle of the Regression phase, the need was evident. We weren't able to tell which kind of users were encountering a certain bug. 

After some digging, we found that we were using NLog to insert the log statements into a SQL database. Some of the parameters came from the code, but others were being provided by the framework. We couldn't add a UserName property to _every_ log statement to , so we needed another solution. Some parameters had this weird `${aspnet-...}` format. So I suggested we look to see if the framework also supported username or identity.

To our great pleasure the documentation reveal that user-identity was indeed supported. With a new Parameter in hand, we were able to extend the insert script to include username. Better still, we did it without to change any log statements! Here was our parameter definition, since you can use it independent of the sql statment:

```xml
<parameter name="@UserName" layout="${aspnet-user-identity}" />
```