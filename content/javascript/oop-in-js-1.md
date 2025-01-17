---
title: "Traditional Object Oriented Programming in JavaScript (Part 1)"
date: 2022-01-10T13:06:00-06:00
draft: false
tags: ["JavaScript"]
categories: ["JavaScript"]
toc: true
weight: 11
summary: "A quick introduction to using traditional object oriented programming (classes, inheritence, etc.) in JavaScript."
---

_This tutorial was written for CS559 2020 by the course staff, and updated for 2021 and 2022._

Originally, JavaScript had some non-standard ways to do object-oriented programming. They were very cool, and very flexible - but they were non-standard and hard to learn.

Fortunately, newer versions of JavaScript (like we use in class) give us another option that provides a convenient syntax for "traditional" (class/instance style) object oriented programming. JavaScript ES6 introduced classes to JavaScript, which use notation similar to what you may have seen in other object oriented languages. ES6 was from 2015, so its not like this is a new thing.

Understanding classes is important. It should be easy if you are familiar with "traditional class/instance" programming in some other language. However, because this is JavaScript (1) there are some quirks, and (2) the fact that there are more general mechanisms going on underneath gives some flexibility. Also, for some reason, many of the tutorials on object-oriented programming in JavaScript teach you the old way (which is complicated) and then use this to introduce the easier "new" way.

[Eloquent JavaScript](https://eloquentjavascript.net/) (see the "books" page in the CS559 Course Web) has an excellent introduction in [Chapter 6](https://eloquentjavascript.net/06_object.html). However, it first shows you the "old way" to do objects (prototypes), which is useful, but not essential for CS559. This tutorial covers the basics so you can do the Workbooks (starting with Workbook 4, classes are used extensively in the code).

## Constructing Objects

Before we get to classes, let's examine JavaScript's built-in objects.

Suppose that we wanted to store the properties of an object (say a rectangle) we wanted to draw on a Canvas. Due to JavaScript's flexible object notation, we can simply store the desired properties directly in an object we create:

{{< highlight javascript "linenos=table" >}}
myRectangle = {
    x: 10,
    y: 10,
    height: 20,
    width: 20
};
{{< /highlight >}}

We might want to write this as a function so we can make more rectangles:

{{< highlight javascript "linenos=table" >}}
function makeRectangle(x, y, height, width) {
    let obj = {};

    obj.x = x;
    obj.y = y;
    obj.height = height;
    obj.width = width;

    return obj;
}
{{< /highlight >}}

Notice how this code makes an object (line 2), fills it in, and then returns it. This is a common pattern, so JavaScript gives us an easier way to do it: using *constructor* functions.

{{< highlight javascript "linenos=table" >}}
function Rectangle(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
}

myRectangle = new Rectangle(10, 10, 20, 20);
{{< /highlight >}}

Note that the `Rectangle` function assumes that an empty object was created and stored in `this`.

Calling `new Rectangle(...)` can be viewed as first creating an empty object which is then filled by the code in the `Rectangle` function. Note that the word `this` is self-referential, here referring to that newly created object. Now `myRectangle` now contains the same data it did before, but now we can use the Rectangle constructor to create future Rectangles in a more readable way.

The word `new` is used so that Rectangle is called as a constructor; if it was omitted, it would not behave as expected: `this` would refer to the calling context, not a newly created object. Assuming it was called from a global context, calling `Rectangle` without `new` would be equivalent to declaring global variables `x`, `y`, `height`, and `width` with the corresponding values.

The idea of using special functions for things like constructors is a quirk of traditional JavaScript. In addition to being a little weird, it is also error prone: if you forget to use `new`, `Rectangle` still can be called as a regular function (with disastrous results). As the programmer, you know that `Rectangle` is defining a kind of object, but in old-fashioned JavaScript, we just defined functions, and `Rectangle` is just another function.

In newer versions of JavaScript (like we use in class), the language provides better notation for this kind of object programming. It allows us to define *classes* (kinds of objects), with a syntax that is more familiar to object oriented programming in other languages.

## ES6 Class Syntax and Constructors

The ES6 class syntax (which we will use in CS559) allows us to write the constructor function as a class:

{{< highlight javascript "linenos=table" >}}
class Rectangle {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}
{{< /highlight >}}

Note that in this code, we explicitly tell the compiler that we are defining a `class` of objects, and that this class has a special constructor function. We can use this constructor as we did above:

{{< highlight javascript "linenos=table" >}}
myRectangle = new Rectangle(10, 10, 20, 20);
{{< /highlight >}}

With the advantage that we cannot accidentally forget the `new`. As we defined it as a class, the compiler knows that `Rectangle` should only be called as a construtor, and it will throw an error if we try to do otherwise. Since constructors are called with `new`, we must use that word when creating instances of a class.

Classes provide easy syntax for doing many common object oriented programming things - for example, inheritance and static properties - which we'll cover in a future tutorial.

## Methods

We might want to have our rectangle objects have methods (functions that operate on them). We could have defined them using the initial object creation approach.

{{< highlight javascript "linenos=table" >}}
function makeRectangle(x, y, height, width) {
    let obj = {};

    obj.x = x;
    obj.y = y;
    obj.height = height;
    obj.width = width;

    obj.draw = function(context) {
        context.fillRect(obj.x, obj.y, obj.height, obj.width);
    };

    return obj;
}
{{< /highlight >}}

Note how we have added a `draw` function to each rectangle, so the rectangle knows how to draw itself (it can refer to itself via closure). We can call `myRectangle.draw(context)`. But also, notice how this would create a new draw function for each rectangle. JavaScript provides mechanisms for avoiding the redundancy, but they are all idiosyncratic (weird and JavaScript-specific).

With ES6 class notation, we can write it more simply:

{{< highlight javascript "linenos=table" >}}
class Rectangle {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }

    draw(context) {
        context.fillRect(this.x, this.y, this.height, this.width);
    }
}
{{< /highlight >}}

