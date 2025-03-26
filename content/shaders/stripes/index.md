---
title: "Stripes: A Simple Shader Demo"
date: 2025-03-23T09:04:20-05:00
draft: false
---

This is a demonstation of making a simple stripe shader. I start with a simple solid color stripes (with parameters) and then add anti-aliasing.

Not much commentary for now (I believe it is discussed in this in a video lecture).

The same fragment shader is used in all versions.

<!--more-->

## Step 1 - Most Basic Stripes

Just to get something going, I made the simplest version.

The only thing of note: I use uniform parameters to pass the two different color, the number of stripes, and the "width" of the stripe (the percentage of the stripe that each color has).

There is no anti-aliasing yet.

<div id="stripes1"></div>
<script src="./1-stripes-simple.js" type="module" defer></script>

You can see this on a [clean html page](./1-stripes-simple.html), 
see the [js source](./1-stripes-simple.js), [vertex shader](./stripes.vs), and [fragment shader](./1-stripes-simple.fs).

## Step 2 - Anti-Aliasing

Here is a first cut at anti-aliasing. 

In the 0-1 range of the texture parameter, there is a "hard edge" that we need to blur. In this version, I am only blurring that edge: the other edge occurs at the "wrap around" (when we go back from 1-0 at the edge of the pattern). I'll deal with that later.

For this demo, I am setting the amount of blur with the slider. If the blur is negative, I compute the amount using `fwidth` (which is what you can make blur negative). If you make blur positive, you can blur things too much.

<div id="stripes2"></div>
<script src="./2-stripes-aa.js" type="module" defer></script>

You can see this on a [clean html page](./2-stripes-aa.html), 
see the [js source](./2-stripes-aa.js), [vertex shader](./stripes.vs), and [fragment shader](./2-stripes-aa.fs).

## Step 3 - Two Sided Anti-Aliasing

It is much easier to anti-alias both sides of the stripe if they occur within the parameter range (rather than dealing with the wrap around). So this version of the shader puts each stripe at the middle of the parameter range, and checks for the edges of the stripes by distance to the middle.

<div id="stripes3"></div>
<script src="./3-stripes-twoside.js" type="module" defer></script>

You can see this on a [clean html page](./3-stripes-twoside.html), 
see the [js source](./3-stripes-twoside.js), [vertex shader](./stripes.vs), and [fragment shader](./3-stripes-twoside.fs).
