---
layout: post
title: "Live Cube Maps Reflections In Your Three.js Game With threex.cubecamera"
date: 2014-05-12 20:20
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---


<a href='http://jeromeetienne.github.io/threex.cubecamera/examples/demo.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.cubecamera/master/examples/images/screenshot-threex-cubecamera-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.cubecamera](http://www.threejsgames.com/extensions/#threex.cubecamera).
threex.cubecamera is a [three.js games extension](http://www.threejsgames.com/extensions/) which provides a helper for cube cameras. It is very useful when a given object must reflect a texture cube live. Just look at it, you can see the reflection as clear as a real life mirror! You can give your texture the color you want, for example in the demo I created a "gold" sphere to give it a shinier look. Be careful though, this requires 6 renderings of the scene every time you update it. It becomes expensive fast. 


<a href='http://jeromeetienne.github.io/threex.cubecamera/examples/demo.html' target='_blank'><input type="button" value='Try Threex.cubecamera Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/tUnyNECDgFE" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.cubecamera/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.cubecamera/blob/master/examples/basic.html)\] :
It shows the most basic usage of this extension.
* [examples/demo.html](http://jeromeetienne.github.io/threex.cubecamera/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.cubecamera/blob/master/examples/demo.html)\] :
It shows a little bit shinier demo.
* [examples/discoball.html](http://jeromeetienne.github.io/threex.cubecamera/examples/discoball.html)
\[[view source](https://github.com/jeromeetienne/threex.cubecamera/blob/master/examples/discoball.html)\] :
It shows a little bit shinier discoball.
TODO to port in its own demo.
It doesnt even use live rendering.
Use the "minecraft goes party" from nextgamefrontier talk.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.cubecamera.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.cubecamera
```


How To Use It
=============

First you need to create a classic mesh, the one which gonna reflect the live texture cube.
In this example, we gonna create sphere with the color 'gold' like this.

```
var geometry    = new THREE.SphereGeometry(0.5, 32, 16)
var material    = new THREE.MeshPhongMaterial({
    color   : 'gold'
})
var mesh    = new THREE.Mesh(geometry, material)
scene.add( mesh )   
```

Now we needs to create the cube camera which gonna update the texture cube live.
We do that like this.

```
var cubeCamera  = new THREEx.CubeCamera(mesh)
scene.add(cubeCamera.object3d)
```

Don't forget to update it when needed (likely at every frame)

```
cubeCamera.update(renderer, scene)
```

Now that we got the textureCube, we set the mesh material to reflect this texture cube.

```
material.envMap = cubeCamera.textureCube
```

This is it! Now you got the live texture cube on your sphere :)


