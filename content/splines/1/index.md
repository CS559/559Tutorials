---
title: "Curves"
date: 2026-02-09T20:15:48-06:00
draft: false
page: 1
weight: 10
---

Intuitively, think of a *curve* as something you can draw with
a (thin) pen. The curve is the set of points the pen traces over
an interval of time. While we usually think of a pen writing on
paper (e.g. a curve that is in a 2D space), the pen could move in
3D to generate a *space curve*, or (if you are a mathematician)
you could imagine the pen moving in some other kind of space.

<!--more-->

{{<not-book>}}

Mathematically, definitions of curve generally fall into two
categories.

> 1. The continuous image of some interval.(Source: carl)
>
> 2. A continuous map from a one-dimensional space to an n-dimensional
> space.(Source: mathworld-curve)

Both of these definitions start with the idea of an interval range
(the time over which the pen traces the curve). However, there is a
significant difference: in the first definition, the curve is the set
of points the pen traces (the image), while in the second definition,
the curve is the mapping between time and that set of points. For this
chapter, we use the former meaning.

A curve is an infinitely large set of points. The points in a curve
have a property that any point has 2 neighbors, except for a small
number of points that have one neighbor (these are the endpoints).
Some curves have no endpoints, either because they are infinite (like
a line) or they are *closed* (loop around and connect to
themselves).

Because the "pen" of the curve is thin (infinitesimally), it is
difficult to create filled regions. While space filling curves are
possible (by having them fold over themselves infinitely many
times), we do not consider such mathematical oddities here.
Generally, we think of curves as the outlines of things, not the
"insides."

The problem that we need to address is how to specify a curve - to
give "names" or representations to all curves so that we can
represent them on a computer. For some curves, the problem of naming
them is easy since they have known shapes: line segments, circles,
elliptical arcs, etc. A general curve that doesn't not have a
"named" shape is sometimes called a *free-form* curve.

Because a free-form curve can take on just about any shape, they are
much harder to specify.

There are three main ways to specify curves mathematically:

**Implicit** curve representations define the set of points on a
curve by giving a procedure that can test to see if a point in on the
curve. Usually, an implicit curve representation is defined by an *implicit function* of the form:
{{< displaymath >}}
f(x,y)=0
{{< /displaymath >}}
so that the curve is the set of points for which this equation is
true. Note that the implicit function is a scalar function (it returns
a single real number).

**Explicit or Parametric** curve representations provide a mapping
from a *free parameter* to the set of points on the curve. That
is, this free parameter (a single number) provides an index to the
points on the curve. The parametric form of a curve defines a function
that assigns positions to values of the free parameter.  Intuitively,
if you think of a curve as something you can draw with a pen on a
piece of paper, the free parameter is time, ranging from the time that
we began drawing the curve to the time that we finish. The *parametric function* of this curve would tells us where the pen was at
any instant in time:
{{< displaymath >}}
x,y = \mathbf{f}(t).
{{< /displaymath >}}
Note that the parametric function is a vector valued function that
returns a vector. This example is a 2D curve, so the output of the
function is a 2-vector, but in 3D they would be 3-vectors.

**Generative or Procedural** curve representations provide
procedures that can generate the points on the curve that do not fall
into the first two categories. Examples of generative curve
descriptions include subdivision schemes and fractals.

Remember that a curve is a set of points. These representations
give us ways to specify those sets. Any curve has many possible
representations. For this reason, mathematicians are typically
careful to distinguish between a curve and its representations. In
computer graphics we are often sloppy since we usually only refer
to the representation, not the actually curve itself. So when
someone says "an implicit curve" they are either referring to
the curve that can be represented by some implicit function, or
the implicit function that is one of the representations of some
curve. Such distinctions are not usually important, unless we need
to consider different representations of the same curve. We will
consider different curve representations in this chapter, so we
will be more careful. When we use a term like "polynomial curve"
we will mean the curve that can be represented by the polynomial.

By the definition at the beginning of the chapter, for something to be
a curve it must have a parametric representation. However, many curves
have other representations. For example, a circle in 2D with its
center at the origin and radius of 1 can be written in implicit form
as:
{{< displaymath >}}
f(x,y) = x^2 + y^2 - 1 = 0,
{{< /displaymath >}}
or in parametric form as:
{{< displaymath >}}
x,y = \mathbf{f}(t) = {\cos t, \sin t},  (t \in [0, 2 \mathbf{p_1}].)
{{< /displaymath >}}
The parametric form need not be the most convenient representation for
a given curve. In fact, it is possible to have curves with simple
implicit or generative representations for which it is difficult to
find a parametric representation.

Different representations of curves have advantages and
disadvantages. For example, parametric curves are much easier to draw
because we can sample the free parameter. Generally, parametric forms
are the most commonly used in computer graphics since they are easier
to work with. Our focus will be on parametric representations of
curves.

