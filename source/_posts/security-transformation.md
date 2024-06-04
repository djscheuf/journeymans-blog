---
title: Where to start a Cybersecurity Transformation?
categories:
 - Software Development
 - Cybersecurity
tags:
 - security
 - design
 - authorization
 - authentication
 - identity
 - transformation
 - jobs-to-be-done
date: 2023-01-10 09:00:00
photos: 
 - img/post_img/castle.jpg
---

I'm excited to share that [Erik Boemanns](https://www.linkedin.com/in/eboemanns/) and I will be having a [LinkedIn Live chat](https://www.linkedin.com/events/e-b-spoke-bringingcybersecurity7016077841247191040/comments/) this Friday, January 13th 2023, on _Bringing Cybersecurity Transformation to your Organization_. 

And as part of our ongoing conversation on the topic, he [posted this question](https://www.linkedin.com/feed/update/urn:li:ugcPost:7016077843767975936?commentUrn=urn%3Ali%3Acomment%3A%28ugcPost%3A7016077843767975936%2C7017183038044311553%29) last week: 
> "A question I see asked frequently is whether a company should start with Identity, Authentication, or Authorization - as you've helped clients implement solutions for these - what do you think is the right starting point?"

I answered this briefly on LinkedIn, but I actually had more to say on the topic. So here's the expanded answer.

In my experience, you have to address a common modeling challenge first. No matter which of these you try to start with, it always boils down to the same question. The best place to start in software is with the User. For security specifically, that is to answer one critical question. 'How will my system recognize a real person, and allow them to interact in the digital space appropriately?'

Trying to start by answering Identity, Authentication, or Authorizations first will land you in a quagmire. You need to address how your system will 'see' a user first! You need to identify what kind of `Digital Twin` of the user your system will expect. The first action your system will need to take is Authentication. Your system must associate some unknown person, with a specific Digital Twin. You need an authenticated user before they interact with your system. But to be clear, this step involved Identity and Authentication.

Identity is the record, or data, that establishes a specific Digital Twin. Authentication is the process of credentialing some real person's association with some Identity. Sort of like when the Post Office requires both a Driver's License and a Passport before you can get a PO box. Having two tokens that attest that you, the person, are who you say you are. The most common use case I have seen for an authenticated Identity is logging or auditing. We very often want to know _who_ made changes to our data. The simplest form of this support is to just capture a user email, and password ( salted and hashed of course) in a Users database table. But you can easily grow beyond this. You probably don't want users to have six different logins for the six systems they use every day. This is where relying on a third-party [Single Sign-On provider](https://csrc.nist.gov/glossary/term/identity_provider) can save your team some headaches. This offloads the need to build an identity provision system. Moreover, it is quite prudent at times to rely on a trusted third party to handle the complex process of authenticating a user.

By contrast, you might be exposing your application to the wider world. Consider an ECommerce application. You might want to support guest check-out. Or you might want to let registered users capture their favorite orders for later. Each case requires a different approach to Identity. How your organization represents, captures, and establishes Identity will affect what you may do with it.

In my experience, your organization should work backward from the [`Jobs to be done`](https://www.productplan.com/glossary/jobs-to-be-done-framework/), and the User who'll be doing it. You should create a model of that User in your system. But keep an eye on what functionality you want from your Security architecture. If you want simple auditing, you can favor a simpler system. If you want data ownership, and ease of integration across a platform, pursuing an SSO approach is the more viable. But all these boil down to how you answer the core question. 'How will my system recognize a real person, and allow them to interact in the digital space appropriately'? **And that starts with your conception of Identity.**

## Some useful References
- Topical References for [Authentication](https://csrc.nist.gov/publications/detail/sp/800-63b/4/draft), and [Authorization](https://csrc.nist.gov/publications/detail/sp/800-210/final)
- HBR Article on [`Jobs to be Done`](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)
