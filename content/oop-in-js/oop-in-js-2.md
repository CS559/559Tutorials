---
title: "Traditional Object Oriented Programming in JavaScript (Part 2)"
date: 2022-01-10T13:02:00-06:00
draft: false
tags: ["JavaScript"]
categories: ["Tutorials"]
toc: true
---

{{% dimbox %}}
This is part 2 of our 2 part tutorial on "Traditional" Object Oriented programming in JavaScript. The tutorial was written by the course staff in 2020, but updated in 2021 and 2022.
{{% /dimbox %}}

In the first part of this tutorial ({{% link "oop-in-js-1" %}}), we showed you how to use JavaScript's class syntax; this time, we'll take a look at how we can use it to do the things you're used to in object oriented programming: inheritance, polymorphism, and more.

For the later workbooks, you'll need to understand inheritance and polymorphism. The code Framework uses these features a lot. The other parts of the workbook (static and private members) are useful, and can help you understand how THREE.js works.

## Inheritance

Recall our first `Rectangle` class from last time:

```javascript
class Rectangle {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}
```

When we wanted to add a `draw` method to it, we had to modify the original class. But what if we want two types of `Rectangle`s: one which fills itself, and one which only draws the border? The simplest way we can do this is with inheritance, which we can use with the `extends` keyword as follows:

```javascript
class SolidRectangle extends Rectangle {
 constructor(x, y, height, width) {
  super(x, y, height, width);
 }
 
 draw(context) {
        context.fillRect(this.x, this.y, this.height, this.width);
    }
}

class BorderRectangle extends Rectangle {
 constructor(x, y, height, width) {
  super(x, y, height, width);
 }
 
 draw(context) {
        context.strokeRect(this.x, this.y, this.height, this.width);
    }
}
```

The `super` keyword is a special JavaScript keyword that is used in methods. When it is used in a method (including a constructor), it refers to the same method in the parent class, allowing you to call the parent class' method from within the child class' method. So, for example, in line 3 of the above example, the call `super(x, y, height, width)` calls the parent class (`Rectangle`) constructor from inside the child class (`SolidRectangle`) constructor.

In a child class constructor, `super` must always be called before `this` is used. Basically, `this` is not defined until the call to super. Suppose that we will exteded `SolidRectangle` to allow it to store the color of the rectangle as well. You can use `super` in methods other than the constructor, without a restriction on having it before you use `this`. For example:

```javascript
class SolidColoredRectangle extends SolidRectangle {
 constructor(x, y, height, width, color) {
  this.color = color; // ReferenceError!
  super(x, y, height, width);
 }
 
 draw(context) {
  context.save();
  context.fillStyle = this.color;

        // Fills the rectangle with the parent class method
  super.draw(context); 
  context.restore();
 }
}
```

Because the parent constructor was called after `this` was used above, we get a reference error when we try to create the class! This is easy to fix by changing the order of the lines in the constructor.

```javascript
class SolidColoredRectangle extends SolidRectangle {
 constructor(x, y, height, width, color) {
  super(x, y, height, width);
  this.color = color; // No error this time
 }
 
    // draw does not need to be changed
}
```

The `draw` method works fine (we can use `this` before `super` because it is not a constructor).

## Polymorphism

Polymorphism in JavaScript works just like it does in other languages. In the code below, we draw all the different types of rectangles in the display list with a single `forEach` loop (see the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)); each object draws itself as specified by its class's `draw` method.

```javascript
displayList = [
    new SolidRectangle(0, 0, 10, 10),
    new BorderRectangle(10, 10, 10, 10),
    new SolidColoredRectangle(5, 5, 10, 10, "blue"),
];

// Assume that some context exists
displayList.forEach(item => item.draw(context));
```

## Static Properties

The `static` keyword can be used to define static properties and methods of a JavaScript class; these belong to the class itself rather than to an individual instance of it. See the following example (it uses a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), a very handy JavaScript trick). Note the line `static creationCount = 0`; it is equivalent to `StaticTest.creationCount = 0`, and thus `let` is not necessary. This notation can be used to define class properties (and, by omitting `static`, instance properties as well) outside the constructor.

```javascript
class StaticTest {
    static creationCount = 0;
    
    constructor() {
        StaticTest.creationCount++; 
    }
    
    static saySomething() {
        console.log("Hello, world!");
    }
    
    toString() {
        return `Creation count: ${StaticTest.creationCount}`;
    }
}

console.log(new StaticTest().toString()) // Prints "Creation count: 1
console.log(new StaticTest().toString()) // Prints "Creation count: 2
console.log(new StaticTest().toString()) // Prints "Creation count: 3
StaticTest.saySomething() // Prints "Hello, world!"

// Don't do the following
console.log(new StaticTest().creationCount) // Prints "undefined"
// Generates a TypeError; the object does not have 
// a saySomething() method
new StaticTest().saySomething() 
```

The last two lines don't work properly because they try to access a static (class) variable and method as properties of an instance of the class. Thus; as they are properties of the class and not the instance, the `creationCount` property of an instance of the class does not exist; similarly, the `saySomething()` method of the instance does not exist, explaining the `TypeError`.

## Private Members, Getters, and Setters

ES6 does not support true private properties (there is currently a [stage 3 proposal](https://github.com/tc39/proposal-class-fields#private-fields) that is likely to be included in future JavaScript versions), but a common convention is to begin properties that should be kept private with an underscore. ES6 has special syntax for getters and setters, as shown below.

```javascript
class DirectoryTracker {
    _directoryStack = [];
    
    // Pushes the directory onto the stack
    set directory(directory)  {
        this._directoryStack.push(directory);
    }
    
    // Returns the current directory
    get directory() {
        return this._directoryStack[this._directoryStack.length - 1];
    }
    
    // Go back to the last directory
    pop() {
        this._directoryStack.pop();
        
        // Referring to this.directory inside the class also
        // translates into a call to the getter
        return this.directory; 
    }
}

let tracker = new DirectoryTracker();

// We should not do this, but it is permitted by JavaScript
console.log(tracker._directoryStack); // Prints "[]"

tracker.directory = "foo";
tracker.directory = "bar";
console.log(tracker.directory); // Prints "bar"

// Don't do this, but it is interesting to take a look
console.log(tracker._directoryStack); // Prints "['foo', 'bar']"

console.log(tracker.pop()); // Prints "foo"
```

The `get` and `set` keywords allow us to track the history of previous directories in a way which is transparent to the user. When we access `tracker.directory`, JavaScript makes a call to the getter we defined instead of directly accessing the `directory` property of `tracker`, and, similarly, when we assign `tracker.directory` above,  a call is made to the setter.

## Further Reading

See [the Mozilla reference page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) for more information.

[PREV: Part 1: Traditional OOP: Inherritence, Polymorphism, ...]({{< relref "oop-in-js-1" >}})
