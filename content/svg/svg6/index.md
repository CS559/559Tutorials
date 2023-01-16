---
title: "SVG6: Paths and Curves in SVG"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10006
summary: "SVG has good facilitities for drawing 2D curves. This is a good way to experiment with Bézier curves (since it supports them)."
categories: ["Tutorials"]
tags: ["svg"]
---

Note: this is part 6 of the 6 part SVG tutorial copied over from 2014. This Tutorial discusses Bézier curves (after it discusses paths) which are a topic that we won't get to until week 5 or 6 in CS559.

SVG has the ability to draw arbitrary shapes using its `path` primitive. The `path` primitive is discussed in detail in the [Mozilla SVG Tutorial: Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

The basic idea is that paths encode a sequence of simple curve pieces (such as lines and arcs) in a string that is given as an attribute of the primitive.

Here is a simple example:

{{<resource-svg highlight="1" src= "svg6-1.svg" >}}
{{< resource-svg src= "svg6-1.svg" >}}

The key thing is the `d` parameter, where the path data goes. Notice that the path begins with an `M` (moveto) command that tells SVG where to move the pen to. The `M` command has two numbers (x and y). Then there’s an `L` command (or lineto) that tell SVG to draw a line connecting the current pen position to the new position.

Effectively, the `d` string is a little program is a "language" that lets you specify shapes. The programs are lists of commands (each command is a letter), followed by some numbers that are the parameters for the commands.

The most important commands for us in this language are:

+ `M` for "moveto" (takes 2 parameters, X and Y)
+ `L` for "lineto" (takes 2 parameters, X and Y)
+ `H` for "horizontal" lineto (takes 1 parameter - X)
+ `V` for "vertical" lineto (takes 1 parameter - Y)
+ `Z` for "closepath" - the connects back to the last "move to point"
+ `Q` for "Quaratic" Bézier curves (takes 4 parameters - X and Y for 2 control points)
+ `C` for "Cubic" Bézier curves (takes 4 parameters - X and Y for 3 control points)
+ `A` for "arc" to create circular or elliptical arcs (takes 7 parameters)

Note: for all commands, there is a lower-case version where X and Y are relative to the last drawing position.

These are all well documented in the [Mozilla SVG Tutorial: Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

### The Path Language

You can think of the path string as a sequence of commands that tell SVG how to move it's pen.

The `M` (moveto) command moves the pen to a new location, whereas everything else "draws" with the pen to the new location. Here is a simple example of a single path: ({{< resource-svg src= "svg6-2.svg" link="1" >}})

{{<resource-svg highlight="1" src= "svg6-2.svg" >}}
{{< resource-svg src= "svg6-2.svg" >}}

Some things to notice:

1. I am using commas between X and Y - you can use spaces.
2. The first triangle doesn't have a `Z` to close the path - it still fills correctly, but the stroke doesn't go all the way around.
3. The path is not connected - the second `M` (moveto) moves the pen to a new location without drawing it.

Here is the same thing drawn in a slightly different way: ({{< resource-svg src= "svg6-2a.svg" link="1" >}})

{{<resource-svg highlight="1" src= "svg6-2a.svg" >}}
{{< resource-svg src= "svg6-2a.svg" >}}

Note how here I used relative movement (lower case commands) to describe how the pen moves from its current position (rather than giving its target X,Y position). I also used the single-axis line commands.

### What to do with Paths

Unlike HTML Canvas, SVG Paths are both stroked and filled. You can specify the colors for each. If you don't want to fill, set fill to `None`. If you don['t want to stroke, set stroke to `None` (you probably want to do one or the other).

The styles (for stroke and fill) are inherited from the enclosing group. If nothing is specified, things fill with black and have no stroke color.

A warning: the default is to fill objects with black. If you’re trying to draw a curve, this is probably not what you want to do. Be sure to set `fill="None"` if that’s what you mean to do. If you fill a path, SVG will connect the first and last points for you (even if you leave out the "close paths"). Notice what happens if I try to draw some L shapes: ({{< resource-svg src= "svg6-3.svg" link="1" >}})

{{<resource-svg highlight="1" src= "svg6-3.svg" >}}
{{< resource-svg src= "svg6-3.svg" >}}

## Curves

SVG has good facilitities for drawing 2D curves. This is a good way to experiment with Bézier curves (since it supports them).

SVG curve drawing is through the “path” tag object. Unlike other objects (like lines and circles), paths don’t have a bunch of parameters: they take a single string that describes the entire path. Once you figure out how to make these strings, paths aren’t so hard.

A path is a piecewise curve. For each piece, you can either move the “pen” to a new location, or add a new piece of curve starting wherever the pen was last. The pieces can be line segments, quadratic or cubic Bézier segments, and elliptical arc segments (which includes circular arcs).

The official documentation is here, and has a lot of details you may not care about. But it also has some good examples.

Of course, we didn’t have to stop with just 1 `M` and 1 `L.` We could keep going

Notice here that after adding a line segment, I then moved to a new place and started drawing lines again.

If you’re just drawing lines, there are probably easier ways to do it. But the nice thing about paths is that you can add other curve types in the paths. For example, you can attach a line to a Bézier Segment:

{{<resource-svg highlight="1" src= "svg6-4.svg" >}}
{{< resource-svg src= "svg6-4.svg" >}}

Here, notice that we made a cubic Bézier segment (the C command). As you know, cubic Béziers have 4 control points. The first one is the position of the pen before the C command, so there are 6 numbers for the parameters of the C command (3 points, each with x and y).

You are welcome to make the curve be discontinuous by putting the control points anywhere you like. You can also mix and match curve types. This uses a quadratic bezier, two line segments, and an elliptical arc.

{{<resource-svg highlight="1" src= "svg6-5.svg" >}}
{{< resource-svg src= "svg6-5.svg" >}}

The parameters for the arc segments are confusing. They are rx, ry, theta, large-arc-flag, sweep-flag, x, y.

+ rx, ry are the radii of the ellipse
+ theta is the orientation of the ellipse (if the major axis isn’t aligned with the X/Y axes)
+ the flags tell which way around the ellipse to go. If you read the documentation a few times, you might get it. But probably you’ll set these by trial and error.
+ x,y is the position where the curve ends.

The nice thing about figuring this out (especially for Béziers) is that you can experiment with Bézier curves without having to figure out how to implement them. It’s also nice that SVG can fill the curved shapes (which is tricky to implement).

{{< prev >}}
