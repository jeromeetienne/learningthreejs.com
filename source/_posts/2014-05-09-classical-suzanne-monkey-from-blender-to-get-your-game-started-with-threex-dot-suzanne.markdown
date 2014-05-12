---
layout: post
title: "Classical Suzanne Monkey From Blender To Get Your Game Started With threex.suzanne"
date: 2014-05-09 20:20
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.suzanne/examples/basic.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.suzanne/master/examples/images/screenshot-threex-suzanne-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.suzanne](http://www.threejsgames.com/extensions/#threex.suzanne).
Suzanne is a classic. She is the blender famous model familiar to all blender users. It is also a [three.js games extension](http://www.threejsgames.com/extensions/) extension which provides you with a monkey model. Blender wanted to create a less common test model, so Suzanne was born. She is more precisely a 3D model of a chimpanzee head. It is pretty basic but you can easily add it as a funky animal character and install it in your platform games! 

<a href='http://jeromeetienne.github.io/threex.suzanne/examples/basic.html' target='_blank'><input type="button" value='Try Threex.suzanne Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**


<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/RYrAktdkEUo" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.suzanne/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.suzanne/blob/master/examples/basic.html)\] :
It shows a basic usage of the extension.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.suzanne.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.suzanne
```

How To Use It
=============

### How to load the geometry ?

```javascript
new THREEx.Suzanne.GeometryLoader(function onLoad(geometry){
    // this function is notified when the geometry is actually loaded
    
    // geometry is a THREE.Geometry of suzanne model
})
```

### How to create a mesh with it ?

```javascript
new THREEx.Suzanne.GeometryLoader(function onLoad(geometry){
    // create a mesh with the geometry
    var material    = new THREE.MeshNormalMaterial()
    var mesh    = new THREE.Mesh( geometry, material )
    // attach mesh to the scene
    scene.add(mesh)
})
```

Sometime it is not desirable to wait for the loading to complete before 
adding the object to the scene. To avoid this, we create a container
which will contains the model once loading is completed.
Thanks to the scene graph inheritance, any position/quaternion/scale
changes made on container, will be reported to the children meshes.

```javascript
// create the container
var container   = new THREE.Object3D();
// add the container to the scene without waiting the end of loading
scene.add(container)
// start to load the geometry
new THREEx.Suzanne.GeometryLoader(function onLoad(geometry){
    // create a mesh with it
    var material    = new THREE.MeshNormalMaterial()
    var mesh    = new THREE.Mesh( geometry, material )
    // attach mesh to the container
    container.add(mesh)
})
```