The way to read this code is that we have defined a class (`Rectangle`) that defines a kind of object that has 2 functions associated with it. The constructor is the same as before. The `draw` function is a method; and it is shared between objects of class `Rectangle`, avoiding the problem we mentioned above.

In methods, the `this` variable is bound to the object. In general, `this` in JavaScript can be ambiguous, so you might want to avoid using it. However, inside of a method, `this` has a very specific meaning, so we can use it with confidence.

As before, we use the `new` keyword to create an object from a class, and method `method` of an object `object`  can be called with `object.method()`

{{< highlight javascript "linenos=inline" >}}
myRectangle = new Rectangle(10, 10, 20, 20);

// Assume we have some context in which to draw
myRectangle.draw(context); // Draws the rectangle in the desired position
{{< /highlight >}}

## More resources on ES6 Classes

We'll see more features of JavaScript classes later in the semester.

This tutorial focused on the basics of object oriented programming that you need to get started with Workbook 4. There's another tutorial that talks about more advanced object-oriented topics {{% link "oop-in-js-2" %}} that describes inheritance, polymorphism, and other object oriented concepts that will be useful in later workbooks.

Most of the "official" documentation on how classes work focus on how they relate to the old JavaScript mechanisms. This can be useful, since classes are implemented using these same mechanisms, but understanding these relationships isn't critical when using the more modern syntax.

The recommended readings on JavaScript from the course web are useful (look for the "JavaScript in CS559"). In particular, [Eloquent JavaScript](https://eloquentjavascript.net/) has an excellent introduction in [Chapter 6](https://eloquentjavascript.net/06_object.html), although it does introduce prototypes (the older mechanisms) before the newer class syntax..

If you want to understand prototypes, we recommend these resources. They are optional, but can help you understand how JavaScript classes function under the hood:

- [Prototypes in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
- [The Relationship between Classes and Prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)

[NEXT: Part 2: Traditional OOP: Inherritence, Polymorphism, ...]({{< relref "oop-in-js-2" >}})
