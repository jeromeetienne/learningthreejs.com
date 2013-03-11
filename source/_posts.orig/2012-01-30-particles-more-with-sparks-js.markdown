---
layout: post
title: "Particles: More With sparks.js"
date: 2012-01-30 13:01
published: false
comments: true
categories: [three.js, library, sparks.js, particles]
---

* This post is the third of our [serie on particles](/blog/categories/particles).
* We already got an
[introduction about sparks.js](/blog/2011/12/14/particles-introduction-to-sparks-js/)
and an
[online editor](/blog/2011/12/19/particles-online-editor-for-sparks-js/)
* This post is on
[threex](https://github.com/jeromeetienne/threex)
helper called
[threex.sparks.js](https://github.com/jeromeetienne/threex/blob/master/threex.sparks.js)
* Additionnaly it presents a bunch of new effects for
[marblesoccer](http://marblesoccer.com)
and designed with the 
[online editor](/blog/2011/12/19/particles-online-editor-for-sparks-js/)

## API

```javascript
	var sparks	= new THREEx.Sparks(opts);
```

```sparks.destroy()```

```javascript
	sparks.update();
```

```sparks.emitter()``` is
[sparks.js](https://github.com/zz85/sparks.js/)
emitter itself.
So you can use sparks.js API directly.

```sparks.container()``` is the
[three.js Object3D](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js)
which contains
the particles system.
So you can change its position/rotation in the 3D world.

## [meta] threex

* about threex
* describe the API
* where to use it
* copy previous threex post
* describe what it does
  * webgl only
  * handle distance
  * handle window resize
