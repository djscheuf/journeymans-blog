---
title: Announcement - Comments Now Avilable!
categories:
 - Personal Development
 - Tools
tags:
 - blog
 - dev-community
 - communication
date: 2022-01-05 09:00:00
photos: 
 - img/post_img/many_doors.jpg
---

Late last year It came to my attention that there was some discussion around comments on my blog. More accurately, on the lack of said comments. When I moved my blog from [Wordpress][wordpress-site], over to a staticly generated [Hexo][first-hexo] blog, hosted by [Netlify][netlify], I did not implement a commenting system. The Wordpress site had only had a handful of comments. So I figured I'd delay adding the feature. [YAGNI][yagni], right? And I had some vague, mistaken, notions that if anybody _really_ wanted to comment on my blog or had some question, they'd use the [email link][email-me]. I know. I know. A somewhat silly, misguided expectation. But hey, I'm learning.

So I spent some of my year-end break this year combing thru what systems I could use to support comments on my blog. And I thought you might find it interesting to hear what I found and what I ended up deciding to try.

Overall, I want to commenting experience on my blog to be reasonably smooth. Y'all shouldn't _need_ to create a custom login for _yet another_ commenting system. Plus, I don't really like the idea of the commenting system tracking anyone who chooses to comment. So any system that tracks, or trying to sell you ads, felt wrong. I mean I know someone has to pay for it, but I don't think it is in line with the intent of my blog to make the readers do the paying. My goal was to provide value in writing this blog. Not to 'make money'. So I'm choosing to foot the bill. Now given that this blog is a side venture at the moment, that means a shoe-string budget. So I'm looking at free, or nearly free systems.

With those guidelines set, I started looking at [Github][github]. I already host the blog's repo on github. And I trigger the Netlify deploys through their [Pull Request integration][netlify-pr]. So hosting more of the site content on Github seems a sensible approach. The usual way of hosting blog comments on Github is to rig up some code to link Comments into Issues on the Repo. This has several benefits. The comments are durable, since they are in effect hosted on Github as Issues. Having them displayed involves working with the Github APIs, so that's also nice. Github has a pretty good developer experience. 

One down-side, at least for me, is that these solutions do involve exposing some access to the Repo. Which I admit makes me nervous. Naturally I might be able to limit it through other means, but I am NOT a security expert. And I do NOT want to spend a ton of time monitoring, securing, and hardening my side project. 

Over the years, I have seen the suggestion to host comments on Github many a time. And over all it sounds like a reasonable solution. But I have my own misgivings about my own ability to maintain the solution securely. So at present it is more effort than I am willing to invest at the moment.

One of the first 'free' commenting systems you can find if you look will be [Disqus][disqus]. And initially it did look favorable. For example, the makers of Disqus, use it on their own site for their own comments. That is they ['dogfood'][dog-food] it, which gets good marks in my book. Moreover, they're a long standing company, with a decent reputation. Oddly one of their chief selling points to authors/hosts is the potential for add revenue... 

And as you can probably guess, when you read their 'free' version's fine-print, it's paid for by ads. Which  runs against the guidelines I'm trying to work within. If I used Disqus, it would be the first point where Ads started showing up on my site. And they'd be going towards paying for the comments system. Seems a mite silly to me. But the challenge that knocked Disqus out of the running for me, was the lack of accessible documentation. When I looked, I couldn't find any open information about configuring, installing or running Disqus on my blog. All I could fine was a 'log-in' screen or the sales block. It was useful to know the various prices. But I didn't feel comfortable with their solution. I couldn't check for compatibility or effort against my system. 

Which is something that the solution I did end up choosing did well. I don't recall exactly how I found [Hyvor Talk][hyvor-talk], but I do know that what sold me on their system was their documentation. Now Github's APIs have some [very useful and detailed docs][github-docs]. It wasn't the easiest to find the answer for 'How to host comments on a staticly-generated blog'. But then they are catering to a _very_ different use-case. Nevertheless, they were the player to beat in the documentation department. And Hyvor Talk certainly did a grand job. From their [docs][hyvor-docs], I was able to find the answer to just about every implementation and configuration question I had. They even outlined how I could customize the appearance of their plug-in! And admittedly, having a section dedicated to ['How to use Hyvor Talk with a Hexo Blog'][hyvor-hexo] was pretty helpful too.

Besides solid, and useful documentation, they have a [public roadmap][hyvor-roadmap], they ['dogfood'][dog-food] their own product, and they are [GDPR compliant][hyvor-gdpr]. All that said, they are not free. They have a reasonable, and small monthly price for a site like mine, and they offer a 14 day trial. 

So after my research, I have chosen to try out [Hyvor Talk][hyvor-talk]. I believe the system is a good balance for the principles and value I hope to deliver through this blog. I have high confidence in my ability to implement and maintain the system in the near term. 

Starting with this post, I will be releasing the comments feature on [Daniel.Scheufler.io][blog]. You should be able to guest post comments. I will start us out by using post-comment moderation. It is my hope to foster community discussion and interaction this way.  You are certainly welcome to create an account to link all your insightful comments of course. But feel free just to leave a reaction if you don't feel up to commenting.

If you do wish to comment, I would lay out these requests:
1. Be Respectful - I run this blog in my spare time, and with three kids I don't have a ton. My intent for this blog has always been to help our community improve. Let's keep the discourse respectful, and kind. We're all here to learn.
2. Be On Topic - Please use comments to further the conversation, rather than detract from it. No one is required to comment. And I am happy to engage with you in deeper conversations. Though some topics may be best handled by an [email conversation][email-me].
3. Add Value - This blog exists to share knowledge. I provide each post in the hopes of sharing what I have learned, so that others can use it too. So when you comment, please add value. Even if it's just your perspective on the topic. Your perspective itself can often open new doors for others!

My goal is to keep my need to 'moderate' to a minimum. As I mentioned I run this blog in my spare time, so I'd like to spend most of that writing more posts, rather than moderating. That said, I am keen to learn how people are receiving the posts, and where/how it's helping. So let's run an experiment together and see how this goes. I hope you guys have a good time using Hyvor Talks on *[The Journeyman's Travels][blog]*

[wordpress-site]: https://danieljscheufler.wordpress.com
[first-hexo]: /2018/10/14/hexo-discovery/
[netlify]: https://www.netlify.com/
[email-me]: mailto:daniel@scheufler.io
[blog]: https://daniel.scheufler.io
[yagni]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
[github]: https://github.com/
[netlify-pr]: https://docs.netlify.com/site-deploys/create-deploys/
[dog-food]: https://en.wikipedia.org/wiki/Eating_your_own_dog_food
[disqus]: https://disqus.com/
[github-docs]: https://docs.github.com/en
[hyvor-talk]: https://talk.hyvor.com/
[hyvor-docs]: https://talk.hyvor.com/docs
[hyvor-hexo]: https://talk.hyvor.com/docs/install?section=hexo
[hyvor-roadmpa]: https://hyvor.notion.site/Public-Roadmap-Hyvor-Talk-57804cc582c74c15b6ea30324e35f2a8
[hyvor-gdpr]: https://talk.hyvor.com/docs/gdpr