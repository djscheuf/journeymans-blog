---
title: TIL... IEnumerables and FromUri
categories:
 - Software Development
 - lessons-learned
tags:
 - tools
 - api
 - c-sharp
date: 2019-07-22 09:00:00
photos: 
 - img/post_img/clipart_confusion.png
---

So today I had a face-palm moment. I was extending the result payload of a common endpoint. So simple as adding a property. And the good news was the happy path test worked as expect. *phew* Crisis averted right? But then the QA asked that fateful question. He saw that the endpoint accepted a list of ids to return data for. I took a quick peek at the code and found this:

```csharp
[HttpGet]
[Route("MyRoute")]
public HttpResponseMessage GetDataByProduct([FromUri] IEnumerable<int> productIds)
{
  try
  {
    return Request.CreateResponse(HttpStatusCode.OK,
      _someService.GetTheData(productIds));
  }
  catch (Exception ex)
  {
    Logger.Error(ex);
    return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
  }
}
```

Pretty basic stuff really. And this is where I made my mistake. I told the QA to use a coma-separated string as productIds. To be honest, that's how most of our endpoints worked. If you wanted multiple, you provided them as a comma-separated list to the named parameter. It wasn't long before I discovered the error of my ways. Not moments later did the QA come back and report: 'It's not working'.

Thankfully, before panic crept in, I took a moment to think. I had this vague memory of the Postman call that the original developer had used. He did something odd. Instead of the comma-separated list, he declared that param multiple times and assigned multiple values in the url. So I tried it. Something like this:

```bash
curl -X GET \
'http://the.service.me/my-api/MyRoute?productIds=533462&productIds=534464' \
```

Lo and Behold, the test case started working. The QA had it sorted in short order, and we merged the changes into production without further delay. Meanwhile I learned that the FromUri decorator, takes IEnumerables from the multiple declarations of the named parameter in the url. Gotta file that one for later.
