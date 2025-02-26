---
title: "Dynamic Environment Maps"
date: 2025-02-26T14:58:32-06:00
draft: false
---

A test of Dynamic Environment Maps

<!--more-->

### Dynamic Environment Map Example

Some things to note (when you try this)...

- This uses a single environment map created from a camera at the center. If you look carefully, you'll notice that the moving cube doesn't appear in the right place in its reflection.
- In theory, the mirrored cube and sphere should see each other. But, they both use the same texture map. If we try drawing these objects when creating the texture map, we get a "feedback loop" (the camera is taking a picture of a texture that is using the output of the camera). WebGL creates an error. To avoid all the error messages, I avoid drawing the shiny objects when doing the texture map drawing.
- For some reason, even though I don't draw the environment mapped objects when I create the environment mapped object, I get a feedback error (one for each face). I have not been able to figure out why.
- The skybox map may not be available when you first draw the scene (because of deferred loading), so if you try to create a static environment map, you might get a blank sky. (not an issue in the demo, since the environment map is continually redrawn.)


<div id="d1"></div>
<script src="dyn-env.js" type="module"></script>

### Dynamic Environment Map Example 2

This example has an environment map per object.

<div id="d2"></div>
<script src="dyn-env2.js" type="module"></script>

Note how the moving sphere has a proper map taken from its position.
