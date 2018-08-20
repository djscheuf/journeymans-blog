---
title: TIL... How to Resolve false-positive ESLint Errors
tags:
  - cli
  - cmd
  - cmd-line
  - eslint
  - file-casing
  - no-unresolved
  - npm
  - webpack
categories:
  - TodayILearned
date: 2018-06-12 15:30:29
photos:
  - img/post_img/clipart_confusion.png
---

So a colleague of mine was struggling with our local build process. Every time he ran the npm command, which ran a webpack build, He'd get numerous errors for _'import/no-unresolved'._ The associated message would complain that the file casing did not match the underlying file system. As it turns out, the warning was technically correct. When we checked his command line, we found that the interface reported the folder name with a lowercase. To be clear the folder, as it existed in the file system, was capitalized. So we spun up a new CLI, and tried it with a capitalized version of the folder. Lo and behold, it worked perfectly. Be sure to check your CLI, when a command returns with very odd errors.