---
title: "Visual Studio Code (VSCode) for CS559"
date: 2023-01-20T10:00:04-06:00
draft: false
categories: [tools]
tags: [vscode,tools]
weight: 3
---


We recommend using Visual Studio Code (VSCode) for doing the programming assignments in CS559.

<!--more-->

You will need to use some IDE or text editor for editing JavaScript programs and web pages (e.g., html and css files).

It is worth investing your time in learning to use good tools (like VSCode).

A few reasons why I recommend VSCode:

1. VSCode has great support for JavaScript editing. It does the basics very well (autoformatting, syntax highlighting, ...) as well as more advanced editing features (code refactoring, ...).
2. VSCode can provide tooltips, hints, and command completion. It knows about JavaScript and the libraries we will use, and will figure out your code. This can save you from having to remember how things are spelled, what arguments a function takes, etc.
3. VSCode integrates a JavaScript type checker - which will find problems in your programs before you run them (see {{% link typed-js %}}).
4. You can use the "LiveServer" extension. VSCode will run a simple http server for testing, and automatically fire up the browser as appropriate. A particularly nice feature is that it will force the browser to reload your program if you edit it. The browser console appears within VSCode, so you can see messages and type JavaScript at the prompt.
5. VSCode integrates with the web browser to do good debugging. You can set breakpoints by clicking lines in the editor, and see the JavaScript console in an editor window. You should learn to use the debugger sooner rather than later. We will provide a tutorial.
7. VSCode is infinitely configurable. If there's something you don't like about it, you can probably change it.
8. VSCode has a very active community building various extensions. I am always finding new gadgets that make programming better.
9. VSCode has an interface to GIT.
10. VSCode (with the GitHub CoPilot extension) has excellent integration with generative AI tools which can really accelerate your programming.

The features are really helpful for learning. They catch mistakes. Tooltips that pop up when you look at a function call give you documentation which saves you from having to remember what all the functions are (and having to do a web search each time you want to do something). It's so easy to do a commit to GIT, that you can do it more often. And so on.

Of course, there are downsides. With all of its features, there is a lot to learn (of course, you could start with just using the basic stuff). Also, with all of its extensibility and options, it can be hard to set up. But it is worth it.

To get started:

* look at the "Interactive Playground" (under help) to learn some ideas of cool things VSCode can do
* look at the [JavaScript in Visual Studio](https://code.visualstudio.com/docs/languages/javascript) page

## Some Advice

1. JavaScript support is now built in (if it isn't you can configure it)
2. ~~You will want to have Node and npm installed. It's probably better to install Node first (so VSCode can find it). Even if you don't use Node, VSCode will.~~ Update: Node is no longer required. It doesn't hurt, but it isn't required.
3. The "LiveServer" extension is very helpful - this will set up a local host server that will make it easier to try stuff out. LiveServer puts its service on port 5500 - the default VSCode debugging works on a different port (you may want to edit your "launch.json" file - which is automatically created by VSCode). Documentation is at [https://ritwickdey.github.io/vscode-live-server/](https://ritwickdey.github.io/vscode-live-server/)
4. The debugger is built in to VSCode. You can run your program using live server and the debugger works (with a little bit of configuration - since LiveServer uses port 5500, and the debugger defaults to a different port). 
5. The debugger defaults to always wanting to debug "index.html" (so if you have multiple html pages in one directory, this can be challenging).
6. VSCode will give you TypeScript style type checking on your JavaScript programs if you put the magic '''// @ts-check''' into your code. Try it. It will take some effort, but it can catch all sorts of problems. See the {{<link typed-js >}} page.
7. You need to make sure to start the "live server" - there's a button that appears in the blue bar at the bottom of VSCode. You may get an error about the firewall, but it should work (even with the firewall) for localhost. Sometimes the button to start "Live Server" (at the bottom of the screen) is missing (it only appears if Visual Studio Code thinks you're working on a web page project). If the folder has an index.html file, restarting VSCode usually does the trick. Also, "Start Live Server" is usually in some menu.
8. Starting the debugger (using "launch") can be tricky if the browser is already running (you need to "attach" rather than "launch"). It may be easier to use "launch" and have VSCode start a new browser.
9. Make sure that you have GIT set up correctly (with public keys) if you want to do GIT from inside VSCode.
10. To use CoPilot, you need to have a "GitHub for Education" account, and set things up correctly. See {{<link copilot_signup>}} and {{<link copilot_vscode>}}.
