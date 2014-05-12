---
layout: post
title: "Simple and Easy To use Crates Models to Get Your Game Started with THREEx.Crates Game Extension For THREE.js"
date: 2014-04-25 13:44
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.crates/examples/basic.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.crates/master/examples/images/screenshot-threex-crates-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.crates](http://www.threejsgames.com/extensions/#threex.crates).
threex.crates is a [threex game extension for three.js](http://www.threejsgame.com/extensions/).
It provides [crates](http://en.wikipedia.org/wiki/Crate) models, 3 of them to be accurate.
Yeah you heard me, this is only boxes of wood. Why doing an extension for that?
Well, because crates are like a myth in 3d graphics, we put them everywhere.
So if you need crates to easily put in your game, you know where to find them now :)

<a href='http://jeromeetienne.github.io/threex.crates/examples/basic.html' target='_blank'><input type="button" value='Try Threex.crates Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/zEmGzBc8nSY" frameborder="0" allowfullscreen></iframe>



Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.crates/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.crates/blob/master/examples/basic.html)\] :
It shows all the balls on a single screen.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.crates.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.crates
```

How To Use It
=============

To create a crate0, just do

```
var mesh = THREEx.Crates.createCrate0()
scene.add(mesh)
```

To create a crate1, just do

```
var mesh = THREEx.Crates.createCrate1()
scene.add(mesh)
```

To create a crate2, just do

```
var mesh = THREEx.Crates.createCrate2()
scene.add(mesh)
```