### Parameterizations, and Re-Parameterizations

A *parametric curve* refers to the curve that is specified by a
specific parametric function over some particular interval. To be more
precise, a parametric curve has a given function that is a mapping
from a *range* or interval of the parameters.  It is often
convenient to have the parameter range over the unit interval from 0
to 1. When the free parameter ranges over the unit interval, we often
denote it as {{< math "u." >}}

If we consider the parametric curve to be a line drawn with a pen, we
can define the beginning of time (when {{< math "u=0" >}}) to be when the pen is
first set down on the paper, and the unit of time to be the amount of
time it takes to draw the curve ({{< math "u=1" >}} is the end of the curve). To
use a different unit for time (for example one second), we scale or
shift time into the unit interval. The curve can be specified by a
function that maps time (in these unit coordinates) to
positions. Basically, the specification of the curve is a function
that can answer the question "where is the pen at time {{< math "u" >}}?"

If we are given a function {{< math "\mathbf{f}(t)" >}} that specifies a curve over
its interval, we can easily define a new function {{< math "\mathbf{f_2}(u)" >}}
that specified the same curve over the unit interval. We can first
define
{{< displaymath >}}
g(u) = a + (b-a) u,
{{< /displaymath >}}
and then
{{< displaymath >}}
\mathbf{f_2}(u) = \mathbf{f}( g(u) ).
{{< /displaymath >}}
The two functions, {{< math "\mathbf{f}" >}} and {{< math "\mathbf{f_2}" >}} both represent
the same curve, however, they provide different *parameterizations* of the curve, that is the mapping between the
parameter and the points of the curve itself. The process of
creating a new parameterizations for an existing curve is called
*re-parameterizations*, and the mapping from old parameters to
the new ones ({{< math "\mathbf{g}" >}} in this example) is called the *re-parameterization function.*

We have defined a curve by the existence of some parameterization.
However, if one parameterization exists, infinitely many other
ones exist (because we can always re-parameterize). Being able to
have multiple parameterizations of a curve is useful because it
allows us to create parameterizations that are convenient.
However, it can be problematic because it makes it difficult to
compare two functions to see if they represent the same curve.

The essence of this problem is more general: the existence of the
free parameter (or the element of time) adds an invisible,
potentially unknown element to our representation of the curves.
When we look at the curve after it is drawn, we don't necessarily
know the timing. The pen might have moved at a constant speed over
the entire time interval, or it might have started slowly and sped
up.  For example, while {{< math "u=.5" >}} is halfway through the parameter
space, it may not be half-way along the curve if the motion of the
pen starts slowly and speeds up at the end. Consider the following
representations of a very simple curve:
{{< displaymath >}}
\begin{align}
x,y & = \mathbf{f}(u) = & u,u \\
x,y & = \mathbf{f}(u) = & u^2,u^2\\
x,y & = \mathbf{f}(u) = & u^5,u^5.
\end{align}
{{< /displaymath >}}
All three functions represent the same curve, however when {{< math "u" >}} is not
{{< math "0" >}} or {{< math "1" >}}, {{< math "\mathbf{f}(u)" >}} refers to a different point depending on
the representation of the curve.

If we are given a parameterization of a curve, we can use it directly
as our specification of the curve, or we can develop a more convenient
parameterization. The given function is sometimes referred to as the
*natural parameterization*. Usually, the natural parameterization
is created in a way that is convenient (or natural) for specifying the
curve, so we don't know about how the speed changes along the curve.

If we know that the pen moves at a constant velocity, then the
values of the free parameters have more meaning. Halfway through
parameter space is half-way along the curve. Rather than measuring
time, the parameter can be thought to measure length along the
curve. Such parameterizations are called *arc length*
parameterizations because they define curves by functions that map
from the distance along the curve (known as the arc length) to
positions. We often use the variable {{< math "s" >}} to denote an arc length
parameter.

Technically, a parameterization is an arc length parameterization if
the magnitude of its *tangent* (that is, the derivative of the
parameterization with respect to the parameter) has constant
magnitude. In an equation,
{{< displaymath >}}
\left| \frac{\partial \mathbf{f}(s)}{\partial s} \right|^2 = c
{{< /displaymath >}}
for some value of {{< math "c" >}} and all values {{< math "s." >}}

Computing the length along a curve can be tricky. In general, it is
defined by the integral of the magnitude of the derivative
(intuitively, the magnitude of the derivative is the velocity of the
pen as it moves along the curve). So, given a value for the parameter
{{< math "v" >}}, you can compute {{< math "s" >}} (the arc length distance along the curve from
the point {{< math "\mathbf{f}(0)" >}} to the point {{< math "\mathbf{f}(v)" >}}) as:
{{< displaymath id="eqn:arc-length" >}}
s = \int_0^v \left| \frac{\partial\mathbf{f}(t)}{\partial t} \right|^2 dt
{{< /displaymath >}}
where {{< math "\mathbf{f}(t)" >}} is a function that defines the curve with a
natural parameterization.

