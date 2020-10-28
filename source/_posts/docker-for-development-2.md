---
title: Docker for Dev -The Io Trials
categories:
  - Software Development
  - Side Projects
tags:
  - docker
  - io
  - hobby
  - self-development
date: 2020-10-28 09:00:00
photos:
  - https://1000logos.net/wp-content/uploads/2017/07/Logo-Docker.jpg
---

I've been going through a fun little book called ['7 Languages in 7 Weeks'](https://www.amazon.com/Seven-Languages-Weeks-Programming-Programmers/dp/193435659X) latetly. Truth told I am making nowhere near that kind of progress, but I am enjoying my time in the book. Anyway, I've moved from Ruby on to the next language of study: [Io](https://iolanguage.org/). Now Io is unique in that _everything_ in Io is a message. At least so I've been told. And everything I've done in the language so far supports that assertion.

But Io is somewhat particular. The install instructions rely on Make. Which in itself isn't too bad. But I didn't want to install a C++ compiler, Make, and whatever other dependencies on my laptop, just to support running Io. I wanted to run Io, not play around in the dependency playground. And since I had such good luck with Docker and Ruby I thought I'd try it again.

Sadly there were no ready-made Io images. So I made one. ... Well that makes it sounds much simpler than the process was. It was however a good learning experience. I started by trying to pull the Io source code into an Alpine image. Alpine is a super-stripped down version of Linux, so I had to install git to begin with. Thankfully the apk command was able to find the git packages in short order. Shortly thereafter I realized that I would need yet more for example: Bash.

If you're not aware, each command in the Dockerfile creates an intermediate image. So this:

```dockerfile
RUN apk add git
RUN apk add bash
```

creates 2 images, one for each step. But since both of those dependencies are needed, and unlikely to change independently, you could save yourself some build time by running them in a single step:

```dockerfile
RUN apk add git && \
        apk add bash &&\
        {whatever other thing you want in this step}
```

Now back on track, I spent a few hours tinkering with the necessary installs, to ensure a C++ compiler and Make were situated nicely on the produced VM. But... something wasn't quite right with the image. Every time I tried to build Io, the compiler would complain about a missing 'sysctl.h'. So eventually I threw my hands up and went to the larger Ubuntu base image and started over.

Now, Ubuntu had it's own challenges, but I was successfully able to get _most_ of the dependencies installed properly and if I jumped into the image with an interactive terminal, I could manage the build. I was struggling to get the TimeZone information set in the system of all things! This was one of the dependencies of one of the dependencies of the C++ compiler, I think. But eventually I was able to track down a way to initialize the system TimeZone info with some defaults. The trick turned out to be setting an Environment variable before running the 'apk' instructions:

```dockerfile
RUN 'DEBIAN_FRONTEND=noninteractive' &&\
    apk ...
```

So after several evenings spent in the belly of the beast, I finally had it! A working Io image. Just pull it down, run it and enter Io! I ran through the initial exercises from 7Languages, and was able to gain some appreciation for Io. While I still have more to learn in the language, I enjoyed my time.

Furthermore, I took the time to offer the image back to the community, and to push a copy to Docker Hub. So hopefully you can start playing with this language too 🙂 The image is a bit big, and I might take some time to reduce the size in the future. But it certainly should make it easier to get started working in this clever little Language!

P.S. If you'd like to see the dockerfile I finally ended-up with, you can see it [here](https://github.com/IoLanguage/io/blob/master/tools/docker/Dockerfile)... though I admit I might do it differently were I to do it again. Oh! And if you'd like to try out IO, you can get the [Docker Image here](https://hub.docker.com/repository/docker/djscheuf/io)!
