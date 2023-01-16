---
title: "SVG1: Getting Started with SVG"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10001
summary: "SVG is a file format for 2D vector (or object-oriented) graphics. (see the vector vs. image discussion). It is a web standard, and is now well supported by all major browsers."
categories: ["svg"]
tags: ["svg"]
---

This is a tutorial on SVG (the file format and the API - more on that in a moment) that is designed for CS559 Computer Graphics. It covers the basics, but focuses on the parts students need for class. It should work pretty well as a general tutorial.

The tutorial is 6 pages in total.

The material on this page is covered in depth by the ["Mozilla (official) Adding vector graphics to the Web"](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web) tutorial. It is also covered in the [Mozilla SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial).

## What is SVG?

SVG is two thing things that are tightly inter-related:

1. SVG is a file format for 2D vector (or object-oriented) graphics. (see the {{% link "images-vs-objects" tutorial %}}). It is widely used. Web browsers can use SVG files natively.

2. SVG is an "API" for doing 2D vector graphics in the web browser. Technically, it is not its own API: it uses standard browser mechanisms for representation and programming. The graphical objects in SVG are manipulated as any other elements in the web browser.

This tutorial will focus on SVG the file format (#1), but will touch on manipulating SVG graphics programmatically  in the web browser.

### SVG - the file format

It is a web standard, and is now well supported by all major browsers.

Many vector drawing programs use it as either their primary file format (e.g. Inkscape or SVGEdit), or at least allow for saving and loading it (Adobe Illustrator).

The file format is just text, and uses XML as its syntax, so it looks like HTML. SVG will look similar to HTML except that it has different tags.

SVG is well supported in the browsers, and is represented as objects inside the browsers (in the DOM, if you know what that is), so that programs can easily manipulate it. That means that SVG is great for making interactive pictures that work in web browsers.

SVG has become the preferred way to make diagrams and interactive data visualizations for the web. Look at the work of the New York Times graphics department to see lots of great examples. (this, or this for some recent favorites).

## Why are we using SVG in this class?

SVG  gives us an easy way to try out graphics concepts (like transformations and Bézier splines) without having to write programs.

We can write simple descriptions of graphical objects in a text file, and let a web browser render it to show us what it looks like.

SVG exposes some of the key concepts of graphics (like coordinate systems) in an easy way, so we can practice with them in 2D and be ready for using them when we do 3D graphics programming.

SVG is also very useful in its own right (especially if you want to work on data visualizations!).

The easy parts of SVG (which are the ones we will use) are straightforward. Most of the fancy stuff has to do with its integration into web pages, and making styling things easier.

SVG is well supported in the web browsers. It’s even well integrated into the debugger. If you’re looking at a web page with SVG on it, try right clicking on some graphical object like a line or shape and picking “inspect” (in either Firefox or Chrome).

That said: SVG is meant as a file format, not as a language for people to type. Normally, you’d use a program to manipulate SVG. So the actual “language” itself is a bit verbose, and inconvenient to type.

## What does SVG look like?

Here’s a really simple SVG file (it's is {{< resource-svg src="svg1-1.svg" link=1 >}}):

{{< resource-svg src="svg1-1.svg" highlight=1 >}}

Here's what that file looks like:

{{< resource-svg src="svg1-1.svg" >}}

We can actually just put the SVG as an tag right onto this web page:

{{< resource-svg src="svg1-1.svg" inline=1 >}}

Try right clicking that version and choosing "inspect" - you will see that the SVG objects are right there in the DOM - alongside all of the other HTML stuff!

This is a simple SVG. It’s pretty self explanatory, but, a few things are worth noting.

- SVG’s begin with an SVG tag (see line 1). They end with closing this tag (line 4). Sometimes, you put something before the SVG tag to tell the thing that reads the file that this is XML. This seems to be optional.
- Notice that the SVG tag (line 1) has a bunch of arguments. In SVG, arguments are always strings (as far as I know), so you have to quote them. Even when they are numbers (see lines 2 and 3).
- There’s the mysterious `xmlns="http://www.w3.org/2000/svg"` on line 1. This tells the web browser that the SVG really is SVG. If you forget it, sometimes the web browser will refuse to draw your svg.
- The SVG tag (line 1) also specifies the width and height of the “canvas” we’re drawing on. Here, it’s a 100 pixel square (`height="100px" width="100px"`). It’s a good idea to specify the size of the thing you’re making (very important here, so the web page knows how much space to leave).
- The second and third lines are tags for graphics objects.  Notice that even thought there isn’t anything inside the tag, you still need to close it. There is a shortcut syntax, but I didn’t use it here.
- The objects are drawn in order, so the circle is drawn after (on top of) the rectangle.
- I used colors by name. SVG is pretty rich in allowing for a wide range of ways to specify colors. Usually, people use hexcodes (see the discussion of color, specifically hexcodes).
- The different objects (rectangle and circle) use inconsistent names for their parameters. There aren’t that many different kinds of primitives, so this is only moderately annoying. You need to look it up for each one.
- The meanings of the positions and the lengths are interpreted in the “current coordinate system.” And hopefully, you’re wondering about that, since learning about coordinate systems is one of the first topics in class, and a reason we’re using SVG in the first place. More on this in a future installment.

Hopefully, this gives you the basic idea. On {{< next >}} we'll start to look at things more closely.

{{< next >}}
