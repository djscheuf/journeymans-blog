---
title: TIL... How to use ToDictionary
tags:
  - c++
  - linq
  - list
  - todictionary
categories:
  - TodayILearned
date: 2018-06-05 15:30:04
photos:
  - img/post_img/c_sharp.png
---

So I was creating a bulk action in a controller. I needed to map a list of Ids to a dictionary of said Ids and their respective results. My initial thought was to use ForEach, but there was a great deal of unnecessary boiler-plate code involved. There had to be a better way. And of course there was. Naturally the ToDictionary function was invented by brilliant minds in anticipation of such a need. Here's a rough example:

```csharp
listOfId.ToDictionary(key=> key, value => MethodtoGetValue(value,otherParams));
```

Note that the key, and the value both come from the entry in the List, and are used to create the resulting key-value pair. Meaning that you could create a Key and a Value from functions that use the list entry as an input.