---
title: "SVG3: Manipulating Primivites"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10003
summary: "SVG has many primitives. SVG Primitives can be styled and transformed."
category: ["Tutorials"]
tags: ["svg"]
---

The way we make pictures with an object-oriented (or vector) graphics library like SVG is by creating **primitives** - the basic shapes that the API knows how to draw. So far in this tutorial, the examples have just drawn rectangles and circles. SVG has a range of primitives that you can use. 

The [Mozilla SVG Tutorial: Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) describes the main primitives in SVG. We'll discuss the `path` primitive later (on page {{% link "svg6" %}}).

Now is probably a good time to get the hang of making drawings using the basic primitives. You can make simple shapes (rectangles, lines, circles, and a bunch of other things) using the appropriate tags. For now, you should be able to use a few different primitives. Later, we’ll want to use the path primitive – but you won’t need those now.

## Styling Primitives

To style how the primitives look, you can either give attributes to the primitives (such as their fill (inside color) and stroke (outside color) and stroke-width (how much of a stroke they get), or put these into a style string. Here is a simple example ({{< resource-svg src="svg3-1.svg" link="1" >}}):

{{< resource-svg src="svg3-1.svg" highlight="1" >}}

{{< resource-svg src="svg3-1.svg" >}}


Some things to notice about this example:

- The first rectangle uses a style string – and puts all the style parameters into that.
- The second rectangle uses separate attributes for the fill and stroke colors. It also closes the tag using the shorthand notation />
- The third example makes a thick stroke, and has no fill. This is important because by default, objects do have a fill color – if you don’t want them filled, make sure to specify that. Also, no fill is different than filled with white – you can see through the no fill.
- For the purposes of class, controlling the stroke and fill of primitives is enough. Although, you might want to look at some of the many options there are for styling the appearance of the primitives.

## Groups

You can take a group of things in SVG (for us, primitives and other groups) and group them together into a group. Properties applied to the group get applied to all of the things in the group. ({{< resource-svg src="svg3-2.svg" link="1" >}}):

{{< resource-svg src="svg3-2.svg" highlight="1" >}}

{{< resource-svg src="svg3-2.svg" >}}

Here, notice that the properties assigned to the group (the thick black stroke) get applied to the rectangles within the group, except that the third one over-rides this and makes the stroke red.

It doesn’t seem like you can give position attributes to a group (like specifying the width and height for the objects in the group).

## Transformations

We have seen how the SVG element allows us to define our coordinate system (in the last tutorial).

SVG also allows us to attach a transformation to any object (including a group). SVG allows for arbitrary affine transformations. (Don’t worry, you’ll learn about that in class). For now, we can just start out with a simple transformation: translation. This recreates the first picture, in a more verbose way. ({{< resource-svg src="svg3-3.svg" link="1" >}}):

{{< resource-svg src="svg3-3.svg" highlight="1" >}}

{{< resource-svg src="svg3-3.svg" >}}

There are other transformations built into SVG. Rotation is another simple one. However, by default it rotates around the origin of the current coordinate system, which may not be what you want. For example, adding the rotations to the first example gives us: ({{< resource-svg src="svg3-4.svg" link="1" >}}):

{{< resource-svg src="svg3-4.svg" highlight="1" >}}

{{< resource-svg src="svg3-4.svg" >}}


Note that in this case, the rotation is applied before the translation (positioning), and that the rotation is about the origin.

The SVG rotation transformation allows you to specify where you want the center of rotation to be, which can be quite convenient in a situation like this, where I want to rotate each square about its own center. ({{< resource-svg src="svg3-5.svg" link="1" >}}):

{{< resource-svg src="svg3-5.svg" highlight="1" >}}

{{< resource-svg src="svg3-5.svg" >}}

You can read about the various ways to specify transforms in SVG on [this page](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform).

Transforms become really useful when we combine them with groups. But that’s the next tutorial.

{{< next >}}
<br />
{{< prev >}}
