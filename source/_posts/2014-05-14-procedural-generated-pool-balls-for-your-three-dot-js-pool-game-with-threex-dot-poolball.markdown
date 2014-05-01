---
layout: post
title: "Procedural Generated Pool Balls For Your Three.js Pool Game with threex.poolball"
date: 2014-05-14 20:21
comments: true
published: true
categories: 
---

threex.poolball is a [three.js games extension](http://www.threejsgames.com/extensions/) which helps you build pool balls. It provides dynamically generated models of pool balls, so no model download needed. It may be fun to play with when you start with three.js, funnier than a plain sphere for sure :) You can use it for your bar games, having  your characters bet when playing pool, or even your [Marble Table](http://jeromeetienne.github.io/marbleTable/) games, as I did, adding cool granular sounds when the balls roll. 

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.poolball/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.poolball/blob/master/examples/basic.html)\] :
It shows a basic usage of this extension
* [examples/demo.html](http://jeromeetienne.github.io/threex.poolball/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.poolball/blob/master/examples/demo.html)\] :
It shows multiple pool balls setup like on a pool table :)

A Screenshot
============
[![screenshot](https://raw.githubusercontent.com/jeromeetienne/threex.poolball/master/examples/images/screenshot-threex-poolball-512x512.jpg)](http://jeromeetienne.github.io/threex.poolball/examples/demo.html)

How To Install It
=================

You can install it via script tag

```html
<script src='threex.poolball.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.poolball
```

How To Use It
=============

Here is the default usages

```
var mesh    = THREEx.createPoolBall();
scene.add(mesh)
```

this is with custom arguments

```
var mesh    = THREEx.createPoolBall({
    ballDesc    : '0',  // the text which gonna be written on the ball
    stripped    : true, // true if the ball must be stripped, false otherwise
    textureW    : 512   // the width/height of the created texture for this ball
});
scene.add(mesh)
```

Some ball description are already done.

* ```cue``` will return an unstripped white ball
* ```black``` will return an unstripped black ball
* ```1``` to ```9``` will assign the official colors for [nine-ball](http://en.wikipedia.org/wiki/Nine-ball) pool