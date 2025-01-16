---
title: "Learning Goals"
date: 2025-01-16T13:50:30-06:00
draft: false
categories: ["general info"]
---

This class is meant to teach you about Computer Graphics. Computer Graphics is the study of how we make pictures with computers. The focus of the class is teaching you the key ideas of computer graphics.

The class will also teach you about how to do interactive graphics programming. We will use web technologies for this. On one hand, doing interactive web programming is a means to an end: you need to program graphics in order to really learn it. But, learning to build interactive applications for the web is a useful skill in its own right.

<!--more-->

This page was written around 2020, and last updated in 2025.

## High-Level Learning Goals (Course Level - Syllabus)

These are the official learning goals from the Syllabus (and the course proposal when we created the course). The numbers refer to the "Key Ideas of Computer Graphics" (below) and the "Non-Key Ideas" (also below).

+ Develop interactive graphical applications using web-based technologies. (n1,n3)
+ Develop graphics programs using different kinds of graphics APIs. (n2)
+ Use coordinate systems and transformations to model objects hierarchically and prepare them for viewing. (1,2,3)
+ Select and use shape modeling techniques, such as meshes and parametric curves, to describe and display various kinds of objects and phenomena. (9,10)
+ Use appearance modeling techniques, such as surface shading, texture and lighting, to create object appearances. (5,7)
+ Summarize the methods used by graphics hardware and apply these concepts in software that uses the hardware effectively. (4,5,6)
+ Identify the issues in discrete representations (e.g., images) and use processing methods to implement solutions (13).

Note that these were written in a stylized form (which is why they begin with some unusual verbs). University guidance for Learning Outcomes: [Writing Learning Outcomes (UW Provost's Office)](https://assessment.provost.wisc.edu/student-learning-outcomes/writing-student-learning-outcomes/

## The Key Ideas of Computer Graphics from 2015

A list of the key ideas of Computer Graphics that we want students to understand in CS559. This list was written in 2015 - but it doesn't change much. In 2015, we (the graphics faculty) tried to nail down the "timeless" core of what we wanted computer graphics to be (in terms of the class).

1. Work in convenient coordinate systems. Use transformations to get from where you want to be to where you need to be. Hierarchical modeling lets us build things out of pieces.
2. Use homogeneous coordinates and transformations to make common operations easy. Translation, projections, coordinate system shift all become simple matrix multiplies.
3. Create viewing transformations with projection. The geometry of imaging (pinhole camera model) leads to linear transformations in homogeneous coordinates.
4. Implement primitive-based rendering (interactive graphics) with a pipeline. The abstractions map nicely onto hardware, and let you do things like visibility computations easily. Be aware that there are other paradigms for drawing.
5. The abstractions of interactive rendering provide building blocks to do lots of things – beyond what they are obviously intended for. Many tricks involve putting these building blocks together in interesting ways to achieve interesting effects. The specific tricks change over time, but the paradigm of assembling the basic elements in interesting ways is fundamental.
6. Organize your computations for the hardware. These days, that means using programmable shading and block buffer transfers to make stuff go fast (if you’re using an API that lets you talk to the hardware).
7. Determine apparent color of objects based on lighting models. Use simple, local lighting models for efficiency, and use other tricks for non-local effects.
8. Use texture to describe detail (such as color patterns) on objects. Set up texturing with texture coordinates and texture functions, and use proper sampling with image-based textures.
9. Describe shapes using appropriate methods. Often this is a collection of simple primitives, such as a triangle mesh. However, other representations (such as implicit forms) can be useful.
10. Represent smooth curves and surfaces using piecewise representations. Common forms of spline curves and surfaces often have polynomial forms and subdivision representations.
11. Consider the perceptual issues in how people will view the images we create. The psychology and physiology of perception can tell us a lot about how images will be perceived, which impacts how we should create them. In particular color and depth perception have important impact on graphics.
12. Be aware of (and attempt to mitigate) the effects of discrete representations. Sampling comes up everywhere in graphics: understanding aliasing as a fundamental issue and what we can and can’t do about it is critical.
13. Use high-quality rendering techniques if you want to create more sophisticated visual appearances. Different drawing techniques have different pros and cons, and it is valuable to be able to choose amongst them.

## Non-Key Ideas

1. APIs are a means to an end, and always changing. There are several different styles, so it is useful to see multiple APIs to get a sense of why things are the way they are.
2. Rendering hacks are inevitable. Creating desirable appearance is too hard, so you almost always have to cheat to figure out how to best use the available resources to make what you want. While the hacks of the day are constantly changing, learning some of them is a good way to appreciate how the abstractions provided by a rendering implementation or API can be used together.
3. Interactive systems programming and UI design/implementation might be a more important thing to know than graphics. You need to do some of it to do graphics, so we’ll need to do some of it in class.
4. The art, design, and communication aspects of knowing picture to make may be more important than the detail of how we get a computer to draw it. But that’s not this class.

## Auxilliary Goals

In this class, we will use web programming as a way to try out the computer graphics ideas. Computer Graphics is not a spectator sport, so you need to actually do some programming to try things. That means, there needs to be some JavaScript and Web Programming as part of the class.

1. Be familiar with source control (GIT in particular)
2. Understand how web pages support interactivity
3. Be able to program in modern JavaScript and use some of the key language features.

