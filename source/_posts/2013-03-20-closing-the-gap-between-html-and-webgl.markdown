---
layout: post
title: "closing the gap between html and webgl"
date: 2013-03-20 05:31
comments: true
categories: 
---


## closing the gap between html and webgl or how to include actual webpages in webgl


## how to do it.
* how to code it in three.js
* not tquery

## how is it different from what existed before ?

Well before for all i know, there were 2 ways to mix dom element inside webgl:
The first one is to put the DOM element element in front of WebGL canvas, or behind.
The second is to do a screenshot of DOM element and to use it as texture.
Unfortunatly both got serious issues. Let's see...

### playing with domElement ordering
* you can put the dom element in front of the canvas
* then when something appears on front of it in the scene, it looks buggy
* (do screenshot of minecraft close to the screen, then in front, then behind)
* so i put the dome element behind the canvas ?
* well unfortunatly it doesnt work either
* you can the same kind of bug but in the opposite direction
* ok ok so what about i take a screenshot of the dom element and use it as normal texture
* well not that simple.

### Screenshot of html content
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

## what is the potential of it
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
Those two doesnt talk to each other

## what are the limitation
* browser bugs
* it only appears as a part of 3d... but this remains plain DOM
* doesnt benefit from webgl specific
* no lighting on the face
* no post processing

## how does this relate to the rest of my work
* try to make webgl easier for a while
* trying to make it closer to what is known by webdevs today
* copying jQuery API on top of three.js 
  with [tQuery](http://jeromeetienne.github.com/tquery/)
* emulating dom events in 3d as you can
  see [here](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/)
* making 3d text act as web links
  with [linkify](http://learningthreejs.com/blog/2012/02/27/linkify-tquery-extension/)
* integrating actual web pages inside webgl scene is the continuity of it 
