---
title: "Color: Initial Answers to a Practical Question"
date: 2022-01-10T20:00:11-06:00
draft: false
categories: ["Tutorials"]
tags: ["Graphics 101"]
---

Color is complicated. There is a ton of stuff to learn. Later in class, we'll discuss color more – and just scratch the surface of its complexity. But, between now and then you need to make pictures and you will want to specify what colors are in them. So here’s a short version…

## Can I really represent Color as 3 Numbers?

In terms of the physics of light: you cannot. In terms of the perceptual science (psychology): in theory, 3 numbers are sufficient to capture what people can see. In terms of computer graphics: 3 numbers are often good enough. But you need to understand the limits and issues in doing so. In terms of this class: we’ll use 3 numbers to represent colors. Except when we are specifically studying how color works.

## Why R, G, and B?

In graphics, we very often will represent a color as three numbers: the amount of red light, the amount of blue light, and the amount of green light. These three colors are the additive primaries: if you add lights of these colors together, you get lots of these colors. This is very different than the subtractive primaries (how different inks mix on paper to block out colors of light), or paint primaries (the colors of paints you mix together to make different colors).

The reasons for RGB actually have to do with the anatomy of the human eye, and the practical issues of building devices that work given the constraints of how the eye works. If we were making computer graphics (and display devices) for ducks or monkeys, we would need to have different primaries.

Most of the time in this class, we’ll use RGB (3 numbers) to represent colors, since it’s good enough most of the time – if only because it’s what our display devices use. When we talk about color, we’ll see why this is (and isn’t) a good choice, see some alternatives, and see some of the ways we deal with the problems of RGB.

## Why 0 to 255 for each of RGB?

Really, for each of the color channels (R,G,B) we have a percentage of the maximum brightness. So, in you could use a floating point number (either between 0 and 1 or 0 and 100). In fact, this is probably a better idea than 0-255, and is most likely what is going on inside the graphics card.

Back in the old days, memory was expensive, and floating point computations took a long time. So we really liked to use single byte numbers for storing colors. The 0-255 was a binary fraction (divide by 255). Be careful that it really is divide by 255 (not 256) – otherwise you don’t get 100% brightness.

From the human perception side, it turns out that 8 bits of precision is about the right amount (if you use it correctly). When we study color, we’ll see why between 8-9 bits is all you need in terms of what people see. But we’ll also see why you probably want more precision for doing the computations (which is OK, because now computers can do floating point really fast).

## What’s up with the 6 digit hex colors?

For web things (HTML, SVG, …) the common way to write a color is as a 6-digit hex string. 2 hex digits give you 0-255. So 6 hex digits give you a very compact way to write the three binary fractions to make an RGB color. Remember that the denominator is FF (255). The web formats require that you put a hash mark “#” at the beginning of a hex string to denote that it is a hex string color. So, "#FF0000" means the RGB triple (255,0,0), which means red. There is a cheating thing where you give just a 3 digit hex number. In this case, its the same as repeating each digit. "#F00" is the same as "#FF0000" which we just explained.
