---
layout: post
title: "Screenshot in Javascript"
date: 2011-09-03 10:01
comments: true
categories: [basics, three.js, THREEx]
---

Sometime it would be cool if you could take a screenshot of your demo to share with your friends.
This post will explain how to do that single a single line.
Additionnaly, [THREEx.screenshot](/data/THREEx/THREEx.screenshot.js) helper is provided at the end
if you want to add printscreen key in your demos without hasles.

## Let's get started

So as usual you got a ```renderer``` variable to render your 3D scene. This renderer
contains a ```domElement``` property.
It is a [DOM element](http://en.wikipedia.org/wiki/Document_Object_Model) on which it renders,
who would have guessed ?
We will use the ```.toDataURL()```
[method](http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl)
on this element to get the screenshot.

```javascript
	var dataUrl = renderer.domElement.toDataURL("image/png");
```

<!-- more -->

A single line and you are **done**! not too hard hey ?
This line will return a url of the screenshot image in
png format.
This url is a [data url](http://en.wikipedia.org/wiki/Data_URI_scheme), a special url which encode
the content in base64. It looks like that *data:image/png;base64,iVBORw0KGgo* ...
Not too readable but quite usefull :)

Btw have you spotted he ```image/png``` parameter ? It is the mimetype of the image we will get. If you want
a [jpeg](http://en.wikipedia.org/wiki/JPEG), just put ```image/jpeg``` instead.


## WebGLRenderer special case

If your scene is renderered with WebGL, you should declare it like that.

```javascript
	var renderer	= new THREE.WebGLRenderer({
		preserveDrawingBuffer	: true	// required to support .toDataURL()
	});
```

Notice the option ```preserveDrawingBuffer``` ? It is ```WebGLRenderer``` specific.
This is required to support ```.toDataURL()``` as explained in the [spec](http://www.khronos.org/registry/webgl/specs/latest/#2.2).
Other [renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers) dont need it.


## THREEx helper to make it even simpler

I wrote [THREEx.screenshot](/data/THREEx/THREEx.screenshot.js), a THREEx helper to
automatize the process and makes it as simple as possible.
You download it from [here](/data/THREEx/THREEx.screenshot.js) and include
it in your page like this

```html
	<script type="text/javascript" src="THREEx.screenshot.js"></script>
```

Would it be cool if got your own [printscreen](http://en.wikipedia.org/wiki/Print_screen)
key for your 3D ? The following line will do exactly that.
Everytime you press *p*, it does a screenshot of the renderer, and open a window containing it.

```javascript
	THREEx.Screenshot.bindKey(renderer);
```


Note the [aspect](http://en.wikipedia.org/wiki/Aspect_ratio_(image\)) of the original image is preserved.
The default callback behavior is to open a window containing the screenshot, so be carefull it may be
stopped by popup blockers.
It is possible to customize the default behaviors thru options.
For more details, see the [annoted source](/data/THREEx/docs/THREEx.screenshot.html) of 
[THREEx.screenshot](/data/THREEx/THREEx.screenshot.js).
