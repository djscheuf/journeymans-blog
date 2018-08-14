---
title: TIL... How to reduce NPM package size
tags:
  - bundle
  - npm
  - webpack
url: 1518.html
id: 1518
categories:
  - TodayILearned
  - Work Projects
date: 2018-04-17 15:00:56
---

One of my colleagues was working on improving the load time for a heavy-lifting component in our React App. The component is packaged as an npm package so that it can be reused in other projects, but it is significant in size. My colleague showed me a nice visual tool for identifying packages in the dependencies which could be shrunk or removed. He added a plug-in to our webpack build which provided a useful visualization of the package structure and hierarchy. To do this you need to add the following to the webpack.config:

> const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
> 
> config.plugins.push(new BundleAnalyzerPlugin());

You'll also need to install the webpack-bundle-analyzer package.

Using this tool we were able to see that some of the large size was due to duplications of modules. That is the user project, and the project we were working on shared dependencies.

My colleague solved this in two ways, first he removed the Node Modules folder from web-pack, thus removing it from the final bundle. Second, he made sure that the project we were improving, and the user project shared the same version of as many dependencies as possible. By doing so my colleague was able to greatly improving the loading time for this npm package.