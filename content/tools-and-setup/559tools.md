---
title: "Tools for 559"
date: 2023-01-20T10:00:37-06:00
draft: false
tags: ["git","tools",vscode]
weight: 1
categories: ["tools"]
summary: 'An overview of recommended tools for doing the programming assignments in this class. You will need a web browser, a GIT client, an IDE or text editor, and a local web server.'
---


**Preface:** For programming in this class, you will want to have good tools. Good tools make programming easier, and let you focus on the (more fun and interesting) content. You will also need to have tools to work with GIT for source control as this will be our mechanism for handing in assignments.

(updated for 2025)

## Overview of Programming Tools for CS559

In CS559, you will do a substantial amount of JavaScript programming. See the {{% link "javascript559" %}} page for a discussion. We will use GitHub to distribute framework code and for students to hand in assignments (see the {{% link "git559" %}} page).

This means you will need some tools for programming in JavaScript and working with GitHub. We won't force you to use any particular programs, but we'll make suggestions. You should make sure that you have something to use in the first week of class. The first assignment will require everything.

The requirements (details below):

1. A web browser to run programs (preferably Chrome)
2. Some GIT client that talks to GitHub
3. Some IDE or text editor for programming in JavaScript
4. Some local server to test things out on your machine

The optional (but recommended) things (details below):

1. A type checker and/or linter
2. A good debugger
3. An IDE that integrates 1 and 2
4. An SSH key manager so you don't need to type your password all the time when using GitHub
5. An interface to AI tools to help you with programming.

You may use any tools that works for you. Since we assume that you are using your own computer(s), it is your responsibility to set these things up and learn to use them. **We strongly recommend you get things set up the first week in class.** Spend time early in the semester to master the tools!

We recommend (and can provide some help with, details below and in the links):

1. Chrome
2. Installing the command line GIT tools, and optionally a visual client  (SourceTree)
3. Visual Studio Code (VSCode) as an IDE
4. LiveServer (inside of VSCode) and Node http-server for a local server
5. Node (for JavaScript tools like http-server)
6. Getting GitHub CoPilot for VSCode set up (see {{<link copilot_signup>}} and {{<link copilot_vscode>}})

Some details follow.

## Web Browser

All your programs will run in a web browser.

Importantly, our programs (the framework and example code for class) must run in _your_ web browser, and your programs (assignments you turn in) need to run in _our_ web browser. In the ideal world, everything is compatible. In practice, it's safest to try to run the same web browser.

A web browser is a personal choice, so we don't want to dictate which one to use. For grading, we will use a current version of Chrome. If you don't regularly use Chrome, you may want to have it for testing.

## GIT Client

See the {{% link "git559" %}} page for more information on GIT in CS559.

You will need to work with the GIT source control system. The default way is to install the command line tools, which are available for all platforms. We recommend that you have some familiarity with the command line tools.

In theory, you can do everything via the GitHub web page: download the repo as a ZIP file, upload the files you changed, etc. While this is OK for small fixes, you will not want to do this for your class assignments. **Do not do this!**

