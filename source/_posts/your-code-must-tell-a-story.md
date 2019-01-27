---
title: Your code must tell a story
categories:
  - Software Development
  - Quality
tags:
  - story
  - code
  - english
  - geek-speak
  - jargon
  - measure
date: 2019-01-29 09:00:00
photos: 
  - img/post_img/book.jpg
---

What makes a good software engineer? Every developer knows it is not measured by lines of code written or removed. Nor is it measured by the speed of task completion. As translators for Man and Machine, the best measure of our success is in whether our code tells a its story.
In most cases, code is no longer written for the computer. The compiler will obliterate your variable names. And then it will convert them into a sequence of byte-code instructions. No, our variable names are for us, the software engineers.

More often that not, the code you write is actually written for you. [You read code more often than you write it](/2016/12/27/Code-is-read-more-often-than-it-is-written/). To cast it as advice: Have mercy on your future self. For he will have forgotten the context you now know. So write self-documenting code.

I've heard it said: _'Write English first'_. And I strive to match my test cases to that paradigm. This is not as easy as it sounds. Very often I find myself redrafting my test case because I spoke in Geek-speak not in English. Tell your story in English, human words. Not Geek-speak jargon.

Following a Given-When-Then style makes this easier. Given will be the setting of your story, the circumstances for the action. When corresponds to the activity of your user. Finally, you express the steps you expect to occur to accomplish the will of your user. These are your Then statements.

```
Given a product ready to cart ->
  When a User adds to cart ->
    Then save the users product settings,
    Then get the vendor specific product number,
    Then add that product to cart,
    Then send the user to the cart page
```

Though not the only benefit, having your steps written in English can also give you the function names. If you name your functions like they are in the Integration or Module level test, their purpose is clear. Reading the function, e.g. add to cart, which calls each step now conveys your story.

```javascript
addToCart(productToCart) => 
  saveProductSettings(productToCart)
    .then(getVendorSpecificProductNumber(productToCart)
    .then((vendorProductId)=> 
      addProductToCart(vendorProductId, productToCart))
    .then( sendUserToCartPage())))
```

This practice describes the happy path with ease. Unhappy Paths need more tools. Unhappy paths usually involve conditional checks and branching. Proper variable names help in this case. Capture the condition in a variable. But do not capture the bare meaning of a condition like _'lengthGreaterThan2'_. Instead explain what that means, like _'ReceivedTooManyOptions'_. For example, suppose getting a VendorNumber of 0 means that there is not vendor on record for that product. I would do the following:

```javascript
[...]
.then((vendorProductId) => {
   const noVendorForThisProduct = vendorProductId === 0;
   if (noVendorForThisProduct) {
      console.log('Cannot cart this product. It has no vendor.');
      return;
   }
   addProductToCart(vendorProductId, productToCart)
[...]
```

Now when I return I understand the meaning of `vendorProductId === 0`. I have stored more context of my story for my future self. Further, I provide a better translation for when I am required to translate from Code back to intent. We do this all the time when tracking down bugs or demonstrating out code to the QA or PO.

I wish we could teach our new craftsmen more of the fine Prose of code, so that they might not come to worship terseness. We should not always aim at the brevity and condensed power of the [Laconic 'If'](https://en.wikipedia.org/wiki/Laconic_phrase#Uses). Look instead to provide the right amount and no more. 

The [Gettysburg Address](https://en.wikipedia.org/wiki/Gettysburg_Address#Bliss_copy) is a good example. [One apocrypha](http://www.abrahamlincolnonline.org/lincoln/speeches/gettysburg.htm) states that another speaker at the assembly said to Lincoln: _"I should be glad, if I could flatter myself that I came as near to the central idea of the occasion, in two hours, as you did in two minutes."_ 

If our code tells its story, we would suffer less, and understand more. Though the practices I proposed will not cover the entire gap, they lay a groundwork to built upon. I encourage you to try. Your future self will thank you.