Using the arc-length parameterization requires being able to solve
Equation {{< eqref "eqn:arc-length" >}} for {{< math "u" >}} given {{< math "s" >}}. For many of the
kinds of curves we examine, it cannot be done in a closed-form
(simple) manner, and must be done numerically.

Generally, we use the variable {{< math "u" >}} to denote free parameters that
range over the unit interval, {{< math "s" >}} to denote arc-length free
parameters, and {{< math "t" >}} to represent parameters that aren't one of the
other two.


### Piecewise Parametric Representations

For some curves, defining a parametric function that represents
their shape is easy. For example, lines, circles, and ellipses all
have simple functions that define the points they contain in terms
of a parameter. For many curves, finding a function that specify
their shape can be hard. The main strategy that we use to create
complex curves is divide-and-conquer: we break the curve into a
number of simpler smaller pieces, each of which has a simple
description.

{{< lfigure src="Figs/simple-curves.svg" caption="A: a curve that can be easily represented as two lines; B: a curve that can be easily represented as a line and a circular arc; C: approximating curve B with 5 line segments" label="fig:two-lines" >}}

For example, consider the curves in Figure {{< lfigref "fig:two-lines" >}}. The
first two curves are easily specified in terms of two pieces. In the
case of curve B, we need two different kinds of pieces: a line segment
and a circle.

To create a parametric representation of a compound curve (like
B), we need to have our parametric function switch between the
functions that represent the pieces. If we always define our
parametric functions over the range {{< math "0 \leq u \leq 1," >}} then curve
A or B might be defined as:
{{< displaymath id="eqn:parametric-switch" >}}
\mathbf{f}(u) = \begin{array}{ll}
    \mathbf{f_1}(2*u) &   \mathrm{if\ } u \leq .5 \\
    \mathbf{f_2}(2*u-1) & \mathrm{if\ } u > .5,
    \end{array}
{{< /displaymath >}}
where {{< math "\mathbf{f_1}" >}} is a parameterization of the first piece, and
{{< math "\mathbf{f_2}" >}} is a parameterization of the second piece, and both of
these functions are defined over the unit interval.

We need to be careful in defining the functions {{< math "{\bf f_1}" >}} and {{< math "{\bf f_2}" >}} to make sure that the pieces of the curve fit together. If
{{< math "\mathbf{f_1}(1) \neq \mathbf{f_2}(0)," >}} then our curve pieces will not
connect, and will not form a single continuous curve.

To represent curve B in Figure {{< lfigref "fig:two-lines" >}} well, we needed to
use two different types of pieces: a line segment and a circular
arc. For simplicity's sake, we may prefer to use a single type of
pieces. If we try to represent curve B with only one type of piece
(line segments), we cannot exactly recreate the curve (unless we use
an infinite number of pieces). While the new curve made of line
segments (as in Figure {{< lfigref "fig:two-lines" >}} C) may not be exactly the
same shape as B, it might be close enough for our uses. In such a
case, we might prefer the simplicity of using the simpler line segment
pieces to having a curve that more accurately represents the shape.

Also, notice that as we use an increasing number of pieces, we can get
a better approximation. In the limit (using an infinite number of
pieces) we can exactly represent the original shape.

One advantage to using a piecewise representation is that it allows us
to make a tradeoff between:

1. how well our represented curve approximates the real shape we
    are trying to represent;
2. how complicated the pieces that we use are;
3. how many pieces we use.

So if we're trying to represent a complicated shape, we might decide
that a crude approximation is acceptable, and use a small number of
simple pieces. To improve the approximation we can choose between
using more pieces and using more complicated pieces.

In computer graphics practice, we tend to prefer using relatively
simple curve pieces (either line segments or cubic polynomial
segments).

### Splines

Before computers, when a draftsman wanted to draw a smooth curve one
tool they employed was a stiff piece of metal that they would bend
into the desired shape for tracing. Because the metal would bend, not
fold, it would always have a smooth shape. The stiffness meant that
the metal would bend as little as possible to make the desired
shape. This stiff piece of metal was called a *spline.*

Mathematicians found that they could represent the curves created
by a draftsman's spline with piecewise polynomial functions.
Initially, they used the term spline to mean a smooth, piecewise
polynomial function. More recently, the term spline has been used
to describe any piecewise polynomial function. We prefer this
definition.

For us, a *spline* is a piecewise polynomial function. Such
functions are very useful for representing curves.

### Exercises

1. Devise an arc-length parameterization for the curve represented
    by the parametric function:
    {{< displaymath >}}
    f(u) = (u, u^2)
    {{< /displaymath >}}

