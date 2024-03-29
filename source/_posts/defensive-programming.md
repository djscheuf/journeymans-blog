---
title: Defensive Programming
  - Software Development
  - Best Practices
date: 2016-06-16 15:00:59
tags:
  - security
photos: 
  - /img/post_img/castle.jpg
---

On a recent work project, I experienced an unpleasant revelation. My colleagues and I had not made the same assumptions. I assumed certain conditions for the data that I was to receive which my colleagues did not make. As a result, my code threw many exceptions. After this frustration, I resolved to practice a more defensive stance in my programming. As you can guess from the title, I will discuss Defensive Programming in this post. 

For this context, Defensive Programming is the practice of ensuring your data meets your expectations. It also involves structuring your code so that it is not misused. I could have avoided much of my frustration if I have practiced Defensive Programming from the start.  Yet, I did not discover the need for Defensive programming until about half-way through the project. This lead me to think about the need for Defensive programming. Here it arose from a difference in assumptions. In other cases, I can contemplate the need arising from improper usage. Both of these in the end are the result of a communication problem.

If our assumptions are not communicated effectively, we cannot rely on them. This is, at its heart, communication within a team. While I assumed  that communication within a team would be effective and clear, it is not so. Despite having many meetings on this topic, each of us had misconceptions about our work. If this is the case for coworkers, it is foolishness to think another developer might do better. Here the communication is even weaker. The only way to communicate  would be through documentation or the API design. Then it would come down to just hoping the user understood enough to use your code properly. Seeing all this, I want to list some of the specific examples of fixes that I needed. For example, I assumed that certain data would be in a specific order when I received it. Instead, I needed to instead force the desired ordering. The data ordering problem is more generic that just a list of points. 

This can also apply to other parameters, or the order of usage. One ought to encapsulate such ordering to ensure the user can only use your code in the prescribed order. As another example, my software required of a certain number of data points to function. Without defensive programming, my code would attempt to run without being able to complete. I fixed this by checking the number of points before I ever attempted my operations. Ensuring completion is an excellent time-saver. I realize now, that it is also a form of Pragmatic coding. While it may take more lines of code, the code itself is pragmatic with system resources. And if you present the errors well, the user can gain useful insight into your code. As a final note, I find that keeping my code expressive is also helpful in this case. With expressive code it is clearer what it needs, and what is will do. This way, if circumstances are beyond my control, I can still hope the user will understand. Now, after all that frustration, I plan to continue my defensive stance whenever possible. I aim to keep my future projects from becoming stuck due to communication breakdowns. I hope my examples and reflections are helpful. 

- Image from ArsTechnica Article, also on [defensive programming](http://arstechnica.com/information-technology/2014/03/why-follow-defensive-programming-best-practice-when-code-will-never-be-public/)
