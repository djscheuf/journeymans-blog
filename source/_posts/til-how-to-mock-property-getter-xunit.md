---
title: TIL... How to mock Property Getters in XUnit
categories:
  - Software Development
  - Lessons Learned
tags:
  - testing
  - mocks
  - xunit
  - property
  - getter
photos:
  - img/post_img/clipart_confusion.png
date: 2019-11-13 09:00:00
---
So Friday, I was working with a colleague trying to setup unit tests, in XUnit for an existing class. He had called me over to see if we could figure out how to mock an odd Interface. The Interface specified a Property with a getter. And we had started by trying to replace the property itself on the Object instantiation of the mock. However, the compiler was complaining about it, so we puzzled for a bit.

It was about that time that I remembered that Properties were just syntactic sugar. And that Getters really are just functions. With those words in mind, I was able to find a resource almost immediately which explained _'how to Mock Property Getters in XUnit'_. Thank you [StackOverflow](https://stackoverflow.com/questions/12141799/moq-setupget-mocking-a-property/12141846)!

Turns out to be wicked simple:

```csharp
mockedThing
  .SetupGet(x=> x.PropertyToMock)
  .Returns(mockPropertyValue);
```

That's it! And that's how I learned how to Mock Property Getters in XUnit. 