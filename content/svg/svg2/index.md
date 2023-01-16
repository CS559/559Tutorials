---
title: "SVG2: Coordinate Systems"
date: 2022-01-10T12:00:00-06:00
draft: false
weight: 10002
summary: "Now that you know that you’re going to have to use SVG, here’s a few things will be useful in actually making some pictures."
categories: ["svg"]
tags: ["svg"]
---

Now that you know what SVG is, here’s a few things will be useful in actually making some pictures.

Remember that when you make the SVG tag, you need the magic parameter that tells the web browser that it really is SVG.

`<svg xmlns="http://www.w3.org/2000/svg">`

If you forget the magic and cryptic `xmlns="http://www.w3.org/2000/svg"` the browser says “This XML file does not appear to have any style information associated with it. The document tree is shown below.”

In that same line, you should also tell thing how big your SVG picture is – the size of the “canvas”. These are the width and height parameters.

If I do this...

{{< resource-svg src="svg2-1.svg" highlight=1 >}}

I can draw anywhere – it might even let me draw out of the boundaries (since there aren’t any)

{{< resource-svg src="svg2-1.svg" >}}

By specifying a width and height for the SVG object, we can put boundaries on the canvas

{{< resource-svg src="svg2-2.svg" highlight=1 >}}

{{< resource-svg src="svg2-2.svg" >}}

Notice that he coordinate system is not changed by the change of size of the canvas. By default, the coordinate system in SVG has (0,0) at the top left, and x and y each be in the default units of the canvas. When you give a size for the canvas, it assumes those are the units you want to use. Here, I specified pixels (that’s why it’s `height="100px"`).

### Setting the coordinate system with `viewBox`

SVG allows us to specify a different coordinate system as an attribute of the SVG element.
When we create the svg we can specify `viewBox` as a parameter for the tag.
`viewBox` takes a string with 4 numbers in it. The minimum values for x and y and height and width. So, if we wanted the first picture squished into the boundaries of the second, we could do:

{{< resource-svg src="svg2-3.svg" highlight=1 >}}

{{< resource-svg src="svg2-3.svg" >}}

Notice that this sets the coordinate system to be between 0 and 120 for x and y, so the whole picture appears within the 100x100 square.

You could have achieved the same effect (getting a convenient coordinate system) by putting computing a transformation that you apply to the group of objects. But, transformations and groups are the next tutorial.

Here is another SVG picture to experiment with using `viewBox` to change the coordinate system. When you look at {{< resource-svg src="svg2-4.svg" link="1" >}} you will see its a simple picture with 4 circles, of size 100x100.

{{< resource-svg src="svg2-4.svg" >}}

By changing the `viewBox` to change the coordinate system, we can show different things. Note that the only thing that changes is the `viewBox` attribute given to the `svg` element {{< resource-svg src="svg2-4a.svg" link="1" >}}.

{{< resource-svg src="svg2-4a.svg" >}}

Or even {{< resource-svg src="svg2-4b.svg" link="1" >}}.

{{< resource-svg src="svg2-4b.svg" >}}

Be careful with `viewBox`: the "B" is capitalized, and things are case sensitive! Also, the second parameters are the width and height (not the upper bounds), and things do not get stretched non-uniformly. If you try to do non-uniform stretch, weird things happen - they are not well explained in the documentation. You can see the [official documentation](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox).

A more detailed tutorial on SVG Coordinate systems is the [Mozilla SVG Tutorial: Positions](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions).

There are some more other technical things that come up with SVG coordinate systems, these are discussed in the [SVG documentation](http://www.w3.org/TR/SVG/coords.html), but are not so important for the class.

{{< next >}}
<br />
{{< prev >}}
