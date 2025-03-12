---
title: "Pictures Made Of Triangles"
date: 2025-03-12T00:23:09-05:00
draft: true
---

Select an image and see what it looks like when drawn using triangles.

<!--more-->

<div id="canvas_div"></div>

<br/>

<label>Select An Image:</label>
<select id="image_selector">
    <option value="">-- Select An Image --</option>
    <option value="./ice_cream.svg">Ice Cream</option>
    <option value="./moving_scales.svg">Circles</option>
    <option value="./snow_flakes.svg">Snowflakes</option>
</select>

<label>Upload An Image:</label>
<input id="image_uploader" type="file" name="file" accept="image/*">

<script src="./geopic.js" type="module" defer></script>
