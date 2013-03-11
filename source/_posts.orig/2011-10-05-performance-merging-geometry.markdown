---
layout: post
title: "Performance: Merging Geometry"
date: 2011-10-05 11:29
comments: true
categories: [three.js, performance]
published: true
---

This article is about merging geometry and how it can improve performance.
It is important for perfomance to reduce the number of [WebGL](http://www.khronos.org/registry/webgl/specs/latest/) calls as much as possible.
The rules of thumbs is *the less data are exchanged between the cpu and the gpu, the better it is for performance*.

The [demo](/data/performance-merging-geometry/) is rendering many cubes and put them randomly in the space.
{% img left /data/performance-merging-geometry/images/demo-screenshot-2000.png 240 120 %}
{% img right /data/performance-merging-geometry/images/demo-screenshot-120000.png 240 120 %}
It is a simplictic way to measure the performance, but it will do for us.
If the geometries arent merged, my computer is able to display *2000* cubes at 30fps. See on the left.
But if the geometry are merged, it displays *120000* cubes at 30fps. See on the right.
Screenshots make it pretty obvious :) This is **60 times** more cubes!!!

<!-- more -->

## So Let's Merge Geometries

A geometry is the shape of the 3D object. three.js got already
[several predefined](https://github.com/mrdoob/three.js/tree/master/src/extras/geometries) for you.
[plane](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js),
[cube](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CubeGeometry.js) or
[sphere](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js)
are the common ones.
This post is about merging them, so lets do that.
This line will merge ```otherGeometry``` into ```geometry```.

```javascript
    THREE.GeometryUtils.merge(geometry, otherGeometry);
```

```THREE.GeometryUtils.merge()``` is in [THREE.GeometryUtils](https://github.com/mrdoob/three.js/blob/master/src/extras/GeometryUtils.js) with other geometry related functions.
Btw it is more a concatenation than an actual merge them. No duplicate is removed in the process.

## Combo: merging geometry with mesh

```THREE.GeometryUtils.merge()``` supports to merge geometries with meshes too.
In this case, the function will honor the mesh position/orientation.
As a bonus, if your mesh uses ```THREE.MeshFaceMaterial```, materials will be copied along.
It is quite convenient when building a large geometry, or when optimising existing scenes with meshes.

```javascript
    var mesh = new THREE.Mesh(new THREE.CubeGeometry(10,10,10), new THREE.MeshNormalMaterial());
    mesh.position.x = 30;
    mesh.rotation.y = Math.PI/3;
    THREE.GeometryUtils.merge(geometry, mesh);
```

This will merge a ```THREE.CubeGeometry``` with a translation of ```30``` on ```x```
and a rotation of ```Math.PI/3``` on ```y```.
Simple enougth hey ? what about Limitations ?

## When to use it ?

The answer is *whenever possible* due to the performance improvement.
The merged geometry will act as a single atomic shape.
So it is perfect with static geometry.
But it may not be suitable in all cases.
For example, it won't be possible to move the merged objects independantly from each other.
Or you can no more remove or add a object without recomputing the whole geometry.

## Conclusion

So merging geometry reduces the amount of webgl calls, so dramatically improve
performance (x60 time in our little demo). It is simple enougth to add to your
demos or games when they have large static geometries. So use it as much as possible.
That's all folks. I hope it has been usefull :)

