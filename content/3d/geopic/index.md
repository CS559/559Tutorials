---
title: "Pictures Made Of Triangles"
date: 2025-03-12T00:23:09-05:00
draft: false
---

On the left is an image drawn using a texture.

On the right is the same image but drawn by coloring triangles.

<!--more-->

(more description coming soon)

<div style="display: flex; flex-direction: row; gap: 10px;">
    <div id="texpic_canvas"></div>
    <div id="geopic_canvas"></div>
</div>

<br/>

<label>Select An Image:</label>
<select id="image_selector">
    <option value="">-- Select An Image --</option>
    <option value="./dots.jpg">Dots</option>
    <option value="./checkerboard.png">Checkerboard</option>
    <option value="./snow_flakes.svg">Snowflakes</option>
    <option value="./moving_scales.svg">Circles</option>
    <option value="./ice_cream.svg">Ice Cream</option>
    <option value="../../textures/HDRIHeaven/rooituo_Back.png">Rooituo 1</option>
    <option value="../../textures/HDRIHeaven/rooituo_Bottom.png">Rooituo 2</option>
    <option value="../../textures/HDRIHeaven/rooituo_Front.png">Rooituo 3</option>
    <option value="../../textures/HDRIHeaven/rooituo_Left.png">Rooituo 4</option>
    <option value="../../textures/HDRIHeaven/rooituo_Right.png">Rooituo 5</option>
    <option value="../../textures/HDRIHeaven/rooituo_Top.png">Rooituo 6</option>
</select>

<label>Upload An Image:</label>
<input id="image_uploader" type="file" name="file" accept="image/*">

<div style="display: flex; flex-direction: row;">
    <div id="div1"></div>
    <div id="div2"></div>
</div>

<script src="./geopic.js" type="module" defer></script>
