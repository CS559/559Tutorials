---
title: "Train2019"
date: 2025-01-14T20:05:01-06:00
draft: false
category: ["curves"]
---

An old version of the train demo - so you can see the curves in action!

<!--more-->

{{<train>}}

## Lessons of the Train

You can use the train demo to see many of the important concepts for Curves, and for implementing the train itelf. We recommend that student experiment with the train to understand the concepts.

1. The track is a **cardinal cubic spline**. Move the control points around to get a feel for how a cardinal spline behaves. To see the actual curve, click the simple track option. The track is a loop.The "simple track" option converts the cardinal spline to a series of Beziers (just like you did in the previous workbook).  I do not show the Bezier control points.

2. The position of the train is determined by evaluating the cardinal spline. We compute the cardinal cubic at the parameter value to get the position. We evaluate the tangent at the parameter value to determine which direction the train is pointing (the train points in the direction it is moving). The assignment says the train must have an obvious front - for me it's the side with the light on it.

3. To understand the parameters of the cardinal spline, turn off arc length parameterization. Notice that the slider (for the parameter) goes from 0 to the number of points. For example, a value of 2.5 says the train is between points 2 and 3, with $u$ value 0.5.

4. In case you haven't figured it out already: use the slider to change the parameter value and make the train go around the track. If you click the button on the left of the slider it runs continually. This is a feature of the UI code that you will get.

5. To understand arc length parameterization... notice how (in the initial layout at least) the three points at the bottom are closer together than the points at the top. The spline segment between two of the close points at the bottom is much shorter than the segment between the points on top. Yet, each segment has the same $u$ range, so it takes the same amount of time to traverse. When you run the train (with arc-length parameterization off), it slows down on the parts where the points are close together, and speeds up when they are farther apart. If you turn  on arc-length parameterization, the train goes at a constant speed around the track.

6. If you turn off "simple-track", you'll see my track with parallel rails and rail ties (the thing that go across the two rails). The rail ties always use arc-length parameterization, so they are spaced apart evenly. The rail ties are perpendicular to the track - we can use the tangent, and turn 90 degrees. If you don't use arc-length parameterization, they are spaced unevenly and look silly.

7. The parallel rails are interesting because they turn out to be complex mathematically. To have "parallel curves" we need to have the curves be spaced apart, along the "normal" direction (the direction perpendicular to the tangent) by a fixed amount. This is called an **offset curve**. It turns out that the offset curve to a Bezier cubic (or any cubic), is (in general) not a cubic. (I've seen places say its a 10th degree polynomial). What I've done is approximate the offset curves by taking steps along the curve, computing the normal (by computing the tangent and turning 90 degrees), and then moving in that direction a bit. It's kind of like connecting the ends of the rail ties, except that it's smaller.

8. The smoke is a hack. You can watch it and figure out how simple and silly it is. I think it's kind of fun.

9. Notice that the $C(1)$ interpolating cardinal spline isn't very smooth - it still turns pretty sharply at the control points. To get a smoother track, we really need $C(2)$. I implemented a different type of curve, called B-Splines. If you click the B-Splines button, you will get this curve type. Notice that the B-Spline is much smoother, but it is an **approximating** curve: it is influenced by the control points, but it does not interpolate them. You can learn about B-Splines in the book; we will hopefully get to discuss them in lecture.

10. An important feature of my demo: all of the fancier features (parallel rails, rail ties, smoke, arc-length parameterization, B-Splines) can be turned on and off. Click the checkboxes, and you can see the basic train. If a grader were grading it, they could check that I did the basic assignment. 

