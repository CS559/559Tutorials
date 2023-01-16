---
title: "Points, Vectors and Coordinate Systems"
date: 2022-01-10T19:42:29-06:00
draft: false
categories: ["Tutorials"]
tags: ["Graphics 101"]
---

It always bugged me that math books made a big deal of the difference between points and vectors. They’re both just a list of numbers, right? In practice, yes, they are both lists of numbers. But getting an idea of what the difference is helps develop the intuition of coordinate system. To describe this, let me use an analogy/example: describing walking in a room. Assume that you know which way is north.

* a **vector** is a movement that you can make. like “2 steps north, 3 steps east”
* a **point** is a position. it’s a place in the room. like “the south east corner” or “the center”

Notice that a vector doesn’t say where you start or end. Just how you should move. Notice that it makes sense to do arithmetic on vectors. For example you can double the vector (if you do the movement described twice), you can add two vectors (do the first movement, then the second movement – combined into one movement). It makes less sense to do this with points (twice the center of the room?) Some operations mix the two. You can take a point and add a vector (start in the center of the room, go 2 steps north and 3 steps east). You can take two points and talk about the vector between them (how do you need to talk to get between the points).

## Vectors as Points (and points as vectors)

We can add a vector to a point to get another point. This gives us a way to describe points. We need to have a starting point (the **origin**). And then we can describe other points by the vectors that take you from this origin. So, a point is just a vector with a known origin. Think about it this way: if we agree that the south east corner of the room is the origin, then 5 steps north, 6 steps east is the “middle of the room” (for the room I’m in now). Or in Madison, the capitol is the center of the coordinate system, so the computer science department is “12 blocks west” (hence the number 1210).

## Coordinate Systems

Having an origin is only part of what we need to interpret a point (or vector). Notice in the descriptions we use the terms “steps north” and “steps east”. To interpret a vector, we basically need other vectors that will tell us how to interpret each of the numbers.

“One step north” and “one step east” are the building blocks from which we build more vectors. These are actually vectors themselves. So, yes, we define vectors in terms of other vectors – the story of the world being carried on the back of a [turtle](http://en.wikipedia.org/wiki/Turtles_all_the_way_down), who is on the back of another turtle, and it is turtles all the way down comes to mind (if you don’t know this, don’t worry about it – but I just learned from [Wikipedia](http://en.wikipedia.org/wiki/Turtles_all_the_way_down) that it is not actually a Hindu myth).

**The important point:** to describe what a vector means (in 2 dimensions), we need 2 **basis vectors** that tell us how to interpret  the two numbers. If you want to define a **coordinate system** (something that tell us how to interpret a point) in two dimensions, we need two basis vectors and an origin. If you have these things, then you can take pairs of numbers (2-vectors, or coordinates) and interpret them as points/positions or vectors. So, if we agree that the origin is the south-west corner of the room, and our basis vectors are a step north and a step east, you can interpret (3,5) as a position: it’s the place you get to if you start at the origin and take 3 steps north and 5 steps west.

Or, to give a more practical example… If we agree that the origin is the top left corner of the page/screen, that the first basis vector is one pixel down, and the second basis vector is one pixel to the right, then pairs of numbers like (40,75) tell us positions on the page/screen.

## Getting to know your bases

For the screen, this might be overkill. We know to start at the top left, have x count pixels to the right, and y count pixels down. However, understanding these concepts is really important because it will help us generalize to other bases and coordinate systems.

A quick idea of where this is going… You could imagine that there are lots of possible bases. Above, I gave one for the screen, but I could have equally picked another one (say, the origin is the center, and the first basis vector is from the center to the right edge, and the second basis vector is from the center to the top edge). If we’re going to talk about positions, we’ll need to know what basis we’re in. We’ll want to be able to use whatever basis is useful, and transition between them. And this is the basis (pardon the pun) of linear algebra. Notice how we took a geometric problem (describing places and movements) and translated it into a math problem (multiplying and adding lists of numbers). Next we’ll need to think about bases and spaces a bunch more. But I’ll put that on a separate page.

## Read About It In A Book

(optional) If you want to read about this in a math book that is a little bit more formal (but not as formal as a standard textbook),
see Chapters 1 and 2 of “Practical Linear Algebra” - this book is described on the course web page.

## Terms you need to know

* point
* vector
* origin
* basis vector
* basis
