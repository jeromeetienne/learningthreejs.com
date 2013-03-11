---
layout: post
published: false
title: Lets Do a Cubic
---

This post is part of the LearningThree.js serie.
After the post
on the [installation](/blog/2011/07/15/learningthreejs-installation/)
of [Three.js](https://github.com/mrdoob/three.js/), we will do a
cube which rotate on the screen. Nothing fancy but perfect to learn
the basics and play around.
This example will explain the basics of three.js.
It follow the same architecture as most of three.js examples.
This will help you understand and play around with them.
They are a goldmine of sweetness.

You can find the whole source in a [gist](https://gist.github.com/1106726), and
you can see it run [here]() TODO **TODO**
In general, the examples are composed of 3 parts:

* **Part 1** : bootstrapping aka declare the variables and launch the first functions
* **Part 2** : ```init()``` function which build the 3D objects and Dom elements.
* **Part 3** : ```animate()+render()``` function which does the animation and display it on the screen

<!--more-->


# Part 1: Bootstrapping

nothing magical in here... just declaring variables you will need later, initialise
the 3D with ```init()``` and start the animation with ```animate()```

{% codeblock create the Cube - cubeCreation.js %}
var startTime	= Date.now();
var container;
var camera, scene, renderer;
var cube;

// initialiaze everything
init();
// make it move
animate();
{% endcodeblock %}

# Part 2: init() functions

It simply build the 3D scenes, add objects in it, add a camera, and init basic DOM elements

## First, lets create a scene

The *scene* is what you show on the screen.
It is the description of what you choose to represent in [three dimensional space](http://en.wikipedia.org/wiki/Three-dimensional_space).
You select a part of a scene with your camera. *i.e.* if you represent several simple
geometrical shapes, one scene can be a large cube and a pyramid, another scene can
be two small cubes and a sphere, almost anything you want...

To initiate this variable is simple

{% codeblock create the Scene - sceneCreation.js %}
scene = new THREE.Scene();
{% endcodeblock %}

## Lets create the cube

{% codeblock create the Cube - cubeCreation.js %}
// create the Cube
cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 )
		, new THREE.MeshNormalMaterial() );
// set the position of the cube in the scene
cube.position.y = 150;
// add the object to the scene
scene.addObject( cube );
{% endcodeblock %}

* *Step 1*: the cube is created by associating a *Geometry* and a *Material*
* *Step 2*: the cube is positionned in the scene. By setting position.y, it is
possible to set position, rotation and scale, in x/y/z.
* *Step 3*: the cube is finaly added to the scene we just created


## Now, lets put a camera
The camera is your point of view, like your own eye. The camera gonna capture
what is in front of it exactly like a physical camera.
*i.e.* if you represent a cube on your scene, the camera can be
above or on the side of the cube. It can be static or moving.

{% codeblock create the Camera - cameraCreation.js %}
camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.y = 150;
camera.position.z = 350;
camera.target.position.y = 150;
{% endcodeblock %}

You set the position of the camera in x/y/z (default to 0).
Then you determine the ```camera.target``` position aka the camera will point
to the position of its target. 


## create a container dom element

The 3D scene will be rendered in this container element. Beside this, it is a
normal DOM element.

{% codeblock create the container - createContainer.js %}
// create the container element
container = document.createElement( 'div' );
document.body.appendChild( container );
{% endcodeblock %}

## Create the renderer

We create a WebGL renderer and append it to the DOM.

{% codeblock create the renderer - createRenderer.js %}
// init the WebGL renderer and append it to the Dom
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );
{% endcodeblock %}

# misc Notes:

* what is needed
  * show the demo early. and say "you will be able to do that in 5min"
    * list the concept which gonna be presented in it, and link to them at the end of the post
  * demo
    * where does the demo comes from
      * from /examples. i stripped all mouse interactions to simplify the source
    * explain the source of the demo
    * part per part
  * Concepts
    * what are they, where is the source for it
