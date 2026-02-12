---
title: "B-Splines"
date: 2026-02-09T21:20:50-06:00
draft: false
weight: 62
page: 8
slug: '6BSP'
---

B-Splines provide a method for approximating a set of {{< math "n" >}} points with
a curve made up of polynomials of degree {{< math "d" >}} that gives {{< math "C(d-1)" >}}
continuity. Unlike the Bezier splines of the previous section,
B-Splines allow curves to be generated for any desired degree of
continuity (almost up to the number of points). B-Splines are,
therefore, a prefered method for specifying very smooth curves (high
degrees of continuity) in computer graphics. If we want a {{< math "C(2)" >}} (or
higher) curve through an arbitrary number of points, B-Splines are
probably the right method.

{{<not-book>}}

The approach of using B-Splines represents a curve using a spline (a
piecewise polynomial function) that is expressed as a linear
combination of a set of basis functions. Since these basis functions
are themselves splines, we call them Basis Splines or B-Splines for
short. Each B-Spline or basis function is made up of a set of {{< math "d+1" >}}
polynomials each of degree {{< math "d." >}} The methods of B-Splines provide
general procedures for defining these functions.

The term B-Spline specifically refers to one of the basis
functions, not the function created by the linear combination of a
set of B-Splines. However, there is inconsistency in how the term
is used in computer graphics. Commonly, a "B-Spline Curve" is
used to mean a curve represented by the linear combination of
B-Splines.

