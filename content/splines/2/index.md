---
title: "Curve Properties"
date: 2026-02-09T21:19:12-06:00
draft: false
weight: 20
page: 20
---

To describe a curve, we need to give some facts about its
properties. For "named" curves, the properties are usually specific
to the type of curve. For example, to describe a circle, we might
provide its radius and the position of its center. For an ellipse, we
might also provide the orientation of its major axis, and the ratio of
the lengths of the axes. For free form-curves however, we need to have
a more general set of properties to describe individual curves.

{{<not-book>}}

Some properties of curves describe only a single place on the
curve, while other properties require knowledge of the whole
curve. For an intuition of the difference, imagine that the curve
is a train track. If you are standing on the track on a foggy day
you can tell that the track it is straight or curving and whether
or not you at at an end point. These are *local* properties.
You cannot tell whether or not the track is a closed curve, or
crosses itself, or how long it is. We call the second kind a *global* property.

The study of local properties of geometric objects (curves and
surfaces) is known as *differential geometry.* Technically, to be
a differential property there are some mathematical restrictions about
the properties (roughly speaking, in the train track analogy, you
would not be able to have a GPS or a compass). Rather than worry about
this distinction, I will use the term *local* property rather than
differential property.

Local properties are important tools for describing curves because
they do not require knowledge about the whole curve. Local properties
include:

- continuity
- position at a specific place on the curve
- direction at a specific place on the curve
- curvature (and other derivatives).

Often, we want to specify that a curve includes a particular point.  A
curve is said to *interpolate* a point if that that point is part
of the curve. A function {{< math "f" >}} interpolates a value {{< math "v" >}} if there is some
value of the parameter {{< math "u" >}} for which {{< math "f(t)=v." >}} We call the place of
interpolation, that is the value of {{< math "t," >}} the {{< math "site." >}}

### Continuity

It will be very important to understand the local properties of a
curve where two parametric pieces come together. If a curve is
defined using an equation like
Equation {{< eqref "eqn:parametric-switch" >}}, then we need to be careful
about how the pieces are defined. If {{< math "\mathbf{f_1}(1) \neq\mathbf{f_2}(0)," >}} then the curve will be "broken" - we would not
be able to draw the curve in a continuous stroke of a pen. We call
the condition that the curve pieces fit together *continuity*
conditions because if they hold, the curve can be drawn as a
continuous piece. Technically, a "broken curve" is not a curve
as our definition of a curve at the beginning of the chapter
requires curves to be continuous.

In addition to the positions, we can also check that the derivatives
of the pieces match correctly. If {{< math "\mathbf{f_1}'(1) \neq\mathbf{f_2}'(0)" >}}, then the combined curve will have an abrupt change
in its first derivative at the switching point. The first derivative
will not be continuous. In general, we say that a curve is {{< math "C(n)" >}}
continuous if all of its derivatives up to {{< math "n" >}} match across pieces. We
denote the position itself as the {{< math "0^{th}" >}} derivative, so that the
{{< math "C(0)" >}} continuity condition means that the positions of the curve are
continuous, and {{< math "C(1)" >}} continuity means that positions and first
derivatives are continuous. The definition of curve requires the curve
to be {{< math "C(0)." >}}

{{< lfigure src="Figs/continuity.svg" caption="An illustration of various types of continuity between two curve segments" label="fig:continuity" >}}

An illustration of some continuity conditions is shown in
Figure {{< lfigref "fig:continuity" >}}. A discontinuity in the first
derivative (the curve is {{< math "C(0)" >}} but not {{< math "C(1)" >}}) is usually
noticeable because it leads to a sharp corner. A discontinuity in
the second derivative is sometimes visually noticeable.
Discontinuities in higher derivatives might matter, depending on
the application. For example, if the curve is a motion, an abrupt
change in the 2nd derivative is noticeable, so 3rd derivative
continuity is often useful. If the curve is going to have a fluid
flowing over it (for example if it is the shape for an airplane
wing or boat hull), a discontinuity in the 4th or 5th derivative
might cause turbulence.

Because the "speed" of the parameterization might be different,
even if the derivatives match, we define a different type of
continuity that ignores the speed. We define *geometric
continuity* to be the condition where the derivative of the end of
one segment differs only in magnitude from the beginning of the
next. That is, where the {{< math "C(1)" >}} condition requires:
{{< displaymath >}}
\mathbf{f_1}'(1) = \mathbf{f_2}'(0),
{{< /displaymath >}}
the {{< math "G(1)" >}} continuity condition requires:
{{< displaymath >}}
\mathbf{f_1}'(1) = k \ \mathbf{f_2}'(0)
{{< /displaymath >}}
for some value {{< math "k." >}} Geometric continuity is less restrictive than
parametric continuity (a {{< math "C(n)" >}} curve is necessarily {{< math "G(n)," >}} but
not vice versa).
