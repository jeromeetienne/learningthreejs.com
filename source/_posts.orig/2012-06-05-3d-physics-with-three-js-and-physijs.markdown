---
layout: post
title: "3D Physics With Three.js and Physijs"
date: 2012-06-05 12:13
comments: true
categories: [three.js, tquery, physics]
---

This is yet another post about physics.
This one is about
[physijs](https://github.com/chandlerprall/Physijs)
by
[Chandler Prall](https://twitter.com/#!/chandlerprall).
It easily bind
[ammo.js](https://github.com/kripken/ammo.js/)
and
[three.js](http://mrdoob.github.com/three.js/).
We will walk thru an example using it.
Physics is always important in 3D graphics.
It makes scenes more realistic.
Additionally, if you simple put your object into the scene, it will move nicely and realisticly.
So you spend less time tuning each moves. I am quite lazy so it matters :)
The [screencast](http://www.youtube.com/watch?v=THI82Q-P8Fo)
presents the [demo we gonna code](/data/2012-06-05-3d-physics-with-three-js-and-physijs/)
and various examples of what is possible with
[ammo.js](https://github.com/kripken/ammo.js/).

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/THI82Q-P8Fo" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## What About Physics Engines ?

We already did physics with three.js.
It was with [microphysics.js](https://github.com/jeromeetienne/microphysics.js) for [marblesoccer](http://marblesoccer.com) minigame.
It is a micro library implementing 3D physics.
We talked quite a bit about it in
["Lets Make a 3D Game: microphysics.js"](http://learningthreejs.com/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/)
and
["Lets Make a 3D Game: microphysics.js, Even Easier"](http://learningthreejs.com/blog/2011/11/02/lets-make-a-3d-game-helper-for-microphysics-js/).
It is only 500lines!
Unfortunatly, this tiny size comes limitations.

Today we gonna use [physijs](https://github.com/chandlerprall/Physijs) by [Chandler Prall](https://twitter.com/#!/chandlerprall).
This is a nice library which make it easy to use
[ammo.js](https://github.com/kripken/ammo.js/)
with
[three.js](http://mrdoob.github.com/three.js/).
ammo.js is "Direct port of the Bullet physics engine to JavaScript using
[Emscripten](https://github.com/kripken/emscripten).
The source code is translated directly to JavaScript, without human rewriting, so functionality should be identical to the original Bullet."

[bullet](http://bulletphysics.org/) is a full-blown physics engine well-known in the 3D community. 
It can do a lot as you can see in its [docs](http://bulletphysics.com/Bullet/BulletFull/).
[ammo.js](https://github.com/kripken/ammo.js/)
supports all the features you can expect from a mature 3D physics engine.
Charles J. Cliffe, aka [@ccliffe](https://twitter.com/#!/ccliffe),
did several demos using ammo.js. 
This one is a [heighfield](http://cjcliffe.github.com/CubicVR.js/cubicvr/samples/physics/physics_heightfield.html)
And look at this [stunt track](http://cjcliffe.github.com/CubicVR.js/cubicvr/samples/vehicle_physics_demo/stunt_track1.html)!
Both are on top of [cubicvr](http://www.cubicvr.org/), [@ccliffe](https://twitter.com/#!/ccliffe) own library.

	
[physijs](https://github.com/chandlerprall/Physijs) has been written with performance in mind.
[ammo.js](https://github.com/kripken/ammo.js/) is running in a
[webworker](https://developer.mozilla.org/En/Using_web_workers).
So it most likely run on a second CPU. This is twice more cpu power for your javascript!
Coordinates are exchanged with
[transferable objects](http://updates.html5rocks.com/2011/12/Transferable-Objects-Lightning-Fast)
when available.
Transferable objects is a special type of object which can be transfered between the main thread and the worker **without copying**
the data. Thus no matter how large the data are, it will be very low latency.

## Lets Get Started

The code of today is a copy of the
[collision example](http://chandlerprall.github.com/Physijs/examples/collisions.html)
from
[physijs](http://chandlerprall.github.com/Physijs/)
using it thru tQuery API.
It may usefull to reimplement the same thing, just to be sure they both perform the same way. :)
[Try it out](/data/2012-06-05-3d-physics-with-three-js-and-physijs/).
So we got object falling on the ground and slightly bouncing on it. Let's do just that.

<center>
	<iframe width="100%" height="420" src="/data/2012-06-05-3d-physics-with-three-js-and-physijs/" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
</center>


First a classic. We create a tQuery.World. So you immediatly got
a scene, a renderer, camera and its controls. All that already
setup according to reasonable default.
```.boilerplate()``` adds
the ["three.js boilerplate"](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/)
we did last year. We disable the camera controls as it will stay still in this scene.
Then we ```.start()``` to launch the render loop. 

```
	var world	= tQuery.createWorld().boilerplate({cameraControls: false}).start();
```

Now we setup the camera to be a bit far from the scene center. Thus
we got room to display larger objects

```
	world.tCamera().position.set( 70, 40, 70 );
	world.tCamera().lookAt( world.tScene().position );
```

Now we need to tell the renderer that shadow has to be casted. This is done by the simple lines below.
We saw the details in ["Casting Shadows"](http://learningthreejs.com/blog/2012/01/20/casting-shadows/) post.

```
	world.tRenderer().shadowMapEnabled	= true;
	world.tRenderer().shadowMapSoft		= true;
	world.tRenderer().setClearColorHex( 0xffffff, 1 );
```

Now we enable the physics into the world.
this is important. From now on, all the physics-enabled object
of this world will move according to realistic physics rules.

```
	world.enablePhysics();
```

## Enlight your world

Here we setup the lights. For simplicity sake, we will use only one directional light.
First we tune the position and color to fit our tastes. Dont be shy, play with those parameters to get a feel of it.
Then we tune shadow parameters.
Those can be tricky to tune.
You can find more details in ["Casting Shadow"](http://learningthreejs.com/blog/2012/01/20/casting-shadows/) post.
It helps if you make the shaddow camera visible. You can do so with ```.shadowCameraVisible(true)```.

```
	tQuery.createDirectionalLight().addTo(world)
		.position(20, 40, -15).color(0xffffff)
		.castShadow(true).shadowMap(512*2,512*2)
		.shadowCamera(60, -60, 60, -60, 20, 200)
		.shadowDarkness(0.7).shadowBias(.002)
```

## Let's create a ground to stand on

First we create the texture for our ground. We use ```rocks.jpg``` to have like a rock
effect. We use ```.RepeatWrapping``` to repeat the texture on the faces and get a
proper scale.

```
	var texture	= THREE.ImageUtils.loadTexture( "images/rocks.jpg" );
	texture.wrapS	= texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 3, 3 );
```

In fact, the ground is only a cube which is wide and flat, a bit like
the [old-vision of earth](http://en.wikipedia.org/wiki/Flat_Earth) :)
It is usual now, we setup the position, material and shadow.

```
	var ground	= tQuery.createCube(100, 1, 100).addTo(world)
		.position(0, -10, 0)
		.setLambertMaterial().map(texture).back()
		.receiveShadow(true)
```

Now we just have to setup the physics for the ground. This is done
by ```.enablePhysics()```. The ```mass``` parameter define the mass
of the object in the physics.
By default, it is automatically computed depending on the volume of the object.
Here zeroing the mass is a special case, which say
"the mass is infinite, dont move, ever" :)

```
	ground.enablePhysics({
		mass	: 0
	});
```


## Spawning object in a 3D world	

Spawning is always a delicate matter in our world.
But first let's load the texture for the spawned objects.
It is done outside of the loop thus it get reused. Aka it is sent
only once to the GPU for all the objects. This is an important
point from performance point of view. Last year,
["Performance: Caching Material"](http://learningthreejs.com/blog/2011/09/16/performance-caching-material/)
post was about this very topic.	

```
	var cTexture	= THREE.ImageUtils.loadTexture( "images/plywood.jpg" );
```

Now we declare ```spawnObject()``` which gonna take care of spawning one object.
So we create a cube, setup its position, rotation and material. This is all good. Oh dont
forget to use ```.castShadow()``` as got [shadow mapping](http://en.wikipedia.org/wiki/Shadow_mapping) going on :)

```
	var spawnObject	= function(){
		var object	= tQuery.createCube(4,4,4).addTo(world)
			.rotation(Math.random()*Math.PI*2, Math.random()*Math.PI*2, Math.random()*Math.PI*2)
			.position(Math.random()*15-7.5, 25, Math.random()*15-7.5)
			.setLambertMaterial().map(cTexture).back()
			.castShadow(true)
```

Here we enable the physics on this object. So the world will handle all its move from now on.
It will object to physics laws according to the parameters you setup.
[friction](http://en.wikipedia.org/wiki/Friction) is the force resisting when 2 objects slides against each other.
[resititution](http://en.wikipedia.org/wiki/Coefficient_of_restitution) is how bouncy the object is.
For scientific definition, go read a book :)

```
		object.enablePhysics({
			friction	: 0.4,
			restitution	: 0.6
		});
```

Now we gonna play with the 'collision' event. Physijs is able to notify
you when an object collide with another. Just use ```.addEventListener()``` on 'collision'.
Here we gonna change the color of the object depending on the number of collisions
they got.		

```
		var nCollisions	= 0;
		object.physics().addEventListener('collision', function(){
			var colliColors	= [0xcc8855, 0xbb9955, 0xaaaa55, 0x99bb55, 0x88cc55, 0x77dd55];
			if( ++nCollisions < colliColors.length ){
				var color	= colliColors[nCollisions];
				object.get(0).material.color.setHex( color );
			}
		})
	}
```

Now we simply use [```setInterval()```](https://developer.mozilla.org/en/DOM/window.setInterval) to
spawn an object every seconds.

```
	setInterval(spawnObject, 1000);
```

And we are DONE! We got a realistic physics in our 3D world! not bad hey :)

## Conclusion

So, thanks to [physijs](https://github.com/chandlerprall/Physijs),
it is now possible to get full blown realistic physics
using
[three.js](https://github.com/mrdoob/three.js/)
and
[tQuery](https://github.com/jeromeetienne/tquery).
It is a simple way to make scene more realistic. It is nice to experiment with.
I will do more on this very soon!

Thanks all folks! have fun :)