---
title: "Polynomial Pieces"
date: 2026-02-09T21:19:23-06:00
draft: false
weight: 30
page: 3
---

The most popular representations for curves in computer graphics are
piecewise functions where each curve piece is represented by a
polynomial. Piecewise linear representations (a line segment is a
polynomial of order 1) are a special case of this. In this section, we
look over the mathematics of the individual polynomial pieces. In the
next section, we discuss how to put pieces of polynomials together.

<!--more-->

{{<not-book>}}

Polynomials are functions of the form:
{{< displaymath id="eqn:generic-poly-1" >}}
f(t) = a_0 + a_1 t + a_2 t^2 + \ldots + a_n t^n,
{{< /displaymath >}}
where the {{< math "a_i" >}} are the *coefficients.* The number of coefficients
{{< math "n+1" >}} is called the *order*. Notice that the order is one more
than the highest power of {{< math "t" >}} in the expression, since we have a
coefficient for {{< math "n=0." >}} If we write the coefficients of the polynomial
as a vector (of length {{< math "n+1" >}}), we can write
Equation {{< eqref "eqn:generic-poly-1" >}} as:
{{< displaymath id="eqn:canonical" >}}
\mathbf{f}(t) = \sum_{i=0}^n \mathbf{a_i} t^i.
{{< /displaymath >}}
We refer to this form of writing a polynomial (e.g. as coefficients
multiplied by the various powers of the parameter) as the *canonical* form.

The *degree* of a polynomial is the highest power of the
parameter. A polynomial of order 4 may be of degree 3, but it may be
of a lower degree if {{< math "a_n = 0." >}}

We can generalize the canonical form of Equation {{< eqref "eqn:canonical" >}}
as:
{{< displaymath id="eqn:generic-poly" >}}
\mathbf{f}(t) = \sum_{i=0}^n \mathbf{c_i} b_i(t),
{{< /displaymath >}}
where {{< math "\mathbf{c}" >}} is a vector of {{< math "n+1" >}} coefficients, and each
{{< math "b_i(t)" >}} is a polynomial. The set of {{< math "n+1" >}} polynomials {{< math "b_i(t)" >}} are
called basis functions, or blending functions. Notice that
Equation {{< eqref "eqn:canonical" >}} is simply Equation {{< eqref "eqn:generic-poly" >}}
with {{< math "b_i(t) = t^i." >}} If the set of basis function is chosen correctly,
any polynomial of order {{< math "n+1" >}} can be represented by an appropriate
choice of {{< math "\mathbf{c}." >}}

While canonical form is sufficient for describing any polynomial, the
coefficients are not necessarily convenient. Throughout this chapter,
we will find sets of basis functions such that the coefficients are
convenient ways to control the curves represented by the polynomial
functions.

For specifying curves, we can either create a separate polynomial
for each dimension of the curves' embedding, or use a vector form
of Equations like Equation {{< eqref "eqn:generic-poly" >}}, where the
coefficients are points. Note that even in such a case, the basis
or blending functions still produce scalar values.

### A Line Segment

To introduce the concepts of piecewise polynomial curve
representations, we will discuss line segments. In practice, line
segments are so simple that the mathematical derivations will seem
excessive. However, by understanding this simple case, things will be
easier when we move on to more complicated polynomials.

Consider a line segment that connects point {{< math "\mathbf{p_0}" >}} to
{{< math "\mathbf{p_1}" >}}. We could write the parametric function over the unit
domain for this line segment as:
{{< displaymath id="eqn:lineseg1" >}}
\mathbf{f}(u) = (1-u) \mathbf{p_0} + u \mathbf{p_1}
{{< /displaymath >}}
By writing this in vector form, we have hidden the dimensionality
of the points, and the fact that we are dealing with each
dimension separately. For example, were we working in 2D, we could
have created separate equations:
{{< displaymath >}}
\begin{align}
f_x(u) &= (1-u) {\mathbf{p}_{0x} + u {\mathbf{p}_{1x}} } \\
f_y(u) &= (1-u) {\mathbf{p}_{0y} + u {\mathbf{p}_{1y}} },
\end{align}
{{< /displaymath >}}
using the (admittedly ugly) notation {{< math "\mathbf{p}_{0x}" >}} to refer to the
{{< math "x" >}} coordinate of point 0.

