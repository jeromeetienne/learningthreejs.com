---
layout: post
title: "Casting Shadows"
date: 2012-01-20 14:44
published: true
comments: true
categories: [three.js, shadows]
---

This post is about
[shadow casting](http://en.wikipedia.org/wiki/Shadow_mapping),
a technique which approximates the effect you see in real life everyday.
They may be tricky to tune but they looks so good, it worths it.
Shadows are an efficient tool when you to make your scene more realistic.
We will see how they can be used inside
[three.js](https://github.com/mrdoob/three.js/)
and see more about lights while we are at it.


As usual, there is a [demo](/data/casting-shadows/).
It is kept it real simple thus you can read the code more easily.
The scene is a simple object in the middle, a spotlight moving around and a plane
to receive the object shadow. The light frustum is left visible in orange.

<!-- more -->

<iframe src="/data/casting-shadows"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="100%" height="420" frameborder="0">
</iframe>

## Let's Code Shadows

Casting shadows in
[three.js](https://github.com/mrdoob/three.js/)
involves 3 parts: the
[renderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js)
which does the computation, the
[lights](https://github.com/mrdoob/three.js/tree/master/src/lights)
which cast shadows, and
[objects](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js)
which receives lights and shadows.

## Set up the Renderer

The renderer is the one which will compute the shadows positions for your 3D scene.
Shadow casting is quite expensive. It is only supported by
[WebGLRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js).
It uses
[Shadow mapping](http://en.wikipedia.org/wiki/Shadow_mapping), a technique specific
to WebGL, performed directly on the [GPU](http://en.wikipedia.org/wiki/Graphics_processing_unit).

```javascript
	renderer.shadowMapEnabled = true;
```

{% img right /data/casting-shadows/images/screenshot-withsoftshadow-small.png %}
{% img left /data/casting-shadows/images/screenshot-nosoftshadow-small.png %}

You can smooth produced shadows with ```shadowMapSoft```. It default to false.
On the left, the shadow is crisp, on the right it is soft.


```javascript
	// to antialias the shadow
	renderer.shadowMapSoft = true;
```

## Configure your objects

For
[Object3D](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js),
two parameters controls how they interact with lights and shadows.
Set ```.castShadow``` to true if the object occludes light, so to cast a shadow.
Set ```.receiveShadow``` to true if the object is supposed to receive shadows.
Both default to false

```javascript
	object3d.castShadow	= true;
	object3d.receiveShadow	= false;
```

This is the configuration for the central object in the demo. It will occlude lights but
won't be able to receive shadow. So you wont see any
[self shadow](http://en.wikipedia.org/wiki/Self-shadowing).

## Tune your Lights

{% img left  /data/casting-shadows/images/light-directionallight-small.jpg	%}
{% img right /data/casting-shadows/images/light-spotlight-small.jpg		%}

[THREE.DirectionalLight](https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js)
or
[THREE.SpotLight](https://github.com/mrdoob/three.js/blob/master/src/lights/SpotLight.js)
are able to cast shadows.
Let's details them.
A directional light is when light rays are parallel.
A bit like when you look at the sun rays on the left.
It mostly behaves like a light source very far from us.
A spot light is when light rays seems to originate from a single point, and
spreads outward in a coned direction, like in the dance club on the right
(Images are from wikipedia).
To enable the shadow casting on a light, 
just use this line.

```javascript
	light.castShadow = true;
```

You can tune the ```shadowDarkness```.
It is the opacity of the shadow. 0 means no shadow, 1 means pure back shadow.

```javascript
	light.shadowDarkness = 0.5;
```

{% img right /data/casting-shadows/images/screenshot-shadowCameraVisible-small.png %}

In the same vibe, it possible to show the shadow camera on the screen
with ```shadowCameraVisible```.
A very usefull feature during tuning or debugging.

```javascript
	light.shadowCameraVisible = true;
```

## More of Directional Lights

{% img right /data/casting-shadows/images/screenshot-fustrum-orthographic-small.png	%}
{% img left  /data/casting-shadows/images/screenshot-fustrum-perspective-small.png	%}

Additionally, when casting shadow with a
[THREE.DirectionalLight](https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js),
you need to setup an orthographic camera.
What is that ? it is a different form of
[3D projection](http://en.wikipedia.org/wiki/3D_projection).
[Perspective](http://en.wikipedia.org/wiki/Perspective_\(graphical\))
is the way we see things in real life.
So it seems more natural to us than
[orthographic projection](http://en.wikipedia.org/wiki/Orthographic_projection).
On the left, an illustration shows a perspective projection.
You can see what is inside the orange shape.
On the right, the same for a orthographic one.


Recent
[three.js r47 release](https://github.com/mrdoob/three.js/commit/32b581f24fddeaf9e91b7825aa93ec0ad3a45c83)
includes a
[very didactic example](http://mrdoob.github.com/three.js/examples/webgl_camera.html)
from
[alteredq](http://alteredqualia.com/).
Play with it, it may understand the difference between
[orthographic](https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js)
and
[perspective](https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js)
cameras.
Here is a possible configuration of the frustum for the orthographic camera of our light.

```javascript
	light.shadowCameraRight		=  5;
	light.shadowCameraLeft		= -5;
	light.shadowCameraTop		=  5;
	light.shadowCameraBottom	= -5;
```

## Conclusion
This is it, you can code shadow casting in three.js now :)
Go ahead and play with them. They are hard to master but very efficient visually.
Keep in mind that those shadows aren't real.
They only uses
['some tricks'](http://en.wikipedia.org/wiki/Shadow_mapping)
to make them appears as real. And they do so in real time !!
To achieve this result, they take significant shortcuts which
produce artifacts. To avoid those require tuning and experience.

That's all for today folks. Have fun.
