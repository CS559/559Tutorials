---
title: "Typed JavaScript and CS559"
date: 2022-01-08T20:00:00-06:00
draft: false
categories: ["JavaScript"]
tags: ["JavaScript","vscode"]
weight: 5
---

JavaScript does not *require* you to declare the types of your variables, function arguments, objects, object properties, or much of anything. However, if you give it some hints as to what you expect (as comments in your code), you can help a reader understand your program, and software tools find mistakes.

This page describes some programming practices that are *recommended* for CS559.

<!--more-->

We (the course staff) will use this in the example code and framework code that we provide to you. We're explaining it so the weird looking comments in our code make more sense. After you get used to it, you might try it yourself.

**Short Version:** In the CS559 example code, we will do things that provide explicit typing in JavaScript. You don't have to use it - but it might help you. If you use Visual Studio Code, you may want to take out lines that say `// @ts-check` since that's what turns type checking on.

## Basics of Using Type Information in JavaScript

In a language like Java or C++, the programmer must explicitly declare the types of things. In JavaScript, (generally) things (such as variables) can hold any type of data. JavaScript is *dynamically* typed: it figures out the type of data when it is used at run time. JavaScript might feel untyped, since you don't have to declare types. But underneath, everything always has a type.

~~~~javascript
let x=7;
let y="something";
console.log(typeof x);    // prints the string "number"
console.log(typeof y);    // prints the string "string"
~~~~

Since variables can hold any type, we can change things along the way:

~~~~javascript
let x=7;        // x holds a number
x = "seven";    // now it holds a string
x = { val: 7};  // now it holds an object
~~~~

This is generally a bad idea: it's good if we know what kinds of data a variable has so we can treat it accordingly.

A problem with dynamic types is that type errors (mistakes where you have data of the wrong type) do not get caught until runtime. Any short example is going to look silly and contrived, but we'll have more realistic examples later.

~~~~javascript
function addone(v) {
  return v+1;
}
let x = 7;
console.log(addone(x));   // should say 8

x="7";                    // accidentally used the wrong type
console.log(addone(x));   // will return (the string) "71"
~~~~

These kinds of mistakes happen all the time in bigger programs. Maybe you didn't write "addone" and didn't know that it works best with a number. Maybe this is in a big body of code and you forgot that x is always supposed to be a number when you did the second assignment. Maybe you're using a complicated library and can't remember everything.

The solution we will use in class is to try to document the types of things to make the intent clearer. We'll use comments in a standard form (called [JSDoc](https://jsdoc.app/)). We'll use this standard because if we do, not only will human readers of our code know what to expect, but programs can read our code and check for mistakes. See [the TypeScript Supported JSDoc](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc) page for information on how to format these comments.

For example, if I do:

~~~~javascript
/** @type{number} */
let x=7;
x="7";
~~~~

It's obvious to the reader of the code that I've made a mistake. It's totally legal JavaScript - but might go against what is expected from x later.

A very cool thing: a type checker program can find this mistake!

To check for these errors in Visual Studio Code, put the magic line:

~~~~javascript
// @ts-check
~~~~

at the *beginning* of your program (I believe this special comment must occur before any executable statements). This tells VSCode to use the "TypeScript type checker" (explained later) on your program. For me, I see a red underline under the x in the `x="7"` line in the code above, and if I look at the "problems" list, it says `Type "7" is not assignable to type 'number'`.