The line that we specify is determined by the two end points.

but from now on we'll stick to vector notation since its cleaner.
We will call the vector of control parameters {{< math "\mathbf{p}" >}} the
*control points*, and each element of {{< math "\mathbf{p}" >}} a *control point*.

While describing a line segment by the positions of its endpoints is
obvious and usually convenient, there are other ways to describe a
line segment. For example:

1. the position of the center of the line segment, the orientation,
	and the length;
2. the position of one endpoint and the position of the second
	point relative to the first;
3. the position of the middle of the line segment and one end.

It should be fairly obvious that given one kind of a description of a
line segment, we can switch to another.

A different way to describe a line segment is using the canonical form
of the polynomial (as discussed in Section [Polynomial Notation](#sec:poly-note)),
{{< displaymath id="eqn:lineseg-basic2" >}}
\mathbf{f}(u) = \mathbf{a_0} + u \mathbf{a_1}.
{{< /displaymath >}}
Any line segment can be represented either by
specifying {{< math "\mathbf{a_0}" >}} and {{< math "\mathbf{a_1}" >}}, or the endpoints
({{< math "\mathbf{p_0}" >}} and {{< math "\mathbf{p_1}" >}}). It is usually more convenient to
specify the endpoints, because we can compute the other parameters
from the endpoints.

To write the canonical form in as a vector expression, we define a
vector {{< math "\mathbf{u}" >}} that is a vector of the powers of {{< math "u" >}}:
{{< displaymath >}}
\mathbf{u} = \left[ 1\ u\ u^2\ u^3\ \ldots\ u^n \right]
{{< /displaymath >}}
so that Equation {{< eqref "eqn:canonical" >}} can be written as:
{{< displaymath id="eqn:canonical-vector" >}}
\mathbf{f}(u) = \mathbf{u}\ \mathbf{a}.
{{< /displaymath >}}
This vector notation will make transforming between different forms of
the curves easier.

Equation {{< eqref "eqn:canonical-vector" >}} describe a curve segment by the
set of polynomial coefficients for the simple form of the
polynomial. We call such a representation the *canonical* form. I
will denote the parameters of the canonical form by {{< math "\mathbf{a}" >}}.

While it is mathematically simple, canonical form is not always
the most convenient way to specify curves. For example, we might
prefer to specify a line segment by the positions of its
endpoints. If we want to define {{< math "\mathbf{p_0}" >}} to be the beginning
of the segment (where the segment is when {{< math "u=0" >}}) and
{{< math "\mathbf{p_1}" >}} to be the end of the line segment (where the line
segment is at {{< math "u=1" >}}), we can write:
{{< displaymath id="eqn:line-example1" >}}
\begin{array}{llll}
	 \mathbf{p_0} &= \mathbf{f}(0) &= \left[1\ 0\right] & \left[ \mathbf{a_0}\ \mathbf{a_1}\right]\\
	 \mathbf{p_1} &= \mathbf{f}(1) &= \left[1\ 1\right] & \left[
		  \mathbf{a_0}\ \mathbf{a_1}\right].
\end{array}
{{< /displaymath >}}
We can solve these equations for {{< math "\mathbf{a_0}" >}} and
{{< math "\mathbf{a_1}" >}}:
{{< displaymath >}}
\begin{align}
\mathbf{a_0} &= \mathbf{p_0}\\
\mathbf{a_1} &= \mathbf{p_1} - \mathbf{p_0}.
\end{align}
{{< /displaymath >}}

<a id="sec:matrix"></a>
#### Matrix Form for Polynomials

While this first example was easy enough to solve, for more
complicated examples it will be easier to write
Equation {{< eqref "eqn:line-example1" >}} in the form:
{{< displaymath >}}
\left[ \begin{array}{c} \mathbf{p_0} \\ \mathbf{p_1} \end{array} \right]
=
\left[ \begin{array}{cc} 1 & 0 \\ 1 & 1 \end{array} \right]
\left[ \begin{array}{c} \mathbf{a_0} \\ \mathbf{a_1} \end{array} \right].
{{< /displaymath >}}
Or, if we call this *constraint matrix* {{< math "\mathbf{C}," >}} we can write
{{< displaymath id="eqn:const1" >}}
\mathbf{p} = \mathbf{C}\ \mathbf{a},
{{< /displaymath >}}
although, this is being a little sloppy with notation.[^vector-note] If
having vectors of points bothers you, you can consider each dimension
independently (so that {{< math "\mathbf{p}" >}} is {{< math "[{p_0}_x\ {p_1}_x]" >}} or
{{< math "[{p_0}_y\ {p_1}_y]" >}}) and {{< math "\mathbf{a}" >}} is handled correspondingly).

[^vector-note]: I am being very sloppy about whether vectors are row vectors or column
vectors. In general, the sense of a vector should be obvious from its
context, and I'll skip all of the transpose symbols for vectors.

We can solve Equation {{< eqref "eqn:const1" >}} for {{< math "\mathbf{a}" >}} by finding the
inverse of {{< math "\mathbf{C}." >}} This matrix we will call the *basis*
matrix, and we will denote it by {{< math "\mathbf{B}." >}} The basis matrix is
very handy since it tells us how to convert between the convenient
parameters {{< math "\mathbf{p}" >}} and the canonical form {{< math "\mathbf{a_,}" >}} and therefore
gives us an easy way to evaluate the curve:
{{< displaymath >}}
\mathbf{f}(u) = \mathbf{u}\ \mathbf{B}\ \mathbf{p}.
{{< /displaymath >}}
We can find a basis matrix for whatever form of the curves that we
want, providing that there are no non-linearities in the definition of
the parameters.

**Another Example:** Suppose we want to parameterize the line
segment so that {{< math "\mathbf{p_0}" >}} is the half-way point ({{< math "u=.5" >}}), and
{{< math "\mathbf{p_1}" >}} is the ending point ({{< math "u=1" >}}). To derive the basis matrix
for this parameterization:
{{< displaymath >}}
\begin{align}
\mathbf(p_0) &= \mathbf{f}(.5) = 1\ \mathbf{a_0} + .5\ \mathbf{a_1} \\
\mathbf(p_1) &= \mathbf{f}(1)  = 1\ \mathbf{a_0} + 1\
\mathbf{a_1}
\end{align}
{{< /displaymath >}}
So
{{< displaymath >}}
\mathbf{C} = \left[ \begin{array}{rr} 1 & .5 \\ 1 & 1 \end{array} \right]
{{< /displaymath >}}
and, therefore
{{< displaymath >}}
\mathbf{B} = \mathbf{C}^{-1} = \left[ \begin{array}{rr} 2 & -1 \\ -2 & 2
\end{array} \right].
{{< /displaymath >}}

### Beyond Line Segments

Line segments are simple enough that the effort of finding a basis
matrix is silly. However, it was good practice for curves of
higher degree. First, let's consider quadratics (curves of degree
2). The advantage of the canonical form
(Equation {{< eqref "eqn:canonical" >}}) is that it works for these more
complicated curves, just by letting {{< math "n" >}} be a larger number.

