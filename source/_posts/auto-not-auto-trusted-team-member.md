---
title: To Automate, or not To Automate - Becoming a Trusted Team Member
categories:
 - Software Development
 - Testing
tags:
 - automation
 - testing
 - quality
 
date: 2021-07-19 09:00:00
photos: 
 - img/post_img/auto_not_auto.jpg
canonical_url: https://improving.com/thoughts/automation-trust-changes-everything
---

> This post was part of a series I wrote for Improving and originally posted on the [Improving's Thoughts Page](https://improving.com/thoughts/automation-trust-changes-everything).
---

It is time. The rest of your team has heard so much about this new automation, and now it is time for them to meet their newest team member. And just like adopting a pet, it is also time for all the team members to start contributing to its upkeep. Naturally, the members of your MVP team will be chief stewards. They know the automation suite best. So, as you introduce new team members to it, they are a natural pick for the guide.

{Pic of Jungle Guide; https://unsplash.com/photos/vGzmLshPjbc}

We sought members with coaching skills for the MVP team. During this transition, we will call on those skills again. Now, they will be coaching their peers on the automation suite and the use of the Development Model. Before, [we compared those models to a list of vocabulary cards.](https://improving.com/thoughts/to-automate-or-not-to-automate-getting-started) with which you might build a sentence. In effect, scaling up your automation efforts means teaching the rest of your team the new language. There will definitely be some friction at first. Learning to speak a new language is hard. Be prepared to adjust those models here and there. It will likely reflect the patterns of thought, and the idiosyncrasies of your MVP team at first. So, help them to improve their models as they bring in new team members. This will help build buy-in from the joining team members and will help build the skills of your MVP team.

Now to discover the ways in which your models should grow, it's best to get the existing models into the hands of your new team members. Humans learn vastly better when they can both see and do during a lesson. In this case, that corresponds to having your coaches pair program with the new team member. For example, they could automate a new test case. This learning process might take a while, depending on how much time you have your team dedicate to it, but the more consistently they practice, and the more that real practice is, the better it will stick with them. You can support that realism by establishing measurable goals and meaningful targets. Busy work is not usually valuable to the company, and it is not very effective to help them learn either.

# Deconflicting

Once you have your first new team member up to speed, you'll probably run into the first team-scaling pain point for any team. Let’s envision the following example: Alice is developing a new feature and changed file ABC. Bob was working on fixing a bug, and also changed file ABC. And as soon as they try to put their changes in, the automation suite breaks. You just encountered a Merge Conflict.

{Picture code merge conflict, or File change Comparisons (let me know if this one is hard to find) something like this might work: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2F5QGkf.gif&f=1&nofb=1, or else I can just screenshot one myself}

When you have many independent developers working on shared files, you need a system to manage and control the changes entering your system. Industry practice to resolve this is to put into place version control. There are many forms of this practice, and many software solutions to implement it such as Git or TFS. No matter what you pick, version control, if it isn't already

implemented around your automation suite is a MUST! Once such a system is in place, you can begin to manage the development of your automation framework like a software project. And just like a software project, your team will need some standards of practice. Numerous resources discuss how to best manage your development and version control flow. Some which I rely on can be found here: 
- [Git Branching Model]( https://nvie.com/posts/a-successful-git-branching-model/ 
- [Testing Styles]( https://lassala.net/2017/07/20/test-style-aaa-or-gwt/) 
- [KPIs]( https://devopedia.org/devops-metrics) 
- [Agile Manifesto]( https://agilemanifesto.org/)
- [The Pheonix Project]( https://itrevolution.com/the-phoenix-project/)

There is a necessary increase of discipline common in every version control strategy. For example, you can have a version control system in place. But if you only ever turn in 100 different edited files at once, that system doesn't help you a great deal. By contrast, if you change a scant few files or few lines and then turn in the change, you gain more value from your version control system. Constraining yourself to smaller meaningful changes at a time takes discipline. Practicing such discipline with your automation suite will provide you the best support. Naturally, some changes to the process may be necessary to incentivize this kind of discipline. Since the point of automation is consistent, confidence-building results, consider rewarding maintenance of the test suite specifically. Maintenance is a classic pain in the butt necessity, which requires significant discipline to keep up without external reward. So, while your team is growing into the practice of using and maintaining automated tests, they may benefit from some “training wheels”.

# Safety through Discipline

On the topic of encouraging and enabling disciplined development, it is prudent to revisit why you will need to develop such skills in the first place. After all, creating a new habit takes work. Especially for the less glamorous duties like maintenance, they can be difficult to motivate. Starting from first principles then, software only delivers values once it is used.

To be used, software must be released. Because it is expensive to fix bad releases, we limit our releases to those we are confident will provide an increased value to our users. To build that confidence, we test. And at the start of this series, we sought to increase our value delivered, by reducing the costs to build that confidence. We decided to automate some of the tests. Automating helped improve our ability to gain confidence. Thereby, it improved our ability to deliver value to our users through working software. But all the confidence hinges on a profoundly human concept. Our confidence is based on our trust in the tests.

{Pic – Trust Changes Everything }

Trust is a priceless commodity. Have it, and you can soar. But once it is lost, it can be very difficult to recover. Since our goal with automation is to more effectively build confidence in our software release, we _must_ be able to trust the results of our automation. We must be able to

trust that the results are rigid and sure. Ideally, they would stand unchanging between runs. You should be able to run your automation again and again, and get the same results.

But that isn't always the case. Some automation systems contain weak tests. They may report a failure in one run, only to perform just fine in the next. That one flaky test will cost an incalculable amount! One flaky test might be a real error. But then again... it might not.

# Like a kid asking for candy…

There will always be the temptation to run the suite again and trust the answer you received the second time. It is a little like a child asking dad for candy. And when he hears no from dad, he goes to ask mom. You must be able to trust your test results to report the truth! You cannot afford to leave them to flicker on and off between runs on the same version of code. Here again, we find cultivated discipline necessary. To maintain the value of the results of your test, you must invest in keeping the tests trustworthy. Investigate every flaky test, as though it were the first symptom of a rare disease. Hunt each blip down as though the life of your automated testing system depended on it. It does.

In the case of our automated report, if even a single test result is flaky, changing back and forth between passed and failed is fatal. If it changes without a clear relation to the changes under test, your team will rapidly start to ignore it. This is another kind of voluntary blindness. True, it is smaller than the outlook rule, but it has the same result. We want the report to enable, and inspire action on the part of our team. If even a single test is flaky, we begin paying a tax. Every time the report comes out, the reader will have to ask themselves whether they believe the results they got. If they do, now they have to spend time on a bug that is difficult to reproduce, since the test is flaky after all. If they do not, that raises the question of whether they should believe _any_ of the results they have. It boils down to the ability to trust the information provided in the report as true or not.

# Necessary Independence

There are myriad ways that proper test design can mitigate this possibility. Each will vary with the framework you have chosen, and the nature of the application you are testing. So, let us talk of some underlying principles which can help. In previous articles, you learned about the Page Object Model. This pattern allows you to build your tests on a representative object rather than directly on the automation frameworks' interaction code. Knowing that a house is only as sure as its foundation, then we can extend that principle here too. Make sure that every selector, property, or navigation in your library is rock-solid. Avoid using fixed-time delays, which are weak to network latency or even just transient processor load. Instead, use wait logic that is based on discovering an element on the page which only appears after the operation is complete. Or vice versa. If for example, you have a waiting spinner, which disappears once a call completes. Now there are cases where a time-based wait is sensible, such as simulating human input to the machine. But, avoid it for sequential steps which depend on application activity.

Once you are confident in the library your tests are written on, make sure that each of your test cases' data is independent. There will certainly be cases when test B must follow test A because of natural and logical sequencing. You cannot update an employee record, without being able to create one first. Barring those relationships, make sure that the test cases do not attempt to use the same root data. So, two test cases that operate on invoices should not both rely on the same billable task already in the database. Instead, enable your tests to both create their own data, and to clean up after they are done. The clean-up is less necessary but useful for managing your test environment’s memory. However, the ability to create their own data is non-negotiable.

{Pic – cartoony Stomp/Squash that bug!}

If after applying these principles and debugging the flaky test, your team still cannot lock it down, then remove it from the Automation. That means there is some deeper issue in your system which still bears investigation. But, leaving that test in the Automation report damages the value that your Automation Suite can provide. Recall that Automation does not replace your manual QA testers. They will still be doing manual testing, whether for exploration or for validation of cases that aren’t yet automated. Your automation suite was never an all-or-nothing affair, so you can still rely on a human to do that which is difficult for the robots.

Of course, for the purpose of this article, we discussed the process of scaling up for a fresh team and automation suite. What about remediating an old and crusty automation suite? Is it possible to get from a ‘care-taker bot’ that needs to be taken care of itself, to the state where it is a value-added team member again? The short answer is yes, but it bears more discussion... next time.