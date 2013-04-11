---
layout: post
title: "closing the gap between html and webgl"
date: 2013-03-20 05:31
comments: true
published: false
---

TODO make a three.js example for it

then comment it here 


## or how to include actual webpages in webgl


## how to do it.
* how to code it in three.js
* not tquery
* code an examples

### setup a renderer for css 3d
```
// create the rendererCSS
var rendererCSS = new THREE.CSS3DRenderer();
rendererCSS.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( rendererCSS.domElement );
```

* TODO link to threex.resize

### setup a scene for css3d

```
var sceneCSS  = new THREE.Scene();
```

```
THREEx.WindowResize.bind(rendererCSS, camera; 
```

### create a plane in webgl scene

```
var geometry = new THREE.Plane(10, 10);
var material = new THREE.MeshBasicMaterial();
material.color.set('black')
material.opacity = 0;
material.blending  = THREE.NoBlending;
var mesh = new THREE.Mesh(geometry, material);
```

### create a plane in css3d scene

```
var domElement = document.createElement('div');
```

```
var objectCSS   = new THREE.CSS3DObject( domElement );
sceneCSS.add( objectCSS );
```


## how is it different from what existed before ?

Well before for all i know, there were 2 ways to mix dom element inside webgl:
The first one is to put the DOM element element in front of WebGL canvas, or behind.
The second is to do a screenshot of DOM element and to use it as texture.
Unfortunatly both got serious issues. Let's see...

### Playing With DOM Element Ordering
* If you play with DOM element ordering, you got only 2 possibilities.
* Either you put it in front of the canvas.
* But then when something appears on front of it in the scene, it looks buggy to the user.
* Look on the right, the first image looks ok. but when the character 
should in front of the screen,  it appears behind...
* (TODO do screenshot of minecraft close to the screen, then in front, then behind)
* So we should put the DOM element behind the canvas ?
* well unfortunatly it doesnt work either.
* you can the same kind of bug but in the opposite direction.
* TODO put some screenshot

OK... so what about i take a screenshot of the DOM element and use it as normal texture.
Well not that simple.

### Screenshot Of HTML Content
First, it isn't possible to take a screenshot of a dom element if you follow 
  [w3c specifications](http://www.w3.org/TR/).
This is [for security reasons](https://code.google.com/p/chromium/issues/detail?id=81126#c9).
There is nothing like 
  [canvas's toDataURL()](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-canvas-todataurl)
  that you can use on any DOM element.
Firefox got 
  [some support](https://developer.mozilla.org/en-US/docs/HTML/Canvas/Drawing_DOM_objects_into_a_canvas)
  for it but it isnt standard.
Chrome got [some too](http://badassjs.com/post/12473322192/hack-of-the-day-rendering-html-to-a-canvas-element-via)
  but only for extensions
There is a library trying to do that [html2canvas](http://html2canvas.hertzen.com/).
  It produce impressive results!
  To render html isnt a walk in the park,
  so understandably it is far from perfect.
  But even if it was, important limitations exist.
  
In short, you end up with an image, not an actual web page.
It is slow.
  To render html is hard already, but to do it fast and in javascript...
  it is close to impossible.
  Prooving fermat may be considered easy in comparison :)
But most of all, you can't interact with an image as you do with a html page.
  You cant have input in it.
  The page can't be resized, aka the content layout wont be reflowed 
  when the window is resized.
  The page can not be dynamic. so no live update, no ajax, none of that.

## how far can we go ?
* able to integrate any DOM in your 3d scene.
* thru iframe one can include any third party page (assuming they are ok with it)
* video players
* ads
* 2d game
* interactive pages
  
## html and webgl sitting together in a tree ?
Well not quite unfortunatly...
WebGL is 3d inside a [canvas element](http://en.wikipedia.org/wiki/Canvas_element)
and a canvas is a black box for html page.
You can't bind [DOM events](http://en.wikipedia.org/wiki/DOM_events) inside canvas.
You can't have 
[stylesheet](http://en.wikipedia.org/wiki/Style_sheet_\(web_development\))
to change canvas content
You can't put dom element inside your canvas. 
Those two doesnt talk to each other.

## What are the limitations ?
Unfortunatly it isn't all pink, WebGL and HTML aren't really merged.
This is only a nice trick. It has some limitations.
For example, the dom element is rotated using [css 3d](http://example.com/TODO). 
This is a fairly new technology. 
so you may hit bugs.

Moreover, it only appears as a part of 3d... but this remains plain DOM.
So it doesnt benefit from webgl specific display.
For example, it is impossible to get 
[post processing](http://example.com/TODO)
on the dom element.
Indeed, this technic is applied in 2d on the rendered scene and the DOM element is not in it.
Additionally the dom element wont share the lighting as the rest of your webgl scene.
Nevertheless, [css shader](http://example.com/TODO) allows to apply shader on normal DOM element,
so it may be possible to make a coherent lighting.
The web is so beautifull nowadays!

## how does this relate to the rest of my work
I love this new trick.
I'm trying to make webgl easier for while now.
My strategy has been to make it closer to what webdevs know today,
copying [jQuery API on top of three.js](http://jeromeetienne.github.com/tquery/),
emulating [dom events inside webgl scene](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/)
or even making [3d text act as web links](http://learningthreejs.com/blog/2012/02/27/linkify-tquery-extension/).
To integrate actual web pages inside webgl scene definitly matches this same vibe!
