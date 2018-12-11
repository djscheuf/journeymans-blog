---
title: TIL... ASP.Net Form Validation Easy-Mode
tags:
  - ASP.NET
  - form validation
  - learn
  - learning
  - til
url: 1498.html
id: 1498
categories:
  - Software Development
  - Lessons Learned
date: 2018-03-20 15:00:13
---

Today I learned there is an easy-mode for form validation in ASP.NET! I was creating a series of CRUD pages for our in-house admin system, for entering a new data-type. This of course meant adding a new view for creating said data. I mentioned in passing to a team-mate that there had to be a better way that manually validating every property and providing a response model with an error property for each entry, or worse a generic error list displayed randomly at the top of the page like other parts of the admin tool. To my delight, there was a better way. 'Easy-mode' it actually a decorator called [DataAnnotations](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=netframework-4.7.1). Further you can check on the complete Validation-State of the model by called ModelSate.IsValid ( which is MVC magic), and further you can show the set of errors by rendering the summary on the view with Html.ValidationSummary ( which is also MVC magic).