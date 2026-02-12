---
title: "Putting Pieces Together"
date: 2026-02-09T21:19:26-06:00
draft: false
weight: 40
page: 4
---
Now that we've seen how to make individual pieces of polynomial
curves, we can consider how to put these curve pieces together.

<!--more-->
{{<not-book>}}

<a id="sec:knots"></a>
### Knots

The basic idea of a piecewise parametric function is that each piece
is only used over some parameter range. For example, if we want to
define a function that has two piecewise linear segments that connect
three points (as shown in Figure {{< lfigref "fig:two-lines-lines" >}}), we might
define:
{{< displaymath id="eqn:two-lines" >}}
\mathbf{f}(u) = \begin{array}{ll}
  \mathbf{f_1}(2*u) & \mathrm{if\ } 0 \leq u < \frac{1}{2}\\
  \mathbf{f_2}(2*u-1) & \mathrm{if\ } \frac{1}{2} \leq u < 1\\
\end{array}
{{< /displaymath >}}
where {{< math "\mathbf{f_1}" >}} and {{< math "\mathbf{f_2}" >}} are functions for each of
the two line segments. Notice that we have re-scaled the parameter for
each of the pieces to facilitate writing their equations as
{{< displaymath >}}
\mathbf{f_1}(u) = (1-u) \mathbf{p_1} + u \mathbf{p_2}.
{{< /displaymath >}}

{{< lfigure src="Figs/two-lines-lines.svg" caption="Line segments" label="fig:two-lines-lines" >}}

{{< lfigure src="Figs/two-lines-blend.svg" caption="Blending functions" label="fig:two-lines-blends" >}}

Two line segments connect three points. The blending functions for
each of the points are graphed at right.

For each polynomial in our piecewise function, there is a site (or
parameter value) where it starts and ends. Sites where a piece
function begins or ends are known as *knots.* For the example of
Equation {{< eqref "eqn:two-lines" >}}, the values of the knots are {{< math "0," >}} {{< math ".5," >}}
and {{< math "1." >}}

We may also write piecewise polynomial functions as the sum of basis
functions, each scaled by a coefficient. For example, we can re-write
the two line segments of Equation {{< eqref "eqn:two-lines" >}} as
{{< displaymath id="eqn:baby-bspline" >}}
\mathbf{f}(u) = \mathbf{p_1} b_1(u) +
		  \mathbf{p_2} b_2(u) +
		  \mathbf{p_3} b_3(u)
{{< /displaymath >}}
where the functions {{< math "b_1(u)" >}}, {{< math "b_2(u)" >}} and {{< math "b_3(u)" >}} are defined
appropriately. For example, we could write
{{< displaymath >}}
b_1(u) = \begin{array}{ll}
	 1-2u & \mathrm{\ if\ } 0 \leq u < \frac{1}{2}\\
	 0. & \mathrm{otherwise}
	  \end{array}
{{< /displaymath >}}
These functions are plotted in Figure {{< lfigref "fig:two-lines-blends" >}}.

The knots of a polynomial function are the combination of the knots of
all of the pieces that are used to create it. The *knot vector*
is a vector that stores all of the knot values in sorted order.

Notice that in this section we have used two different mechanisms for
combining polynomial pieces: using independent polynomial pieces for
different ranges of the parameter and blending together piecewise
polynomial functions.

### Using Independent Pieces

In Section [Polynomial Pieces](#sec:piece), we defined pieces of polynomials over the
unit parameter range. If we want to assemble these pieces, we need to
convert from the parameter of the overall function to the necessary
value of the parameter. The simplest way to do this is to define the
overall curve over the parameter range {{< math "[0,n]" >}} where {{< math "n" >}} is the number
of segments. Depending on the the value of the parameter, we can shift
it to the required range.

<a id="sec:together"></a>
### Putting Segments Together

If we want to make a single curve from two line segments, we need to
make sure that the end of the first line segment is at the same
location as the beginning of the next. There are three ways to connect
the two segments (in order of simplicity):

1. Represent the line segment as its two endpoints, and then
	use the same point for both. We call this a *shared-point*
	scheme.
2. Copy the value of the end of the first segment to the
	beginning
	of the second every time that the parameters of the first
	segment change. We call this a *dependency* scheme.
3. Write an explicit equation for the connection, and enforce it
	through numerical methods as the other parameters are changed.

While the simpler schemes are preferable since they require less
work, they also place more restrictions on the way the line
segments are parameterized. For example, if we wanted to provide
the center of the line segment as a parameter (so that the user
could specify it directly), we might want to use the beginning of
each line segment and the center of the line segment as their
parameters. This would force us to use the dependency scheme.

Notice that if we use a shared point or dependency scheme, the
total number of control points is less than {{< math "n*m," >}} where {{< math "n" >}} is
the number of segments and {{< math "m" >}} is the number of control points for
each segment; many of the control points of the independent pieces
will be computed as functions of other pieces.  Notice that if we
use either the shared-point scheme for lines (each segment has its
two endpoints as its parameters and shares interior points with
its neighbors), or if we use the dependency scheme (such as the
example one with the first endpoint and midpoint), we end up with
{{< math "n+1" >}} controls for an {{< math "n" >}} segment curve.

Dependency schemes have a more serious problem. A change in one place
in the curve can propagate through the entire curve. This is called a
lack of *locality.* Locality means that if you move a point on a
curve it will only effect a local region. The local region might be
big, but it will be finite. If a curve's controls do not have
locality, changing a control point may effect points infinitely far
away.

{{< lfigure src="Figs/non-local-lines.svg" caption="A chain of line segments with local control and one with non-local control" label="fig:segment-chains" >}}

To see locality, and the lack thereof, in action, consider two chains
of line segments, as shown in Figure {{< lfigref "fig:segment-chains" >}}. One
chain has its pieces parameterized by their endpoints and uses
point-sharing to maintain continuity. The other has its pieces
parameterized by an endpoint and midpoint, and uses dependency
propagation to keep the segments together. The two segment chains can
represent the same curves: they are both a set of {{< math "n" >}} connected line
segments. However, because of locality issues, the endpoint-shared is
likely to be more convenient for the user. Consider changing the
position of the first control point in each chain. For the
endpoint-sharing version, only the first segment will change, while
all of the segments will be affected in the midpoint version, as in
Figure {{< lfigref "fig:segment-chains" >}}.  In fact, for any point moved in the
endpoint-shared version, at most two line segments will change. In the
midpoint version all segments after the control point that is moved
will change, even if the chain were infinitely long.

In this example, the dependency propagation scheme was the one that
did not have local control. This is not always true. There are direct
sharing schemes that are not local, and propagation schemes that are.

We emphasize that locality is a convenience of control issue.
While it is inconvenient to have the entire curve change every
time, the same changes can be made to the curve. It simply
requires moving several points in unison.
