---
title: An Angular Preview Mode
categories:
 - Software Development
 - Lessons Learned
tags:
 - angular
 - front-end
 - design
 - data-access
 - preview 
photos:
 - img/post_img/angular_logo.png
date: 2020-01-06 09:00:00
---

I recently joined a client who uses Angular for their front end. Coming from React, it was an interesting transition. While I still prefer React, I am learning some useful patterns as I work. I am certain the one I am about relate has a proper name, but I have not been able to discover it.

I am working on a CRUD screen for a multipart data model. As a result we've split the interactions into separate components where reasonable. So far so normal. These sub-components live under a main coordinating component. This parent component is the one mounted the rest of the app. It is the entry point for the multi-part data model. That is, we get our source data through the parent, which we hand down to the children. Again so far so normal.

As part of current development, I was tasked with implementing a 'preview' mode. The intent was to allow the user to see the affects of their changes before committing them. Plus they wanted to be able to revert. Standard stuff, but there was a catch. The children components were handed either the entirety of the parent's source data. Or when mounted by the parent, their data came through a direct query against the parent's source data.

While puzzling over this, I thought the most reasonable solution would be to store two copies of the data model while in preview mode. One would be the source itself, and the other would be the modified copy. This allows us to revert, and not have to re-request the data from the server to do so. One problem down. 

The next challenge was feeding either the source, or the modified copy to the children while in preview mode. Given the preview mode applied to _all_ the children, it made sense to house that flag in the parent. But how to use it?

This is when a useful Angular feature became relevant. Angular allows the model typescript to provide getter functions. Like so:

```typescript
get displayModel() : MultiPartModel {
  return this.sourceModel;
}
```

 With this getter in hand, it was simple to replace each access to the parent's source model with a reference to the displayModel instead. After deciding where the preview flag lived this was the second necessary refactor step. The child model access went from :

```html
...
<app-child-component 
  inputModel="sourceModel">
</app-child-component>
<app-other-child-component 
  inputModelData="sourceModel.subData">
</app-other-child-component>
...

```

To this:
```html
...
<app-child-component 
  inputModel="displayMoidel">
</app-child-component>
<app-other-child-component 
  inputModelData="displayModel.subData">
</app-other-child-component>
...

```

Admittedly those examples are a tad contrived, but they show the point.  The contracts for the child components didn't have to change to support the preview mode! Now we are free to perform the last step. We need to display the modified copy when we are in preview mode. All we need to do is update the getter:

```typescript
get displayModel() : MultiPartModel {
  return this.isInPreviewMode ? 
    this.modifiedCopy: 
    this.sourceModel;
}

```

Now the form of the solution I described likely already exists in some named model. Identify your data access points. Create an alternate path which matches the contracts, then swap the access to the new path. Finally, you can alter the actions of the new path , so long as it meets the contract, to provide the new behavior. I hope this discussion help you in your refactoring adventures!

P.S. I did not discuss how the Parent acquires the modifiedCopy in this post. I believe it is either a different pattern altogether. Or that it may be an idiosyncratic implementation for this particular client's system. As a result, I did not think it worth diving into. If you're curious about it, [shoot me an email](mailto:daniel@scheufler.tech)!

P.S.S. 03FEB2020 After writing this post, it was brought to my attention that the described pattern is likely a [Proxy](https://en.wikipedia.org/wiki/Proxy_pattern)
