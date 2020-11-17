---
title: How do you demo an API Gateway?
categories:
  - Software Development
  - Tools
tags:
  - api-gateway
  - quality
  - testing
  - demo
  - postman
  - ocelot
date: 2020-11-17 09:00:00
photos:
  - img/post_img/ship_in_bottle.jpg
---

Last week, I talked about getting to PoC [a new tool called Ocelot](/2020/11/11/new-pet-ocelot/), which is an API Gateway. I mentioned that as part of this work, I demonstrated it's function to the Architecture board. What I didn't mention was how. For context, Ocelot has no front-end, as it were. You don't have a UI to interact it. Ocelot exists in the layer in between your UI and whatever backends support it. So in a PoC case, how do you 'demonstrate' such a thing, since it has no UI to show?

I relied on a tool I have begun to use heavily in the last few months: [Postman](https://www.postman.com/). Postman is a Http Request Client, and so mimics much of the behavior a UI might have as it regards the API. That is, you can use Postman to pretend to be the UI, and interact manually with the different API endpoints which support the work. I know that may not sound super useful, having a human pretend to be software, but hear me out. Ocelot need someone to pretend to be the UI. That way it can 'answer' by routing the request to proper destination. Postman allows a human to do this. The natural next question might be How?

Do you remember in those old timey movies how the Captain of the ship would give an instruction ,in a normal voice, and then the First Mate would suddenly start bellowing a series of commands usually in some ship-board jargon that , at least to me, was unintelligible? I mean, I know those were English words... but I did not know the meaning conveyed in those words nor in their order of appearance. Postman is like your first mate, you need to set him up with a certain amount of information for him to work, but after than you can simple save: _'Get me the product with Id 1'_ and he'll go off and start shouting something like this:

```cURL
GET http://{yourdomain}.com/{someApi}/{someEndpoint}/1
-H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0"
...
-H "Accept-Language: en-US,en;q=0.5"
--compressed
-H "Connection: keep-alive"
...
-H "Cookie: ..."
```

As a result, Ocelot hears the language it understands, and run off to route the request you handed to Postman, and return with a result to Postman. Postman can then take that result and make it a bit easier for you to read, rather than something like

```json
{
  "productId": 1,
  "sourceId": 1,
  "title": "Gas-powered Stick",
  "inStock": false
}
```

Ok, so no big surprise, Dev has a new toy. But is that all it can be good for? Actually no, Postman can actually do quite a lot, and the use case above is just the basics. While it certainly is useful for a Dev, it can also really help our friend the QA. In case you don't already know, I am a Fan of [our friends in QA](/2019/02/11/a-developers-best-friend/). I believe [we have a lot we could learn from each other](https://www.youtube.com/watch?v=hvnX4CcZvnQ), and Postman is one of the tools which allows the Dev to proactively help our brother the QA.

Let's take an easy example. Suppose you are writing a simple change to an Endpoint to filter out null results. As a Dev you might test this with Unit tests on the API, and maybe you'd go check with some real Test Data thru the UI. But did you notice how much longer it too to verify your change by going through the UI? Imagine if you had to _create_ that data thru the UI , as well as verify it? Think of all the screen loading! Yuck. Behind the scenes, you and I know that the UI is just stringing together some requests to the API like:

```cURL
POST http://{domain}.com/products/Update/1
...
--header 'Content-Type: application/json'
--data-raw '{
    "promoTypeId": 2270,
    "saleDayId": "2265",
    "startTime": "09:30:00",
    "endTime": "17:00:00",
}'
```

and

```cURL
GET http://{domain}.com/products/1
...
```

Why should the QA have to go through all that waiting, if all he is doing is verifying that the new results of an Endpoint no longer include nulls? Wouldn't it be faster and easier to teach Postman how to make the request, and then help the QA give simple instructions to Postman to get a response they could check? That would certainly same some time, if the data already existed. Then all the QA has to do is learn to read the response, which some basic pointers in JSON, plus ctrl+f can help with.

But come to think of it... that's only half the wait time. The other half, and probably a large portion than that comes in trying to create all that test data, and I know a way that Postman can help there too! You see the designers/developers of Postman envisioned it as a API creation and collaboration tool. So they also build in certain Test functionality, including a way to string together a series of requests! Which means that if you can find out what requests the UI uses to string the data for Creating the test data together, then you can mimic it, and since you aren't waiting of the UI , have Postman more rapidly create test data! When I and my QA tried this most recently, we shaved something like 90% of the time off of creating a single new unit of test data, and had a cleaner set of data, because we can created the entity of interest and _all_ its parents from scratch and in less time than the same would have taken to re-use existing parents thru the UI.

I hope some of these metaphors help make Postman a bit more approachable, and perhaps pique your curiosity. I know that I have steadily come to rely on Postman more and more since my first brush with his utility. To that end, I plan to elaborate on the process of teaching Postman. It's the one I used to support my QA in the story above. It is a subject that bears more discussion, as the basics are somewhat mystical without a guide. So tune back in after Thanksgiving, and I should have some juicy videos for you!
