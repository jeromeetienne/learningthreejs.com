---
layout: post
title: "Personalized and Polished Text for Your Three.js Game With threex.text"
date: 2014-05-16 17:55
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.text/examples/basic.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.text/master/examples/images/screenshot-threex-text-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about
[threex.text](http://www.threejsgames.com/extensions/#threex.text).
threex.text is a [threex game extension for three.js](http://jeromeetienne.github.io/threex/) which makes it easy to add 3d text in your game. You can use it to create a big logo on top of a shop or a big sign of any kind Las Vegas style. Up to you to see :) It is very flexible. You can fine tune lots of parameters to make it fit your needs. You can choose the fonts, the size, the bevel, the weight etc...

<a href='http://jeromeetienne.github.io/threex.text/examples/basic.html' target='_blank'><input type="button" value='Try Threex.text Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**


<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/skjX1Dl7e0Y" frameborder="0" allowfullscreen></iframe>


Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.text/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.text/blob/master/examples/basic.html)\] :
It shows a 3d text.
* [examples/requirejs.html](http://jeromeetienne.github.io/threex.text/examples/requirejs.html)
\[[view source](https://github.com/jeromeetienne/threex.text/blob/master/examples/requirejs.html)\] :
It show a 3d text and it is all loaded thru require.js

How To Install It
=================

You can install it via script tag

```html
<script src='threex.text.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.text
```

How To Use It
=============

Here is a very basic usage

```
var mesh    = new THREEx.Text('THREEx')
scene.add(mesh)
```

Here is another example with more parameters. The options are passed directly 
to  ```THREE.TextGeometry```. 
See [three.js docs](http://threejs.org/docs/#Reference/Extras.Geometries/TextGeometry)
for details.

```
var mesh    = new THREEx.Text('THREEx', {
    font        : "droid serif",
    weight      : "bold",
    size        : 1,
    height      : 0.4,
})
scene.add(mesh)
```