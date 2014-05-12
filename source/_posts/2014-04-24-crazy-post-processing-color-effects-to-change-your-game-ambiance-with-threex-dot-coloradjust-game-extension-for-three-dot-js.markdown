---
layout: post
title: "Crazy Post Processing Color Effects To Change Your Game Ambiance With Threex.coloradjust Game Extension For Three.js"
date: 2014-04-24 13:47
comments: true
categories: [threexaday, threex, game, extension, three.js]
published: true
---

<a href='http://jeromeetienne.github.io/threex.coloradjust/examples/demo.html' target='_blank'><img class="right" src="https://raw.githubusercontent.com/jeromeetienne/threex.coloradjust/master/examples/images/screenshot-threex-coloradjust-512x512.jpg" width="250" height="250"></a>
This is post is part of the ['one threex a day' challenge](/blog/2014/04/22/one-threex-a-day-gets-your-game-on-its-way-a-challenge/). 
This challenge is to publish every day one game extension for three.js!
One per day, every day and that for 2month!
In this post, we gonna talk about 
[threex.coloradjust](http://www.threejsgames.com/extensions/#threex.coloradjust).
threex.coloradjust is a 
[threex game extension for three.js](http://www.threejsgames.com/extensions/).
It provides a color adjustement in post processing.
It happens on the whole screen and changes every colors giving a whole new ambiance to your games.
It includes smooth transitions between each ambiance.
There are 22 ambiances going from 'sepia', to 'thermal', or 'radioactive'.
I highly recommend 'nightvision' if your game is about fps shooting at night!
It is very flexible, you can build your own ambiance with any image editing software.
It is ported from
[color-adjust demo](http://webglsamples.googlecode.com/hg/color-adjust/color-adjust.html)
by
[greggman](http://greggman.com/).
Here is a [video](http://www.youtube.com/watch?v=rfQ8rKGTVlg#t=25m03s)
where you can see greggman explaining the underlying technic.
It explains how to do 3d texture in webgl! :)

<a href='http://jeromeetienne.github.io/threex.coloradjust/examples/demo.html' target='_blank'><input type="button" value='Try Threex.coloradjust Demo Now' /></a>

To see the [other posts about one threex a day](/blog/categories/threexaday/) and forget our moto!
**"A THREEx extension a day, gets your game on its way!"**

<!-- more -->

<iframe width="420" height="315" src="//www.youtube.com/embed/jhCKQqVIcG0" frameborder="0" allowfullscreen></iframe>



Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.coloradjust/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.coloradjust/blob/master/examples/basic.html)\] :
It shows how to use the ```THREEx.ColorAdjust.Renderer```.
It changes the color cube randomly every 3-seconds just to put some animations
* [examples/demo.html](http://jeromeetienne.github.io/threex.coloradjust/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.coloradjust/blob/master/examples/demo.html)\] :
It show an video with the adjusted colors. 
You can play with it to get a better feeling of what this effect can do for you.


How To Install It
=================

You can install it via script tag

```html
<script src='threex.coloradjust.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.coloradjust
```

How To Use It
=============

It build the passes for the color effect.
It exposes ```colorPass.colorPass``` for a ```THREE.EffectComposer``` instance.

Create an instance

```
var colorPasses = new THREEx.ColorAdjust.Passes();
```

Everytime you render the scene, be sure to update it

```
colorPasses.update(delta, now)      
```

Then you add those passes to an ```THREE.EffectComposer``` like that

```
colorPasses.addPassesTo(composer)
```

### Tuning

This module comes with a set of predefined *color cubes* : 22 of them to be exact.
You can set the color cube you want: one of the 22 already provided, or your own. 
It default to ```default```.
Here is the full list of available colors adjustement : default,
monochrome,
sepia,
saturated,
posterize,
inverse,
color-negative,
high-contrast-bw,
funky-contrast,
nightvision,
thermal,
black-white,
hue-plus-60,
hue-plus-180,
hue-minus-60,
red-to-cyan,
blues,
infrared,
radioactive,
goolgey,
bgy.

```javascript
// set color adjustement to 'nightvision'
colorPasses.setColorCube('nightvision')
```

There is a smooth linear transition between the old colorCube and the new colorCube. 
You can tune the delay like this.

```javascript
// set the transition delay to 2 seconds
colorPasses.delay   = 2;
```

[Discuss this post on Hacker News.](https://news.ycombinator.com/item?id=7639554)