To learn about type checking in Visual Code see [the documentation](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files). To learn about how to write the JSDoc comments see [Supported JSDoc](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html#supported-jsdoc).

## Some advantages of explicit typing

Here's a (slightly) less contrived example from above. Let's say I write the addone function, but I add the JSDoc comments

~~~~javascript
/**
 * addone - a function that adds one
 * @param {number} val
 * @returns {number}
 */
function addone(val)
{
    return val+1;
}
~~~~

When you read this, you know what kinds of data to provide. But, if you're using a good editor (IDE) like Visual Studio Code, it knows as well! It can:

1. Tell you that you've made a mistake (it would underline the incorrect parameter, and list the message (under problems)
    <pre>Argument of type "7" is not assignable to parameter of type 'number'.</pre>

2. When I type "addone" it shows me what types it needs and returns.

This is particularly handy when you are using a library.

For example...

~~~~javascript
function startFunction() {
  // my program
}
window.onload = startFunction();
~~~~

I always accidentally do this. You may know that `window.onload` needs to be assigned a function - not the results of executing the function (unless that function returns a function). ~~I still type this by mistake a lot.~~ (in modern JavaScript we don't use `windows.onload` as often) The type checker found this bug for me often.

Or another one when we use HTML sliders...

~~~~javascript
/** @type {HTMLInputElement} */
let slider = document.getElementById("slider");
/** @type{number} */
let x=slider.value;
~~~~

because the value of a slider is a string! (so easy to forget because it doesn't make sense). This example actually has a different type error in it, which I need to get to next.

[Visual Studio Code can even help you write these JSDoc comments!](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)

## Dealing with Complex Types

*Warning: this is where things get tricky. Don't worry about using it from the beginning.*

Sometimes we really use the dynamic nature of JavaScript types correctly. For example, we might have a function that can take a string or a number (either a name or an ID number). Or (in the case of the slider example above), the `getElementById` function returns a generic HTML object - not necessarily a slider. The dynamic typing will know exactly what type it is at runtime. As programmers, we know that the `slider` element is an input, so this is OK.

In general, JSDoc gives a very flexible way to specify types (see the [documentation page](https://jsdoc.app/tags-type)). When in doubt, you can always just say "\*" or "any" for the type. But this means you don't get the benefits of declaring the type.

For the specific case, I can use a cast (which changes the type):

~~~~javascript
let slider = (/** @type {HTMLInputElement} */document.getElementById("slider"));
~~~~

Of course, this means that I am trusting myself to having actually created slider correctly so it really is an input element. If I wanted to write a really robust program, I should check (here, I'll throw an exception if it is not):

~~~~javascript
if (! (slider instanceof HTMLInputElement)) {
    throw("Expected Slider - but got something else!");
}
~~~~

## Do I always have to type all my types?

One of the advantages of not using explicit typing is there is less work for the programmer in creating the program (assuming they get things correct). It's a lot of extra work to declare types, and often they are obvious. If I said:

~~~~javascript
let x=0.0;
x = "1";
~~~~

you (a smart programmer) could probably infer that `x` is supposed to be a number, and the second line is a type error. You don't need the whole `@type {number}` thing.

Fortunately, the type checker is pretty smart too! It can often *infer* the types for many things without you having to explicitly declare them. Of course, it will sometimes make mistakes. For example, if I really intend to have `x` be either a number or a string, the type checker won't know (and create an error for the `x="1"` above). So, we need to tell the type checker when it can't figure things out.

~~~~javascript
/** @type {number|string} */
let x=0.0;
x = "foo";
~~~~

It never hurts to explicitly declare types - if you know them. And if you're using Visual Studio Code, [it will make it easy](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support).

Another issue is that if you use some external code (like a library), the person who wrote that library may not have given enough information for the type checker to figure out types. The type checker in Visual Studio Code has some fancy methods built in where it will automatically get information from the web that works a lot of the time (Automatic Type Acquisition).

## Isn't it weird to do these in the ugly comments?

JavaScript does not have explicit typing as part of the language. Therefore, we need to document the types using comments. It's ugly - but it adds what we want (explicit types) without changing the language.

Of course, there is a different way to get explicit types: switch to a different language (not JavaScript) that has explicit types as part of the language. If you really want explicit types, maybe you should pick a language that has them. Sadly, for CS559 we are not allowed to use another language. We're stuck with JavaScript.

TypeScript is a variant of JavaScript that is explicitly typed. That might make it a better language than JavaScript. It has a much nicer notation for making the explicit type declarations than JSDoc comments. However, for various reasons it is impractical to require TypeScript for CS559, and we want to have everyone program in the same language. Using the type checker in Visual Studio Code and the JSDoc comments (almost) gives us the best of both worlds: we get TypeScript style type checking, and the ease of programming in plain JavaScript (no separate compilation step).

Basically, what Visual Studio Code is doing when you add the `// @ts-check` comment at the beginning of your program is running parts of the TypeScript compiler on your program to find the errors.

If you're a TypeScript programmer, sorry. You have to do it this way for class. See the class policies.

## Can I get type checking without Visual Studio Code?

I am not aware of any other editor that does TypeScript type checking on JavaScript code.

You can use the TypeScript compiler as a checker for JavaScript code. See [this page](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files). Remember, you cannot program in TypeScript for class (see the class policy).
