---
title: To Automate, or not To Automate -  Data and Information
categories:
 - Software Development
 - Testing
tags:
 - automation
 - testing
 - quality assurance
 - software development
date: 2021-06-28 09:00:00
photos: 
 - img/post_img/auto_not_auto.jpg
---

In the quest to improve our confidence in our software, we have turned to automated testing frameworks. [We’ve built a team](https://improving.com/thoughts/to-automate-or-not-to-automate-getting-started). We set them to work on developing a supporting library, and conducting their first few tests. Our next milestones will bring a test that will likely need a babysitter into its first service as a value-added team member, where once it produced data, we will harness it to produce information.

{Image or set of images showing just a Table of many numbers -> Check Mark / X}[Or perhaps something like https://unsplash.com/photos/JKUTrJ4vK00 or even https://pixabay.com/photos/chart-graph-finance-financial-data-2785902/]

Now that you have your first few test cases written, and your starting team has their feet under them, it is time to bring your automation suite into the main flow of development. After all, for the automation suite to produce value it must be run. And the goal of automating in the first place was to more effectively utilize our resources. So, the next step should be to set the automation up to run... automatically. At the beginning, it is fine to have to manually kick off your automation, after all, all efforts must start somewhere. But as it grows, you will need to have it run by itself, without a human babysitter. What you want is a fully-fledged, value-added team member, not a care-taker bot that needs to be taken care of itself. The next major milestones you should be looking at are weaving your test automation, and its reports into your CI/CD pipeline. You might have a test environment which updates nightly. Wonderful! Hook up your automation to a spare server or VM and have your deployment service kick it off after the deployment finishes. This will be a shift for your team, who likely has been manually triggering each run up until now. This is a necessary shift in thinking and practice. Much like removing the training wheels on a bike. The team might fall down a time or two, but once they have the knack for it, they'll be able to race on down the street. Just as the initial press to automate took some concerted effort, so too will fully automating your automated tests.

{Image: Clip art guy climbing up a step perhaps?}[https://pixabay.com/photos/board-chalk-business-job-work-3695073/]

Integrating the automation suite into your pipeline doesn't have to be a massive ordeal. Automation is not an all or nothing affair. So just take the first step, and then the next. The purpose of integrating the suite is to slowly remove the human from the loop. Normally, it is easier to start the suite automatically than it is to fully automate the reporting. For this discussion, we'll start there. Depending on your build system, and your chosen automation framework, how you kick off your test execution can vary. Some frameworks have an agent installed on some host, that you call. Others might expose an API. Most build systems now provide steps to manage the operations of a build. So automatically starting a test run will most likely mean adding a step to the build of the environment you want to test in. What that step specifically will do depends on your automation framework and on your infrastructure. If you are lucky enough to have a team experienced in DevOps this is an excellent chance to leverage their skills. If not, then have your existing automation team work closely with your IT organization to get your infrastructure prepared for this step.

Once you have successfully set up a consistent way to kick off your automated test execution, you are ready to begin automating the test report. But be cautious here! There is a difference between data and information. Without refinement, your automation framework is likely producing lots of excellent data for you. What you need is Information. You need that data put into a meaningful context. Otherwise, it won't achieve the original goal.

{Image of person covering their eyes}[Maybe https://unsplash.com/photos/ZuQnhpFjvHI ]

With your tests are fully automated, you need a way to share the data gleaned from the test run. You need a consistent way to automatically share the results with your team. Often this can take the form of an email containing the report of the automated test run. This is a good place to start. However, if the report is not a good fit for your audience, then you are more likely to create a new junk-email rule in their Outlook than you are to add value to their daily routine. We do not want to encourage the team to voluntarily blind themselves like that!

[So, let us start with why](https://improving.com/thoughts/to-automate-or-not-to-automate). Why are we sending the report in the first place? What do you want people to do with the information in the report? Coincidentally, this also ties into the “Who” your report is for. Consider a possible case that one of your test cases for billing broke during the overnight run. You might want that to be raised as a top priority for your team to fix. Your “Who” would be the developers you want to become aware of the test failure. And your “Why” would be 'In order to fix the broken test case.'

By this time, your team will already have experience with the default manual reports from your selected automated testing framework. This can be a good place to start, at least for ideas of what you can do. While you might be tempted to just send that report, consider whether it is understood by the “Who” you are targeting. Usually, these automated reports will document which test case failed. Sometimes they will include what went wrong or what error the automation code encountered. Considering the range of potential problems, you might see errors ranging from 'Operation Timed Out' to 'Unable to find selector ...'. For your QAs who are maintaining the automated testing tool, this can be useful information. But for a developer, it will take some interpretation, and investigation of the test case to know what went wrong. That is not ideal, if your goal is for the team to fix the broken test. Because the more friction encountered in understanding the automation report, the less willing and able your team will be to address the root problem.

This is indeed a tricky balance. It can be fine to start by just sending the raw error report out automatically by an email. But it will be critical that the effort not stop there. Consider who you want to use the information within the report. And what information they will actually need to act in the way you desire. Going back to the Billing Test Case failure, just reporting 'what broke' by test case and exception caught is not enough. The good news is your team already has the information they need to produce a more meaningful error report.

When writing a test case, you are usually describing a series of human steps to accomplish a workflow. For billing, in a 'Post Invoice' test case, this might be:

1. Create New Invoice.
2. Add LineItems to Invoice
3. Apply Discounts to Invoice
4. Post Invoice
5. ...

These steps of course would be broken down even further by your automation team, in order to describe them to the automated testing framework. Nevertheless, the phases of such a test are grouped by what the human would be doing in the application. Thus, a better error report for a developer would explain which test case, and which step failed. So instead of just reporting 'Operation TimeOut: Post Invoice Test'. Try to report 'Post Invoice Test - Step 2: Add LineItems to Invoice failed - Operation Timeout'. Such a report immediately communicates the intent of the test which failed. And it narrows the field to check for that failure, by describing the step. This is not by any means perfect. And you should involve your team in determining what information they need from automation in order to act on a given test report. But this pattern should give you a starting point.

The raw data that a particular operation failed during such-and-such test is important data. By putting it into the context of what that operation was trying to accomplish, we transmute data into information. By adding why we are performing that operation, we establish the importance of the finding. Your first effort was to translate what your QA team already knows and how to do it in a series of repeatable steps for your new automation framework. Now your efforts are to translate that framework's data into meaningful information for your team to use. There is a certain symmetry to it. Now that you have fully automated your automated test framework, it's just about ready to meet the rest of your team. So next time we'll discuss effective team development practices for your automated tests and explore a pitfall which will suck the life out of your test suite if discipline isn't tight.