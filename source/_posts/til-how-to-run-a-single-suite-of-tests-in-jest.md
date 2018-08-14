---
title: TIL... How to run a single suite of Tests in Jest
tags:
  - jest
  - redux
  - TDD
  - test-suite
  - testing
  - unit-test
url: 1538.html
id: 1538
categories:
  - TodayILearned
date: 2018-06-19 15:30:24
---

So I was writing unit tests for my reducers, but got frustrated with the slow process of running the full test suite when I was tweaking a single test. I though, there's got to be a better way! To the Internet! And TaDa, there was! Once you install Jest globablly, you can run a simple command to select the suite or suites you want to run: jest --runInBand "{matchString}" This command will run any _file_ whose name matches the given string. So if you wanted to run all the tests associated with the SuchAndSuchModule. You could use: jest --runInBand "SuchAndSuch*" My thanks to be brilliant folks who answer stack-overflow questions! You can find the answer I did [here](http://uch a need. Here's a rough example:)