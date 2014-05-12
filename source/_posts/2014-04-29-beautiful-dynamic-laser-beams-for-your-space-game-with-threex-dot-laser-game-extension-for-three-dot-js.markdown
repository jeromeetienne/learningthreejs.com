---
layout: post
title: "Beautiful Dynamic Laser Beams for Your Space Game with threex.laser Game Extension For Three.js"
date: 2014-04-29 13:57
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.laser/examples/demo.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.laser/master/examples/images/screenshot-threex-laser-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.laser](http://www.threejsgames.com/extensions/#threex.laser).
threex.laser is a [threex](http://www.threejsgames.com/extensions/) game extension for three.js. It provides a laser beam effect. Excellent to add in your space game!
The laser itself is fully procedural with generated texture.
The bleeding effect is obtained with additive blending.
threex.laser contains a more elaborate laser which dynamically collides with your scene. It is all done for you and it looks great! On impact, there is a point light and an particle sprite for cooler effects :)

<a href='http://jeromeetienne.github.io/threex.laser/examples/demo.html' target='_blank'><input type="button" value='Try Threex.laser Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/PsxSsdwODRk" frameborder="0" allowfullscreen></iframe>


Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.laser/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/demo.html)\] :
It shows a demo with cooked laser impacting a moving torus.
* [examples/laserbeam.html](http://jeromeetienne.github.io/threex.laser/examples/laserbeam.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/laserbeam.html)\] :
It shows a usage of threex.laserbeam.js, it could be the basis for a light sword for example.
* [examples/lasercooked.html](http://jeromeetienne.github.io/threex.laser/examples/lasercooked.html)
\[[view source](https://github.com/jeromeetienne/threex.laser/blob/master/examples/lasercooked.html)\] :
It shows a usage of threex.lasercooked.js. The laser is inside a cube, the cube is
filled with toruses positioned at random, and the laser is colliding with other objects.


How To Install It
=================

You can install it via script tag

```html
<script src='threex.laserbeam.js'></script>
<script src='threex.lasercooked.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.laser
```



How To Use It
=============

## threex.laserbeam.js
It is a raw laser beam using dynamic textures.
Here is to create the laser beam and add it to the scene.

```javascript
var laserBeam   = new THREEx.LaserBeam()
scene.add(laserBeam)
```

## threex.lasercooked.js
It is a laser beam with dynamic collision. 
On impacts, to increase realism, there is sprite and point light.
It depends on ```THREEx.LaserBeam``` so first create it and add it to the scene

```javascript
var laserBeam   = new THREEx.LaserBeam()
scene.add(laserBeam)
```

Then you create the laserCooked based on it. Don't forget to update it in your render loop.

```javascript
var laserCooked = new THREEx.LaserCooked(laserBeam)
onRenderFcts.push(function(delta, now){
    // every time you render the scene, update laserCooked
    laserCooked.update(delta, now)
})
```
