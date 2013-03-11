---
layout: post
title: "Performance: Caching Material"
date: 2011-09-16 10:25
comments: true
categories: [three.js, performance]
---

This article is about performance and how caching can improve them.
In WebGL, it is important not to push the same textures multiple times to the GPU.
It uselessly slow down the rendering.
As a rules of thumbs, the less data are exchanged between the cpu and the gpu, the better
it is for performance.

## A Basic Caching

[three.js](https://github.com/mrdoob/three.js/) handles cache cleanly and
eleguantly. If you instanciate
a javascript object
[THREE.texture](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js)
or
a [THREE.Material](https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js)
only once, it will be pushed only once to the GPU.
It is the simplest way to avoid pushing them multiple times. 

```javascript
    var material = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture( 'foo.jpg')});
```

Then you use this material as many times as you want, ```foo.jpg``` will be sent
only once to the GPU. For example, let's create many
[spheres](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js).

```javascript
    var mesh = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
```

This solution is simple and eleguant but may not be practical with a large code,
like a [game](/blog/categories/tutorial3dgame/).
In such case, you can use [microcache.js](https://github.com/jeromeetienne/MicroCache.js).
It is a micro library to handle in-memory cache which works in node and browser.

<!-- more -->

## So Let's Cache with microcache.js

It needs only 3 lines. To install [microcache.js](https://github.com/jeromeetienne/MicroCache.js),
download it and copy this line.

```html
    <script src="microcache.js"></script>
```

To instanciate a cache, use the following line. 

```javascript
    renderer._microCache = new MicroCache();
```

As you likely noticed, it is attaching the cache to the renderer.
Why do we do that ?
First, it is required to support multiple renderers on the same page, each with it own cache.
Additionnaly if you stop using a renderer, the cache will be automatically dropped
by javascript [garbage collector](http://en.wikipedia.org/wiki/Garbage_collection_\(computer_science\)).
Two nice features.
Now lets create a texture and cache it.

```javascript
    var texture = renderer._microCache.getSet('heavy', THREE.ImageUtils.loadTexture('foo.png'));
```

This is it. It is *as simple as that*.
Now maybe you wonder "yeah but how do i know what need to be cached"...
I completly agree, it is always nice to get diagnostics from the system when
optimizing performance. 

## Now Let's Diagnose

{% img right /data/performance-tip-caching-material/webgl-inspector-texture.png Example %}

You can check what is pushed to the GPU with
[WebGL inspector](http://benvanik.github.com/WebGL-Inspector/).
It is a firebug-like to "debug, diagnose, and explore WebGL scenes".
You can see the texture tabs on the right. If you spot
duplicates in there, you found rooms for optimization :)
You can embed it in your own page application with a single line.

```html
    <script src="https://raw.github.com/benvanik/WebGL-Inspector/master/core/embed.js"></script>
```

## That's All Folks

As Terje Mathisen said, "All programming is an exercise in caching."
Caching is a efficient way to optimize your code.
It is simple with [microcache.js](https://github.com/jeromeetienne/MicroCache.js).
The code is available on github [here](https://github.com/jeromeetienne/MicroCache.js) under MIT license.
If you hit bugs, fill issues on github. Feel free to fork, modify and have fun with it :)

