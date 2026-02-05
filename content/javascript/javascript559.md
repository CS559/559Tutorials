---
title: "Javascript in CS559"
date: 2023-01-20T10:19:00-06:00
draft: false
categories: [javascript]
tags: [javascript]
toc: true
weight: 1
---

Programming assignments in CS559 will use the Javascript programming language. We will help you learn Javascript, if you aren't already familiar with it.

<!--more-->

## What's on this page

If you're not already a JavaScript programmer, you may prefer to start at the end of the page {{% anchorlink "Advice on learning JavaScript" %}}.

1. A short explanation about the use of JavaScript in CS559
2. A short description of the rules for using JavaScript in CS559
3. The motivation for using JavaScript in CS559
4. The rationale for the rules about using JavaScript in CS559
5. A discussion of versions of JavaScript (which will explain what we're using and help you use it)
6. A discussion of tools you can use for JavaScript
7. Advice on learning JavaScript - including books and online resources

## Basic Idea of JavaScript in CS559

You must do all of the programming assignments for CS559 in JavaScript. Your programs must run in the web browser (either Chrome or Firefox).

Learning how to write interactive programs that run in the web browser (which means in JavaScript) is one of the explicit learning goals for CS559. You will learn some JavaScript in the class. We will take some time to help you get started, but this will require effort on your part (if you aren't already a JavaScript programmer).

## Why JavaScript in CS559

{{< expand "Knowing why we use JavaScript might help you appreciate it" >}}

We started using JavaScript in CS559 in 2015. We (the people who teach 559) still believe its the right choice, but for a bigger set of reasons.

Before 2015, we required students to program in C++. We didn’t teach people C++, and just expected them to figure it out. While many people survived the experience, it was often a disaster. If you were hoping for an excuse to learn C++, sorry.

A lot of the arguments for switching to JavaScript are practical: everyone has access to a good compiler and runtime environment (in the web browser); there are excellent free tools (IDEs, error checkers, etc.); it is cross platform.

There are lots of really good reasons to use JavaScript for graphics. There are a variety of good graphics APIs and libraries available (that we will use). You don't need to worry about windowing toolkits or image loading libraries. It's easy to add UI components. It’s a modern, functional, memory managed language with impressive compilers, good debuggers (integrated into the web browsers!), and has a lot of resources on the web. When you make a cool project for the class, you can show it to people easily. Most projects will run on cell phones (since most cell phones have good graphics nowadays).

Plus learning JavaScript in general, and interactive programming for the web specifically, is a really useful skill.

There are three small downsides for some people:

1. Students associate C++ for graphics, and want it for "game engine" programming. But this isn’t really a good reason: few people develop low level graphics engines. And many of these are designed so that most of the programming is done in higher level languages (sometimes JavaScript).
2. There aren't too many other classes that require C++. So, if you want something that will force you to learn it, you may be out of luck.
3. We did C++ for 15 years, so we built up a lot of example code and project frameworks. However, we have created new examples and project frameworks that are even better. The old open-ended projects from the pre-2015 classes wouldn't scale to the bigger class sizes we have now.

{{< /expand >}}

## Rules for Programming in class

Basic rule: you should start with what we give you, and type everything yourself. What you give us must run in the web browser we use for testing. If you didn't type it, you shouldn't turn it in.

1. Your programs need to run in Chrome.
2. You must write JavaScript and CSS and HTML yourself directly.
3. You should only use the libraries that we give you.
4. You must give proper attribution to any code that you don't write yourself. This includes copying lines of code (or even retyping lines of code) from web forums.
5. You may use any JavaScript language features that are built into the language or provided by the web browser. 

{{< expand "More Details" >}}
Basic rule: you should start with what we give you, and type everything yourself. What you give us must run in the web browser we use for testing. If you didn't type it, you shouldn't turn it in.

Ironically, these rules are more targeted at JavaScript experts who might want to use things we cannot support in class. If you're a JavaScript novice and these rules don't make sense, don't worry - we're basically asking you not to do fancy stuff.

Your program must run as handed in (no compilation steps). You may not use a transpiler (e.g., Babel, Typescript) to create the files that you hand in for use.

You may not add any new libraries that you did not write. You must use the library files that we provide. You should not change the libraries that we provide unless instructed to do so.

You may use whatever features of JavaScript work in the web browser that the grader will use for testing (Google Chrome). You can use anything built into the language and web browser. This includes things like classes or promises. We generally encourage students to use simpler features, unless they are familiar with the fancier things (or are trying to become familiar with them). We may not be able to support students in using fancy language features.

These same rules apply to HTML and CSS (e.g., you need to write all the HTML and CSS "by hand" - rather than using a pre-processor for a higher level language like [SASS](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)) or [LESS](https://en.wikipedia.org/wiki/Less_(stylesheet_language))).

{{< /expand >}}

## Rationale for JavaScript Rules

JavaScript programmers tend to use lots of libraries and tools to build things. We want you programming directly in JavaScript for the web browser. This means you should not use extra libraries (unless we explicitly tell you to), or other tools that transform your program before it runs.

Tools that check your program and warn you of errors (such as eslint) are allowed (but optional).

Because Javacript is a rapidly changing language, and there are many variants, programmers usually have their favorite versions. And then they have the problem that the system they want to run on (e.g., a particular web browser) only supports a different version of JavaScript. So, in practice, what most "serious" JavaScript projects do is use a "build system" that transforms their programs from the form they want to program in into the version of JavaScript that the target web browser will allow.

In the class environment, it is too hard to support the range of different JavaScript tools. For those who are not (yet) expert JavaScript programmers, you probably want to keep things simple. Therefore, we are requiring you to write JavaScript directly in the version used by the web browser. Fortunately, the current versions of Firefox and Chrome support a new enough version of JavaScript that has most of the important features that will make programming convenient for class.

JavaScript programmers tend to use lots of libraries when they build software. There are many reasons for this. But it quickly gets out of hand: one library needs another library which needs another... This means most JavaScript software development requires special tools (package managers and build systems) that help manage this. Being able to identify and evaluate which libraries to use is a valuable skill to develop, but not one we're going to focus on in this class.

In order to keep things simple, we will only ask you to use libraries that we select and give to you. Often, this means that you need to do more stuff yourself than you probably would need to otherwise. But that's part of the assignment design: we want you to program these pieces yourself (even if you could have found a library that does it already). Sometimes this will be painful (for example, when we manipulate SVG using direct DOM calls).

## Learning a new language in CS559 (especially JavaScript)

_If you're a JavaScript expert already, (1) remember the rules about using JavaScript in class, and (2) please help your classmates! For the rest of us..._

You might be concerned about having to learn a new programming language as part of learning about something else.

If you're an advanced CS student (and you should be if you're taking this class), you should be able to pick up new languages easily.

Learning a new programming language isn't that big a deal. However, learning to use a new programming language _well_ can be hard. In particular, JavaScript is probably different in some important ways from whatever else you've learned. Indeed, one of the biggest problems people have with JavaScript is that they treat it as if it were some other language. It is different - understanding these differences can be really helpful.

If you are learning JavaScript, we will support you. We will recommend things for you to read. The initial assignments involves reading and modifying code, so you can learn from examples. We'll spend some time in class talking about some of the weird things in JavaScript. But, I do recommend you invest some time (1) reading about JavaScript, (2) becoming fluent with tools for using it (try an IDE and become friends with the debugger), and (3) do a little extra practice writing programs with it. You may want to do this earlier in the semester before you have piles of projects in all of your classes.

A lot of the weirdest stuff about JavaScript is historical. The early versions had some problems. Working around these problems lead to weird coding styles and differences in opinion as to how to avoid the problems. Fortunately, new language features mean a lot of the craziness is obsolete. For example, I don't need to tell you about instantaneously executed functions since we now have proper modules and locally scoped variables.

See the {{% anchorlink "Advice on Learning JavaScript" %}} below.

Some of the JavaScript tools (linters, type checkers) can be really handy to help you find your mistakes.

## JavaScript Versions

JavaScript is a rapidly changing language. (see [W3 schools](https://www.w3schools.com/js/js_versions.asp) for a nice summary).

Newer versions of JavaScript fix two of the things that made it hard to learn JavaScript:

1. One of the things that made it hard to learn JavaScript was that the language has some questionable design choices and was missing some important features. Programmers found crazy workarounds. In order to read someone else's code, you had to understand how they were avoiding JavaScript problems.

2. Another thing that makes it hard to learn JavaScript is that the language is very flexible. There are many ways to do anything.

Newer versions of JavaScript fix a lot of the language issues, so there is now one "preferred" way to do things. So you don't need to learn crazy workarounds for missing features, and you don't have to figure out all the ways that other peoples' code solve these problems.

But, it does create a new problem. There are the various versions of JavaScript (e.g., ES6, ES2016, ES2017, ES2018, ...). And its hard to know which one to use (since the program has to run on someone else's web browser). This is especially a problem if you want lots of people to use your program (since many people have old web browsers).

Fortunately, we can solve this problem for class by telling you what web browser we will use: the current version of Chrome (although, Firefox is also OK). As of today (January 2021), these browsers support the features of the newer versions of JavaScript. These are features that are really useful for CS559 (modules, block scope, arrow functions, classes, async functions...). This version of JavaScript is supported by most other web browsers (such as an iPhone).

One great thing about JavaScript (there are actually many): new versions of the language take extreme care not to break things. Old features still work. Even bad ones. What this means is that even if you use ES6, all the crazy bad stuff people used to do still works. We'll try to avoid it.

## Tools for JavaScript

A great thing about JavaScript is that you probably have all you need to get started. Your web browser (preferably Chrome or Firefox) has a compiler, debugger, interactive console, and many other programming tools. You can write code using any text editor you like.

I strongly encourage you to pick up some good tools for JavaScript programming as soon as possible. The initial assignments for class will be small, but the programs will be getting more complicated quickly.

**Debuggers:** The web browsers have debuggers built in. These are generally pretty complete (you can set breakpoints, inspect variables, ...). The in-browser debuggers will talk to IDEs. We recommend you use the debugger in VSCode, and will provide a tutorial.

**Editors and IDEs:** You can use your favorite text editor. But it's probably worth taking the time to pick a modern IDE. I am recommending Visual Studio Code. It has excellent integrated support for debugging, code checking, code formatting, etc. It has this cool feature where it will run a mini-web server so you can test your program, and cause the web browser to automatically update so you'll see changes in your program immediately as you edit it.

**Source Control:** More details at {{% link "git559" %}} , but the short answer: we will use GIT in this class. You will use it to get starter code and submit your programs. Learn to use source control - it can help you even when you are working by yourself.

**Code Checkers:** There are programs (called "linters") that check your program for problems. They can often find bugs before you run your program. They can be very helpful. I recommend trying one. Good IDEs (such as Visual Studio Code) run these automatically, and give you hints to fix your program right in the editor. With Visual Studio Code, you can even have it use the type checker from TypeScript on you program (even if you don't use TypeScript - which is another programming language that adds strict typing to JavaScript - see {{< link "typed-js" >}}).

_We recommend Visual Studio Code (VSCode) for CS559._ 

## Advice on Learning JavaScript

My [2015 advice](http://graphics.cs.wisc.edu/WP/tutorials/learning-javascript/) is a bit out of date, but generally applies. JavaScript provides basic abstractions of functional programming and then lets you build more useful constructions with these. In more modern JavaScript, there are new features that let you do these things directly - but they actually build on the same mechanisms.

We will "ease into" JavaScript in class - the first assignments will have you read and modify my JavaScript code, and gradually do more things yourself. But I would still recommend reading about JavaScript first. I also recommend trying to really understand the foundations (closures, objects, ...) - it will make reading and writing code much easier. You never need to use these features - but they can be really handy. Even if you never write a closure, you will need to read code that uses them.

There are lots of JavaScript tutorials on the web. There are lots of books (some of them are on the web). It is hard to pick, because the language and the best practices have evolved a little, and I only want to pick things that are available for free. Here are some suggestions:

* The Mozilla ["A re-introduction to JavaScript (JS tutorial)"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) - is a little too much of a fact dump. But it starts with the assumption that you are a programmer, so it is probably appropriate.

* The Mozilla ["JavaScript First Steps"](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) is a much gentler introduction - and makes the connection and context with web programming. It might be too basic for people who already program. But it's a thorough and complete course. (I have not been through the whole thing).

* **Eloquent Javascipt,** by Marijin Haverbeke. A book available online [(EloquentJS-Web)](https://eloquentjavascript.net/). You can buy a physical copy from Amazon [(EloquentJS-Amazon)](https://amzn.to/2QgkYhg). I like this book because it introduces JavaScript as a modern, functional programming language, and fits my philosophy on how to teach JavaScript. It's also up to date with ES6.

* **Exploring JavaScript,** by Axel Rauschmayer. A book (mostly) available for free online [(Exploring JavaScript)](https://exploringjs.com/impatient-js/index.html). What you need is available as [(html)](https://exploringjs.com/impatient-js/toc.html) or [(pdf)](https://exploringjs.com/js/downloads/exploring-js-book-preview.pdf). I like this because (1) his previous books were good (arguably better), (2) it is up to date with the recent language developments, (3) its discussion of the advanced topics connect them to the different ways we did things in the past.

    I still like his older book [Speaking JavaScript](https://exploringjs.com/es5/). But, this book is about the older version of JavaScript (ES5), and spends time talking about dealing with ES5 shortcomings. I like it because it starts with a concise "[crash course](https://exploringjs.com/es5/ch01.html)", and then goes on to more detail. The [crash course](https://exploringjs.com/es5/ch01.html) might be the best way to get started (but we don't need to use IIFE anymore since we have "let" in ES6).

<!--
{{<expand "2015 Lectures - just for history's sake">}}
In 2015, I gave a series of Lectures on JavaScript programming. These are pretty out of date.

* [Lecture 2 (really the 1st lecture) - language basics, closures](https://mediaspace.wisc.edu/media/CS638+JavaScript+Fall+15+-+Lecture+2+-+Language+Basics/1_watic24o)

* [Lecture 3 Objects and Closures](https://mediaspace.wisc.edu/media/CS638+JavaScript+Fall+15+-+Lecture+3+-+Objects+Basics/0_jsankctn) - this gives good basics, but some of the weird stuff on how to make objects as functions you won't need - JavaScript has actual classes now.

* [Lecture 4 Functions](https://mediaspace.wisc.edu/media/CS638+JavaScript+Fal+15+-+Lecture+4+-+More+with+Functions/0_foxwvqzf) - this is a mix of old-style JavaScript weirdness, and a discussion of closures. If you're not familiar with closures, they are important, useful, and take a little time to figure out.
{{</expand>}}
-->

Programming is not a spectator sport: you can't learn it by just reading about it or watching someone do it. You need to actually write some programs. You will get to do plenty of programming in class. You might want to try doing some JavaScript programming outside of class to get ready.
