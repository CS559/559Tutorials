---
title: "What is a Pixel? (and what is a point sample?)"
date: 2022-01-10T19:17:32-06:00
draft: false
categories: ["Tutorials"]
tags: ["Graphics 101"]
---

When we talk about image-based graphics, we talk about it being a regular collection (usually a grid) of samples (or pixels). It’s time to be a little more precise about this.

The term **pixel** is (I’m told) short for the term “picture element.” ([Wikipedia](http://en.wikipedia.org/wiki/Pixel), of course talks about this)

Unfortunately, there is an ambiguity when we talk about a grid. And for reasons that we become clearer later, it is better to think about pixels one way rather than the other. Consider a grid:

{{< resource-svg src="grid.svg" >}}

There are two different things we could refer to as “the elements:” the squares bounded by the lines, or the points at the corner of the squares (where the grid lines meet). Note that both of these objects (the squares and the corners) are regular rectangular grids.

It turns out that it is best not to think about the region inside the square. It is better to think about things as **point-samples**. That is a measurement taken at a specific position (where “position” is a mathematical idealization of having no area). It will be much better to think about a pixel as a point-sample.

You might notice that when we take the grid (as in the picture above), there are more corners than there are squares (there is one more row/column). We usually prefer to consider the point sample as being the center of the square. Or, since we use the sample positions much more than we consider squares that are centered on (and surround) the point-samples.

{{< resource-svg src="pixels.svg" >}}

In an image, we make a measurement (usually color or brightness) at each point-sample location. When we say a point sample has a particular color, we are only talking about that specific point in space. Two questions probably come to mind:

1. What about the spaces in between the samples?
2. Wouldn’t we have avoided that problem if we instead assigned the color to the area inside the little square?

The answer to #1 is “we really don’t know what happens in between the samples.” A sampled representation only tells us about what happens at the samples. If we’re trying to guess about other places (e.g. to fill in the gaps to make a continuous image), we’re doing just that: trying to extend beyond what we were told. This process of trying to figure out reasonable values for other locations is called **reconstruction**.

You might think that the problem is that we’ve assigned the color to a point. But, the alternative (assigning the color to an areal region, such as the little square) not only doesn’t help, but creates new problems.

Suppose we did consider that each color is assigned to a little square. It still leaves the problem of deciding what color occurs are the edges and corners where the squares come together. But it also makes the assumption that our picture is made up of squares of constant colors. In the real world, very little is exactly this. Your computer monitor (LCD / Projector) or printer is more like a bunch of dots that blur together. The objects that you’re making pictures of are unlikely to have been made from little squares (unless it’s a tile floor or something like that).

The real problem is that we’re trying to represent something that is continuous (that has a value at every position) using a finite set of measurements. The thing we want to represent (a picture, an image) might be arbitrarily complex. But in an image, we are only storing a fixed size set of measurements. Some information will be lost. Using the point sample model, we are aware of what we’ve lost, and can talk about the best ways to measure that loss, and to reconstruct as well as possible.

If we view each measurement as a point sample, we can choose how we do reconstruction to “fill in the spaces between.” Making little squares is one kind of reconstruction (sometimes called “nearest neighbor” reconstruction because every position is assigned the value of the sample closest to it). Later in the course, we’ll learn about many different kinds of reconstructions.

Of course, considering things as point samples extends more gracefully to cases where we aren’t using a rectangular grid. But more importantly, the mathematics will be far simpler and more elegant.

We’ll explore all this in more detail later when we talk about signal and image processing. But for now, please remember:

A **pixel** is a point sample.

An **image** (in the sense of image-based graphics) is a regular grid of point samples,

**A pixel is not a little square.**

## For Further Reading

[Wikipedia article on Pixel](http://en.wikipedia.org/wiki/Pixel) says where the word comes from and also gets at the point-sample issue.

Alvy Ray Smith’s article “[A Pixel is Not A Little Square](http://alvyray.com/Memos/CG/Microsoft/6_pixel.pdf)”

## Terms you should know

+ Pixel
+ Point-Sample
+ Reconstruction
