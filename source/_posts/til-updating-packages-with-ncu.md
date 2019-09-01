---
title: TIL... About updating your Packages with NCU
categories:
  - Software Development
  - Lessons Learned
tags:
 - npm
 - packages
 - efficiency
date: 2019-09-03 09:00:00
photos: 
 - img/post_img/clipart_confusion.png
---

My team recently added our Jest tests to the CI build process. This meant we had to update our Babel packages to support the necessary test runs.

But in doing so left many packages out of date, particularly our ESLint files. This version change broke linting on my local box, and blocked my work.

While pairing with a friend to resolve the linting errors, he showed me what he rightly called a 'bit of magic'. He installed a package called ['npm-check-updates'](https://www.npmjs.com/package/npm-check-updates) at a global level.  He then ran the following command: 
```cmd
ncu
```

The result was a balm to my current suffering. NCU identified each package that I had which was out of date. It even flagged those which had newer major versions! 

To identify the linting packages, we used the filtering input:
```cmd
ncu -f /eslint/
```

This command reported those packages which maked the regex. From there it was simple to update the affected packages:
```cmd
ncu -f /eslint/ -u
```

With my package.json updated, all I had to do was install the new versions:
```
npm i
```

In something like 2 minutes, [NCU](https://www.npmjs.com/package/npm-check-updates) had turned a frustrating task into a few simple commands. Now as with all package management, Caveat Emptor. NCU is kind enough to only change the package.json. But beware, all your versions become `package: ^1.33.7`. But with the filter command you can upgrade only the intended packages. I hope that it will bring you as much joy as it did to me! 