A quadratic (a degree 2 polynomial) has 3 coefficients (it has order
3), {{< math "\mathbf{a_0}" >}}, {{< math "\mathbf{a_1}" >}}, and {{< math "\mathbf{a_2}" >}}. These
coefficients are not convenient for describing the shape of the
curve. However, we can use the same basis matrix method to devise more
convenient parameters. If we know the value of {{< math "u," >}}
Equation {{< eqref "eqn:canonical" >}} becomes a linear equation in the
parameters,and the linear algebra from the last section still works.

Suppose that we wanted to describe our curves by the position of the
beginning ({{< math "u=0" >}}), middle[^mid-note] ({{< math "u=.5" >}}), and end ({{< math "u=1" >}}). Filling the appropriate values
into Equation {{< eqref "eqn:canonical" >}}:
{{< displaymath >}}
\begin{array}{llllll}
\mathbf{p_0} & = f(0)  & = \ \mathbf{a_0} + \ 0^1  & \mathbf{a_1} & +\ 0^2 & \mathbf{a_2}\\
\mathbf{p_1} & = f(.5) & = \ \mathbf{a_0} + \ .5^1 & \mathbf{a_1} & +\ .5^2 & \mathbf{a_2}\\
\mathbf{p_2} & = f(1)  & = \ \mathbf{a_0} + \ 1^1  & \mathbf{a_1} & +\ 1^2 & \mathbf{a_2}.
\end{array}
{{< /displaymath >}}
So the constraint matrix is:
{{< displaymath >}}
\mathbf{C} =
\left[ \begin{array}{ccc}
	 1 & 0 & 0 \\ 1 & .5 & .25 \\ 1 & 1 & 1
	\end{array} \right],
{{< /displaymath >}}
and the basis matrix is:
{{< displaymath >}}
\mathbf{B} = \mathbf{C}^{-1} =
\left[ \begin{array}{ccc}
	 1 & 0 & 0 \\ -3 & 4 & -1 \\ 2 & -4 & 2
	\end{array} \right]
{{< /displaymath >}}

