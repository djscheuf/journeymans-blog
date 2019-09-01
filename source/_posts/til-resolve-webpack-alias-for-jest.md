---
title: TIL... How to resolve a Webpack Alias for Jest
categories:
  - Software Development
  - Lessons Learned
tags:
 - jest
 - aliases
 - webpack
date: 2019-09-10 09:00:00
photos: 
 - img/post_img/clipart_confusion.png
---
Recent work had me creating a webpack alias which would vary by build. I'll post on that exercise later. But while using this alias I found I had broken some tests. Specifically, Jest, the test runner, could not resolve the imports which relied on the alias.

After a brief search, I found a recommendation. You should provide the alias resolution path in the **'moduleNameMapper'** property. Since my Jest configuration was part of my package.json, I simply added a line like:
```json
  moduleNameMapper: {
    "AliasName(.*)$":"path/to/resolution$1",
    ...
  },
```

It took some experimentation with the regex to get this path to resolve properly. Of particular note is the _'(.*)$'_ and _'$1'_ pair. They allow the alias to resolve paths like 'AliasName/someApi'. They result in appending '/someApi' to 'path/to/resolution'.

Further, I used '<rootDir>' as part of the path resolution, since this was how Jest recognized and exposed the present working directory.