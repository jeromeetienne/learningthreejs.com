---
layout: post
title: "Constructive Solid Geometry With csg.js"
date: 2011-12-10 16:30
comments: true
categories: [three.js, library]
published: true
---

This post is about
[constructive solid geometry](http://en.wikipedia.org/wiki/Constructive_solid_geometry)
, an impressive word :)
In fact, it is just a way to build complex objects from simpler ones.
Those simple objects are assembled using
[operations](http://en.wikipedia.org/wiki/Algebra_of_sets)
such as union, difference and intersection.

Recently
[Evan Wallas](http://madebyevan.com/)
released
[csg.js](http://evanw.github.com/csg.js/),
a clean self-contained library to do 
[constructive solid geometry](http://en.wikipedia.org/wiki/Constructive_solid_geometry).
So [Chandler Prall](http://chandler.prallfamily.com/)
wrote a
[bridge](http://chandler.prallfamily.com/2011/12/constructive-solid-geometry-with-three-js/)
to make it easy to use with
[three.js](https://github.com/mrdoob/three.js/).

With all this nice code, i wrote the little
[demo of a dice](/data/constructive-solid-geometry-with-csg-js/)
you can see on the right. Thus you can click to change the operations, play
with it and have a feel of the various operations.

<!-- more -->

<iframe src="/data/constructive-solid-geometry-with-csg-js/"
	width="100%" height="420" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>


## Let's start

So lets see how to use it. First step, you download
csg.js from
[here](http://evanw.github.com/csg.js/)
, ThreeCSG.js bridge from
[here](http://chandler.prallfamily.com/labs/three/csg/ThreeCSG.js)
. Then include those line in your own code.

```html
	<script src="csg.js"></script>
	<script src="ThreeCSG.js"></script>
```

## Let's convert

Ok now that we got the source, let's use it.
[ThreeCSG.js](http://chandler.prallfamily.com/2011/12/constructive-solid-geometry-with-three-js/)
is a bridge between
[three.js](https://github.com/mrdoob/three.js/)
and
[csg.js](http://evanw.github.com/csg.js/).
Both libraries use a different format for geometry.
[ThreeCSG.js](http://chandler.prallfamily.com/2011/12/constructive-solid-geometry-with-three-js/)
does the conversion back and forth.
To convert your three.js geometry to a csg geometry, use this line.

```javascript
	var geometryCsg	= THREE.CSG.toCSG(geometryThree);
```

Then you likely apply
[boolean operations](http://en.wikipedia.org/wiki/Algebra_of_sets)
on
[csg.js](http://evanw.github.com/csg.js/) geometry.
To convert it back to three.js, just do


```javascript
	var geometryThree	= THREE.CSG.fromCSG(geometryCsg);
```

You end up with a normal [three.js geometry](https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js)
than you can use everywhere, like
[GeometryUtils](https://github.com/mrdoob/three.js/blob/master/src/extras/GeometryUtils.js)
or
[Mesh](https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js).

## Let's assemble

Now the fun part, lets assemble objects with those misterious 
[boolean operations](http://en.wikipedia.org/wiki/Algebra_of_sets)
on ours
[csg.js](http://evanw.github.com/csg.js/)
geometries.
There are [3 of them](http://en.wikipedia.org/wiki/Constructive_solid_geometry):
[difference](http://en.wikipedia.org/wiki/Complement_(set_theory\)),
[union](http://en.wikipedia.org/wiki/Union_(set_theory\))
and
[intersect](http://en.wikipedia.org/wiki/Intersection_(set_theory\)).
To build our dice, first we build a
[cube](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CubeGeometry.js)
then we subtract a bunch of
[spheres](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js)
to makes the holes.

{% img right /data/constructive-solid-geometry-with-csg-js/images/image-substract-320x240.png %}

Once you converted your objects, you apply operations on them.
For the dice, we use ```.subtract()```.

```javascript
	cube.substract(spheres)
```

<div style="clear:both;"></div>
{% img right /data/constructive-solid-geometry-with-csg-js/images/image-union-320x240.png %}

But it is possible to use ```.union()``` to add them.

```javascript
	cube.union(spheres)
```

Or to keep only the common part of both objects with ```.intersect()```.

{% img right /data/constructive-solid-geometry-with-csg-js/images/image-intersect-320x240.png %}

You can chain those operations to your own taste.
Up to you to be creative :)

```javascript
	cube.intersect(spheres)
```

## Conclusion

[Constructive solid Geometry](http://en.wikipedia.org/wiki/Constructive_solid_geometry)
is simple and quite powerfull.
[csg.js](http://evanw.github.com/csg.js/)
,
[ThreeCSG.js](http://chandler.prallfamily.com/2011/12/constructive-solid-geometry-with-three-js/)
and
[three.js](https://github.com/mrdoob/three.js/)
makes it real easy to play with.
You may look at the source of our dice
[demo](/data/constructive-solid-geometry-with-csg-js/)
to see a working version of this code.
That's all for today, have fun :)