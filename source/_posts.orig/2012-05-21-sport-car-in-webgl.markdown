---
layout: post
title: "Sport Car in WebGL"
date: 2012-05-21 12:16
comments: true
categories: [tquery, three.js]
---

This post is about sport cars and how cool they can be!
Once again, we gonna expose gems from three.js examples.
It contains several sport cars which are fun to play with.
You can drive them around and all.
This is a good base for a game.
We made tQuery plugins on top to make them easily reusable.
Our scene will be a nice sport car, a grass ground, a sunset sky with shadow casting.
All that in 40-lines of javascript.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/KxRfFd9SM5s" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## What We Gonna Build ?

What you see below is what we gonna build. Pretty nice no ?
[Try it out](/data/2012-05-21-sport-car-in-webgl/).

<center>
	<iframe width="100%" height="420" src="/data/2012-05-21-sport-car-in-webgl/" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
</center>

It shows what is possible with ```tquery.car.js```.
It is a plugin provides rendering and controls of sport cars.
It is heavily based on some examples by [alteredq](http://alteredqualia.com/) in
[three.js](http://github.com/mrdoob/three.js/).
You can find them
[here](http://mrdoob.github.com/three.js/examples/webgl_materials_cars.html)
and
[here](http://mrdoob.github.com/three.js/examples/webgl_materials_cubemap_dynamic.html).
The car is a Bugatti Veyron model by
[Troyano](http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129).
Now let's get started.

## Let's start coding

We start to create our world as usual. We enable the
[boilerplate for three.js](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/).
It is a fast way start, avoids repetitive tasks, following DRY principles and includes all those good practices which are so easy to forget.
Then we just have to ```.start()``` the rendering loop on this world.

```
	var world	= tQuery.createWorld().boilerplate().start();
```

Now we setup the renderer.
In this scene, we want to cast shadows as if it cames from the sun.
This is a nice way to improve the realism in our 3D scene
We already talked about it in ["Casting Shadow"](http://learningthreejs.com/blog/2012/01/20/casting-shadows/) 
The renderer needs to be notified so we set ```.shadowMapEnabled``` and ```.shadowMapSoft``` to true.

```
	world.renderer().shadowMapEnabled	= true;
	world.renderer().shadowMapSoft		= true;
```

## The Sky

Now we add a sky to the 3D scene.
It will fill the space and make the scene more realistic.
We use a skymap for that. It is WebGL trick which take a cube, make it so large that it seems infinite.
On it, we map a 360degeree texture shaped as a cube, and use a special shader to display it. All is in this
shader, it makes the cube appear as if we were in a gigantic sphere. Exactly like we would feel with a sky above
our head.
We already saw skymaps in ["let's do a sky"](http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/) post.
We just added a new plugins ```tquery.skymap.js```.
It avoids repeative code when you do skymap or environement map.

```
	tQuery.createSkymap('skybox').addTo(world);
```

## The Lights

Here we setup the lights. We put one ambient and 2 directional lights.

```
	tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);
	tQuery.createDirectionalLight().addTo(world).position(1,1,-1).color(0xffffff).intensity(2);
```

It is rather simple so lets focus on the last one, the one casting shadow.
We want it to appear as coming from the sun. 
So we look at the skymap and approximatly localized the sun at ```(-10, 20, 30)```.
Then we tune shadow parameters to fit our tastes.
You can find more details in ["Casting Shadow"](http://learningthreejs.com/blog/2012/01/20/casting-shadows/) post.
Those parameters can be tricky to tune. It helps if you make the shaddow
camera visible. You can do so with ```.shadowCameraVisible(true)```.

```
	tQuery.createDirectionalLight().addTo(world).position(-10, 20, 30).color(0xffffff).intensity(4)
		.castShadow(true).shadowDarkness(0.8)
		.shadowMap(512*2,512*2)
		.shadowCamera(10, -10, 20, -20, 0.1, 50);
```

## The Ground

Now we add the ground. A car needs a ground to stand on :)
For that, we got a little helper ```tquery.grassground.js```.
This is just building a ```THREE.Plane``` and mapping a grass
texture into it.
It does the job for a simple and fast ground.
We have seen something similar with ```tquery.checkerboard.js``` in
["tQuery Plugin for Doom Characters"](http://learningthreejs.com/blog/2012/05/04/tquery-md2character-a-plugin-for-doom-characters/)
post.

```
	var ground	= tQuery.createGrassGround({
		textureUrl	: '../../grassground/images/grasslight-big.jpg',
		textureRepeatX	: 30,
		textureRepeatY	: 30,		
	}).addTo(world).receiveShadow(true).scaleBy(100);
```

## The Car

First we instanciate a ```tQuery.Car``` object with ```tQuery.createCar()```.
It will load the models, then material will be setup.
```tQuery.Car``` handles the displacement of the car too.
You can make the car turn, go forward and backward, using ```car.controls()```.
you can even switch on/off the lights with ```.flareVisible()```

```
	var car	= tQuery.createCar();
```

Then we had the car model in our world scene. Important if you want to see it :)

```
	world.add(car.model())
```

Now we got the car on the scene, this is all good.
But we need the camera to follow this car. We create a camera controls specific
to mimic the usual camera in car game. The camera is placed a bit behind the car and looks forward.
The faster you go, the further you look. This is always nice to see what is coming at you :)

```
	tQuery.Car.createCameraControls(car, world);
```

## Car Controls

Now we hook the controls to the car. This determines how the player will control the
car. It can be controlled by the keyboard, so users press arrows on keyboard
and the car moves.
It can be controlled by the [device orientation](http://dev.w3.org/geo/api/spec-source-orientation.html).
We already talked device orientation in game in
[this post](http://learningthreejs.com/blog/2011/09/20/lets-make-a-3D-game-device-orientation/).

```
	var hasTouchEvent	= "ontouchstart" in window;
	if( hasTouchEvent )	car.hookDeviceOrientation();
	else			car.hookKeyboard();
```

Now maybe you wonder "why this devices orientation" ?
I ported tQuery to IOS. So since tQuery r49.1, it is possible to run
tquery on your iphones or ipads.
It is possible to render with [canvas 2D](http://www.w3.org/TR/2dcontext/) in the regular browser.
Even possible to render WebGL using
[WebGL Browser](https://github.com/benvanik/WebGLBrowser) by [Ben Vanik](https://twitter.com/#!/benvanik).

## The Road

In a scene, it is cool to create a goal, something for the user to do.
A road seems like a perfect goal for a car :)
First we create the material we gonna use. This is a [lambert](http://en.wikipedia.org/wiki/Lambertian_reflectance)
with a [reflection](http://en.wikipedia.org/wiki/Reflection_mapping). You put a cube texture in the
```envMap``` parameter and you got your reflection :) Here again, we use tquery.skymap.js to create the cube texture.

```
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0x666666,
		envMap	: tQuery.createCubeTexture('skybox')
	});
```

Now we add the arches. In fact, they are torus which are half in the ground, so the
visible part looks like an arche.
We put 5 of them along the Z axis.
They are all aligned to give a kindof road.
```.castShadow(true)``` make the 3D object as casting shadow. Always a nice trick to enhance realism.

```
	for(var i = 0; i < 5; i++){
		tQuery.createTorus(1.25-0.25, 0.25, 8, 6*4, material).addTo(world)
			.castShadow(true).translateZ( 2 + i * 5 );		
	}
```

And we are **DONE**! We got a nice looking car, driving on grass with a sun set. It is 
controlled by keyboard and the camera controls is suitable for a game. Not bad
for 40 lines of javascript.

## Conclusion

In this post, i walked you thru a example of ```tQuery.car.js```. It builds a rather
cool scene in 40lines of js. It seems a nice base for a game. Like the
[two](/blog/2012/05/15/punch-a-doom-character-in-augmented-reality/)
[previous](/blog/2012/05/08/sound-visualisation-vuemeter-in-webgl/)
walk through, we got very short code. I like this, it makes it easier to understand
and learn. WebGL for All!! :)

That's all folks! have fun.