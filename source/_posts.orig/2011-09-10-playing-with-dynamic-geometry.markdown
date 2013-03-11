---
layout: post
title: "Playing With Dynamic Geometry"
date: 2011-09-10 09:16
published: false
comments: true
categories: [three.js, basic, THREEx]
---

In this article, we will play with dynamic Geometry

[mesh](http://en.wikipedia.org/wiki/Polygon_mesh)

## Demo 
Show, dont tell: here is [lost-gello-drop](/data/lost-gello-drop/).

The drop is mainly about dynamic
geometry we gonna see here.

The background is a sky map, a technic
explained in a [previous article](/blog/2011/08/15/lets-do-a-sky/).

## Conclusion
For more details, see the [annoted source](/data/THREEx/docs/THREEx.GeometryUtils.html) of 
[THREEx.GeometryUtils](/data/THREEx/THREEx.GeometryUtils.js).



## THREEx.GeometryUtils 

This THREEx helper provide various basic functions for ```THREE.Geometry```.
It is able to scale, translate, center a geometry. Other functions may be
added soon.
The API is chained for convenience.

```.scale()``` to make the geometry twice larger in ```y```

```javascript
    var scale = new THREE.Vector3(1,2,1);
    THREEx.GeometryUtils.scale(geometry, scale);
```

```.translate()``` to make the geometry move 100 further in ```x```

```javascript
    var translation = new THREE.Vector3(100,0,0);
    THREEx.GeometryUtils.translate(geometry, translation);
```

```.center()``` to center the geometry on its middle point

```javascript
    THREEx.GeometryUtils.center(geometry);
```

```.middlePoint()``` to compute the middle point of a geometry

```javascript
    THREEx.GeometryUtils.middlePoint(geometry);
```


