---
title: "Cardinals 2: Understand Interpolation"
date: 2025-01-14T19:43:56-06:00
draft: false
categories: ["curves"]
---


This page provides a simple comparison of Cardinal interpolaton (cubic splines) and interpolating polynomials. An example with more points is at {{<link interpolation>}}. It can help understand Cardinal Splines a bit better.

<!--more-->

# Four Points

<div style="display: flex">
    <div style="margin:10px;flex-basis: min-content">
        <canvas style="border: 1px solid black" id="canvas1" height="200" width="315"></canvas>
        <div style="font-style: italic; text-align: center">
            Polynomial interpolation
        </div>
    </div>
    <div style="margin:10px;flex-basis: min-content">
        <canvas style="border: 1px solid black" id="canvas2" height="200" width="315"></canvas>
        <div style="font-style: italic; text-align: center">
            Cardinal spline
        </div>
    </div>
</div>


# Seven Points

<div style="display: flex">
    <div style="margin:10px;flex-basis: min-content">
        <canvas style="border: 1px solid black" id="canvas1b" height="200" width="315"></canvas>
        <div style="font-style: italic; text-align: center">
            Polynomial interpolation
        </div>
    </div>
    <div style="margin:10px;flex-basis: min-content">
        <canvas style="border: 1px solid black" id="canvas2b" height="200" width="315"></canvas>
        <div style="font-style: italic; text-align: center">
            Connected Polynomial Segments
        </div>
    </div>
    <div style="margin:10px;flex-basis: min-content">
        <canvas style="border: 1px solid black" id="canvas3b" height="200" width="315"></canvas>
        <div style="font-style: italic; text-align: center">
            Cardinal spline
        </div>
    </div>
</div>

<script src="../../curve-demos/curve-demo-01.js" type="module" defer></script>
<script src="../../curve-demos/curve-demo-02.js" type="module" defer></script>
