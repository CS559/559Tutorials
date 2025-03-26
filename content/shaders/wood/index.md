---
title: "Wood Shader"
date: 2025-03-23T09:04:14-05:00
draft: false
---

This is a slightly more complex shader example. It doesn't look great, but gives you a little more sense of the process. I'll make world's simplest procedural wood grain.

<!-- more -->

In a Q&A session for the 2023 class, the students asked me to make a procedural shader for wood. I sketched out the idea, but I didn't actually write the code. (no time to live code, and I wasn't set up for it).

So...

I am going to make a wood procedural shader. I am not going to "stream it" (run the screen recorder) since I don't know if I will get to do it in one sitting. But I will take notes and explain what I am doing here.

Before I start, I need a plan... here is my plan

0. start with the stripe shader (start at zero, since this really isn't a step)
1. convert stripes into concentric circles, change the colors
2. add noise to the concentric circles (make sure I have good noise functions), tweak to make look good
3. change things to do 3D textures - this may be complicated since I need to assign 3D textures to my objects. it might be best just to use local coordinate positions
4. tweak to make look better

The goal here is to do this quickly - and have something vaguely wood like - not necessarily to make great wood. And to let you see the artistic process - kindof guessing at what effects I want to see, trying to make them, and then tweak them.

If you just want to see the "final" result... [Wood3A](./W3A-wood.html)

Here goes...

# Step 1 - Convert the strips to circles

If you haven't looked at the {{<link Stripes>}} demo, you should try to understand that since I am beginning with that code.

I'll copy these to W1.

Now the changes...
1. the file name for the vertex shader is hard coded in - I'll change that so it's easier not to forget. (in JS file)
2. let me pick some brown colors to start... https://louisem.com/421101/brown-hex-codes seems helpful. The colors are in the js file, so I just changed those.
3. For the concentric circles, we need to change U,V so that 0,0 is the center (invent new variables nu,nv)
4. compute the distance to the center
5. basically, use that as the U value for stripes. 

<div id="wood1"></div>
<script src="W1-wood.js" type="module" defer></script>

If you're following along, you can see the [vertex shader](./W1-wood.vs) and the [fragment shader](./W1-wood.fs).

# Step 2 add noise so it isn't so round...

I'll need a noise function, but I also will need something for the noise to depend on. For that, I'll use the angle (so the radius varies as we go around). 

I'll compute the angle (using the 2 argument atan function - very handy).

The tricky part is to decide what effects I want (what to vary). 

## Part 2A - some effects

Some things:

1. I want the thickness of the stripes to vary.
2. I want the radius as we go around (so it isn't a perfect circle)

I made effects for both of these, to start, I didn't use noise - I used a sine wave to make it work uniformly, and allow me to control frequency and amount.

While this doesn't look like wood, it does let me check that things work and begin to understand what the parameters do. This is W2A.

<div id="wood2a"></div>
<script src="W2A-wood.js" type="module" defer></script>

If you're following along, you can see the [vertex shader](./W2A-wood.vs) and the [fragment shader](./W2A-wood.fs).

## Part 2B - tweaking

One thing to note: we do need to make the different rings be different - but this may start to happen as we add randomness. So, let's get a random function.

I used "fract sine noise" in lecture... and I notice the book of shaders uses it as well. https://thebookofshaders.com/10/ - so I'll try this since it's easy.

This actually looked suprisingly good for a first guess. One thing that went wrong is that each ring had its changes in thickness in the same place, so I made each ring different by adding a bit of the radius in with the angle.

A little bit of parameter tweaking, and I got the look I wanted. OK, You can see that lack of smoothness in the noise function. (you can comment out the cubic function from the noise to see what happens differently)

I got lucky in the parameter values - probably I would have needed to put the parameters on slides to experiment with different values until it looked good.

<div id="wood2b"></div>
<script src="W2B-wood.js" type="module" defer></script>

If you're following along, you can see the [vertex shader](./W2B-wood.vs) and the [fragment shader](./W2B-wood.fs).

# Step 3 - 3D Textures

We are using the surface "texture coordinates." In reality, wood is solid - as you move through the "tree" you get different parts of the texture. 

For the plane, this looks OK, but for the sphere, it kindof looks like stretchy wrapping paper got pulled over the surface. 

What I should probably do is use a 3D texture coordinate. But, then I would need to figure out how to assign texture coordinates to the THREE.js built ins.

So, instead, I will use the local X,Y,Z of the object as the texture coordinates.

The change: v_uv becomes a 3 vector, and the vertex shader passes the local position. I actually made it a 4 vector (since in a moment, you'll see that I will use it in a matrix multiply).

This works - two obvious differences: the center is in a different place (remember, UV goes 0-1, the positions can do anything - with these objects 0,0 is the center), and the scale is different (again, the positions can be arbitrary, they don't go from 0,1).

So, I am going to do a non-obvious thing: I am going to make a uniform variable that is a transformation matrix that I can use to change things from "position" (local coordinates) to "wood coordinates". 

I'll also change things so X,Y=0 is the center (which would fix the immediate problem). 

Note that I make a uniform mat4 for the transformation. This is easy in the vertex shader, the JS side (computing an appropriate matrix) is the tricky part.

I put the parameters of the transformation (translation, rotation and scale) on sliders. 

The way to think about this: We are carving the object out of a solid block of wood. The transformation positions the object in the block of wood so it can pick up the appropriate colorings.

For the plane - it doesn't look too different, but the sphere looks much better. And you can experiment with moving the object around within the "tree" to pull out different pieces of the texture.

<div id="wood3"></div>
<script src="W3A-wood.js" type="module" defer></script>

## Step 4 - Tweak

OK, I don't have time to tweak this to make it look better, but hopefully, you got the main ideas.

I started with the simple patterns (concentric rings), added some noise (so it stopped looking so synthetic and boring), and then played with it a little.

Hopefully, you can see the concept of the solid texture (I define a color for positions in space, based on my knowledge of how a tree grows). I can now change the parameters to get different "cuts" of wood (I can saw things to get the core of the tree, or the side, or parallel to the grain, or ...). and I can change the ring structure to make different woods.

Some things that should happen...
1. Every slice (the Z coordinate) is the same - I should add randomness in that direction.
2. You can see artifacts of the noise function - I should use a better one, rather than making one up.
3. I should experiment with the parameters to figure out how to make it look better.
4. I should clean up the code to make it more efficient (if I was making a lot of wood).
5. I should do some kind of random seeding so that each piece of wood could be slightly different.
6. I should clean the code up so it makes sense to someone who reads it - right now, the comments and variable names are still from the stripes demos!

I could keep going, but this was just to do something quick...
