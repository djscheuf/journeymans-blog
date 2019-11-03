---
title: TIL... About SQL Row Number
categories:
  - Software Development
  - Lessons Learned
tags:
  - sql
  - sql-functions
  - view
  - query
photos:
  - img/post_img/clipart_confusion.png
date: 2019-11-04 09:00:00
---
Recently, I found myself needing to add a new column to a view. I needed the new column to link to the latest entry in another table for every entry in the first. Thankfully the table I needed the latest from included a DateModified column. So far so good. But I needed some function that would allow me to pick the latest from the series.

This is when a mentor suggested I use the [ROM_NUMBER function in sql](https://docs.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql?view=sql-server-ver15). This handy function will produce the ordinal 'row number' for a sequence of rows partitioned by a given values and then ordered by a second.  It looks a little like this:


```sql
SELECT
  firstThing.Id,
  firstThing.linkedId,
  ROW_NUMBER() OVER (
    PARTITION BY firstThing.Id 
    ORDER BY linked.DateModified DESC
  ) as [ROW]
FROM
  schema.firstThingTable firstThing
INNER JOIN schema.linkedTable linked 
  on firstThing.linkedId = linked.Id
WHERE
  linked.type = 'theTypeIWant'
```

The output of this query is a table with 3 columns: id, linkedId, row. The results might look like:
|Id|LinkedId|Row|
|1|42|1|
|1|37|2|
|2|36|1|
|3|45|1|
...

This makes it very simple to pick the 'latest' because it is implicitly the first row, sop when I encorporated that query into the view it looked a little like this:
```sql
INNER JOIN (
     /*The Query Above*/
) thingsIWant on thingsIWant.Id = firstThing.Id 
  AND thingsIWant.[ROW] = 1
```

I'd never heard of [ROW_NUMBER](https://docs.microsoft.com/en-us/sql/t-sql/functions/row-number-transact-sql?view=sql-server-ver15) until this time, but I found it _very_ useful, and will be adding it to my toolkit going forward. I hope this explanation will help you do likewise!