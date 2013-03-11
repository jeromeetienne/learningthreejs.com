---
layout: post
title: "Boilerplate for Three.js"
date: 2011-12-20 19:09
comments: true
published: true
categories: [three.js, library, boilerplate]
---

This post presents
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate).
I looked at 
[html5 boilerplate](http://html5boilerplate.com/)
and found
[it](http://www.youtube.com/watch?v=NMEB78VX2P0)
[awesome](http://www.youtube.com/watch?v=oDlsOyPKUTM).
[html5 boilerplate](http://html5boilerplate.com/)
is a fast way start a clean project. 
It avoids repetitive tasks, following [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principles.
It includes all those good practices, which are so easy to forget.
It seems all good to me :)
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate) tries to apply similar principles.
I frequently write simple three.js demo for tutorials, and repeat the first steps way too often for my tastes :)
It has been done in effort to make 3D on the web even easier.

[Try it](http://jeromeetienne.github.com/threejsboilerplate/) out.
"Boilerplate for three.js is a web template for a fast, robust and future-proof site.
Boilerplate is not a framework, nor does it prescribe any philosophy of
development, it's just got some tricks to get your project off the ground
quickly and right-footed."
- freely adapted from [html5 boilerplate site](http://html5boilerplate.com/).

<!-- more -->

## Walkthrough

This project is at an early stage.
Dont hesitate to suggest improvements or
bug fixes in
[github issues](https://github.com/jeromeetienne/threejsboilerplate/issues).
It has been done to run everywhere, and to promote good practices.
The
[screencast](http://www.youtube.com/watch?v=kOReCN5t2Eo)
below will walk you through the source of the project.
22min... a long one :)

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/kOReCN5t2Eo?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Compatibility is key

It has to run everywhere.
We believe that compatibility is crucial on the web.
The boilerplate seamlessly works on desktop and mobile.
It is working on webgl/canvas2d and supports mouse/touch events.

It renders on
[webgl](http://en.wikipedia.org/wiki/WebGL)
if available, else it fallbacks on
[canvas2D](http://html5doctor.com/an-introduction-to-the-canvas-2d-api/).
It is often forgotten, but [three.js]() is able render on various backends,
they are called [renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers).
It isnt always possible to fallback tho.
Materials are especially sensible to the type of renderer you use.
For examples, many materials are webgl specific as they contains shaders and canvas2D got no shaders.
Up to you to find the balance that fit your needs.

The camera controls is rather basic.
If you need a different controls for your camera, pick one in
[this list](https://github.com/mrdoob/three.js/tree/master/src/extras/controls).
This one is simple to use and understand, a nice feature for a boilerplate.
It supports
[mouse events](http://www.quirksmode.org/js/events_mouse.html)
and
[touch events](https://developer.mozilla.org/en/DOM/Touch_events).
So you can run with a touch screen with a glitch.

## Good Practices

Some features have been added: fullscreen, screenshot and window resize.
I consider them [good pratices](http://en.wikipedia.org/wiki/Best_practice) which are often forgotten.
Some numbers based on [three.js examples](https://github.com/mrdoob/three.js/tree/master/examples):
128 examples total, 
26 of them handle touch events, 
11 handle window resize,
2 handle screenshot,
0 handle fullscreen.

<iframe src="http://jeromeetienne.github.com/threejsboilerplate"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

**Fullscreen** is supported to enjoy your 3D on a large display
without visual distraction.
If you press *f*, your demo will go fullscreen.
For technical details, see "[Make It Fullscreen](/blog/2011/11/17/lets-make-a-3d-game-make-it-fullscreen/)" post.

**Screenshot** makes it easy to share the image
as what you see on the screen at a given moment.
If you press *p*, a new tab will open with a screenshot of the rendered content.
For technical details, see "[screenhot in javascript](/blog/2011/09/03/screenshot-in-javascript/)" post.
It it usefull to share nice images and to help debug on various plateforms.

**Window resize** is supported because it is required. Without it, your 3D scene will loose scaleing and center
when you resize the window or go fullscreen.
For technical details, see "[window resize your demos](/blog/2011/08/30/window-resize-for-your-demos/)" post.

## How to use it ?

It is quite simple, first you download the code as
a [.zip file](https://github.com/jeromeetienne/threejsboilerplate/zipball/master)
or with the [git](http://git-scm.com/) command line below.

```
	git clone git://github.com/jeromeetienne/threejsboilerplate.git
```

then start updating [index.html](https://github.com/jeromeetienne/threejsboilerplate/blob/master/index.html) to
fit your needs.
Below is a screencast where i use the
[boilerplate](https://github.com/jeromeetienne/threejsboilerplate)
to display a
[teapot](http://en.wikipedia.org/wiki/Utah_teapot)
in only 3min!
Why a teapot ? Because it is the "hello world" of 3D :)
Be warned, the video is a bit speedy, im just starting at doing screencast.
Next ones will hopefully be slower.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/0XPOCi6FJX0?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Conclusion

Later, it may be cool to have a builder.
I think it may be possible to make it client only.
[jszip](http://jszip.stuartk.co.uk/) library would create the zip containing all the files.
[shorttag.js](https://github.com/jeromeetienne/shorttag.js) library would compile templates according to user needs.
A builder would produce a cleaner and smaller result for you to play with.

I gave a short talk at [parisjs](http://parisjs.org) about it, here are the [slides](http://jeromeetienne.github.com/slides-3jsbp-parisjs14).
I hope
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate).
will help make
[three.js](https://github.com/mrdoob/three.js/)
even easier to use.
This project is quite new and will likely improve soon.
That's all folks, have fun :)
