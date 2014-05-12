---
layout: post
title: "Easy to use dynamic texture to write text in your 3d object with threex.dynamictexture game extensions for three.js"
date: 2014-05-02 13:54
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.dynamictexture/examples/basic.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.dynamictexture/master/examples/images/screenshot-threex-dynamictexture-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.dynamictexture](http://www.threejsgames.com/extensions/#threex.dynamictexture).
threex.dynamictexture is a [threex game extension for three.js](http://www.threejsgames.com/extensions/). It provides an easy way to handle dynamically generated texture.
Inspiration came from
the excelent [babylon.js](http://www.babylonjs.com)
which got 
[BABYLON.DynamicTexture](https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Materials/textures/babylon.dynamicTexture.js).
It is mainly used to write text in texture. Say you got a character which says something, you may want to put that in a texture and display that above your character. threex.dynamictexture will make it easy for you.


<a href='http://jeromeetienne.github.io/threex.dynamictexture/examples/basic.html' target='_blank'><input type="button" value='Try Threex.dynamictexture Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/lSR-6Q4oinU" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.dynamictexture/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.dynamictexture/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

How To Install It
=================

You can install it manually or with
[bower](http://bower.io/).
for the manual version, first include ```threex.dynamictexture.js``` with the usual

```html
<script src='threex.dynamictexture.js'></script>
```

or with
[bower](http://bower.io/) 
you type the following to install the package.

```bash
bower install threex.dynamictexture
```

then you add that in your html

```html
<script src="bower_components/threex.dynamictexture/threex.dynamictexture.js"></script>
```

How To Use It ? 
===============

You instanciate the texture, say it is 512 pixel width, and 512 pixel high.
```
var dynamicTexture  = new THREEx.DynamicTexture(512,512)
```

* ```dynamicTexture.canvas``` the underlying canvas
* ```dynamicTexture.context``` the context of the underlying canvas
* ```dynamicTexture.texture``` the ```THREE.Texture``` created


To use the texture on a ```THREE.Material```

```javascript
var geometry    = new THREE.CubeGeometry( 1, 1, 1);
var material    = new THREE.MeshBasicMaterial({
    map : dynamicTexture.texture
})
var mesh    = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

When you update a texture be sure to do

```javascript
dynamicTexture.texture.needsUpdate  = true
```

## Helpers Functions
Some helpers functions are provided to draw in this canvas.

**To clear the underlying canvas**

```
dynamicTexture.clear();
```

**To Draw a Text**
to draw a text

```
dynamicTexture.drawText('Hello', 32, 256, 'red')
``` 
    