The idea of representing a polynomial as the linear combination of
other polynomials has been discussed in Section [Polynomial Notation](#sec:poly-note),
and [Blending Functions](#sec:blend-func). Representing a spline as a linear combination of
other splines was shown in Section [Knots](#sec:knots). In fact, the
example given is a simple case of a B-Spline.

The general notation for representing a function as a linear
combination of other functions is
{{< displaymath id="eqn:generic-basis" >}}
f(t) = \sum_{i=1}^n p_i b_i(t),
{{< /displaymath >}}
where the {{< math "p_i" >}} are the coefficients and the {{< math "b_i" >}} are the basis
functions. If the coefficients are points (e.g. 2 or 3 vectors), we
refer to them as control points. The key to making such a method work
is to define the {{< math "b_i" >}} appropriately. B-Splines provide a very general
way to do this.

A set of B-Splines can be defined for a number of coefficients (or
points) {{< math "n" >}} and a parameter value[^bspline-param] {{< math "k." >}} The value of {{< math "k" >}} is
one more than the degree of the polynomials used to make the B-Splines
({{< math "k=d+1." >}})

[^bspline-param]: The B-Spline parameter is
actually the *order* of the polynomials used in the B-Splines,
using the terminology of de Boor (Source: deboor). While this terminology
is not uniform in the literature, the use of the B-Spline parameter
{{< math "k" >}} as a value one greater than the polynomial degree is widely used,
although some texts (such as (Source: Reisenfeld)) write all of the
equations in terms of polynomial degree.

B-Splines are important because they provide a very general method for
creating functions (that will be useful for representing curves) that
have a number of useful properties. A curve with {{< math "n" >}} points made with
B-Splines with parameter value {{< math "k" >}} is:

- {{< math "C(k-2)" >}} continuous;
- made of polynomials of degree {{< math "k-1" >}};
- has local control. Any site on the curve only depends on {{< math "k" >}} of
	the control points;
- is bounded by the convex hull of the points;
- exhibits the variation diminishing property illustrated in
	Figure {{< lfigref "fig:var-dim" >}}.

A curve created using B-Splines does not necessarily interpolate its
control points.

We will introduce B-Splines by first looking at a specific, simple
case to introduce the concepts. We will then generalize the methods,
and show why they are interesting. Because the method for computing
B-Splines is very general, we delay introducing it until we have shown
what these generalizations are.

<a id="sec:linear-bsplines"></a>
#### Uniform Linear B-Splines

Consider a set of basis functions of the following form:
{{< displaymath id="eqn:linear-bsplines" >}}
b_{i,2}(t) = \begin{array}{ll}
				t-i+1 & \mathrm{if\ } i \leq t < i+1\\
				1-t-i & \mathrm{if\ } i+1 \leq t \leq i+2\\
				0 & \mathrm{otherwise}.
				 \end{array}
{{< /displaymath >}}

Each of these functions looks like a little triangular "hat" between
{{< math "i" >}} and {{< math "i+2" >}} with its peak at {{< math "i+1." >}} Each is a piecewise polynomial,
with knots at {{< math "i" >}}, {{< math "i+1" >}}, and {{< math "i+2." >}} Two of them are graphed in
Figure {{< lfigref "fig:bspline-blend1" >}}.

{{< lfigure src="Figs/bspline-1.svg" caption="B-Splines with d=2." label="fig:bspline-blend1" >}}

For terminology, each of these functions {{< math "b_{i,2}" >}} is a B-Spline. A
{{< math "k=2" >}} (or first degree, or linear) B-Spline with uniform knots, to be
more specific. Because we will consider B-Splines of other parameter
values later, we denote these with the 2 in the subscript.

Notice that we have chosen to put the lower edge of the B-Spline
(e.g. its first knot) at {{< math "i." >}} Therefore the first knot of the first
B-Spline ({{< math "i=1" >}}) is at {{< math "1" >}}. This convention is chosen since its easier
to talk about "the first" B-Spline or "the first" element of a
vector, rather than the "zeroth." It also makes the last element be
{{< math "n." >}} Iteration over the B-Splines or elements of the coefficient
vector is from {{< math "1" >}} to {{< math "n" >}} (see Equation {{< eqref "eqn:generic-basis" >}}). When
B-Splines are implemented, as well as in many other discussions of
them, they often are numbered from {{< math "0" >}} to {{< math "n-1." >}}

If we had a set of {{< math "n" >}} coefficients or control points to
create a function from, we could use Equation {{< eqref "eqn:generic-basis" >}},
with these functions used for the {{< math "b_i" >}} to create an "overall"
function that was influenced by the coefficients. For lack of a better
term, I will refer to this function that is made of a linear
combination of B-Splines as the "overall function."

If we were to use these {{< math "k=2" >}} B-Splines to define the overall
function, we would define a piecewise polynomial function that
linearly interpolated the coefficients {{< math "p_i" >}} between {{< math "t=k" >}} and
{{< math "t=n+1." >}}

Note that while {{< math "k=2" >}} B-Splines interpolate their all of their
coefficients, B-Splines of higher order only do this under some
specific conditions that we will discuss in
Section [Repeated Knots and B-Spline Interpolation](#sec:bspline-interp).

Some properties of B-Splines can be seen in this simple case. We will
write these in the general form using {{< math "k" >}}, the parameter, and {{< math "n" >}} for the
number of coefficients or control points.

- Each B-Spline has {{< math "k+1" >}} knots.
- Each B-Spline is zero before its first knot and after its last
	knot.
- The overall spline has local control because each coefficient is
	only multiplied by one B-Spline, and this B-Spline is non-zero
	only between {{< math "k+1" >}} knots.
- The overall spline has {{< math "n+k" >}} knots.
- Each B-Spline is {{< math "C(k-2)" >}} continuous, therefore the overall
	spline is {{< math "C(k-2)" >}} continuous.
- The set of B-Splines sums to 1 for all parameter values between
	knots {{< math "d" >}} and {{< math "n+1." >}} This range is where there are {{< math "d" >}} B-Splines
	that are non-zero. Summing to 1 is important because it means
	that the B-Splines are shift invariant: translating the control
	points will translate the entire curve.
- Between each of its knots, the B-Spline is a single, degree {{< math "d=k-1" >}}
	polynomial. Therefore, the overall curve (that sums these
	together) can also be expressed as a single, degree {{< math "d" >}}
	polynomial between any adjacent knots.

In this example, we have chosen the knots to be uniformly spaced. We
will consider B-Splines with non-uniform spacing later. When the knot
spacing is uniform, each of the B-Splines are identical except for
being shifted. B-Splines with uniform knot spacing are sometimes
called *uniform B-Splines* or *periodic B-Splines*.

#### Uniform Quadratic B-Splines

The properties of B-Splines listed in the previous section were
intentionally written for arbitrary {{< math "n" >}} and {{< math "d" >}}. A general procedure
for constructing the B-Splines will be provided later, but first, lets
consider another specific case with {{< math "k=3." >}}

The B-Spline {{< math "b_{2,3}" >}} is shown in Figure {{< lfigref "fig:quad-bspline" >}}. It
is made of quadratic pieces (degree 2), and has 3 of them. It is {{< math "C(1)" >}}
continuous, and is non-zero only within the 4 knots that it spans.

{{< lfigure src="Figs/quad-bspline-2.svg" caption="The B-Spline b_{2,3} with uniform knot spacing." label="fig:quad-bspline" >}}

Notice that a quadratic B-Spline is made of 3 pieces, one between knot
1 and 2, one between knot 2 and 3, and one between knot 3 and 4. In
Section [Non-Uniform B-Splines](#sec:nubs) we will see a general procedure for building
these functions. For now, we simply examine these functions:
{{< displaymath id="eqn:quadratic-bsp" >}}
b_{i,3}(t) = \begin{array}{lll}
	\frac{1}{2} u^2    & \mathrm{if\ } i   \leq t < i+1 & u=t-i \\
	- u^2 + u + .5     & \mathrm{if\ } i+1 \leq t < i+2 & u=t-(i+1) \\
	\frac{1}{2} (1-u)^2& \mathrm{if\ } i+2 \leq t < i+3 & u=t-(i+2) \\
	0 & \mathrm{otherwise.} &
				 \end{array}
{{< /displaymath >}}
In order to make the expressions simpler, we wrote the function for
each part as if it applied over the range {{< math "0" >}} to {{< math "1." >}}

If we evaluate the overall function made from summing together the
B-Splines, at any time only {{< math "k" >}} (3 in this case) of them are non
zero. One of them will be in the first part of
Equation {{< eqref "eqn:quadratic-bsp" >}}, one will be in the second part, and
one will be in the third part. Therefore, we can think of any piece of
the overall function as being made up of an degree {{< math "d=k-1" >}} polynomial that
depends on {{< math "k" >}} coefficients. For the {{< math "k=3" >}} case, we can write
{{< displaymath >}}
\mathbf{f}(u) =
	\frac{1}{2} (1-u)^2 \mathbf{p_i} +
	- u^2 + u + .5 \mathbf{p_{i+1}} +
	\frac{1}{2} u^2 \mathbf{p_{i+2}}
{{< /displaymath >}}
where {{< math "u =t-i." >}} This defines the piece of the overall function when
{{< math "i \leq t < i+1." >}}

If we have a set of {{< math "n" >}} points, we can use the B-Splines to create a
curve. If we have 7 points, we will need a set of 7 B-Splines. A set
of 7 B-Splines for {{< math "k=3" >}} is shown in
Figure {{< lfigref "fig:quad-bsplines" >}}. Notice that there are {{< math "n+k" >}} (10) knots,
that the sum of the B-Splines is 1 over the range {{< math "k" >}} to {{< math "n+1" >}} (knots
3 through 8). A curve specified using these B-Splines and a set of
points is shown in Figure {{< lfigref "fig:quad-bsp-curve" >}}.

{{< lfigure src="Figs/quad-bsp.svg" caption="The set of 7 B-Splines with k=3 and uniform knot spacing [1,2,3,4,5,6,7,8,10]." label="fig:quad-bsplines" >}}

{{< lfigure src="Figs/15-20-quad-bsp-7pts.svg" caption="Curve made from 7 quadratic (k=3) B-Splines, using 7 control points." label="fig:quad-bsp-curve" >}}

#### Uniform Cubic B-Splines

Because cubic polynomials are so popular in computer graphics, the
special case of B-Splines with {{< math "k=4" >}} is sufficiently important that we
consider it before discussing the general case. A B-Spline of third degree
is defined by 4 cubic polynomial pieces. The general process by
which these pieces are determined is described later, but the result
is:
{{< displaymath id="eqn:cubic-bspline" >}}
b_{i,4}(t) = \begin{array}{lll}
	\frac{1}{6} u^3 & \mathrm{if\ } i \leq t < i+1 & u=t-i\\
	\frac{1}{6} (-3u^3+3u^2+3u+1)
				& \mathrm{if\ } i+1 \leq t < i+2 & u=t-(i+1)\\
	\frac{1}{6} (3u^3+6u^2+4)
				& \mathrm{if\ } i+2 \leq t < i+3 & u=t-(i+2)\\
	\frac{1}{6} (-u^3 + 3u^2 -3u +1)
				& \mathrm{if\ } i+3 \leq t < i+4 & u=t-(i+3)\\
	0   & otherwise.&
				 \end{array}
{{< /displaymath >}}
This degree 3 B-Spline is graphed for {{< math "i=1" >}} in Figure {{< lfigref "fig:cubic-bspline" >}}.

{{< lfigure src="Figs/b3basis.svg" caption="The cubic (k=4) B-Spline with uniform knots. WARNING: THE FIGURE IN THE DOCUMENT ALICE SENT ME IS CORRUPTED." label="fig:cubic-bspline" >}}

We can write the function for the overall curve between knots {{< math "i+3" >}}
and {{< math "i+4" >}} as a function of the parameter {{< math "u" >}} between {{< math "0" >}} and {{< math "1" >}} and
the four control points that influence it:
{{< displaymath >}}
\mathbf{f}(u) =
	\frac{1}{6} (-u^3 + 3u^2 -3u +1) \mathbf{p_i} +
	\frac{1}{6} (3u^3+6u^2+4) \mathbf{p_{i+1}} +
	\frac{1}{6} (-3u^3+3u^2+3u+1) \mathbf{p_{i+2}} +
	\frac{1}{6} u^3 \mathbf{p_{i+3}}.
{{< /displaymath >}}
This can be re-written using the matrix notation of the previous
sections, giving a basis matrix for cubic B-Splines of:
{{< displaymath >}}
\mathbf{M_b} = \frac{1}{6} \left[
	\begin{array}{cccc}
	-1 & 3 & -3 & 1 \\
	3 & -6 & 3 & 0 \\
	-3 & 0 & 3 & 0 \\
	1 & 4 & 1 & 0\\
	\end{array}
						 \right].
{{< /displaymath >}}
Unlike the matrices that were derived from constraints in
Section [Cubics](#sec:cubics), this matrix is created from the polynomials
that are determined by the general B-Spline procedure defined in the
next section.

<a id="sec:nubs"></a>
### Non-Uniform B-Splines

One nice feature of B-Splines is that they can be defined for any
{{< math "k>1." >}} So if we need a smoother curve, we can simply raise the value
of {{< math "k." >}} This is illustrated in Figure {{< lfigref "fig:bsp-curves" >}}.

{{< lfigure src="Figs/15-22-bspline-curves-fixed.svg" caption="B-Spline curves using the same uniform set of knots and the same control points, for various values of k. Note that as k increases, the valid parameter range for the curve shrinks." label="fig:bsp-curves" >}}

So far, we have said that B-Splines generalize to any {{< math "k>1" >}} and any {{< math "n" >}}
{{< math "\geq d." >}} There is one last generalization to introduce before we show
how to actually compute these B-Splines. B-Splines are defined for any
non-decreasing knot vector.

For a given {{< math "n" >}} and {{< math "k," >}} the set of B-Splines (and the function
created by their linear combination) has {{< math "n+k" >}} knots. We can write the
value of these knots as a vector, that we will denote as {{< math "\mathbf{t}." >}}
For the uniform B-Splines, the knot vector is {{< math "[1,2,3,\ldots,n+k]." >}}
However, B-Splines can be generated for any knot vector of length
{{< math "n+k," >}} providing the values are non-decreasing (e.g. {{< math "t_{i+1} \geq t_{i}" >}}).

There are two main reasons why non-uniform knot spacing is useful: it
gives us control over what parameter range of the overall function
each coefficient effects, and it allows us to repeat knots
(e.g. create knots with no spacing in between) to create functions
with different properties around these points. The latter will be
considered in Section [Repeated Knots and B-Spline Interpolation](#sec:repeat-knots).

The ability to specify knot values for B-Splines is similar to being
able to specify the interpolation sites for interpolating spline
curves. It allows us to associate curve features with parameter
values.  By specifying a non-uniform knot vector, we specify what
parameter range each coefficient of a B-Spline curve effects. Remember
that B-Spline {{< math "i" >}} is non-zero only between knot {{< math "i" >}} and knot {{< math "i+k." >}}
Therefore, the coefficient associated with it only effects the curve
between these parameter values.

One place where control over knot values is particularly useful is in
inserting or deleting knots near the beginning of a sequence.  To
illustrature this, consider a curve defined using linear B-Splines
({{< math "k=2" >}}) as discussed in Section [Uniform Linear B-Splines](#sec:linear-bsplines). For {{< math "n=4," >}}
the uniform knot vector is {{< math "[1,2,3,4,5,6]." >}} This curve would be
controlled by a set of 4 points, and span the parameter range {{< math "t=2" >}} to
{{< math "t=5." >}} The "end" of the curve ({{< math "t=5" >}}) interpolates the last control
point. If we insert a new point in the middle of the point set, we
would need a longer knot vector. The locality properties of the
B-Splines prevent this insertion from affecting the values of the
curve at then ends. The longer curve would still interpolate its last
control point at its end. However, if we chose to keep the uniform
knot spacing, the new knot vector would be {{< math "[1,2,3,4,5,6,7]," >}} the end
of the curve would be at {{< math "t=6," >}} and the parameter value at which the
last control point is interpolated at a different parameter value than
before the insertion. With non-uniform knot spacing, we can use the
knot vector {{< math "[1,2,3,3.5,4,5,6]" >}} so that the ends of the curve are
unaffected by the change. The abilities to have non-uniform knot
spacing makes the locality property of B-Splines an algebraic
property, as well as a geometric one.

We now introduce the general method for defining B-Splines.  Given
values for the number of coefficients {{< math "n," >}} the B-Spline parameter {{< math "k" >}}
and the knot vector {{< math "\mathbf{t}" >}} (which has length {{< math "n+k" >}}), the
following recursive equations define the B-Splines:
{{< displaymath id="eqn:cox-deboor1" >}}
b_{i,1,\mathbf{t}}(t) = \begin{array}{ll}
		1 & \mathrm{if\ } \mathbf{t}_i \leq t < \mathbf{t}_{i+1} \\
		0 & \mathrm{otherwise}
				 \end{array}
{{< /displaymath >}}
{{< displaymath id="eqn:cox-deboor2" >}}
b_{i,k,\mathbf{t}}(t) =
	\frac{t-\mathbf{t}_i}{\mathbf{t}_{i+k-1} - \mathbf{t}_i} b_{i,k-1}(t) +
	\frac{\mathbf{t}_{i+k}-t}{\mathbf{t}_{i+k}-\mathbf{t}_{i+1}} b_{i+1,k-1}(t).
{{< /displaymath >}}
This equation is know as the *Cox-de Boor recurrence.* It may
be used numerically, to compute specific values for specific
B-Splines. However, it is more often applied algebraically to
derive equations such as Equation {{< eqref "eqn:quadratic-bsp" >}}
or Equation {{< eqref "eqn:cubic-bspline" >}}.

As an example, consider how we would have derived
Equation {{< eqref "eqn:quadratic-bsp" >}}. Using a uniform knot vector
{{< math "[1,2,3,\ldots]," >}} {{< math "t_i=i." >}} We use this vector and the value {{< math "k=3" >}} in
Equation {{< eqref "eqn:cox-deboor2" >}} to give:
{{< displaymath id="eqn:qstep1" >}}
\begin{align}
b_{i,3}(t)  &=
\frac{t-i}{(i+2)-i} b_{i,2} + \frac{(i+3)-t}{(i+3)-(i+1)} b_{i+1,2} \\
	&=
\frac{1}{2} (t-i) b_{i,2} + \frac{1}{2} (i+3-t) b_{i+1,2}.
\end{align}
{{< /displaymath >}}
Continuing the recurrence, we must evaluate the recursive
expressions:
{{< displaymath >}}
\begin{align}
b_{i,2}(t)   &=
	\frac{t-i}{(i+2-1)-i} b_{i,1} + \frac{(i+2)-t}{(i+2)-(i+1)} b_{i+1,1} \\
	&= (t-i) b_{i,1} + (i+2-t) b_{i+1,1}\\
b_{i+1,2}(t) &=
	\frac{t-(i+1)}{((i+1)+2-1)-(i+1)} b_{i+1,1} +
	\frac{((i+1)+2)-t}{((i+1)+2)-((i+1)+1)} b_{(i+1)+1,1} \\
	&=
	(t-i+1) b_{i+1,1} + (i+3-t) b_{i+2,1}.
\end{align}
{{< /displaymath >}}
Inserting these results into Equation {{< eqref "eqn:qstep1" >}} gives:
{{< displaymath >}}
b_{i,3}(t) = \frac{1}{2}(t-i)   ((t-i) b_{i,1} + (i+2-t) b_{i+1,1}) +
		\frac{1}{2}(i+3-t) (t-i+1) b_{i+1,1} + (i+3-t) b_{i+2,1}.
{{< /displaymath >}}

To see that this expression is equivalent to
Equation {{< eqref "eqn:quadratic-bsp" >}}, we note that each of the {{< math "k=1" >}}
B-Splines is like a switch, turning on only for a particular parameter
range. For instance, {{< math "b_{i,1}" >}} is only non-zero between {{< math "i" >}} and {{< math "i+1." >}}
So, if {{< math "i \leq t < i+1," >}} only the first of the {{< math "k=1" >}} B-Splines in the
expression is non-zero, so
{{< displaymath >}}
b_{i,3}(t) = \frac{1}{2} (t-i)^2 \mathrm{\ if\ } i \leq t < i+1.
{{< /displaymath >}}
Similar manipulations give the other parts of
Equation {{< eqref "eqn:quadratic-bsp" >}}.

<a id="sec:bspline-interp"></a>
<a id="sec:repeat-knots"></a>
#### Repeated Knots and B-Spline Interpolation

While B-Splines have many nice properties, functions defined using
them generally do not interpolate the coefficients. This can be
inconvenient if we are using them to define a curve that we want to
interpolate a specific point.

One way to cause B-Splines to interpolate their coefficients is to
repeat knots. If all of the interior knots for a particular B-Spline
have the same value, then the overall function will interpolate this
B-Spline's coefficient. An example of this is shown in
Figure {{< lfigref "fig:repeat-knots" >}}.

{{< lfigure src="Figs/15-23-a-bsp-dup-nodup.svg" caption="Uniform Knots" label="fig:repeat-uniform" >}}

{{< lfigure src="Figs/15-23-b-bsp-dup-dup.svg" caption="Non-Uniform Knots" label="fig:repeat-knots" >}}

A curve parameterized by Quadratic
B-Splines (d=3) with 7 control points. On the left, uniform knots
vector {{< math "[1,2,3,4,5,6,7,8,9,10]" >}} is used. On the right, the non-uniform
knot spacing {{< math "[1,2,3,4,4,6,7,8,8,10]" >}} is used. The duplication of the
4th and 8th knot means that all interior knots of the 3rd and 7th
B-Spline are equal, so the curve interpolates the control point
associated with those points.

Interpolation by repeated knots comes at a high cost: it removes
the smoothness of the B-Spline and the resulting overall function
and represented curve. However, at the beginning and end of the
spline, where continuity is not an issue, knot repetition is
useful for creating *endpoint interpolating B-Splines.* While
the first (or last) knot's value is not important for
interpolation, for simplicity, we make the first (or last) {{< math "d" >}}
knots have the same value to achieve interpolation.

The endpoint interpolating Quadratic B-Splines are shown in
Figure {{< lfigref "fig:nu-quads" >}}. The first two and last two B-Splines are
different than the uniform ones. Their expressions can be derived
through the use of the Cox-de Boor recurrence:
{{< displaymath >}}
b_{1,3,[0,0,0,1,2,\ldots]}(t) =
	\begin{array}{ll}
		(1-t)^2 & \mathrm{if\ } 0 \leq t < 1 \\
		0 & \mathrm{otherwise}
	\end{array}
{{< /displaymath >}}
{{< displaymath >}}
b_{2,3,[0,0,0,1,2,\ldots]}(t) =
	\begin{array}{lll}
		2u-\frac{3}{2}u^2 & \mathrm{if\ } 0 \leq t < 1 & u=t \\
		\frac{1}{2}(1-u)^2 & \mathrm{if\ } 1 \leq t < 2 & u=t-1\\
		0 & \mathrm{otherwise}
	\end{array}
{{< /displaymath >}}

{{< lfigure src="Figs/15-24-bsp-ee-basis.svg" caption="Endpoint-interpolating Quadratic (k=3) B-Splines, for n=8. The knot vector is [0,0,0,1,2,3,4,5,6,6,6]. The first and last two B-Splines are aperiodic, while the middle 4 (shown as dotted lines) are periodic, and identical to the ones in Figure {{< lfigref \"fig:quad-bsplines\" >}}." label="fig:nu-quads" >}}

### NURBS

Despite all of the generality B-Splines provide, there are some
functions that cannot be exactly represented using them. In
particular, B-Splines cannot represent conic sections. To represent
such curves, a ratio of two polynomials is used. Non-Uniform B-Splines
are used to represent both the numerator and the denominator. The most
general form of these are Non-Uniform Rational B-Splines, or NURBS for
short.

NURBS associate a scalar weight {{< math "h_i" >}} with every control point
{{< math "\mathbf{p_i}" >}} and use the same B-Splines for both:
{{< displaymath >}}
\mathbf{f}(u) =
	\frac{\sum_{i=1}^n h_i \mathbf{p_i} b_{i,k,\mathbf{t}}}
			 {\sum_{i=1}^n h_i b_{i,k,\mathbf{t}}},
{{< /displaymath >}}
are {{< math "b_{i,k,\mathbf{t}}" >}} are the B-Splines with parameter {{< math "k" >}} with knot
vector {{< math "\mathbf{t}." >}}

NURBS are very widely used to represent curves and surfaces in
geometric modelling because of the amazing versatility they
provide, in addition to the useful properties of B-Splines.
