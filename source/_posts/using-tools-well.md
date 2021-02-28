---
title: Using your tools well
categories:
  - Software Development
  - Best Practices
tags:
  - linq
  - entity-framework
  - sql
  - dotnet core
  - performance
  - database
  - query
date: 2021-03-03 09:00:00
photos:
  - img/post_img/clock.jpg
---

As my current project progresses towards release, some short-comings have come up. The starting place of most workflows in the application is a grid view of the entities. These pages allow the users to filter the data by certain facets. On the back-end we compose those facets into a dynamic query. Now programmatically composing a dynamic query is actually pretty easy in dotnet core with Linq and EntityFramework. But there in lies the danger as well.

The dynamic queries we were building were incredibly slow! The first couple times against the full production data, our endpoint would time-out. As we delved deeper, a few common improvements emerged which I thought worth sharing. To begin, most of our queries were being constructed off a shared root query. This root query had already included most of the children of our root entity. These were necessary for the final data transformation for the DTO of the search page. And EF makes this operation almost seamless. So it can be easy to forget that you are automatically pulling data from an additional table. Suppose we're talking about a Task. Let's say the Task gets assigned to a 'Doer' which resides on a different table. You might pull back information on the Doer by

```c#
dbContext.Task.Include(t => t.Doer)
```

I found out later that EntityFramework is actually very intelligent when it construct a queries. You can filter on the properties of child entities without needing to include them in the root query. Let's pretend I wanted to filter on Doer.Type when searching for Tasks. I could do the following, without having to include Doer in the result set.

```c#
dbContext.Task.where(t => t.Doer.Type == someType)
```

Once we learned this, our first major optimization rapidly fell into place. We separated the filtered query from the result-source query. Where before we had used a single query to both for filtering and to source our DTOs, we now split them. Loosely speaking, EF queries are proportionally expensive to the data pulled back. We optimized the filtering query to focus on filtering our data. Then we provided just the Ids for the root entities we'd need for the DTO-source query.

```c#
IEnumerable<int> GetIdsFromFilterQuery(...){
var query = dbContext.Task;

    // some conditional
      query = query.where(t => t.Doer.Type == someType);

    return query.Select(x => x.Id).ToList();

}
```

Then we updated the dto-source query, which held the includes, to take a simple where clause:

```c#
IEnumerable<Task> GetTasksByFilter(...){
  var idList = GetIdsFromFilterQuery(...);

  return richTaskQueryWithIncludes
    .where(t => idList.Contains(t.Id))
    .ToList();

}
```

This certainly helped improve our performance. But we had not yet completely applied a basic principle for EF queries :_"Only bring back what you need"_. Since our filtering was stripped down to just the Ids, we made a good start. For the majority of our end-points, these simple changes were enough.

For the remaining end-points, we found we could extend that principle "only what you need" a little further. Most of the dynamic query endpoints had fallen into the habit of returning an IEnumerable of whatever entity's default DTO. These DTOs looked like a straight 1:1 translation from the database table. But upon review, most of the pages on the Front-End, only used a handful of the properties from the DTO. By using the generic DTO, we were constantly pulling back 30+% more than we needed to.

OUr app had anothe tendency which componded this waste. Our app would immediately open a new tab for a detailed view. That detailed view then requests the same dto for the given row in the table. All in all, we were wasting a lot of memory. Our final optimization was to create specific 'DTO-Lite'(s) for the those endpoints with the worst extra memory pull.

To be clear, simply moving to a DTO-Lite, didn't improve the query performance. At least not on it's own. After refactoring to the DTO-Lite Model, we were able to take the step that allowed us to save on memory. We projected the EF query into the DTO-Lite, rather than requesting the Entity itself. It would look a little like this:

```c#
IEnumerable<TaskDtoLite> GetTasksByFilter(...){
  var idList = GetIdsFromFilterQuery(...);

  return richTaskQueryWithIncludes
    .where(t => idList.Contains(t.Id))
    .Select(t => new TaskDtoLite(){
      Id = t.Id,
      State = t.State.DisplayName,
      Description = t.Description,
      ...
    })
    .ToList();
}
```

One unfortunate result of this projection is the sudden inclusion of the boilerplate code. It's rather ugly to look at, but it does cause EF to generate and run more efficient SQL. In the future, this path could be further improved by using an extension projector function. I know that AutoMapper has the capacity to apply it's Maps to such a problem. But for now, and given our current constraints, I am thankful for the improvements we have already found.

Having listed these all out, I realize that none is particularly earth-shattering. Moreover, most of these improvements came about because we had been somewhat lazy and loosewith our use of EF and Linq. That sudden and debilitating blow to performance from real production data with just shy of 1 million rows forced us to change.

If you ever find yourself struggling against the speed of a given Entity Framework query, remember: Only bring back what you need! Sometimes that will mean 2 queries are faster than 1, and thus splitting your filtering from your data-loading may improve your speed. And to top that, consider that you may improve your memory usage, and your performance by reducing the data you actually send to the front. This will of course depend on your own Front-End Architecture. I encourage you to explore it as an option. Godspeed, and good hunting!
