---
title: Docker for Development
photos:
  - https://1000logos.net/wp-content/uploads/2017/07/Logo-Docker.jpg
categories:
  - Software Development
  - Side Projects
tags:
  - docker
  - ruby
  - hobby
  - self-development
date: 2020-09-14 09:00
---

I recently picked up the book ['7 Languages in 7 Weeks'](https://www.amazon.com/Seven-Languages-Weeks-Programming-Programmers/dp/193435659X/ref=sr_1_1?crid=3T3SFDS21NJN8&dchild=1&keywords=seven+languages+in+seven+weeks&qid=1599408972&sprefix=seven+languages+in+%2Caps%2C224&sr=8-1). It was recommended by a mentor, and I thought it would be a fun side project. The first language on the docket: Ruby. Beautiful sweet, painful-to-setup-on-windows Ruby. I've been intrigued by Ruby for the better part of 3 years, but I got bit on my first attempt... the installer... was not fun, and it didn't work even after attempting a repair. So at the time I moved to using [repl.it](https://repl.it/) to tinker in the language. But left it after figuring out the initial syntax.

So when the first language in the book was 'Ruby' I was both excited, and cautious. I wanted some way to 'develop' Ruby without having to fight with my machine to get the code to run. That's when an idea struck me. A friend of my mentioned playing with Docker, and getting around a similar issue. He was using it to generate a static site from source code on his local box. He never installed the generator, which worked better on a linux system anyway. Instead he would just feed his source to the Image, run it and collect the output. I wondered if I could do something similar with Ruby.

One quick check of [Docker Hub](https://hub.docker.com/) later, and viola! [One Ruby image](https://hub.docker.com/_/ruby) ready to go, and to play with. Now presuming you want to play along, and you have the docker deamon ready on your machine, the first thing I did was play with the interactive terminal:

```cmd
docker run -it ruby:latest
```

After satisfying my curiosity that I did indeed have a container that could run Ruby code, I needed to find someway to get my scripts in there. And in particular I wanted to be able to send a script in, and route the results back out. After asking around, I was pointed to a senior Improver who'd been using Docker heavily. He helped me figure out how to actually interact in the 'Docker' way, and to get files into my images from the host. We assembled (he lead, I typed), a simple dockerfile, which got the job done. Here's what it had:

```dockerfile
FROM ruby
MAINTAINER ...

WORKDIR /src
COPY ["my_script.rb","my_script.rb"]

ENTRYPOINT ["ruby","/src/my_script.rb"]
```

But before I could see the results of my_script, I had to build the image. I ran the following form the directory containing the dockerfile.

```cmd
docker build -t ruby_exp .
```

Then the magic happened. We ran the the container and it printed the stdout results of my_script to the console! 2 tasks down and 1 to go. Now rather than route the stdout to a txt file in the container, you route the console output thru the host. Like this:

```cmd
docker run ruby_exp > output.txt
```

Now I had a basic 'test' environment running on my local machine, without having to install Ruby on it in any form! Moreover, I could get my code into that 'test environment' and run the code, without much more than editing some text! It is hard to put into words how cool I found this! I normally and a strict to the time-limit kind of person on meetings. But as a result of 'geeking out' over this tool with the friendly senior Improver, I ran over by about 10minutes on a 30minute meeting.

Although to be fair, he was showing me a fascinating usecase I hadn't even considered: SQL Server. Turns out there is a SQL server base image available. If that's not cool enough, my guide showed me how he used a backpac file to 'restore' an Integration test database in a dockerfile. He even had a command alias to quickly start and teardown this test database machine!

To put this in another light; While I was looking for an easy way to start developing Ruby Scripts, I happened upon a means to standing up whole development environments in a repeatable, exchangeable, version-controllable way! Let's pretend we've got a common case, I am developing a Javascipt-based Web Front End. I need it to interact with some API instance. And that API will need a Database. If I need to onboard a new dev, I could install SQL server, manually restore a small back-up on their machine. Then I could pull the API code from version control, install the dependencies, and perhaps attach it to IIS at start-up. Then I'd still have to download the UI code, install the dependencies, and build it. Assuming I use the same ports for every local environment, and I've got them in configs in version control, we should hopefully be working.

But what if I relied on Docker? I'd need to create images the API, and test databases. Then I'd install the Docker Daemon on the new developer's laptop, download the images, and run them. I could even provide smart defaults for the various interactive ports, so the API and DB could just work as before. Then I could do something special. If I wanted to keep the Developer's box clean, I could create a UI-dev dockerfile, which would import their local code, package it, and then run a host development server for their UI, allowing them to interact with the set of containers via their browser. The only code that would end-up on their machine would be Docker, and the UI source in that case.

The portion which excites me most, is this ability to rapidly onboard a team member to a known, working start for a particular area of the stack. It is the flexibility to go from nothing to something, one whatever box you get which is o exciting. Do they want a Mac? Ok, Docker works there, and so does anything you can put into a container! Do they prefer windows? That's fine, you can still develop and run your organization in Ruby! Better yet, do you want them to use something like 'real' production, but don't want everyone running around with a different back-up of scrubbed Prod data? Use a shared image of a known, fixed instance.

Admittedly I am still in the honeymoon phase of learning about Docker. But I wanted to provide a tangible example of how impactful moving towards containers can be even for a one-man hobby-project team running Ruby on a Windows machine. For my part, I am happy I got a little distracted by trying to containerize some Ruby dev environment, It was a couple hours well spent!
