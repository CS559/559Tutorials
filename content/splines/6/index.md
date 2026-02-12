---
title: "Approximating Curves"
date: 2026-02-09T21:19:33-06:00
draft: false
weight: 60
page: 6
slug: '6'
---

It might seem like the easiest way to control a curve is to
specify a set of points for it to interpolate. In practice,
however, interpolation schemes often have undesirable properties
because they have less continuity and offer no control of what
happens between the points. Curve schemes that only approximate
the points are often preferred. With an approximating scheme, the
control points influence the shape of the curve, but do not
specify it exactly. Although we give up the ability to directly
specify points for the curve to pass through, we gain better
behavior of the curve and local control. The two most important
types of approximating curves in computer graphics are Bezier
Curves and B-Spline Curves.

<!--more-->
{{<not-book>}}

{{<xlink "6-bez">}}
{{<xlink "6-bsp">}}

<a id="sec:approx-excersizes"></a>
### Exercises

1. **Basis Matrix for Cubic Bezier:** The constraints for
	a segment of a Bezier cubic are:
	{{< displaymath >}}
	\begin{array}{rl}
	f(0) & = p_0\\
	f'(0) & = \frac{1}{3} (p_1 - p_0)\\
	f(1) & = p_3\\
	f'(1) & = \frac{1}{3} (p_3 - p_2)
	\end{array}
	{{< /displaymath >}}
	Using the methods of Section [Polynomial Pieces](#sec:piece), derive the basis
	matrix and blending functions for a Bezier cubic segment.
2. **Convert a Hermite Cubic to a Bezier:** Given the four control
	points of a segment of a Hermit spline, compute the control points of
	an equivalent Bezier segment.
3. **De Castijeau Algorithm:** Use the De Castijeau
	algorithm to evaluate the position of the cubic Bezier curve with
	its control points at (0,0), (0,1), (1,1) and (1,0) for parameter
	values {{< math "u=.5" >}} and {{< math "u=.75." >}} Drawing a sketch will help you do this.
4. **Cox / de Boor Recurrence:** Use the Cox / de Boor
	recurrence to derive Equation {{< eqref "eqn:linear-bsplines" >}}.