Visual interfaces for GIT can be helpful, and make many tasks easier. For example, I use [SourceTree](https://www.sourcetreeapp.com/) because it's free, cross-platform, and works with different systems. The tools built into Visual Studio Code are also useful. However, for some things, you may need the command line tools.

Using SSH keys to connect to GitHub is really convenient and we strongly encourage it. See the {{% link "git-ssh" %}} page for instructions. We strongly encourage you to set this up the first week. It can be tricky, but it will save you a ton of hassles later.

## Editors and IDEs

You will need tools for reading and writing JavaScript programs and related files (like HTML files). We recommend Visual Studio Code (see below).

### Using a Basic Text Editor

You can probably get by in this class with a basic text editor (Notepad++, Vim, etc.). Almost all of these offer some features for programming (like coloring and checking for basic syntax things). However, more specialized tools can be helpful - helping you work with larger programs (across files), providing more linguistic support, etc.

### Visual Studio Code

_For CS559 we strongly recommend Visual Studio Code as a JavaScript development environment._ See the {{% link "vscode559" %}} page.

Visual Studio Code (VS Code) is a JavaScript-based text-editor/IDE that is meant for doing programming. It has an active community with lots of plugins and lots of features. While this comes from Microsoft, it is cross-platform (it runs on Windows, Mac and Linux).

VS Code has an integrated debugger and web server (called LiveServer) that are very helpful for doing web development. We will provide a tutorial on using the debugger in VSCode.

VS Code is connected to a bunch of JavaScript "services" that allow it to do things like infer types for your variable, intelligent code completion, and error checking. Check out the [VS Code JavaScript Feature Page](https://code.visualstudio.com/docs/languages/javascript) for a list of all kinds of cool stuff it can do.

The features are really helpful for learning. They catch beginner mistakes. Tooltips that pop up when you look at a function call give you documentation which saves you from having to remember what all the functions are (and having to do a web search each time you want to do something).

The more I use VSCode, the more impressed I am with it. I strongly recommend it. It's integration with AI tools (especially GitHub CoPilot) is another valuable feature.

See the {{% link "vscode559" %}} page for more thoughts on VSCode for CS559, and help getting started.

### Other Choices

We really recommend you use Visual Studio Code, unless you are an expert with something else and really don't want to try something new.

If you already have a favorite editor for programming, you can use it. For example, some people like the JetBrains tools (WebStorm, PyCharm, ...). But we recommend Visual Studio Code since its what most people use for class. 

## Local Web Server

Even though your files are on your computer, the web browser won't just open them: for security reasons, the web browser disallows doing things with files directly - it wants things to be provided by a web server. Therefore, you need to run a web server on your computer (locally) so that the web browser can read the files on your disk.

Here are two options (there are certainly others):

1. Use "live server" that is part of Visual Studio Code. This is really convenient when you are editing a project in Visual Studio Code. Documentation on live server is [https://ritwickdey.github.io/vscode-live-server/](https://ritwickdey.github.io/vscode-live-server/).

1. Use the ["http-server"](https://www.npmjs.com/package/http-server) that is part of Node. This requires that you have Node installed (see {{% anchorlink "Node and JavaScript Tools" %}} below). This has useful features like being able to turn off caching so file changes are seen instantly. You probably want to use `http-server -c-1`

If you use Visual Studio Code, you will probably want to have Live Server (since it is very convenient), but you will also want to have a stand alone option for running programs outside of VSCode.

Remember: using a local web server requires you to (1) have it installed correctly; (2) start the server running in the correct directory; and (3) pointing your web browser to the right place. Everyone's configuration is always slightly different, but (for example) when I use `http-server`, I need to (1) go to the directory I am working in with my `.html` files in a command window, (2) type `http-server -c-1` (I need the option to turn off caching), and go to "http://127.0.0.1:8080/index.html" in my web browser (`http-server` tells me this link when I run it).

If you're using VSCode with live server (recommended), don't forget to start the server to run your program.

## Node and JavaScript Tools

Node is a JavaScript environment that runs outside of the web browser. We won't be using it for class. However, it is useful to have it installed since it is the main way to get other, useful JavaScript tools. Node has a package manager (called "npm") that gives a convenient way to install JavaScript related programs.

Some things you probably want to have:

1. http-server - See {{% anchorlink "Local Web Server" %}} above.

1. In the past, we recommended using an error checker (like eslint). However, we do not recommend these for CS559 students this year. 

If you use VSCode, you'll want to have Node installed since VSCode will use Node and npm to do some of its magic such as getting type inference information.

## Type Checkers and Linters

With JavaScript, we run our program without a separate compilation step - the compiler is run "just in time". The upside is we don't have to wait for the compiler. The downside is that the compiler doesn't check our code for mistakes before we execute it. Therefore, it is really handy to have a tool that checks over your program before you run it. This is an optional an advanced thing. 

{{< expand "expand to read more ..." >}}
Linters are programs that check over your program to catch mistakes. There are several for JavaScript. `eslint` is the most common. These can be installed via Node (see above), and are integrated into good IDEs. You do not need to use one for CS559 - in fact we don't recommend it for new JavaScript programmers (and if you are an experienced JS programmer, you probably have an opinion on using a linter).

Because JavaScript is dynamically typed, you can easily make the mistake of passing the wrong kind of object. These kinds of errors are not caught at compile time (since there is no compile time) - you only find them when your program doesn't work as planned. While the "no explicit typing" style of JavaScript makes it easier to program, it does lead to bugs that may not get caught until later.

TypeScript is a variant of JavaScript that does compile-time type checking. To make this possible without tons of explicit type definitions in your code, TypeScript can (usually) infer the types of most variables. You get the best of both worlds: the error checking of compile time type checking with the ease of not having to explicitly declare your types (except in the cases where type inference fails). Unfortunately, **for this class, you have to program in JavaScript, not TypeScript** (see the class rules {{% link "javascript559" "Rules for Programming in class" %}} for more details).

However, you can program in JavaScript **and** get the benefits of type checking. Visual Studio Code will use the TypeScript compiler to check your program - even if your program is written in JavaScript! The catch is that for cases where you need to explicitly declare types, you have to do it in "JSDoc" style comments. See {{<link "typed-js" >}}.

The best part about these tools is that they are built into the IDEs (especially Visual Studio Code). While you type, it tells you problems in your program - before you run it.
{{< /expand >}}
