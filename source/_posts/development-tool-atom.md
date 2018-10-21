---
title: 'Development Tool: Atom'
tags:
  - atom
  - atom.io
  - c++
  - development
  - git
  - git support
  - github
  - IDE
  - python
  - software
  - software dev
  - tool
  - tools
url: 390.html
id: 390
categories:
  - Software Development
date: 2016-05-19 15:00:24
---

A few years ago, just before I left college, a friend introduced me to a funny little program called [Atom](https://atom.io/). It was billed as a 'Hackable' text editor. At the time I thought it was an interesting little toy, and tinkered with it for a while. But since I didn't find any real use for it at the time, I was satisfied with just tinkering. Over time, as classes became more demanding I kind of left it behind. That is until I found a convincing use-case for just such a program! Recently, I have picked up Atom again for a personal project with some church buddies of mine. We are working with an Arduino and several external components. Since there are three developers and two or three operating systems between us, I wanted to get a product that we could all use with ease on any system. I settled on Atom after becoming frustrated with the existing [Arduino IDE](https://www.arduino.cc/en/Main/Software). Since our project had three developers, we split the responsibilities into three primary areas, and had organized our project files accordingly. However, the Arduino IDE does not support a nested architecture, and instead needs all the files to be present at the highest level. Not wanting to lose the project organization, I started dabbling with Atom and found its support to be far superior to the Arduino IDE for this project. Of course, nothing is perfect, and Atom does not ship with built in support for the Arduino. Thankfully there are a couple of packages which provide the necessary components for it. They are [Platformio](https://atom.io/packages/platomformio), and the [language-arduino](https://atom.io/packages/language-arduino) packages. Now, Platformio did require that we adjust our project architecture so that the compiler could locate all our file, this is a very small change, and allowed us to continue more-or-less un-phased. Furthermore, the Platformio package also supports other boards than the Uno which our project was using. So, after playing with Atom for a week or so, purely for my Arduino project, I became more familiar with the various features, and I was able to get more comfortable with the shortcuts among other things. After a while, I switched back to one of my python projects, and had a little shell shock. At present, I am using [PyCharm](https://www.jetbrains.com/pycharm/), which has severed me well, and has the added benefit that one of its default settings allows the Microsoft Visual Studio shortcuts to be used. It is quite polished, and provides solid support for most anything a developer could want to do in Python. But it's not very easy to customize, at least not compared to Atom. O n the flip side, Atom doesn't ship with support for running python scripts from the IDE. But it does include some language highlights. Here again, the Package system comes to save the day. With the [Script](https://atom.io/packages/script) Package, Atom gains the ability to execute both Python and other interpretive languages, like [Julia](http://julialang.org/) , and can display the feedback via an in-IDE terminal window! Furthermore, with Atom, the error highlighting is fairly descriptive, and will show the developer the breaks for the current document! So by switching between various files in your project you can see the pertinent errors in each file, without having to browse through an exhaustive list contained every file all together! Which, coming from a C++ project, is pretty great! For a little icing on the cake, Atom also has a fair bit of Git integration. (I should hope so, considering it is Git's IDE). The projects nicely highlight new, and changed files from the current Git changeset, and the default settings are programmed to reduce the clutter in the project view, by leaving out the various .git files, like the .git-ignore. This is a pleasant feature, which I have enjoyed for my Arduino project. Overall, Atom is a very impressive program. It can be as simple or as advanced as you need it, and can change with ease to suit your needs, through their robust Package manager! With their wide community support base, I look forward to enjoying Atom for many years to come. For anyone interested in learning more, please check out Atom [here](https://atom.io/)! 