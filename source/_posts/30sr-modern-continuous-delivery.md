---
title: 30 Second Review - Modern Continuous Delivery
categories:
  - Personal Development
  - Lessons Learned
tags:
  - 30sec-review
  - devops
  - continuous
  - teams
  - goto
date: 2020-10-12 09:00:00
photos:
  - img/post_img/office_politics.jpg
---

As I've grown in my career, I have found my interests and awareness growing to suit. First I focused on the right file in my project and the right method within. Now my view begins to include the necessities of running and deploying the software. So I thought a talk titled ['Modern Continuous Delivery'](https://youtu.be/wjF4X9t3FMk) would be very informative. I was not disappointed.

The speaker opens with an important clarification, delineating Continuous Delivery vs. Continuous Deployment. Continuous Deployment means that as soon as code is pushed, and passes automated checks, it gets deployed. Continuous Delivery, hereafter CD, on the other hand means software is always deliverable, but _not_ always deployed. In a word, they are different business models.

Building on this, the speaker stipulated some pre-reqs for CD:

### Product Teams are _not_ project teams

For CD, you want the team that builds it to be the team that runs it. Get your team close the user and to the value of the software. Let them own/drive the product forward. If the team doesn't both build and run, then you have two teams. Neither truly owns the product, resulting in less ability to react.

### Trunk based Development

Without having a single branch to deploy, an automatic pipeline is difficult and/or ornery to manage. Plus Trunk based Development encouraged Continuous Integration, helping to keep your product deploy-able.

CD also implies several other practices will be in your product. Feature Gates might be an example. Being always deploy-able, but not always deployed means that some features may not yet be ready for production, even if they are in the deployed branch. Feature Gates help you control and adapt to that. They are an example of a product feature used by both the Build and Run responsibilities.

From here the speaker moved into some other practical concerns, like Build Artifacts. Some systems are now producing Docker Images as their artifacts. Such artifacts work well in the Cloud, and support the ability to revert version quickly. But the build system might rely on passing a tag-name up the pipeline, which may incur a hidden cost. Consider that each stage of your pipeline may not live on the same machine, let alone the same network! If your image is large, it may result in slowing down your whole pipeline.

With artifacts in hand, we can start thinking about deployments. A common idea might be the rolling update. It's simple to implement. But in reality, it is an all or nothing update. Without some clever versioning of the pieces, the whole web has to move in lock step. Not to mention to pain of rolling back on a failure. Modern CD encourages the product team to begin considering their product in the wild, as it is used in the real-world. This includes the hardware and orchestrations for the product. As a result, the product team must learn new patterns and practices. These might be unfamiliar, especially in the deployment domain. So the speaker goes on to discuss two additional deployment patterns: Blue-Green Deployments, and the Expand-Contract pattern. I will leave the reader to learn directly from the source for these. He delivers some very practical solutions to the kinds of problems a new team trying to move towards Modern CD may encounter.

As the speaker nears the end of his talk, he circles back. He made a statement at the top of the talk: _'You need cross-functional teams to truly support Modern CD'_. For him, a true cross-functional team is not just a PO/BA, Developers and a QA. It must include more.
He tells a story of an honest product failure. It is the scariest story of _'Works on my machine'_ I've ever heard. His team had developed an awesome, slick product. They were excited to deliver it to real users! Only one problem... It didn't work on the production machine. The app relied on some fundamental assumption that didn't work on the Production Machine. The app wouldn't even start. Worse, it took just minutes to find the cause. Once someone who understood the production machine looked at the code, they knew immediately.

The failure was avoidable. If someone who knew the production system was a member of the team, development could have gone a different direction. Our world is growing increasingly facet-ted. This talk focuses primarily on Build and Deploy. But Security is just as valid a place for cross-function in a Product Team. So the speaker ends pointing to the organizational change that must take place to effectively support Modern CD. Our organization must change to create the kinds of teams that can truly Build, and Run a product.

The considerations for the build pipeline, and the deployment strategies are the most immediately applicable for me. But I suspect that in the coming years, this new conception of a Cross-Functional team will become increasingly useful. I hope that I've whet your curiosity about [Modern Continuous Delivery](https://youtu.be/wjF4X9t3FMk). I know it is a subject which I will be paying more attention to in the future.
