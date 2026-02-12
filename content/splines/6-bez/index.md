---
title: "Bezier Curves"
date: 2026-02-09T21:20:36-06:00
draft: false
weight: 61
page: 7
slug: '6BEZ'
---

Bezier curves are one of the most common representations for free-form
curves in computer graphics. The curves are named for Pierre Bezier,
one of the people who were instrumental in their development. Bezier
curves have an interesting history where they were concurrently
developed by several independent groups.

<!--more-->
{{<not-book>}}

A Bezier curve is a polynomial curve that approximates its control
points. The curves can be any degree of polynomial. A curve of degree
{{< math "d" >}} is controlled by {{< math "d+1" >}} control points. The curve
interpolates its first and last control points, and the shape is
directly influenced by the other points.

Often, complex shapes are made by connecting a number of Bezier curves
of low degree. To avoid confusion, we refer to each polynomial piece
as a segment. In computer graphics, cubic ({{< math "d=3" >}}) Bezier curves are
the most commonly used for each segment. Many popular illustration
programs, such as Adobe Illustrator, and font representation schemes,
such as that used in Postscript, use cubic Bezier segments.
Bezier curves are extremely popular in computer graphics because they
are easy to control, have a number of useful properties, and there are
very efficient algorithms for working with them.

Bezier curves are constructed such that:

- the curve interpolates the first and last control points,
	with {{< math "u=0" >}} and {{< math "1" >}} respectively;
- the first derivative of the curve at its begining (end) is
	determined by the vector between the first and second (next
	to last and last) control points. The derivatives are given
	by the vectors between these points scaled by the degree of
	the curve;
- higher derivatives at the begining (end) of the curve depend
	on the points at the begining (end) of the curve. The
	{{< math "n^{th}" >}} derivative depends on the first (last) {{< math "n+1" >}} points.

{{< lfigure src="Figs/new-bezier-cubic.svg" caption="A cubic Bezier segment is controlled by four points. It interpolates the first and last, and the begining and final derivatives are 1/3 of the vectors between the first two (or last two) points." label="fig:cubic-bezier" >}}

For example, consider the Bezier curve of degree 3 as in
Figure {{< lfigref "fig:cubic-bezier" >}}. The curve has four ({{< math "d+1" >}}) control
points. It begins at the first control point ({{< math "\mathbf{p_0}" >}}) and ends
at the last ({{< math "\mathbf{p_1}" >}}). The first derivative at the begining is
proportional to the vector between the first and second control points
({{< math "\mathbf{p_1}-\mathbf{p_0}" >}}). Specifically,
{{< math "\mathbf{f'}(0)=3(\mathbf{p_1}-\mathbf{p_0})" >}}. Similarly, the first
derivative at the end of the curve is given by
{{< math "\mathbf{f'}(1)=3(\mathbf{p_3}-\mathbf{p_2})" >}}. The second derivative
at the begining of the curve can be determined from control points
{{< math "\mathbf{p_0}" >}}, {{< math "\mathbf{p_1}" >}} and {{< math "\mathbf{p_2}" >}}.

