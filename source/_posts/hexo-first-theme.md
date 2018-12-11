---
title: Migrating to Hexo - First Theme
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
date: 2018-11-04 16:30:00
---

Last post, I explained [how I converted my wordpress blog to Hexo](/2018/10/21/hexo-conversion/). This week I'll expound on the fun I had with my first theme.

Natrually, I started with the same old 'Hello World' theme that every Hexo blog comes with. But as I learned more about how Hexo uses the ExpressJS files to generate the site, I grew more adventurous.

The first theme I settled on was [Beantech](http://beantech.org/). I must admit I still like the theme. The author included it in the Hexo Theme library, so it was easy to discover and begin using. All I had to do, was download it and add it to the themes folder in my Repo.

After that, I decided that I should remove some of the logos and styles from the theme, since I was running my own blog. By this time I had been working in Web UI development for some time. As a result, I easily discovered several of the tricks the BeanTech developer used to scult his theme. 

Some simple fixes included modifications of the styling files, which applied globally. For example, I removed the signature image, and adjusted the default text color in some places.
One feature I enjoyed from BeanTech is the return to top link. It will appear once you've scrolled through many posts on the home page. On BeanTech, you'll see a clickable flying Ironman. But the Theme author left in a default rocket ship for those who preferred. I was able to discover this as well as the necessary image size adjustments to make the rocket ship appear. In retrospect, I like this feature so much that I plan to add it to my blog in the future.

But during all this style work, I started digging into the ejs files in the layout folder. Here you can find the meat of how Hexo generates each html page for your site. Here you can learn how Hexo constructs your site through the mix of html and javascript code. 

I will recommend learning ExpressJs first before looking under the covers. I found the NodeJS example project for Heroku is a good start. Hardest part was to guess the names of the various objects used by ExpressJS to contain your posts, pages and tags. 
With a little guess work, I was able to understand most of the functionality. I was also able to remove some unnecessary code from my Repo, since I wasn't using the full feature set of Beantech. There were several Social Media plug-ins which I did not want or need, so I removed the code which supported them.

After all this reading, I gave my new theme a try. But to my dismay my tags failed to work. I immediately thought to revert my changes, but to no avail. I suspect my tagging structure did not follow the theme resulting in the link breaks. 

While I was able to understand what was going on, I was not willing to spend several hours debugging to determine what I had to change. Even less so, did I want to spend the hours re-doing my existing tags.

So I sought out another theme, one which would be simpler to manage, and would preserve my sanity. I settled on [Daily](https://hinpc.github.io/Daily/). Daily is a lovely minimalist theme, with a good feature set for email and Github integration.

At the time, I found the white background to be a bit harsh. So I swapped it for an Ivory color, aiming for more of a parchment aesthetic. I accompanied this with the new Site logo, using the same Ivory for the background.

I completed the tinkering with a new LinkedIn integration icon. I even added an svg to the images folder of the theme. That way the existing generation code could handle LinkedIn without extra guidance.

With those modifications made, and with thorough  testing completed, I checked my site. Sweet Success! The tags worked. The media integration worked. And I was able to scroll through my posts, without burning the eyes out of my skull!

With that chapter completed I turned to the next challenge: Hosting! I look forward to discussing my hosting journey, short though it was next time!
