---
title: Commonplace POC
comments: false
date: 2022-06-19 15:00:00
version: 0.0.1
---

Common Place landings

To [agile](./agile)

User Story:

So that I can review, and reference the principles espoused in various posts directly
As the author
I want to provide public access to my commonplace book notes on certain professional topics

So that I can generate commonplace book pages as part of my blog site
As the blogger
I want an EASY way to translate my existing Obsidian Crunch Notes into appropriate pre-compiled format for Hexo

So that I can more easily navigate through the available commonplace book pages
As a reader
I would like a commonplace index which lists all the available topics, like the main blog index page, or the tag pages.

Scenarios:

Given a Crunch note, with a title and some front-matter
When I run the converter
Then I get a folder, with that TITLE for the name
Then I get an 'index.md' file in that ^ folder with the main note Contents
Then I do NOT get the note's front-matter?

Given a folder containing many converted Crunch Notes ^
When I run the indexer
Then I get an 'index.md' in the initial folder
Then that file will contain links to ALL the converted Notes, in a HEXO supported format
Then that list of links will be in alphabetical order
Then that file will contain a breif descriptive paragraph BEFORE the list of links

Given a CommonPlace Book folder
   AND an index.md containing the indexed links to the notes
   and THAT FOLDER contains the folders housing the notes
When the blog is Deployed
THEN I will see a main nav link to CommonPlace, which directs me to the commonplace index
AND that index's links to the crunch notes will function as expected, taking me to the note content.

Given a converted Crucnh Note
When I visit the blog
THEN I will NOT see a teaser set of links to other blog posts
Then I will NOT see a Next or Prev link on the Crunch Note.