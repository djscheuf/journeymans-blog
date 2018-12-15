---
title: TIL... How to debug NHibernate Queries
tags:
  - database
  - debug
  - learn
  - learning
  - nhibernate
  - query
  - sql
  - til
categories:
  - Software Development
  - Lessons Learned
photos:
  - img/post_img/database_search.jpg
date: 2018-03-13 15:00:21
---

Today I learned how to debug an NHibernate Query. I was writing a new entity, and map to be accessed thru NHibernate from a SQL datbase. The table had certain fixed-size columns, and I had specified this size in the mpa. However everytime I tried to save, I received a truncation error. However at the C# level, I couldn't tell what query was actually being run. I needed to go deeper. Thankfully someone on the team know how to do taht. they pointed me at Sql Profiler which I beleive is installed with either SQL Databse or with the Management Studio. either way, I ran the profiler, so that it would collect all StoredProc and TSQL events, as well as RPCs. This allows you to see the actual SQL query that NHibernate created for your entity. Turns out that NHibernate had mapped the fixed-size string to nvarcahr(4000) rather than nvarchar(10). Digging deeper, I realized that my migration was the culprit as it had created the columns incorrectly. I had used FluentMigrator initially. This time I went back and wrote the SQL statements by hand so that I could be certain of the data types. Once I created the proper types, and ran NHibernate again the problem was resolved.