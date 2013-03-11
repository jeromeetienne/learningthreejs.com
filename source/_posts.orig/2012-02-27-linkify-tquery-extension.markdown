---
layout: post
title: "Linkify, a tQuery Extension"
date: 2012-02-27 08:55
comments: true
categories: [tquery, three.js]
---

This post is an update on
[tquery](https://github.com/jeromeetienne/tquery) progress.
It is about ```linkify```, a first experimental extension.
Thanks to it, any 3D object may become a link.
So  3D objects act as a ```<a>``` tag, i.e. the object becomes
clickable and clicking on it open a new url.
It is built on top of domEvents.
It is used to incoporate
[dom kindof events](http://www.w3.org/TR/DOM-Level-2-Events/events.html)
in 3D world.
We saw them a few week back in
['dom events in 3D space' post](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/).
Previous posts on tquery may be found [here](/blog/categories/tquery/).

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/MlW7PeuXGDM" frameborder="0" allowfullscreen></iframe>
</center>

Building extensions on top of others is kinda the point of an extension system.
My dream scenario is : 
(1) People do plugins for three.js, like they do in jQuery).
(2) They share their work.
(3) They build on top of each other.
(4) Loop to 1.
All in opensource spirit. All good in my book. Ok enougth talk, let's code.

## Dom Events in 3D Space

*domEvents* have been ported to tQuery.
It is an important part because jQuery developpers use this a lot, thru
[.on()](http://api.jquery.com/on/)/[.off()](http://api.jquery.com/off/).

```javascript
    tQuery('cube').on('mouseover', function(event){
        console.log("somebody put the mouse over a cube");
    });
```

The supported events are click obviously,
[dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html)
, [mouseover and mouseout](http://www.quirksmode.org/dom/events/mouseover.html).
It has been improved to better match
[actual dom events](http://www.w3.org/TR/DOM-Level-2-Events/events.html).
The callback now receives a event object. It contains ```.type``` and ```.target```
as described in [dom specification](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event).


```javascript
    tQuery('.myClass').on('click', function(event){
        console.log("An event of type", event.type, "has been trigger on ", event.target);
        // If you wish to stop propagation, just do 
        event.stopPropagation();
    });
```

[Event bubbling](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow-bubbling)
is now supported. So events are dispatched to the
[target](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget)
and follow its parent chain upward. It is possible to cancel propagation with an usual
```.stopPropagation()```.

## Linkify or How Any 3D Object May Become a Link

Linkify is an experimental plugins built on top of ```tquery.domevent```. It is
shown in the screencast.
It makes any 3D objects object act as a ```<a>``` tag, i.e. the object becomes
clickable and clicking on it open a new url. When the mouse is over it, an underline
is added to make it even more webpage like.
Code is rather short.

```javascript
    tQuery('text').linkify('http://example.com')
```

## Conclusion

It has been quite time consuming to set up the basis for the project:
tests, bechmarks, docs, or plugins interdependancy resolution. 
For each of those field, i had to review the various alternatives,
pick one and setting it up as properly as possible.

Here are the current choises, they may change in the future.
[require.js](http://requirejs.org/) will be used for the dependancies between plugins.
Tests are done with [mocha](http://visionmedia.github.com/mocha/),
a javascript test framework for javascript which run in node.js and browser.
Later, we may improve that by testing the rendering output using
[pixastic](http://www.pixastic.com/) to do
[statistical](http://en.wikipedia.org/wiki/Mean_squared_error)
[images](http://en.wikipedia.org/wiki/Peak_signal-to-noise_ratio)
[comparison](http://en.wikipedia.org/wiki/Root_mean_square_deviation).
Benchmarks are done with
[benchmarks.js](http://benchmarkjs.com/), a robust benchmarking library for javascript,
using
[benchrunner](https://github.com/jeromeetienne/benchrunner)
as runner.
It is the engine behind the wellknown
[jsperf](http://jsperf.com/browse)
site.
Inline documentation is written in [jsdoc](http://code.google.com/p/jsdoc-toolkit/)
format using
[codeview](http://www.thebrightlines.com/2010/05/06/new-template-for-jsdoctoolkit-codeview/)
template.

That's all folks. Have fun :)