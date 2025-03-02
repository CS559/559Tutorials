---
title: "Table and Book (Texture Demo)"
date: 2025-03-01T08:24:11-05:00
draft: false
---

A simple demo of putting the the textbook on a "table". 

This shows using a real image for a texture (the book). For the woodgrain it allows exploring concepts of scale, mirroring, and repeat.

<!--more-->

<div id="div1"></div>
<script src="./table.js" type="module" defer></script>

## What do look for...

For the book, notice that the top and bottom of the book are just a single polygon - so they do Z-fight with the table. 

For the table... notice that the wood grains seem too big (compared to the book). Raise the texture scale, and you might get a more reasonable sized grain - but the repeating pattern becomes problematic at the edges. Turn on mirroring (this is what in woodworking they call "bookmatching") and the edges disappear.

And I know the buttons and sliders aren't formatted correctly...
