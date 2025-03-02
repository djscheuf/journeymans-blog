---
title: Migrating to Hexo - Hosting
tags:
  - side-projects
  - blog
  - hexo
category:
  - side-projects
photos:
  - /img/post_img/hexo.png
categories:
  - Personal Development
  - Tools
date: 2018-12-03 09:30:00
---

Last post, I explained [how I found and tweaked my first theme](/2018/11/04/hexo-first-theme/). This week I'll review how I finally hosted my Hexo blog.

When I first started blogging, I relied on Wordpress to host my fledgling blog. This constrained me to using a Wordpress subdomain. There is nothing wrong with this, and it worked well for many years. But as I grew in skill, I recognized that having my own domain would prove useful. 

B efore I converted to Hexo, I procured a domain from [1&1](https://www.ionos.com/), scheufler.io. I was able to buy the rights to the domain for a year for a reasonable price. And IO group felt appropriate for the somewhat technical nature of my posts. I was able to redirect to wordpress from my new domain. But  to keep the user on my domain, I'd have to find someone to run a server with my wordpress site on it. 

Around this time, I had begun to play with Ghost on Heroku, who offers low-level hosting for free. They even have the ability to add pipelines through Git. I had a separate testing and production site. These  allowed me to develop and draft without showing incomplete work to the public. 

But Heroku's free-tier service has a down-side. To offer this free service, they only spin up an instance for you when someone requests the page. As a result the average load time for the initial page for a Ghost blog that was asleep was enormous! A Hexo blog doesn't escape this issue either. But the initial page load is a touch faster given it is static content. 

This got me looking for static content hosts. [GithubPages](https://pages.github.com/) came up near the top. But so did a host which I'd  not heard of before: [Netlify](https://www.netlify.com/). Netlfiy and GithubPages offer nearly the same service. But Netlify caught my attention with the offer of going beyond static pages. And at the time, I had some interest in the extensiblility of my otherwise static site.

After I'd finally converted my blog, I set-up my Netlify account and gave it a test run. It was quite easy to setup! I was even able to preview the site before marking it ready for full-time. All I had to do was select the Repo from my Github account, give Netlify permission to access that content, and tell it to go.

That set me up under a Netlify subdomain. But Netlify had excellent instructions to modify the DNS registry. Now my domain would rout content from Netlify, while acting under the scheufler.io domain. After modifying the DNS entry on 1&1, and waiting for a while, I was able to navigate to my blog as hosted by Netlify. 

With my newly minted [daniel.scheufler.io](/) Hexo blog, I began to review my content. Netlify had flagged a couple of things for my attention. They highlighted the lack of an SSL, and that I was serving insecure content from the site. They had an easy single click process to setup the SSL, which I immediately employed. They use [Let's Encrypt](https://letsencrypt.org/), which made the process both nigh painless and free.

For the insecure content, they did not flag the specific links. But with their warning, I was able to do a quick search through my file to find the offending links. 

And with that, I had a static Hexo Blog, properly hosted under the scheufler.io domain, with a Let's Encrypt SSL. I've been very happy with this site. The increased control and ease of managing the site are also nice.  I hope this series has provided some food for thought. Or that is provides some tools you hadn't yet encountered.

As I round the last turn on this series, I plan to close with some minor clean-up activities I took. I'll cover adding Google Analytics, and how I'd added a small feature to the Theme. Until next time, Thanks for reading!