[^mid-note]: Notice that this is the middle of
the parameter space, which might not be the middle of the curve
itself.

There is one additional type of constraint (or parameter) that is
sometimes convenient to specify: the derivative of the curve (with
respect to its free parameter) at a particular value. Intuitively, the
derivatives tell us how the curve is changing, so that the first
derivative tells us what direction the curve is going, the second
derivative tells us how quickly the curve is changing direction, etc.
We will see examples of why it is useful to specify derivatives later.

For the quadratic,
{{< displaymath >}}
\mathbf{f}(u) = \mathbf{a_0} + \mathbf{a_1} u + \mathbf{a_2} u^2,
{{< /displaymath >}}
the derivatives are simple:
{{< displaymath >}}
\mathbf{f}'(u) = \frac{df}{du} = \mathbf{a_1} + 2 \mathbf{a_2} u,
{{< /displaymath >}}
and
{{< displaymath >}}
\mathbf{f}''(u) = \frac{d^2f}{du^2} = \frac{d f'}{du} = 2 \mathbf{a_2}.
{{< /displaymath >}}
Or, more generally,
{{< displaymath >}}
\begin{align}
\mathbf{f'}(u) &= \sum_{i=1}^n i u^{i-1} \mathbf{a_i}, \\
\mathbf{f''}(u) &= \sum_{i=2}^n i (i-1) u^{i-2} \mathbf{a_i}.
\end{align}
{{< /displaymath >}}

For example, consider a case where we want to specify a quadratic
curve segment by the position, first, and second derivative at its
middle ({{< math "u=.5" >}}).
{{< displaymath >}}
\begin{array}{lllllrrl}
\mathbf{p_0}& = f(.5)  &=\ \mathbf{a_0} +&.5^1 & \mathbf{a_1} + &  & .5^2&\mathbf{a_2}\\
\mathbf{p_1}& = f'(.5) &=       &     & \mathbf{a_1} + & 2& (.5)&\mathbf{a_2}\\
\mathbf{p_2}& = f''(.5)&=       &     &       & 2&     &\mathbf{a_2}.
\end{array}
{{< /displaymath >}}
So the constraint matrix is:
{{< displaymath >}}
\mathbf{C} = \left[ \begin{array}{rrr}
	 1 & .5 & .25 \\ 0 & 1  & 1 \\ 0 & 0 & 2
	\end{array} \right],
{{< /displaymath >}}
and the basis matrix is:
{{< displaymath >}}
\mathbf{B} = \mathbf{C}^{-1} = \left[ \begin{array}{rrr}
	 1 & -.5 & .125 \\ 0 & 1  & -.5 \\ 0 & 0 & .5
	\end{array} \right]
{{< /displaymath >}}

<a id="sec:compute-cubic-matrix"></a>
### Basis Matrices for Cubics

Cubic polynomials are popular in graphics (See
Section [Cubics](#sec:cubics)). One reason is that the basis matrix is a
{{< math "4x4" >}} matrix, which is something graphics people work with a lot. The
derivations for the various forms of cubics are just like the
derivations we've seen already in this section. We will work through
one more example, for practice.

A very useful form of a cubic polynomial is the *Hermite*
form, where we specify the position and 1st derivative at the
beginning and end. That is,
{{< displaymath >}}
\begin{array}{lllrllrl}
\mathbf{p_0}\ =&f(0) &= \mathbf{a_0}\ +&0^1  \ \mathbf{a_1} & +  &0^2\ \mathbf{a_2}+ &  & 0^3\ \mathbf{a_3}\\
\mathbf{p_1}\ =&f'(0)&=       &     \ \mathbf{a_1} & + 2&0^1\ \mathbf{a_2}+ & 3& 0^2\ \mathbf{a_3}\\
\mathbf{p_2}\ =&f(1) &= \mathbf{a_0}\ +&1^1  \ \mathbf{a_1} & +  &1^2\ \mathbf{a_2}+ &  & 1^3\ \mathbf{a_3}\\
\mathbf{p_3}\ =&f'(1)&=       &     \ \mathbf{a_1} & + 2&1^1\ \mathbf{a_2}+
& 3& 1^2\ \mathbf{a_3}

\end{array}
{{< /displaymath >}}
So the constraint matrix is:
{{< displaymath >}}
\mathbf{C} = \left[ \begin{array}{rrrr}
	 1 & 0 & 0 & 0 \\
	 0 & 1 & 0 & 0 \\
	 1 & 1 & 1 & 1 \\
	 0 & 1 & 2 & 3
	\end{array} \right],
{{< /displaymath >}}
and the basis matrix is:
{{< displaymath >}}
\mathbf{B} = \mathbf{C}^{-1} = \left[ \begin{array}{rrrr}
	 1 & 0 & 0 & 0 \\
	 0 & 1 & 0 & 0 \\
	 -3&-2 & 3 & -1\\
	 2 & 1 & -2& 1
	\end{array} \right]
{{< /displaymath >}}
We will discuss Hermite cubic splines in Section [Hermite](#sec:hermite).

<a id="sec:blend-func"></a>
### Blending Functions

If we know the basis matrix ({{< math "\mathbf{B}" >}}) we can multiply it by
the parameter vector ({{< math "\mathbf{u}" >}}) to get a vector of functions
{{< displaymath >}}
\mathbf{b}(u) = \mathbf{u}\ \mathbf{B}.
{{< /displaymath >}}
Notice that we denote this vector by {{< math "\mathbf{b}(u)" >}} to emphasize
the fact that its value depends on the free parameter {{< math "u." >}} We call
the elements of {{< math "\mathbf{b}(u)" >}} the *blending functions*
because they specify how to blend the values of the parameter
vector together:
{{< displaymath id="eqn:blending" >}}
\mathbf{f}(u) = \sum_{i=0}^n \mathbf{b_i}(u) \mathbf{p_i}.
{{< /displaymath >}}
It is important to note that for a chosen value of {{< math "u" >}},
Equation {{< eqref "eqn:blending" >}} is a *linear* equation, specifying
a *linear blend* (or weighted average) of the control points.
This is true no matter what degree polynomials are "hidden"
inside of the {{< math "\mathbf{b_i}" >}} functions.

Blending functions provide a nice abstraction for describing
curves. Any type of curve that can be represented as a weighted linear
combination of its control points, where those weights are computed as
some arbitrary functions of the free parameter.

Another common term for blending function is *basis function.*

<a id="sec:interp"></a>
### Interpolating Polynomials

In general, a polynomial of order {{< math "m" >}} can interpolate a set of {{< math "m" >}}
values. If we are given a vector {{< math "\mathbf{p}" >}} of values to
interpolate, and a corresponding vector {{< math "\mathbf{t}" >}} of sites, we can
use the methods described in the previous sections to determine an {{< math "m" >}}
by {{< math "m" >}} basis matrix, that would give us a function {{< math "f(t)" >}} such that
{{< math "f(t_i) = p_i." >}} For any given vector {{< math "\mathbf{t}" >}} we would need to set
up and solve an {{< math "m" >}} by {{< math "m" >}} linear system. This would provide us with a
set of {{< math "m" >}} basis functions that would perform interpolation so the
interpolating function is:
{{< displaymath >}}
f(t) = \sum_{i=0}^n p_i b_i(t).
{{< /displaymath >}}
This requires that each element of {{< math "\mathbf{t}" >}} is distinct, since the
curve can't interpolate multiple values at a single site.

These interpolating basis functions can be derived in other ways. One
particularly elegant way to define them is the *Lagrange Form.*
{{< displaymath id="eqn:lagrange-poly" >}}
b_i = \prod^n_{j=0,j\neq i} \frac{x-t_j}{t_i-t_j}.
{{< /displaymath >}}
There are more computationally efficient ways to express the
interpolating basis functions than the Lagrange
Form. See (Source: deboor-splines-book) for details.

Interpolating polynomials provide a mechanism for defining curves that
interpolate a set of points. Figure {{< lfigref "fig:interp-poly" >}} shows some
examples. While it is possible to create a single polynomial to
interpolate any number of points, we rarely use high order polynomials
to represent curves in computer graphics. Instead, interpolating
splines (piecewise polynomial functions) are preferred. Some reasons
for this are considered in Section [Cardinal](#sec:cardinal).

{{< lfigure src="Figs/lagrange-1.svg" caption="Interpolating polynomials through multiple points. Notice the extra wiggles and overshooting between points. In {{< lfigref \"fig:lagrange-c\" >}}, the 6th point is added completely changing the shape of the curve due to the non-local nature of interpolating polynomials." label="fig:interp-poly" >}}

{{< lfigure src="Figs/lagrange-2.svg" caption="Interpolating Polynomial through 6 points" >}}

{{< lfigure src="Figs/lagrange-5-6.svg" caption="Interpolating Polynomial through 5 and 6 points" label="fig:lagrange-c" >}}

### Exercises

For each of the following, find the constraint matrix, the basis
matrix, and the blending functions. You should not invert matrices
by hand - use a program such as MATLAB or OCTAVE (a free
MATLAB-like system).

1. **A Line Segment:** Parameterized with {{< math "\mathbf{p_0}" >}} being
	25\% of the way along the segment ({{< math "u=.25" >}}), and {{< math "\mathbf{p_1}" >}} being
	75\% of the way.
2. **A Quadratic:** Parameterized with {{< math "\mathbf{p_0}" >}} being the
	position of the beginning point ({{< math "u=0" >}}), {{< math "\mathbf{p_1}" >}} being the 1st
	derivative at the beginning point, and {{< math "\mathbf{p_2}" >}} being the 2nd
	derivative at the beginning point.
3. **A Cubic:** With its control points being positions that are
	equally spaced ({{< math "\mathbf{p_0}" >}} has {{< math "u=0," >}} {{< math "\mathbf{p_1}" >}} has
	{{< math "u=1/3" >}}, {{< math "\mathbf{p_2}" >}} has {{< math "u=2/3" >}}, and {{< math "\mathbf{p_3}" >}} has
	{{< math "u=1" >}}).
4. **A Quintic:** (a degree 5 polynomial, so the matrices will be
	{{< math "6x6" >}}) Where {{< math "\mathbf{p_0}" >}} is the beginning position,
	{{< math "\mathbf{p_1}" >}} is the beginning derivative, {{< math "\mathbf{p_2}" >}} is the
	middle ({{< math "u=.5" >}}) position, {{< math "\mathbf{p_3}" >}} is the 1st derivative at
	the middle, {{< math "\mathbf{p_4}" >}} is the position at the end, and
	{{< math "\mathbf{p_5}" >}} is the 1st derivative at the end.
5. **Lagrange Polynomials:** The Lagrange Form
	(Equation {{< eqref "eqn:lagrange-poly" >}}) can be used to represent the
	interpolating cubic of Excursive 3. Use it at several different
	parameter values to confirm that it does produce the same results
	as the basis functions derived in Excursive 3.
