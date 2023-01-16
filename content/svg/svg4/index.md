---
title: "SVG4: Groups, Transforms, Re-Use, and Hierarchies"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10004
categories: ["Tutorials"]
tags: ["svg"]
---

(This is part 4 of the 6 part SVG Tutorial))

On the last page, we saw that we could make groups out of primitives, and that we can also apply transformations to elements. The examples just applied transforms to primitives, but, of course, we can apply transforms to groups.

<!--more-->

{{< resource-svg src="svg4-1.svg" highlight="1" >}}

{{< resource-svg src="svg4-1.svg" >}}

You might also notice in this example ({{< resource-svg src="svg4-1.svg" link="1" >}}):
that I put some comments into my SVG code.

Make sure you understand what’s happening here: the lower right square got there by having two translations.

## Re-Use

Since I am typing all of this SVG by hand, it would be nice to avoid repeating myself so much with each little square (since they can be the same and just transformed into place). SVG lets us define our own objects and re-use them. ({{< resource-svg src="svg4-2.svg" link="1" >}}):

{{< resource-svg src="svg4-2.svg" highlight="1" >}}

{{< resource-svg src="svg4-2.svg" >}}

The trick is that we give the object that we draw a name (here, I am calling it “my square”, and then we can re-use it later). Notice that when I refer to the tag, I have to use a # (a hash) to say that this is something in the current document.

There is one complication: when I refer to `#mysquare`, SVG needs to know where to look. In older versions of things, we had to explicitly tell it what namespace to look in. We had to specify for the entire SVG file that it uses the "xlink" namespace, and we had to use that namespace. This meant that the old demos (that you may still see) look like: ({{< resource-svg src="svg4-2.svg" link="1" >}}):

{{< resource-svg src="svg4-2-old.svg" highlight="1" >}}
{{< resource-svg src="svg4-2-old.svg" >}}

Re-use can be helpful, especially when the objects get more complicated. It obviously can save a a lot of typing. But it also facilitates keeping things consistent. Here, all of my squares are the same. Also notice how a make a group of two squares, and then re-use that ({{< resource-svg src="svg4-3.svg" link="1" >}}):

{{< resource-svg src="svg4-3.svg" highlight="1" >}}
{{< resource-svg src="svg4-3.svg" >}}

Notice how I was able to specify attributes for the things I used (making the second copy red). While this affects the objects, the objects overrride the outside attributes. Notice in this example how red overrides black (the default), but not green (which is specified on the object) ({{< resource-svg src="svg4-3a.svg" link="1" >}}):

{{< resource-svg src="svg4-3a.svg" highlight="1" >}}
{{< resource-svg src="svg4-3a.svg" >}}

Sometimes, you might want to make an object just to be used. Here, I’ll define a little square in a convenient place (at the origin), and then I can just move it all over the place. The trick is that I will put the square into a `<defs>` tag, which basically says “don’t draw the stuff inside this tag.” Things still can be named, and used later. ({{< resource-svg src="svg4-4.svg" link="1" >}}):

{{< resource-svg src="svg4-4.svg" highlight="1" >}}
{{< resource-svg src="svg4-4.svg" >}}

Notice how I placed my square with its center at the origin, so when I used it, I could place it by placing the center (much as I would place a circle).

## Hierarchies

Of course, you can put groups within groups (within groups …)

The key is to remember that the coordinate systems combine by composition. To everything you do to the outermost (or “parent”) group, gets applied to all of the children. Of course, you can (and maybe should) think about it as the children start out with the parent’s coordinate system (which, the might change before drawing or passing it on to their children). ({{< resource-svg src="svg4-5.svg" link="1" >}}):

{{< resource-svg src="svg4-5.svg" highlight="1" >}}

{{< resource-svg src="svg4-5.svg" >}}

It is really worth making sure that you understand this example. Not just for the SVG and the re-use, but also for the nested groups and the hierarchical transforms. Notice how each group is offset 60 units in X relative to its parent (except for the outermost group that is translated 20 units from the edge).

{{< next >}}
<br />
{{< prev >}}
