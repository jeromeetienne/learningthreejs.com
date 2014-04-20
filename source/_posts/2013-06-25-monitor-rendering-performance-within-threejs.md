---
layout: post
title: "Monitor Rendering Performance Within Three.js"
date: 2013-06-25 10:58
comments: true
categories: [three.js, performance]
---

This post is about monitoring rendering performance within three.js.
It presents a small standalone extension called ```threex.rendererstats```.
It collect information from three.js renderer and display it live. 
It is very usefull to diagnose performance issues while developping.
The API is exactly the same as [stats.js](http://github.com/mrdoob/stats.js)
so it is easy for you to include in your own stuff.

<iframe width="425" height="349" src="http://www.youtube.com/embed/UXWpnANajDk" frameborder="0" allowfullscreen></iframe>

<!-- more -->

## What Is It ?

{% img right /data/2013-06-13-monitor-rendering-performance-within-threejs/screenshot-rendererstats.png %}

[threex.rendererstats](http://github.com/jeromeetienne/threex.rendererstats) collects information 
about three.js renderer and display it realtime on your screen.
It is released under MIT license and is available on
[github](http://github.com/jeromeetienne/threex.rendererstats).
See a screenshot on the right.

<a href='http://jeromeetienne.github.io/threex.rendererstats/examples/basic.html' target='_blank'><input type="button" value='Try Live Demo!' /></a>

{% img left /data/2013-06-13-monitor-rendering-performance-within-threejs/screenshot-stats.png 240x167 %}

It is inpired from
[stats.js](http://github.com/mrdoob/stats.js) by 
[mrdoob](http://mrdoob.com).
See a screenshot on the left.
Webgl renderer keeps some internal statistics on the scene being renderered and update it at every frame. 
It is accessible in a property ```.info```.
threex.rendererstats just gather this information and display it nicely on your screen.


## How Is It Useful ?
It is a very nice tool to monitor performances of WebGL rendering.
As it is updated realtime, you can identify performance issues at various moments within your game
We have seen canvas inspection recently in 
[Debugging With Chrome’s Canvas Inspection](http://learningthreejs.com/blog/2013/04/05/debugging-with-chromes-canvas-inspection/). 
[canvas inspection](http://learningthreejs.com/blog/2013/04/05/debugging-with-chromes-canvas-inspection/) 
is directly at webgl level. threex.rendererstats remains at three.js level to give you another kind 
of information on the renderer.

Lets details those information
There is 2 sections one for the memory, another for the renderer. 
For the memory, you got

* ```info.memory.geometry``` : number of geometry currently in memory
* ```info.memory.programs``` : number of shaders currently in memory
* ```info.memory.texture``` : number of texture currently in memory

For the render, you got

* ```info.render.calls``` : number of draw calls currently used to render
* ```info.render.vertices``` : number of vertices currently rendered
* ```info.render.faces``` : number of triangles currently renderered
* ```info.render.points``` : number of particles currently rendered

## How To Use It ?

first, include ```threex.rendererstats.js``` with the usual ```<script>``` tag.

```html
<script src='threex.rendererstats.js'></script>
```

then you initialize the object.

```javascript
var rendererStats	= new THREEx.RendererStats()
```

You likely need to position it on the page with css. 
You may use something along this line

```javascript
rendererStats.domElement.style.position	= 'absolute'
rendererStats.domElement.style.left	= '0px'
rendererStats.domElement.style.bottom	= '0px'
document.body.appendChild( rendererStats.domElement )
```

finally you update it at every frame in your rendering loop or when you do ```renderer.render()```

```javascript
rendererStats.update(renderer);
```

And you are done. Quite easy to include! Now you can monitor your own three.js scenes.

## Conclusion
We have seen how to monitor performance information withing three.js.
How to display and use the statistics collected by ```THREE.WebGLRenderer```
itself.
The information may appear a bit raw but it is live.
So unexpected performance changes can be detected very early.

That's all for today! have fun :)