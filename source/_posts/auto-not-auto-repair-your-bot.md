---
title: To Automate, or not To Automate - Repairing your care-taker bot
categories:
 - Software Development
 - Testing
tags:
 - automation
 - testing
 - quality-assurance
 - software development
date: 2021-09-28 09:00:00
photos: 
 - img/post_img/auto_not_auto.jpg
---

> This post was part of a series I wrote for Improving and originally posted on the [Improving's Thoughts Page](https://improving.com/thoughts/repairing-your-care-taker-bot--improving--thoughts).
---

What do you do when your automated testing suite becomes an albatross, causing a plethora of issues? Rather than propelling you forward with confidence it becomes a bot that you must take care of. What can you do? Do you just drop it, despite the significant investment you have put into it? Or can you repair the suite so it becomes a value-added team member again?  

Let’s take a deep dive into repairing such a system. First, I’ll go over how to property diagnose the issue, then I will tell you about options for remedying the situation. Lastly, I’ll discuss what to do when the issue is more severe than usual. 

If you do not know already, [automated testing suites](https://docs.oracle.com/en/industries/communications/cloud-native-core/2.2.0/ats_guide/understanding-automated-testing-suite.html#GUID-EF5BFBAD-8913-49BA-A37A-BD63807A5793 ) allow people to execute software test cases by using an automated testing tool. Like a multiple-choice test in high school, the suite already has a set of results that are predicted. When the test is completed, the suite compares the actual results with the original ones. No one lifts a finger to do this test, which is why automation is so popular. 
 
So, let’s get back to the main question. What can you do when your automated testing suite is faulty? There is good news and bad news here. The good is that yes, you can repair the automation suite. The bad news is that getting it back to normal will resemble the process of getting over a sickness. It takes a while to get better, and it will take a while to fix your system. The key is to properly diagnose the challenge you are facing. From there, the repair is more straight forward.  

# Proper Diagnosis 

Identifying a diseased automation system can be wildly easy at times. For instance, you could come in one day, find your overnight tests have all failed, and see bright red text as your first email of the day (what fun). But other times, as in chronic cases, the trouble might only be experienced as a minor ache every once in a while. However, in both cases, sensitivity to the health of the automation suite is key. The core purpose of the system is to build confidence in a version of software. So, your sensitivity to its health and rigor should be high! Like in your own body, you stand a better chance to stay healthy if you remain alert to even minor aches than if you wait to act until the pain is intense. Even so, you need to spend time figuring out the diagnosis even when the root cause seems obvious.  

Here’s an example scenario about a failed test report. You come into the office in the morning and see a report saying it did not post a credit card invoice. Your first action is to immediately chase issues with the third party who supports your credit transactions. After getting nowhere with that, you check to see if the failure was in the server that runs the integration. Nope, that was also not the problem. After hours of trying to get to the bottom of the failure, you realize it was just down last night for IT maintenance. (Oops...)  

It’s a contrived example for sure, but it does touch on a pattern people sometimes exhibit when they see flashy red alerts. Often, they want to immediately jump into action even when the best way to start is to observe first. I am guilty of this myself, but have learned the value of a proper diagnosis. 

So how do we diagnose correctly? The first step is to not panic.  After you've taken a breath, start breaking down the problem. Where did it occur? When? (You can see an example of what this might be like looking at Chapter 3 of the Phoenix Project.) Establish the order of events. Identify what changes were active in the system under test and when. This information is critical to diagnose the true source of the difficulty. A mature CI/CD pipeline can provide most of these. But you will likely still need to review the logs and the data underneath the system to get a complete picture. 

# Basic Remediation 

Once you have identified the probable source of the error, you will have a chance to ask how this bug got into your system. A typical agile team might even bring it up during a Retrospective meeting to suggest ways of fixing the issue. Among the more common bugs you can find in an automated testing system is a maintenance failure. If a part of the app changed, but the corresponding tests weren't updated, it might be broken selectors, mismatched validation criteria, or even recently invalid setup data. But to properly recognize a maintenance failure, you'll need the ability to track the changes that were live in the system under test. Compare those changes against the expectations of the test you run against that system. A solid Test Case Management solution will help here. But you will find good mileage in building your tests so that they align to the use-case explanations for your application.  [Context-based testing](https://improving.com/thoughts/context-based-testing) is ideal for this alignment. 

When you encounter a maintenance failure, take time to think about the structure of your test code. Consider a Test-Driven-Development process. In this software development process, a developer begins implementation by writing a failing test. Then some of the feature is implemented, just enough to pass the test. Then more tests are added. Once a test is available when you’re developing software under this Test-Driven-Development process, the developer should go  through a so-called “Red-Green-Refactor" cycle.  

Here’s how to do this: Starting with the failed test, you write code to make the test pass. Then you refactor or change the shape and structure of the code. You rely on the test to tell if you broke your expectations in the process. In the same way, it is important to refactor automated tests once they are repaired.  

Be sure to apply what you learned from this debugging. Was it difficult to diagnose this bug? Then add a better error message. Was it difficult to completely fix this bug because it occurred in six places? Extract the shared functionality to some shared source.  

On the topic of simple remediation, I will summarize it this way: 
1. Don't Panic.  
2. Take the time to truly diagnose the issue. Check your application's version and history, and your expectations of the current version 
3. Once you see the trouble, stay calm, and fix that first 
4. Once the fix is in and confirmed, figure out how you might improve. 

# Chronic Conditions 

Now some challenges may be much harder to diagnose. Like the one test that flickers, or the other one that only fails on the 29th of February. If ever you find a system that has more broken tests than can be fixed between released, don't lose heart. In previous articles, [I do advocate for removing flickering tests, and quickly](https://improving.com/thoughts/automation-trust-changes-everything). But that isn't always an option. And there are legacy test suites out there. Addressing these kinds of challenges is not just an academic exercise. Chronic conditions may appear like symptoms of many other minor troubles. The same test might fail one time for bad data, then another time for system instability, and the third time for simple network latency. Even finding a place to start could prove difficult.  

One of the first suggestions someone may make when faced with such a daunting task is to rebuild the entire suite. Abandon the old program and start over. To be 100% honest, there does come a point where the existing automation system costs more to maintain than building a new one would. Although, the cost to rebuild is [often vastly underestimated](https://improving.com/thoughts/the-rewrite-dilemma).  

Even so, the option to replace a broken system can be incredibly attractive. So before opting to replace, consider an alternative. The [Strangler Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html) from software development is quite effective in these situations. It is often used when trying to replace a legacy system over time. The trick is to apply the pattern gradually. This allows you to maintain momentum on the existing serviceable test suite.  

There are extreme cases though. Sometimes, the test suite is just barely maintaining functionality. The test suite might take an entire team of individuals just to maintain and repair existing tests. But it never grows, falling farther behind every release. Dense, convoluted, nearly nonsensical test cases might be the culprit. Or maybe brittle validation strategies. No matter the case, suppose the strangler pattern isn't proving effective in combating the issue. At such a point, you may be looking at something systemic. And here, you are faced with a choice: maintain or rebuild. But do not be fooled! Do not think it is some kind of either/or. The real world is a both. Even a continuously failing automation suite is still producing some value, so you must maintain it as best you can. This provides the time needed for the rebuild to take root and come to fruition. Continue to use the strangler to gradually ease the load off the old system and on to the new. And give some deep thought to how the suite arrived where it is. 

Just like live production code, a degree of maintenance will be necessary to keep our automation running. But even the best laid plans can come to less than ideal ends. In those cases, the best service you can render is to keep your head on and solve the real problem. Replacement is certainly a tantalizing option, but too often it is fraught with hidden costs. So, your true path will walk the line between maintaining and replacing. With a proper diagnosis, you can gradually move from a troubled testing suite to one that you are comfortable relying on. 