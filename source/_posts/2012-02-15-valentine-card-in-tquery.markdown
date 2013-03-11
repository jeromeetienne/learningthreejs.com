---
layout: post
title: "a Valentine card in tQuery"
date: 2012-02-15 10:21
comments: true
categories: [tquery, three.js]
---

The [tQuery](/blog/categories/tquery/) experimentation is going on.
It is a lot of fun to code :)
This post is just a short presentation of two plugins currently in incubation:
tquery.text and tquery.shape.
Yesterday was
[valentine day](http://en.wikipedia.org/wiki/Valentine's_Day),
so i thought it would be cool to stay in topic.
The
[screencast](http://www.youtube.com/watch?v=8EHqrAXcKrY)
is a live coding of a
[valentine card](/data/2012-02-15-valentine-card-in-tquery/) in tQuery :)

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/8EHqrAXcKrY" frameborder="0" allowfullscreen></iframe>
</center>

## Let's Write Text in 3D

tQuery.text plugin writes text in 3D.
It is based on
[TextGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/TextGeometry.js).
Here is a simple example.

```javascript
    tQuery.createText("tQuery is Fun!").addTo(world);
```

## Let's Easily Create Shape

{% img right  /data/2012-02-15-valentine-card-in-tquery/images/shape.triangle-small.png	%}

tQuery shape is made to easily build and
[extrude](http://en.wikipedia.org/wiki/Extrusion)
shapes in javascript.
It is based on
[THREE.Shape](https://github.com/mrdoob/three.js/blob/master/src/extras/core/Shape.js).
tquery.shape is cool because it uses a API very similar to
[canvas 2D](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-\(paths\))
[path](https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes).
This line will build a triangle.

```javascript
    tQuery.createShape().moveTo(0,0).lineTo(1,1).lineTo(-1,1).lineTo(0,0);
```

{% img left  /data/2012-02-15-valentine-card-in-tquery/images/shape.fish-small.png	%}
{% img right /data/2012-02-15-valentine-card-in-tquery/images/shape.smiley-small.png	%}

Some shapes are already available, like the triangle above, or a fish, smiley
and a heart. Here is a smiley.

```javascript
    var shape = tQuery.createSmileyShape();
```

## The valentince card

Last but not least, the valentine card!
[Try it out](/data/2012-02-15-valentine-card-in-tquery/)!
It uses the plugins above to build an animated valentine card.
It is done with less than 20lines...
tQuery seems to produce short code.

<iframe src="/data/2012-02-15-valentine-card-in-tquery/"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="100%" height="349" frameborder="0">
</iframe>

## Conclusion

Today we saw 2 plugins still in progress.
tQuery experiment seems to go well for now.
The code is moving at fast pace.
I am currently experimenting with [require.js](http://requirejs.org/)
to automatically resolve dependancies between plugins.
What's next ? likely a series with a step by step on how to build a tunnel game.

That's all folks! have fun :)

