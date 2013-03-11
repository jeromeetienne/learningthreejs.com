---
layout: post
title: "Let’s Make a 3D Game: Supporting Mobile"
date: 2011-12-28 13:46
comments: true
categories: [three.js, mobile, canvas2d]
published: true
---

This post is about supporting mobile.
We will try to port [marblesoccer](http://marblesoccer.com) on mobile.
When doing a
[boilerplate for three.js](http://127.0.0.1:8000/blog/2011/12/20/boilerplate-for-three-js/),
mobile had to be supported for compatibility.
So it gave me the idea of this post.
What about porting our game on mobile ?
Porting a 3D web game to mobile ? crazy :)

The desktop version looks kindof ok.
What would be the result of this experiment ?
Is that even possible ?
What about usable ?
This is the purpose of this experiment to find out.

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Ow_ceac1aEE?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Mobile isn't desktop

Indeed... desktop and mobile are quite different plateforms.
Which differences are relevant to us ?
First, mobile network is bad, especially latency.
So avoid download of long files, such as texture or sound.
Here is a good talk on
[Mobile Web Performance](http://www.youtube.com/watch?v=L2YqfVNHQO4).
Another thing, mobile got no keyboard, no mouse, but a touch screen
We need to get a game controller for this environement.
We use [virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js).
See details in our [previous post](/blog/2011/12/26/let-s-make-a-3d-game-virtual-joystick/).

One big thing is that currently, on mobile, WebGL hasnt reached mainstream to say the least.
No major vendor is shipping phone with webgl, so nobody or close get webgl on phone.
So for our little experiment, we will display in
[Canvas 2D](http://www.w3.org/TR/2010/WD-2dcontext-20100304/)
with
[THREE.CanvasRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/CanvasRenderer.js).

## Porting to canvas 2D

So what need to be done ?
First step is to use the proper renderer when suitable.
Second is fixing material and geometry to fit canvas2D renderer capability.
Last step is to look for room of optimisations.
Ok now let's intanciate the renderer. If webgl is available, use
```THREE.WebGLRenderer```
else use
```THREE.CanvasRenderer```.
Not too hard hey ?
We already did that in the
[boilerplate for three.js](/blog/2011/12/20/boilerplate-for-three-js/)

<iframe src="http://marblesoccer.com?render=canvas&bypasslanding=1"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>


We simplify geometry to reduce the number of polygon.
For marble geometry, the sphere got 512 faces on webgl, and only 9 on canvas2d.
Drastic :)
What about material ? For webgl, we used 
[phong](http://en.wikipedia.org/wiki/Phong_shading)
for fancy lightings,
We used
[textures](http://en.wikipedia.org/wiki/Texture_mapping)
for realistic effects.
But with canvas2D, those technics cant be used.
They are way too slow.


This is enougth to get it working.
It display something reasonable on the screen at least.
We sacrifice a lot tho, no more texture not fancy lighting.
And now the bad new, it results in 3fps on my ipad2 ios4... ouch.

## More measures

How come performances are so bad ? So i did more measures.
I disabled the display of map and marbles to see how they impact performance. 
If we display the map and the marbles, we got 3fps on my ipad2.
If we display only marbles, no more maps, we got 23fps, much better.
but still not great... Considere that we are only displaying marbles and they are real simple.

If we display no marble, and no map. we got only 30fps. So all the rest, all the non display
part is already using a big part of time ? what are we doing ? not much...
Still we run
[realistic 3D physics](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/)
and ipad2 cpu isnt as fast as usual desktop ones.


## Time to optimize

Ok it is slow but this is a first try.
I admit the code isnt not too optimized.
[cpu](http://en.wikipedia.org/wiki/Central_processing_unit)
/
[gpu](http://en.wikipedia.org/wiki/Graphics_processing_unit)
performance are so good on desktop, i may have been sloppy here and there :)
There are areas of optimisations.
We need to draw less polygons.

First we need to *reduce the geometry* of the map.
We can do that by clustering voxels:
if 2 voxels got the same color and touch each other, display one large box, instead of 2 small boxes.
We did it to optimize our physics.
See details in [microphysics post](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/).
Additionnaly we could use marblesoccer's
[map editor](http://127.0.0.1:8000/blog/2011/09/14/lets-make-a-3D-game-map-editor/)
to redesign a map with a simpler geometry.

Another low-hanging fruit is to remove faces which are never seen, like in
[minecraft example](http://mrdoob.github.com/three.js/examples/webgl_geometry_minecraft_ao.html)
from
[three.js](https://github.com/mrdoob/three.js/).
We could try to 2D sprites instead of 3D spheres for marble.
We wont use
[THREE.Sprite](https://github.com/mrdoob/three.js/blob/master/src/objects/Sprite.js).
It isnt supported
[THREE.CanvasRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/CanvasRenderer.js).
But dont worry, it is possible with the particle system.
See how ```THREE.Particle``` is used in
[canvas_particles_sprites.html](http://mrdoob.github.com/three.js/examples/canvas_particles_sprites.html)
example.

## Conclusion
And after all that, what can you expect ?
Will that run at 60fps ? 30fps ? Not likely or it will require a lot of effort.
{% img left /data/lets-make-a-3d-game-supporting-mobile/images/screenshot-webgl-small.png  %}
{% img right /data/lets-make-a-3d-game-supporting-mobile/images/screenshot-canvas-small.png  %}
So animations arent smooth, what about the look?
Watch what you got on the screen...
On the right, a canvas version. [live here](http://marblesoccer.com/?render=canvas).
On the left you can see a webgl version. [live here](http://marblesoccer.com).
Lets face it... *canvas version is ugly*.

After a significant work, you get poor performance and crappy look.
Not many players would accept that...
currently canvas performance doesnt seems suitable to display 3D on mobile.
It is a good way to monitor performances and see how they evolve with time.

