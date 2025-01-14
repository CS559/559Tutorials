---
title: "Interpolation Comparison: High order (Laplacian) vs. Cardinal"
date: 2025-01-14T09:32:50-06:00
draft: false
categories: ["curves"]
---

This page provides an interactive demonstration of two types of interpolating curves: high order polynominals and cardinal (cubic) splines.

<!--more-->

To see this [Demo on a plane html page](/curve-demos/interpolation-demo.html) (useful for a lecture).

Suppose we have a set of points and we want to have a curve that passes through them. We'll start with 9 points.

This simplest thing to do is to "connect the dots" - draw line segments between the points. Mathematically, this is a "piecewise curve" - each line segment is a separate low-order polynomial (a line segment is a 1st degree polynomial). While this is simple, it is not smooth - it only has C(0) continuity.

<canvas style="border: 1px solid black" id="canvas0" height="200" width="315"></canvas>

Note: the diagrams are linked. You can move the control points in any one and they will change in all 3 diagrams. You can shift-click to add another point to the end, or command-click to delete a point.

<canvas style="border: 1px solid black" id="canvas1" height="200" width="315"></canvas>
<canvas style="border: 1px solid black" id="canvas2" height="200" width="315"></canvas>
<script src="/curve-demos/interpolation-demo.js" type="module" defer>