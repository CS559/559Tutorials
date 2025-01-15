---
title: "Interpolation Comparison: High order (Laplacian) vs. Cardinal"
date: 2025-01-14T09:32:50-06:00
draft: false
categories: ["curves"]
---

This page provides an interactive demonstration of two types of interpolating curves: high order polynominals and cardinal (cubic) splines.

<!--more-->

<!-- WARNING: all links must be relative! -->
To see this [Demo on a plane html page](../../curve-demos/interpolation-demo.html) (useful for a lecture).

Suppose we have a set of points and we want to have a curve that passes through them. We'll start with 9 points.

This simplest thing to do is to "connect the dots" - draw line segments between the points. Mathematically, this is a "piecewise curve" - each line segment is a separate low-order polynomial (a line segment is a 1st degree polynomial). While this is simple, it is not smooth - it only has C(0) continuity.

Note: the diagrams are linked. You can move the control points in any one and they will change in all 3 diagrams. You can shift-click to add another point to the end, or command-click to delete a point.

<canvas style="border: 1px solid black" id="canvas0" height="200" width="315"></canvas>

Here are two "smoother" curves that are fit through the same points: on the left is a single n-1 degree polynomial (where n is the number of points, which is 9 to begin with); on the right is a "Cardinal Spline" - a piecewise polynomial with cubic polynomials between each pair of points (except for the ends).

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

Some things to notice:

1. The single polynomial is "smoother" - in that it has better continuity (all of its derivatives are continuous). This doesn't mean it is less wiggly - it just means that its derivatives are continuous. In contrast, the cardinal spline only has C(1) continuity (which is better than the C(0) continuity of the line segments).
2. The cardinal spline has **locality** when you move a control point, only the segments around it change. In contrast, the polynomial spline lacks locality: the whole curve depends on all of the points. If you move one point, other parts of the curve change - this makes it hard to control.

In general, we don't use higher order polynomials to do interpolation in computer graphics. In addition to the locality problem, there are numerical issues (high degree polynomials are numerically sensitive), they are difficult to control (they go through the points, but it is hard to predict what happens in between), etc.

If you're really curious, the interpolating polynomial is implemented using "Lagrange Polynomials" (you can look them up in the textbook). But, in practice, the main use for this class is to show why we don't use them.

Cardinal splines, you will learn about in class. They are important. 

<script src="../../curve-demos/interpolation-demo.js" type="module" defer></script>