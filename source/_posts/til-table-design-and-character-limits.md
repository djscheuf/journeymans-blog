---
title: TIL...Table Design and Character Limits
categories:
  - Software Development
  - Lessons Learned
tags:
  - sql
  - limits
  - tables
  - design
date: 2019-04-08 09:00:00
photos: 
  - img/post_img/clipart_confusion.png
---

I ran into a strange error while trying to complete an API call to a side-service. This side-service stores associations between items in our monolith, but does not use the same ORM. As we dug into the call, we found all the data matched our expectations, and that our call would complete if we excluded one particular element.

As it turns out the excluded element wasn't all that special. This item was of a different make, otherwise looked identical to the others in our POST. After doing some digging, I was able to isolate the problem to the update statements the API call was making to the side-service database. But I didn't know what SQL it was executing exactly. So I started up the SQL Debugger, and ran a trace. In particular I turned on RPC related statements. And as I ran the API call again I found a call whcih started but never completed.

Since the RPC trace provides the whole SQL statement being executed, I was able to parse out where my data was being inserted. Then I noticed a peculiar pattern. The SQL used nvarchar(4000) on _every single string variable_. That couldn't be right. I knewe for fact that some of the columns in the table were limited to something like 100 characters!

It was then that I discovered that column corresponding to the 'make' of the item in the side-service database had a limit of 25 Characters. The same column in our monolith allows up to 100!. In hindsight I should have checked the side-service Columns first. But truly! When you design a side-service, match the column limits to the existing structure and data!