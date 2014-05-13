---
layout: post
title: "Easy Way to Include Transparency In Your Three.js Game with threex.transparency"
date: 2014-05-13 20:21
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.transparency/examples/basic.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.transparency/master/examples/images/screenshot-threex-transparency-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.transparency](http://www.threejsgames.com/extensions/#threex.transparency).
threex.transparency is a [three.js games extension](http://www.threejsgames.com/extensions/) to easily handle transparency. Transparency is a tricky business in Webgl, but this extension makes it approachable. It is worth trying. Do you remember the transparency between the leaves of a tree in 3D games? Well, with this extension you will be able to add it to your own game. You can also make clouds appear transparent in the sky you have created for your game. It is easy to include and it gives a nice polish finish, a professional touch. 


<a href='http://jeromeetienne.github.io/threex.transparency/examples/basic.html' target='_blank'><input type="button" value='Try Threex.transparency Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**


<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/mP_8EHnZUTo" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.transparency/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.transparency/blob/master/examples/basic.html)\] :
It shows a basic usage of this extension.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.transparency.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.transparency
```

## How To Use It ?

The algo is well described in this
[opengl tutorial about transparency](http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-10-transparency/). We just adapt it to fit three.js.
First you setup all the objects that you want to be transparent

```
THREEx.Transparency.init(objects)
```

It will change the ```THREE.Material``` to make it support transparent.
Second you need to update all your objects at every frame.

```
THREEx.Transparency.update(objects, camera)
```