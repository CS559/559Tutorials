---
title: "SVG5: More Transforms and Composition"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10005
categories: ["Tutorials"]
tags: ["svg"]
---

This is part 5 of the 6 part SVG tutorial

Most of the things I’ve seen about SVG on the web are meant for designers who haven’t had a graphics class, so they are a little vague about transformation. The [specification](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform) has all the details (including all of the kinds of transforms that are supported). However, it doesn't specify how composition occurs.

SVG does allow transformations to be composed. You can put multiple transformations on any object.

Here is a simple example that uses composition without hierarchies. From it, you should be able to see how the order or transformations matters. You should understand why the blue and green stroked squares end up where they do. ({{< resource-svg src="svg5-1.svg" link="1" >}}):

{{< resource-svg src="svg5-1.svg" highlight="1" >}}

{{< resource-svg src="svg5-1.svg" >}}

A few things to make interpreting the SVG for this diagram a little easier (and tricks for your own experiments):

- Notice how I use the “viewBox” parameter to the SVG file to set up a coordinate system with zero at the center.
- Notice how I have the little mark in the upper right corner of the square so that its not symmetric, and you can tell how much things have been rotated by.
- Because the shape that I draw (lines 5-6) are in a group, but not a `def`, they do get drawn without any transformation a first time (before they are used below).
- Because I did not define the color of the stroke on the last square, it can inherit the color from its group (or from the “use” statement that instantiates it).
- Notice that rotations in SVG’s standard coordinate system are clockwise. Since the Y axis goes down (not up like in a math class), this is still a right handed coordinate system.
- If you don’t specify the origin of a rotation, it rotates about the origin.
- You should be able to figure out what order SVG applies the transformations in.   (spoiler: it’s the same convention we use in class)

{{< next >}}
<br />
{{< prev >}}
