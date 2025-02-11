---
title: "Bspline1"
date: 2025-01-14T20:04:33-06:00
draft: false
category: ["curves"]
---

A simple demo of cubic B-Splines that gives yoyu a sense of how they respond as the points move.

<!--more-->

<canvas style="border: 1px solid black" id="canvas1" height="300" width="500"></canvas>
<script src="../../curve-demos/bspline-01.js" type="module" defer></script>

Try this...

Initially, the curve is a single segment - a B-Spline segment is controlled by the 4 control points. Move the points around and notice how it is influenced by them - it does not interpolate them.

Shift click to add another control point. With 5 points, there are two segments: the blue segment (its control points are marked blue), and the red segment (red control points). The segments share 3 control points (the are both red and blue). Notice how the segments stay attached with C(2) continuity as the points are moved.

Shift click again to add yet another control point, and another segment. Each segment is shown in a different color, and the control points that influence it have a circle of that color. Each segment is controlled by 4 consecutive points - and it shares 3 points with its neighbors.

Add more points... notice how any point influences at most 4 segments. And each segment is influenced by 4 control points. 

## More Points

Here is the same demo, with some more points.

<canvas style="border: 1px solid black" id="canvas2" height="300" width="500"></canvas>

