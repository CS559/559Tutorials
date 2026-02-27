---
title: "Cubics"
date: 2026-02-09T21:19:29-06:00
draft: false
weight: 50
page: 5
---

In graphics, when we represent curves using piecewise polynomials we
usually use either line segments or cubic polynomials for the pieces.
There are a number of reasons why cubics are popular in computer
graphics:

<!--more-->
{{<not-book>}}

- Piecewise cubic polynomials allow for {{< math "C(2)" >}} continuity, which
	is generally sufficient for most visual tasks. The {{< math "C(1)" >}}
	smoothness that quadratics offer is often insufficient. The
	greater smoothness offered by higher order polynomials is rarely
	important.
- Cubic curves provide the minimum-curvature interpolants to a set
	of points. That is, if you have a set of {{< math "n+3" >}} points and define
	the "smoothest" curve that passes through them (that is the
	curve that has the minimum curvature over its length), this
	curve can be represented as a piecewise cubic with {{< math "n" >}}
	segments.
- Cubic polynomials have a nice symmetry where position and
	derivative can be specified at the beginning and end.
- Cubic polynomials have a nice tradeoff between the numerical
	issues in computation and the smoothness.
- The linear equations that cubics lead to (when using the matrix
	forms of Section [Matrix Form for Polynomials](#sec:matrix)) are {{< math "4 \times 4" >}}, and computer
	graphicists tend to like {{< math "4 \times 4" >}} matrices.
- Everyone in computer graphics seems to use cubics. It is what the
	books talk about, its what the graphics libraries best support,
	\ldots The popularity of cubics is somewhat self-perpetuating.

Notice that we do not have to use cubics. They just tend to be the
best tradeoff between amount of smoothness and complexity. Different
applications may have different tradeoffs. For example, many font
rendering systems use quadratic polynomials. We focus on cubics since
they are what most computer graphics end up use.

The canonical form of a cubic polynomial is:
{{< displaymath >}}
\mathbf{f}(u) = a_0 + a_1 \ u + a_2 \ u^2 + a_3 \ u^3.
{{< /displaymath >}}
As we discussed in Section [Polynomial Pieces](#sec:piece), these canonical form
coefficients are not a convenient way to describe a cubic segment.

In this chapter, we seek to find forms of cubic polynomials for which
the coefficients are a convenient way to control the resulting curve
represented by the cubic. One of the main conveniences will be to
provide ways to insure the connectedness of the pieces and the
continuity between the segments.

Each cubic polynomial piece requires 4 coefficients or control
points. That means for a piecewise polynomial with {{< math "n" >}} pieces, we may
require up to {{< math "4n" >}} control points if no sharing between segments is
done or dependencies used. More often, some part of each segment is
either shared or depends on an adjacent segment, so the total number
of control points is much lower. Also, note that a control point might
be a position, or a derivative of the curve.

Unfortunately, there is no single "best" representation for a
piecewise cubic. It is not possible to have a piecewise polynomial
curve representation that has all of the following desirable
properties:

1. each piece of the curve is a cubic;
2. the curve interpolates the control points;
3. the curve has local control;
4. the curve has {{< math "C(2)" >}} continuity.

We can have any three of these properties, but not all four. The are
representations that have any combination of three. In this document,
we will discuss cubic B-Splines that do not interpolate their control
points (but have local control and are {{< math "C(2)" >}}), Cardinal and
Catmull-Rom splines that interpolate their control points and offer
local control but are not {{< math "C(2)" >}}, and natural cubics that interpolate
and are {{< math "C(2)," >}} but do not have local control.

The continuity properties of cubics refer to the continuity
between the segments (at the knot points). The cubic pieces
themselves have infinite continuity in their derivatives (the way
we have been talking about continuity so far). Note that if you
have a lot of control points (or knots), the curve can be wiggly,
which might not seem "smooth."

<a id="sec:natural-cubics"></a>
### Natural Cubics

With a piecewise cubic curve, it is possible to create a {{< math "C(2)" >}}
curve. To do this, we need to specify the position, first and second
derivative at the beginning of each segment (so that we can make sure
that it is the same as the end of the previous segment). Notice, that
each curve segment receives 3 out of its 4 parameters from the
previous curve in the chain. These {{< math "C(2)" >}} continuous chains of cubics
are sometimes referred to as *natural* cubic splines.

For one segment of the natural cubic, we need to parameterize the
cubic by the positions of its endpoints, and the first and second
derivative at the beginning point. The control points are therefore:
{{< displaymath >}}
\begin{array}{lll}
\mathbf{p_0} & = f(0)   & = \mathbf{a_0} + 0^1 \ \mathbf{a_1} +
		0^2\ \mathbf{a_2} + 0^3\ \mathbf{a_3}\\
\mathbf{p_1} & = f'(0)  & = \mathbf{a_1} + 2\ 0^1\ \mathbf{a_2} +
		3\ 0^2\ \mathbf{a_3} \\
\mathbf{p_2} & = f''(0) & = 2\ \mathbf{a_2} + 6\ 0^1\ \mathbf{a_3}\\
\mathbf{p_3} & = f(1)   & = \mathbf{a_0} + 1^1 \ \mathbf{a_1} +
		\ 1^2 \ \mathbf{a_2} + 1^3\ \mathbf{a_3}.
\end{array}
{{< /displaymath >}}
Therefore, the constraint matrix is:
{{< displaymath >}}
\mathbf{C} =
\left[ \begin{array}{cccc}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 2 & 0 \\
1 & 1 & 1 & 1
			 \end{array}
\right],
{{< /displaymath >}}
and the basis matrix is:
{{< displaymath >}}
\mathbf{B} =
\mathbf{C^{-1}} =
\left[ \begin{array}{cccc}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & .5 & 0 \\
-1 & -1 & -.5 & 1
			 \end{array}
\right].
{{< /displaymath >}}

Given a set of {{< math "n" >}} control points, a natural cubic splines has
{{< math "n-3" >}} cubic segments. The first segment uses the control points to
define its beginning position, ending position, and first and
second derivative at the beginning. A dependency scheme copies the
position, first, and second derivative of the end of the first
segment for use in the second segment.

The disadvantage of natural cubic splines is that they are not
local. Any change in any segment may require the entire curve to
change (at least the part after the change was made). Another issue is
that we only have control over the derivatives at the curve at its
beginning. Segments after the beginning of the curve determine their
derivatives from their beginning point.

<a id="sec:hermite"></a>
### Hermite Cubics

Hermite cubic polynomials were discussed in
Section [Basis Matrices for Cubics](#sec:compute-cubic-matrix). A segment of a cubic Hermite
Spline allows the positions and first derivatives of both of its end
points to be specified. A chain of segments can be linked into a
{{< math "C(1)" >}} spline by using the same values for the position and derivative
of the end of one segment and the beginning of the next.

Given a set of {{< math "n" >}} control points, where every other control point is
a derivative value, a cubic Hermite spline contains {{< math "(n-2)/2" >}} cubic
segments. The spline interpolates the points, as shown in
Figure {{< lfigref "fig:hermite" >}}, but only can guarantee {{< math "C(1)" >}} continuity.

{{< lfigure src="Figs/hermite.svg" caption="A Hermite Cubic Spline made of 3 segments." label="fig:hermite" >}}

Hermite cubics are convenient because they provide local control over
the shape, and provide {{< math "C(1)" >}} continuity. However, since the user must
specify both positions and derivatives, a special interface for the
derivatives must be provided. One possibility is to provide the user
with points that represent where the derivative vectors would end if
they were "placed" at the position point.

<a id="sec:cardinal"></a>
### Cardinal Cubics

A *Cardinal Cubic Spline* is a type of {{< math "C(1)" >}} interpolating
spline made up of cubic polynomial segments. Given a set of {{< math "n" >}}
control points, a cardinal cubic spline uses {{< math "n-2" >}} cubic polynomial
segments to interpolate all of its points except for the first and
last.

Cardinal Splines have a parameter called *tension* that controls
how "tight" the curve is between the points it interpolates. For the
important special case of {{< math "t=0," >}} the splines are called *Catmull-Rom* splines.

Each segment of the cardinal spline uses 4 control points. For segment
{{< math "i," >}} the points used are {{< math "i" >}}, {{< math "i+1" >}}, {{< math "i+2" >}}, and {{< math "i+3" >}} as the segments
share 3 points with their neighbors. Each segment begins at its second
control point and ends at its third control point. The derivative at
the beginning of the curve is determined by the vector between the
first and third control points, while the derivative at the end of the
curve is given by the vector between the second and forth points, as
shown in Figure {{< lfigref "fig:cardinal-segment" >}}.

{{< lfigure src="Figs/cardinal-segment.svg" caption="A segment of a cardinal cubic spline interpolates its second and third control points (\mathbf{p_2} and \mathbf{p_3}), and uses its other points to determine the derivatives at the beginning and end." label="fig:cardinal-segment" >}}

The tension parameter adjusts how much the derivatives are
scaled. Specifically, the derivatives are scaled by {{< math "1/2 (1-t)." >}} The
constraints on the cubic are therefore:
{{< displaymath >}}
\begin{array}{rl}
f(0) = & \mathbf{p_2} \\
f(1) = & \mathbf{p_3} \\
f'(0) = & \frac{1}{2}(1-t)(\mathbf{p_3} - \mathbf{p_1}) \\
f'(1) = & \frac{1}{2}(1-t)(\mathbf{p_4} - \mathbf{p_2})
\end{array}.
{{< /displaymath >}}
Solving these for the control points (defining {{< math "s=(1-t)/2" >}}) gives:
{{< displaymath >}}
\begin{array}{rll}
\mathbf{p_1} = & f(1) - \frac{2}{1-t}f'(0) & =
		a_0 + (1-\frac{1}{s}) a_1 + a_2 + a3 \\
\mathbf{p_2} = & f(0) & = a_0 \\
\mathbf{p_3} = & f(1) & = a_0 + a_1 + a_2 + a3 \\
\mathbf{p_4} = & f(0) + \frac{1}{s}f'(1) & =
		a_0 + \frac{1}{s} a_1 + 2 \frac{1}{s} a_2 + 3
		\frac{1}{s} a3 \\
\end{array}
{{< /displaymath >}}

This gives the cardinal matrix
{{< displaymath >}}
\mathbf{B} = \mathbf{C^{-1}} =
\left[
\begin{array}{cccc}
0 & 1 & 0 & 0\\
-s & 0 & s & 0 \\
2s & s-3 & 3-2s & -s\\
-s & 2-s& s-2 & s
\end{array}
\right].
{{< /displaymath >}}

Since the third point of segment {{< math "i" >}} is the second point of segment
{{< math "i+1" >}}, adjacent segments of the cardinal spline connect. Similarly,
the same points are used to specify the first derivative of each
segment, providing {{< math "C(1)" >}} continuity.

Cardinal splines are useful because they provide an easy way to
interpolate a set of points with {{< math "C(1)" >}} continuity and local
control. They are only {{< math "C(1)" >}}, so they sometimes get "kinks" in
them. The tension parameter give some control over what happens
between the interpolated points, as shown in
Figure {{< lfigref "fig:cardinals" >}}.

{{< lfigure src="Figs/cardinal.svg" caption="Cardinal splines through the 7 control points with varying values of tension parameter t." label="fig:cardinals" >}}

In Figure {{< lfigref "fig:cardinals" >}}, a set of cardinal splines through a set
of points are shown. The curves use the same control points, but use
different values for the tension parameters. Note that the first and
last control points are not interpolated.

Given a set of {{< math "n" >}} points to interpolate, you might wonder why we
might prefer to use a cardinal cubic spline (that is a set of {{< math "n-2" >}}
cubic pieces) rather than a single, order {{< math "n" >}} polynomial as described
in Section [Interpolating Polynomials](#sec:interp).  Some of the disadvantages of the interpolating
polynomial are:

- The interpolating polynomial tends to overshoot the points, as seen in
	Figure {{< lfigref "fig:cat-vs-lag" >}}. This overshooting gets worse as the
	number of points grows greater. The cardinal splines tend to be
	well behaved in between the points.
- Control of the interpolating polynomial is not local. Changing a
	point at the beginning of the spline affects the entire
	spline. Cardinal splines are local: any place on the spline is
	affected by its 4 neighboring points at most.
- Evaluation of the interpolating polynomial is not
	local. Evaluating a point on the polynomial requires access to
	all of its points. Evaluating a point on the piecewise cubic
	requires a fixed small number of computations, no matter how
	large the total number of points is.

There are a variety of other numerical and technical issues in using
interpolating splines as the number of grows
larger. See (Source: deboor-splines-book) for more information.

{{< lfigure src="Figs/cat-vs-lag.svg" caption="Splines interpolating 9 control points (marked with small crosses). The thick gray line shows an interpolating polynomial. The thin, dark line shows a Catmull-Rom spline. The latter is made of 7 cubic segments, which are each shown in alternating gray tones." label="fig:cat-vs-lag" >}}

A cardinal spline has the disadvantage that it does not interpolate
the first or last point, which can be easily fixed by adding an extra
point at either end of the sequence. The cardinal spline also is not
as continuous - providing only {{< math "C(1)" >}} continuity at the knots.

### Exercises
