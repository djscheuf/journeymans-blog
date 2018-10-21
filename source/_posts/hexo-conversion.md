---
title: Migrating to Hexo - Conversion
date: 2018-10-21 15:35:00
tags:
  - side-projects
  - blog
  - hexo
category:
  - side-projects
---

Last week, I explained [how I found Hexo](https://daniel.scheufler.io/2018/10/14/hexo-discovery/). This week I'll explain how easy it was to convert my original Wordpress blog over to Hexo.

Now that I had settled on a site engine, I had to get my content into it. After all, leaving any content on the original site would force me to support both going forward. Being a developer, supporting two platforms didn't sound like fun. So I opted for the 'lazier' route, so migrating all my content. 

A quick search for 'Wordpress to Hexo' will yield a plug-in, [hexo-migrator-wordpress](https://hexo.io/docs/migration.html). May God bless whoever wrote this wonderful little tool! Not only is it well supported with documentation. It even provides instructions for how to get your data out of Wordpress!

Now here, I do wish to thank Wordpress for continuing to provide this option. It was as easy as downloading an xml document with all my posts and most of my tags. So, thank you Wordpress Devs. Your kindness was noticed and appreciated!

Once I had my file, I ran a simple command:
```cmd
hexo migrate wordpress <source>
```

This command took a few second to run, and produced several outputs. First, it converted my posts into individual markdown files. Additionally, the pages I had created under the Wordpress site turned into folders, and supporting index.md files. While the conversion was not perfect, the process was mostly painless. 

Certain things did not come over with the automatic conversion, like header images. Further all inter-post links continue to point to Wordpress. As of this posting, I still need to hunt down those links and correct them.

But the images were easy to fix. I was able to download them from Wordpress and host them within the site. After that it was a simple matter of adding a link to the image in the front-matter of the posts.

Admittedly, I have only added the header images to some of the posts. The process is somewhat tedious, even on themes which support such it. Which segues nicely into next week's topic: Themes. I plan to discuss the first theme I used, and the various 'tweaks' I made while learning the ins-and-outs of the system.