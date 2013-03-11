---
layout: post
published: true
title: Three.js Installation
categories: [basic, webgl]
---

[Three.js](https://github.com/mrdoob/three.js) is a 3D library in javascript. According
to [mrdoob](http://mrdoob.com/), its author, three.js is

{% blockquote mrdoob, tree.js author %}
The aim of the project is to create a lightweight 3D engine with a very low level of
complexity — in other words, for dummies. The engine can render using canvas, svg and WebGL.
{% endblockquote %}

## Step 1: get the source

The source are available [here](https://github.com/mrdoob/three.js). Use
the following command

{% codeblock how to get the source - example.sh %}
git clone https://github.com/mrdoob/three.js.git
{% endcodeblock %}

It will provide the whole source on your local disk. You are done, just point
a web server on it, and go in ```/examples```.

<!--more-->

## Step 2: Description of the folder structure

* ```/utils``` it is a bunch of utilities (see [here](https://github.com/mrdoob/three.js/tree/master/utils)).
You can find the script to [build the releases](https://github.com/mrdoob/three.js/blob/master/utils/build.sh)
(concatenate the files, minify them, all that).
* ```/build``` It is an administrative directory where the build release is stored. Not really important
for a user, it is more for a developper of the library itself.
* ```/src``` It is the library code in itself. We will study that in more details later. Meanwhile dont hesitate
to go look: it is rather small and clean.
* ```/examples``` It is a list of all the examples. They kinda are the documentation of three.js, try
them. They are the meat, if you like something, just do view-source:
  * some of them are for \<canvas\> rendering, most of them are for WebGL. Three.js is able to render 3D scene
    on canvas, Dom, SVG and obviously WebGL (with various level of support). See [here](https://github.com/mrdoob/three.js/tree/master/src/renderers)
    for details.
  * Some are focused on [geometry](https://github.com/mrdoob/three.js/tree/master/src/extras/geometries) i.e.
    the shape of the objects. See [here](http://mrdoob.github.com/three.js/examples/webgl_geometry_colors.html)
    , [here](http://mrdoob.github.com/three.js/examples/canvas_geometry_cube.html)
    and [here](http://mrdoob.github.com/three.js/examples/canvas_geometry_cube.html)
  * Some are focused on the [material](https://github.com/mrdoob/three.js/tree/master/src/materials) i.e.
    kindof the colors and the texture of the objects. See
    [here](http://mrdoob.github.com/three.js/examples/webgl_materials_texture_filters.html),
    [here](http://mrdoob.github.com/three.js/examples/webgl_materials_texture_filters.html) and
    [here](http://mrdoob.github.com/three.js/examples/webgl_materials_normalmap.html).
  * Others are focused on [light](https://github.com/mrdoob/three.js/tree/master/src/lights), there are different
    type of light sources. See
    [here](http://mrdoob.github.com/three.js/examples/canvas_lights_pointlights.html),
    [here](http://mrdoob.github.com/three.js/examples/canvas_lights_pointlights_smooth.html) and
    [here](http://mrdoob.github.com/three.js/examples/webgl_lights_pointlights.html)
  * Some are focused on [collisions](https://github.com/mrdoob/three.js/tree/master/src/extras/physics). See
    [here](http://mrdoob.github.com/three.js/examples/webgl_collisions_trigger.html),
    [here](http://mrdoob.github.com/three.js/examples/webgl_collisions_reaction.html) and
    [here](http://mrdoob.github.com/three.js/examples//webgl_collisions_mesh.html).
  
Point a web server on ```three.js``` source tree and go in ```/examples``` to try them. It is fun!