---
title: TIL... a Javascript Unique Filter
categories:
  - Software Development
  - Tools
tags:
  - javascript
  - filter
  - uniqueness
  - unique
date: 2019-02-28 09:00:00
photos:
---

Today I was filtering a list of 'tags'. Naturally I wanted to know each tag, but didn't want the list to contain duplicates. So I did a quick search to find any uniqueness filters built-in to Javascript.

I found now but did find [a thread on StackOverflow](https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954) with a workable solution. It works by filtering for those cells who are the first occurence of their value in the array. THis works great for 'exact' matches, so be wary for strings where the content 'uniqueness' might ignore casing.

```javascript
const onlyUnique = (value, index, self) => self.indexOf(value) === index;
```

Usage:
```javascript
const array = [1,2,1,3,4,3,5];
const filteredArray = array.filter(onlyUnique);

// expected result = [1,2,3,4,5]
```
