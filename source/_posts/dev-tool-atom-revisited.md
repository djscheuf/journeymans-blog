---
title: 'Dev Tool: Atom - Revisited'
tags:
  - development
  - development environment
  - IDE
  - performance
  - repl
  - software
  - software dev
  - tuning
url: 1106.html
id: 1106
categories:
  - Software Development
  - tools
date: 2016-10-25 17:00:29
---

[Atom](http://atom.io/) is Github's _hackable_ text editor. I was introduced to it by a friend in college. Since then I have used it for various tinkering projects in Python, and an Arduino project with a couple of friends. Atom is awesome! Atom doesn't ship with support for everything, which is alright. But what makes Atom great, is that it is extensible! It has a rich marketplace of published extensions offering support from Python to C, and Json to Yaml. I discussed some of the packages that I used to support both python and Arduino in [my previous post](http://danieljscheufler.wordpress.com/2016/05/19/development-tool-atom/). Lately, I have been using Atom as my go-to [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) environment. Now, there are other tools like [repl.it](http://repl.it/), which are great for rapid feedback tinkering. However, I always feel ... iffy about online solutions. They can be great, but if the power is out, or the internet is down, or worse slow... well there go the advantages. But last week, I started to notice that my instance of Atom was starting a bit slow. Mind you it was just a few seconds, but it was noticeable. So I started hunting. After a while I found that Atom ships with a plug in called Timecop. Timecop tracks performance times of the modules that you have installed and active. It tracks the load time, the init time as well as other associated metrics. As I started snooping I found that several of my modules were really slowing me down. For example, a bit more than a half second was lost to [Omnisharp](http://github.com/OmniSharp/omnisharp-atom/wiki), which I had loaded to support C# tinkering. Additionally the [C Language Linter Library](http://github.com/AtomLinter/linter-clang) also ate considerable time. C and C# are not the fastest REPL languages for me. As a result, I decided to pare down the modules that I had supporting them. Now don't get me wrong, I love C# for business development! I just feel that it can be cumbersome for REPL workflows. So, I uninstalled some of my modules, like Omnisharp. But for C, I just deactivated them. This is because C is often used for Robotics and Arduino Associated applications.  Since the modules were still installed, I could turn them back on. Thus the features can be used without incurring the start-up cost every time I launched Atom. All in all, this was an interesting exercise, and I thought that others might benefit from hearing about it. I am rather pleased with the results. And after gaining this experience, I am think that my next challenge will be to write a plug-in or module myself! I recently found [this tutorial](http://github.com/blog/2231-building-your-first-atom-plugin) that I think will help. As always thanks for your time! If you found this post interesting, I would encourage you to check out my personal blog. I have several posts on [Development Tools](http://danieljscheufler.wordpress.com/tag/tools/) that I think you might like! _This was originally posted on [LinkedIn](https://www.linkedin.com/pulse/dev-tool-atom-daniel-scheufler?trk=pulse_spock-articles) with the Title Dev Tool: Atom. Since that was the original post's title, I have changed it. Further, this post originally refered to the plugin as Timeit. I discovered later that was incorrect. I have applied this correction here._