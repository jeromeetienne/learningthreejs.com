---
layout: post
title: "Dom Events in 3D Space"
date: 2012-01-17 11:56
comments: true
categories: [threejs, experiment]
---

Ever dreamed of a **object3d.on('click', function(){ ... });**?

I have :) This post presents a little experiment.
What about implementing the concept of
[dom events](http://www.w3.org/TR/DOM-Level-2-Events/events.html)
in 3D Space.
In a web page, a
[click](http://www.quirksmode.org/dom/events/click.html)
event is trigger when a user click on a
[element](http://en.wikipedia.org/wiki/HTML_element).
This is common knowledge in web development.
What about having that but in a three.js scene ?
Maybe people will start do 3D user interface with that, who knows.
How great would that be ?!?
So let's do that.

[Try it out](http://jeromeetienne.github.com/threex/examples/threex.domevent/).
The demo contains 3 teapots.
Each bind a different type of events.
When the events are triggered, teapots are animated.
Animations are made by [tween.js](https://github.com/sole/tween.js/), a nice js tweening engine
seen in a [previous post](/blog/2011/08/17/tweenjs-for-smooth-animation/).
Play with it to get a feel of it, maybe think about the type of UI you could do in 3D.

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/c2KLj8sie9Q?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Let's Get Started

First let's include the source.
You download [threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js).
and copy this line in your page.

```html
	<script src='threex.domevent.js'></script>
```

## Let's Use It

<iframe src="http://jeromeetienne.github.com/threex/examples/threex.domevent"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

Let's say we want do to an action when the user is clicking on a object.
We just do the following.

```javascript
    mesh.on('click', function(){
        mesh.scale.x *= 2;
    });
```

This short line means "*if the user click on this mesh, make it twice wider*".
Eloquent meaning, short syntax ... pretty sweet in my book.
If you wish to stop listening just do as usual.

```javascript
	mesh.off('click', callback)
```

In fact, there is 2 naming for those functions:
one is
[addEventListener](https://developer.mozilla.org/en/DOM/element.addEventListener)
/
[removeEventListener](https://developer.mozilla.org/en/DOM/element.removeEventListener)
from
[HTMLElement](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html)
The other is copied on
[jQuery](http://jquery.com/) api:
[on](http://api.jquery.com/on/)
/
[off](http://api.jquery.com/off/)
Pick the one you like. They are doing the same thing.

Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
The semantic is the same too.
Currently, the available events are
[click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
[mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).

## Some Internals

[three.js](https://github.com/mrdoob/three.js/)
already has the ability to interact with the mouse.
You can see it in action
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_cubes.html)
and
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_voxelpainter.html).
Internally they use 2 three.js classes:
[THREE.Projector](https://github.com/mrdoob/three.js/blob/master/src/core/Projector.js)
and
[THREE.Ray](https://github.com/mrdoob/three.js/blob/master/src/core/Ray.js).
[threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js)
is an higher level api on top of those functions,
an interface which mimic dom events,
something closer to the usual web developper.

It is a nice api. clean, short, object oriented and feels familiar to web developpers.
A little hichup tho, it modifies THREE.Object3D class.
It is a global class, so it may be legitimatly considered unclean by some people.
If this bother you, simply do ```THREEx.DomEvent.noConflict()``` and use the
standalone API. It is documented in the
[annoted source](http://jeromeetienne.github.com/threex/docs/threex.domevent.html).
In fact, the object oriented API is just a thin wrapper
on top of the standalone API.
  
## Conclusion

We all know the click event when the user click on a webpage.
This experiment wishes to provide to web developpers the same experience in 3D.
I hope people will do crazy innovations by using 3D in user interfaces.
This is a first version. Maybe we will implement
[bubbling](http://www.quirksmode.org/js/events_order.html)
in the future, even events like
['change'](http://www.quirksmode.org/dom/events/change.html).

As usual, [threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js)
source is available on
[github](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js).
There is an
[annoted source](http://jeromeetienne.github.com/threex/docs/threex.domevent.html)
for implementation details.
That's all folks. Have fun.