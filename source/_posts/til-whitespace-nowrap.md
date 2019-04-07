---
title: TIL...About Whitespace Nowrap
categories:
  - Software Development
  - Lessons Learned
tags:
  - css
  - whitespace
  - styles
date: 2019-04-08 09:00:00
photos: 
  - img/post_img/clipart_confusion.png
---

Disclaimer: I started my career in desktop C++ development. I am still learning these fancy CSS styling techniques!

I was working on CTA, or Call to Action, button for our current ECommerce product. As you might guess the button was 'Add to Cart'. Only I was having some trouble. THe text was supposed to be fitted on a single line, and centered in the button. I had the centered part, but due to the styles on the parent div, the 'Cart' of 'Add to Cart' kept ending up on a second line. 

I finally called one of my collegues over. Since he's more experienced in Web Styles I asked him what I was missing. To my delight, he said it was simple! I just had to add a single attribute to the button's styles: 

```css
whitespace: nowrap
```

Lo and behold, it was simple! One new aspect and the CTA appears on a single line. You can find more functionality for whitespace [here](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space), or from your friendly neighborhood front-end developer!