Using the facts about Bezier cubics in the preceeding paragraph, we
can use the methods of Section [Cubics](#sec:cubics) to create a parametric
function for them. The definitions of the begining and end
interpolation and derivatives give:
{{< displaymath >}}
\begin{array}{rcl}
		 \mathbf{p_0} = & \mathbf{f}(0) &
				=   \mathbf{a_3} 0^3 + \mathbf{a_2} 0^2 + \mathbf{a_1} 0 + \mathbf{a_0}\\
		 \mathbf{p_3} = & \mathbf{f}(1)&
				=   \mathbf{a_3} 1^3 + \mathbf{a_2} 1^2 + \mathbf{a_1} u + \mathbf{a_0} \\
		 3(\mathbf{p_1}-\mathbf{p_0}) = & \mathbf{f'}(0) &
				= 3 \mathbf{a_3} 0^2 + 2 \mathbf{a_2} 0 + \mathbf{a_1}     \\
		 3(\mathbf{p_3}-\mathbf{p_2}) =&  \mathbf{f'}(1) &
				= 3 \mathbf{a_3} 1^2 + 2 \mathbf{a_2} 1 + \mathbf{a_1}.
\end{array}
{{< /displaymath >}}
This can be solved for the basis matrix
{{< displaymath >}}
\mathbf{B} = \mathbf{C}^{-1} =
\left[\begin{array}{rrrr}
 1&  0&  0& 0\\
-3&  3&  0& 0\\
 3& -6&  3& 0\\
-1&  3& -3& 1\\
\end{array}\right],
{{< /displaymath >}}
and then written as
{{< displaymath >}}
\mathbf{f}(u) = (1-3u+3u^2-u^3) \mathbf{p_0}
				 + (3u-6u^2+3u^3) \mathbf{p_1}
				 + (3u^2-3u^3) \mathbf{p_2}
				 + (u^3) \mathbf{p_3},
{{< /displaymath >}}
or
{{< displaymath >}}
\mathbf{f}(u) = \displaystyle\sum_{i=0}^{d} b_{i,3}\mathbf{p_i}
{{< /displaymath >}}
where the {{< math "b_{i,3}" >}} are the Bezier blending functions of degree 3:
{{< displaymath >}}
\begin{array}{rl}
	 b_{0,3} = & (1-u)^3 \\
	 b_{1,3} = & 3u(1-u)^2\\
	 b_{2,3} = & 3u^2(1-u)\\
	 b_{3,3} = & u^3.
\end{array}
{{< /displaymath >}}

Fortunately, the blending functions for Bezier curves have a special
form that works for all degrees. These functions are known as the
*Bernstein Basis Polynomials* and have the general form
{{< displaymath >}}
b_{k,n}(u) = C(n,k)\ u^k\ (1-u)^{(n-k)},
{{< /displaymath >}}
where {{< math "n" >}} is the degree of the Bezier curve, and {{< math "k" >}} is the blending
function number between 0 and {{< math "d" >}} (inclusive). {{< math "C(n,k)" >}} is the
binomial coefficients
{{< displaymath >}}
C(n,k) = \frac{n!}{k!\ (n-k)!}.
{{< /displaymath >}}

Given the positions of the control points {{< math "\mathbf{p_i}," >}} the
function to evaluate the Bezier curve of degree {{< math "d" >}} (with {{< math "d+1" >}}
control points) is:
{{< displaymath >}}
\mathbf{p}(u)\ =\ \displaystyle\sum_{k=0}^d \mathbf{p_k} C(n,k)\ u^k\ (1-u)^{(n-k)}.
{{< /displaymath >}}

Some Bezier segments are shown in Figure {{< lfigref "fig:bez-segs" >}}.
{{< lfigure src="Figs/bezierSegments.svg" caption="Various Bezier segments of degree 2-6. The control points are shown with crosses, and the control polygon (line segments connecting the control points) are also shown." label="fig:bez-segs" >}}

Bezier segments have several useful properties:

- The curve is bounded by the convex hull of the control points.
- Any line intersects the curve no more times than it intersects
	the set of line segments connecting the control points. This
	is called the *variation diminishing* property. This
	property is illustrated in Figure {{< lfigref "fig:var-dim" >}}.
- The curves are symmetric: reversing the order of the control
	points yields the same curve, with a reversed parameterization.
- The curves are *affine invariant.* This means that
	translating, scaling, rotating, or skewing the control points is
	the same as performing those operations on the curve itself.
- There are good simple algorithms for evaluating and subdiving
	Bezier curves into pieces that are themselves Bezier
	curves. A good subdivision algorithm makes divide and conquer
	algorithms viable.

{{< lfigure src="Figs/bez-var-dim.svg" caption="The variation diminishing property of Bezier Curves means that the curve crosses does not cross a line more than its control polygon does. Therefore, if the control polygon has no wiggles the curve will not either. B-Splines (Section [B-Splines](#sec:bsplines)) also have this property." label="fig:var-dim" >}}

When Bezier segments are connected together to make a spline,
connectivity between the segments is created by sharing the
endpoints. However, continuity of the derivatives must be created
by positioning the other control points. This provides the user of
a Bezier spline with control over the smoothness. For {{< math "G(1)" >}}
continuity, the 2nd to last point of the first curve and the
second point of the 2nd curve must be collinear with the equated
endpoints. For {{< math "C(1)" >}} continuity, the distances between the points
must be equal as well. This is illustrated in
Figure {{< lfigref "fig:connectBeziers" >}}.

{{< lfigure src="Figs/bez-connect.svg" caption="Two Bezier segments connect to form a C(1) spline because the vector between the last two points of the first segment is equal to the vector between the first two points of the second segment." label="fig:connectBeziers" >}}

<a id="sec:bezier-intuition"></a>
#### Geometric Intuition for Bezier Curves

Bezier curves can be derived from geometric principles, as well as
the algebraic methods described above. We outline this because it
provides intuitions for how Bezier curves work.

Imagine that we have a set of control points that we want to create a
smooth curve from. Simply connecting the points with lines (to form
the control polygon) will lead to something that is non-smooth. It
will have sharp corners. We could imagine "smoothing" this polygon
by cutting off the sharp corners, yielding a new polygon that was
smoother, but still not "smooth" in the mathematical sense (since
the curve is still a polygon, and therefore only {{< math "C(0)." >}} We could
repeat this process, each time yielding a smoother polygon, as shown
in Figure {{< lfigref "fig:smooth-poly" >}}. In the limit, that is if we repeated
the process infinitely many times, we would obtain a {{< math "C(1)" >}} smooth
curve.

{{< lfigure src="Figs/cornercut.svg" caption="By repeatedly cutting the corners off a polygon, we approach a smooth curve." label="fig:smooth-poly" >}}

What we have done with corner cutting is defining a *subdivision*
scheme. That is, we have define curves by a process for breaking a
simpler curve into smaller pieces (e.g. subdividing it). The resulting
curve is the *limit curve* that is achieved by applying the
process infinitely many times. If the subdivision scheme is define
correctly, the result will be a smooth curve and will have a
parametric form.

Let us consider applying corner cutting to a single corner. Given
three points ({{< math "\mathbf{p_0}," >}} {{< math "\mathbf{p_1}," >}} {{< math "\mathbf{p_2}" >}}), we
repeatedly "cut off the corners" as shown in
Figure {{< lfigref "fig:subd" >}}. At each step, we divide each line segment
in half, connecting the midpoints, and then move the corner point
to the midpoint of the new line segment. Note that in this
process, new points are introduced, moved once, and then remain in
this position for any remaining iterations. The endpoints never
move.

{{< lfigure src="Figs/bezier-cutoff.svg" caption="Subdivision procedure for Quadratic Beziers. Each line segment is divided in half and these midpoints are connected (gray points and lines). The interior control point is moved to the midpoint of the new line segment (white circle)." label="fig:subd" >}}

If we compute the "new" position for {{< math "\mathbf{p_2}" >}} as the midpoint
of the midpoints, we get the expression:
{{< displaymath >}}
\mathbf{p_2'} = \frac{1}{2} ( \frac{1}{2} \mathbf{p_0} + \frac{1}{2} \mathbf{p_1} ) +
				\frac{1}{2} ( \frac{1}{2} \mathbf{p_1} + \frac{1}{2} \mathbf{p_2} ).
{{< /displaymath >}}
The construction actually works for other proportions of distance
along each segment. If we let {{< math "u" >}} be the proportion of the way between
the beginning and the end of each segment we place the middle point,
we can re-write this expression as:
{{< displaymath >}}
\mathbf{p}(u) = (1-u) ( (1-u) \mathbf{p_0} + u \mathbf{p_1} ) +
				u ( (1-u) \mathbf{p_1} + u \mathbf{p_2} ).
{{< /displaymath >}}
Regrouping terms gives the Quadratic Bezier function: Bezier
curve:
{{< displaymath >}}
\mathbf{B_2}(u) = (1-u)^2 \mathbf{p_0} +
				2 u (1-u) \mathbf{p_1} +
					u^2     \mathbf{p_2}.
{{< /displaymath >}}

#### The De Casteljeau Algorithm

One nice feature of Bezier Curves is that there is a very simple and
general method for computing and subdiving them. The method, called
the *de Casteljau Algorithm,* uses a sequence of linear
interpolations to compute the positions along the Bezier curve of
arbitrary order. It is the generalization of the subdivision scheme
described in the previous section.

The De Casteljau algorithm begins by connecting every adjacent set of
points with lines, and finding the point on these lines that is the
{{< math "u" >}} interpolation, providing a set of {{< math "n-1" >}} points. These points are
then connected with straight lines, those lines are interpolated
(again by {{< math "u" >}}), giving a set of {{< math "n-2" >}} points. This process is repeated
until there is one point. An illustration of this process is shown in
Figure {{< lfigref "fig:de-casteljau" >}}.

{{< lfigure src="Figs/decasteljau3.svg" caption="An illustration of the De Casteljau algorithm for a cubic Bezier. The left shows the construction for u=.5. The right shows the construction for .25, .5, and .75." label="fig:de-casteljau" >}}

The process of computing a point on a Bezier segment also
provides a method for dividing the segment at the point. The
intermediate points computed during the de Casteljau algorithm
form the new control points of the new, smaller segments, as shown
in Figure {{< lfigref "fig:bez-subd" >}}.

{{< lfigure src="Figs/bez-sudb-3.svg" caption="The de Casteljau algorithm is used to subdiving a cubic Bezier segment. The initial points (black diamonds A, B, C, and D) are linearly interpolated to yield gray circles (AB, BC, CD), which are linearly interpolated to yield white circles (AC, BD), which are linearly interpolated to give the point on the cubic AD. This process also has subdivided the Bezier segment with control points A,B,C,D into two Bezier segments with control points A, AB, AC, AD and AD, BD, CD, D." label="fig:bez-subd" >}}

The existence of a good algorithm for dividing Bezier curves makes
possible divide-and-conquer algorithms. For example, when drawing a
Bezier curve segment, it is easy to check to see if the curve is
close to being a straight line because it is bounded by its convex
hull. If the control points of the curve are all close to being
co-linear, the curve can be drawn as a straight line. Otherwise, the
curve can be divided into smaller pieces, and the process can be
repeated. Similar algorithms can be used for tasks like determining
the intersection between two curves. Because of the existence of such
algorithms, other curve representations are often converted to Bezier
form for processing.

