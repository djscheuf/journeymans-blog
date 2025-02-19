---
title: Migrating to Hexo - Discovery
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
date: 2018-10-13 20:25:00
---

As promised, I have finally started my series on my Migration to Hexo. Over the next few weeks, I will expound on my journey from Wordpress,  through several alternative blogging platforms. And, of course, landing on Hexo. Today, Discovery: _'How I finally found Hexo'._

I started my blogging career on Wordpress. I realized some of the content I had written to share on my then-employer's internal social network would be of interest. Wordpress was free, and allowed me to set-up a basic blog with little hassle. Aside from self-censuring my own posts to avoid divulging anything I thought my then-employer would prefer remain closed, I had an easy time of it. 

I began by sharing tidbits about my work, my experiences, and on occasion sharing articles I found. As time went one, I began to rely on my blog as something of a _living resume_. 

With that re-interpretation I felt the need for a more professional appearance. I searched for a long while for an appropriate theme. I struggled to find something I was comfortable with. I wrote software, but I wasn't yet comfortable enough to support my own style-sheet.

I will admit I struggled here. I couldn't find the features I wanted in the themes I was able to use. Moreover, around this same time Wordpress started to change. These changes were not wholly bad. There were some notable improvements in the Web interface. But something about the company's approach changed and began to make me uneasy.

So I looked for other blogging platforms. This lasted several _years_, and would spike with activity as I discovered alternatives. First, I discovered [Hugo](https://gohugo.io/), which is also a static-site generator. But at the time my web experience was very limited. I was unable to get even the basics working, despite their tutorials. So much for phase one.

Phase Two was a bit more productive. I discovered [ghost](https://ghost.org/). I first found it as an add-in for [Sandstorm](https://oasis.sandstorm.io/). At the time I was looking into self-hosting everything I could. I was  _a little paranoid_.  While I am still intrigued by the idea of self-hosting, I never tried that version of Ghost as it was out-of-date. 

It wasn't until 2017 that a colleague introduced me to [Heroku](https://www.heroku.com/). Heroku is a very developer-friendly Cloud App Hosting service, with an excellent free-teir! And guess what It comes with a Ghost-button, which all but removed the cost of set-up, and it ran a current version! After playing around with some other projects, written wholly on NodeJs, I gave Ghost a try.

 I have to admit their [desktop editor](https://blog.ghost.org/desktop/) is very slick! I was even able to hook it up to my Heroku instance. But I wasn't able to completely host on Heroku. 

Heroku's free tier is excellent and offers a great deal of flexibility for a fledgling Web-App. It even supports a PostgreSQL database for persistence. Ghost did not use Postgre and needed a paid persistence layer. Without it, such things as custom themes, and many other features would  not work. Moreover, as I researched, I found it would be nigh impossible to import my Wordpress posts into Ghost. In order for Ghost to get the data, I would need to stand-up an independent instance of my Blog running in an environment that both it and Ghost shared. So much for phase 2.

A few months after Ghost fell out of the running I happened upon [Hexo](https://hexo.io/). My current client relies on React, and I've become much more familiar with both NodeJS and web development in general. And so it was that I was searching for a static site generator that supported Markdown, and would run on NodeJs. If I was going to do my own support, I needed to be comfortable with the system enough to control it and to debug it! Hexo came up in one such search. So began Phase 3.

After trying it out at home, and seeing how easy it was to stand-up the site, and add posts I was hooked! But several hurdles remained. First I needed to pull in my old posts. And I'll explain how I executed that feat next week.

