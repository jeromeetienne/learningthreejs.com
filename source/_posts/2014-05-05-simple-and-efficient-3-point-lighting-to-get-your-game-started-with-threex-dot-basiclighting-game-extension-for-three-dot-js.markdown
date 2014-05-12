---
layout: post
title: "Simple And Efficient 3 Point Lighting To Get Your Game Started With Threex.basiclighting Game Extension For Three.js"
date: 2014-05-05 13:52
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.basiclighting/examples/demo.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.basiclighting/master/examples/images/screenshot-threex-basiclighting-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.basiclighting](http://www.threejsgames.com/extensions/#threex.basiclighting).
threex.basiclighting is a [threex game extension for three.js](http://www.threejsgames.com/extensions/). It provides 
a [three point lighting](http://en.wikipedia.org/wiki/Three-point_lighting). 
It is the lighting used in movies:
A key light on the front-left, a back light in the back and a fill light on the front right, nothing fancy.
It is perfect if you dunno much about lighting and you want to add lights in your games.
Nothing big or special in this extension.
This is mainly for educational purposes or for starting your project fast.

<a href='http://jeromeetienne.github.io/threex.basiclighting/examples/demo.html' target='_blank'><input type="button" value='Try Threex.basiclighting Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/eZkl-r-UOsg" frameborder="0" allowfullscreen></iframe>

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.basiclighting/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.basiclighting/blob/master/examples/basic.html)\] :
It shows a basic example of extension.
* [examples/demo.html](http://jeromeetienne.github.io/threex.basiclighting/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.basiclighting/blob/master/examples/demo.html)\] :
It shows a demo of it.


How To Install It
=================

You can install it manually. Just do 

```html
<script src='threex.basiclighting.js'></script>
```

You can install with [bower](http://bower.io/).

```bash
bower install threex.basiclighting
```

then you add that in your html

```html
<script src="bower_components/threex.basiclighting/threex.basiclighting.js"></script>
```

## How to Use It

create a three point lighting

```javascript
var lighting    = new THREEx.ThreePointsLighting()
scene.add(lighting)
```

create a sun set lighting

```javascript
var lighting    = new THREEx.SunSetLighting()
scene.add(lighting)
```
