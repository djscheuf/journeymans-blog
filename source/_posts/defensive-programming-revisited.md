---
title: Defensive Programming Revisited
categories:
  - Software Development
  - Best Practices
date: 2016-06-23 15:00:08
tags:
  - leadership
  - teams
  - culture
  - organizations
photos: 
  - /img/post_img/submarine.jpg
---

A few weeks ago, I wrote a post on Defensive Programming. In it I recalled a recent work project that had benefited from the practice. Today, I want to bring in additional insights that I have since found. I believe they will help broaden the conversation.** **I found an article recently listed on my feed from LinkedIn. You can read the article [**here**](https://blog.cloudpassage.com/2016/03/02/build-your-network-like-a-submarine-rsa-2016/). 

The article discussed system design, and focused on defense against hacking. In summary, the recommendation was to build our systems like we do a submarine. A submarine contains water-tight compartments sealed from one another by bulkheads. This way is any part of the submarine is breached, one can seal the affected parts.  I did some light research on Wikipedia to verify my understanding. It is truly impressive the amount of engineering that goes into these machines. Perhaps the most striking feature is the physical embodiment of the **_"Ruthless Calculus of War"_**. Specifically looking at the Pressure Hull section of the Wikipedia article, it is clear that these devices are built to take a hit. You can find the wikipedia article [**here**](https://en.wikipedia.org/wiki/Submarine#Hull).

While the author discussed defending network systems against attack, I thought about my employer's legacy code project. We have many components separated into many libraries. And the interfaces in the software are often convoluted at best. Moreover, I have seen little protections or compartmentalization where it might be prudent. For an example, I will use the same project which initiated my first discussion. A new feature would crash without explanation in certain conditions. While most of us thought about why the crash was happening, One of our front end developers was smart enough to put the call to our interop into a try-catch block. With this in place, any exception thrown from the algorithm was caught. This way the exception details are shown to the user. Instead of hypothesizing about the problem we could simply know.

But, the more important effect was the clean separation between the front and back ends. This neat compartmentalization means that failure in the algorithm don't result in a crash. In the same way that a breach doesn't sink the sub. While reviewing this article I realized that we need to change our thinking for this practice to work. We need to think less about protecting ourselves from every possible failure. We need to think more about how to survive that failure. Perhaps it seems fatalistic to try to just survive the inevitable failure. But the truth of the matter is we cannot and will not anticipate every condition. As a result it may be wiser to invest our effort in equal parts between anticipation and containment. 

Looking back, I realized that containment should not be applied just to Interop components. A wise developer would see that we ought to apply compartmentalization to any file system access as well. In fact, I recently fixed a Customer Defect in my employer's main C# application related to a corrupts of their settings file. The solution was of course to protect the application for corrupt files, without crashing. While talking about this to one of the lead Devs on the project, we realized that service calls should be protected similarly. For example, when the C# project calls into the legacy code, we ought to protect the C# project against the legacy code failures, and vice versa when the legacy code calls into the C# project. The more I mull this idea over, the more I realize about it. As in the first example, it was a wise use of our Development time. And it improved our debugging efficiency! Furthermore, this construction follows the testing pattern of: **_Fail Loud, Fail Fast, and Fail Safely!_**, which I generally try to adhere to. 

The 'Fail Safely' part is often forgotten though, as the other examples have shown. In some cases is it also difficult to implement. But with the revelations of the article and my recent examples, I hope to be more consistent in my use of this principle. With any luck,it has become a little clearer. So, looking again at the many parts of our legacy code, I wonder if it would be wise or viable to add the try-catch bulkheads. These simple steps would save our users from the dark and murky depths of unknown failures.

**\* Image borrowed from** [**DailyMail.com**](http://www.dailymail.co.uk/sciencetech/article-3147721/Saab-unveils-superstealth-ghost-submarine-says-virtually-invisible-enemies-allows-divers-silently-enter-exit.html)
