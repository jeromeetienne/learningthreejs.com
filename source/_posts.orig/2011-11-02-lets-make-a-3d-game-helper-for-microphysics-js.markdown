---
layout: post
title: "Lets Make a 3D Game: microphysics.js, even easier"
published: true
date: 2011-11-02 18:16
comments: true
categories: [physics, tutorial3dgame]
---

This post is part of the ["Lets make a 3D game"](/blog/categories/tutorial3dgame/) series.
It is a follow up from the previous article on [microphysics.js](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/).
It will describe how to easily include **microphysics.js** in your three.js games.
[THREEx.microphysics.js](https://raw.github.com/jeromeetienne/microphysics.js/master/THREEx.microphysics.js) is a THREEx wrapper for microphysics.js.
It helps binding [three.js](https://github.com/mrdoob/three.js/) objects to [microphysics.js](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/).
The API is chained for convenience.

## Let's get started

So lets see how to use it.
First step, you download it
[here](https://raw.github.com/jeromeetienne/microphysics.js/master/THREEx.microphysics.js).
Then include it in your own code with this line.

```html
    <script src="THREEx.microphysics.js"></script>
```

<!-- more -->

## Initialisation

You instanciate the physics engine, like that.

```javascript
    var microphysics = new THREEx.Microphysics(opts);
```

```opts``` is optional.
```opts.timeStep``` controls the frequency of the world update.
The smaller it is the more accurate is the physics but the longer it is to compute.
It defaults to ```1/60```. Once instanciated, you start it.

```javascript
    microphysics.start();
```

## Binding THREE.Mesh

Of course we need to add some mesh in the world. After this line, the ```mesh```
is bound to microphysics.js, so its position is driven by the physics. 

```javascript
    microphysics.bindMesh(mesh, opts);
```

```mesh.position``` is honored.
If you need to unbind a ```mesh```, just do

```javascript
    microphysics.unbindMesh(mesh);
```

At the time of this writing, microphysics.js support only moving sphere and static
boxes, so geometry may only be ```THREE.SphereGeometry``` or ```THREE.CubeGeometry```.
If your mesh got another geometry, use ```opts.geometry``` to say how you wish the mesh
to be handled.

```javascript
    microphysics.bindMesh(mesh, {
         geometry	: new THREE.CubeGeometry(200,200,200);
    });
```

It is also possible to overwrite ```Mesh.position``` with ```opts.position```, or
to send options directly to microphysics.js with ```opts.physics```.

```javascript
    microphysics.bindMesh(mesh, {
        // to overwrite the Mesh.position
        position	: { x : 1, y : 1, z : 2 },
        // to pass options directly to microphysics.js
        physics		: { restitution	: 0.98 }
    });
```

## Updating the physics

In your render loop, just add this line. It will first update the physics world and
then move accordingly any ```THREE.Mesh``` you bound.

```javascript
    microphysics.update();	
```

## Needs a Direct Access ?

If you need to have direct access to microphysics.js, uses
```microphysics.body(mesh)``` to get the ```vphy.Body``` bound to ```mesh```.
To access ```vphy.World```, just use ```microphysics.word()```.

## Conclusion

In the previous article on [microphysics.js](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/),
we learned how to use microphysics.js directly. This article makes it really easy to include
in your [three.js](https://github.com/mrdoob/three.js/) demo/game.
It is so nice that it is what is used in the
[playground](http://jeromeetienne.github.com/microphysics.js/playground/).
That's all for today folks. Have fun :)

