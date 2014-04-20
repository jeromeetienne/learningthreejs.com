---
layout: post
title: "Have You Seen YourSelf when You Are Drunk ? - making of a fun WebGL Demo"
date: 2014-02-08 12:49
comments: true
categories: three.js postprocessing
---

This post is about a demo called ["Have you seen yourself When you are Drunk ?"](https://github.com/jeromeetienne/demo.seenyourselfdrunk). What is it all about ?
Well have you seen yourself when you are drunk ?

{% img right /data/2014-02-08-have-you-seen-yourself-when-you-are-drunk/images/angryBoss.jpg 250 250 %}

You don't look at your best, but you don't remember the morning after, lucky you. So now you are sober, this demo will show you how you look when you are drunk…
Hopefully this will make you realize that *alcohol abuse is a bad thing*! And that we could
*save the world by stopping it*!

<a href='http://jeromeetienne.github.io/demo.seenyourselfdrunk/' target='_blank'><input type="button" value='Try Demo Now' /></a>

Or it will just show some cool webgl effects… Honnestly i wasnt that sure of its exact purpose. Well, up to you to pick :)
In other words, this is a webgl demo which reads your webcam, to show yourself on screen, then it does some screen deformations to give you an idea of what you look like when you are drunk. 

<iframe width="420" height="315" src="//www.youtube.com/embed/yl2Qd9T3Lq4" frameborder="0" allowfullscreen></iframe>

We will learn how to code that. So first the tools of the trade…

<!-- more -->

## Used Tools

This demo is done with 2 threex extensions
[threex.toxicpproc](https://github.com/jeromeetienne/threex.toxicpproc)
,
[threex.videotexture](https://github.com/jeromeetienne/threex.videotexture)
and our lovely
[three.js](http://threejs.org) obviously.
[threex.videotexture](https://github.com/jeromeetienne/threex.videotexture)
is, according to [threex page](http://jeromeetienne.github.io/threex/#threex.videotexture) :

> handles videos in texture. It is possible to put html5 video output in texture, even put the webcam in it, or to connect it to WebAudio API to get localized sounds.

We will use it to read the webcam and display it full page.
[threex.toxicpproc](https://github.com/jeromeetienne/threex.toxicpproc)
is, according to [threex page](http://jeromeetienne.github.io/threex/#threex.toxicpproc) :

> an intoxicated post-processing effect. You can easily add it in your game to simulate the player is drunk. It provides various levels: sober, drunk, high and wasted.

We will use it to deform the video from the webcam and makes you look drunk.

## Webcam For Texture

So the first thing is to get webcam on fullpage. 
For that we use [threex.videotexture](https://github.com/jeromeetienne/threex.videotexture). 
It does video textures, either you take this video from a url, like this.

```
// create the videoTexture
var videoUrl	= 'sintel.ogv';
var videoTexture= new THREEx.VideoTexture(videoUrl)
// on every render, update it
onRenderFcts.push(function(delta, now){
		videoTexture.update(delta, now)
})
```

Or you take the video live from the webcam, like this.

```
// create the webcamTexture
var videoTexture	= new THREEx.WebcamTexture()
// on every render, update it
onRenderFcts.push(function(delta, now){
		videoTexture.update(delta, now)
})	
```

Then use ```videoTexture.texture``` in your materials to
have the texture of the webcam. So let's see how we will
compose our scene.


## Scene Composition

We need a Plane which take the full page, and we will apply our webcam texture to it. 
So first there is an orthographic camera. Perspective is useless in this case, and make computations much more complex :)

```
var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2
     ,  window.innerHeight / 2, window.innerHeight / -2, -100, 100);
```

Then, there is a ```THREE.PlaneGeometry``` mesh
using full screen for this camera.

```
var geometry	= new THREE.PlaneGeometry( window.innerWidth, window.innerHeight )
var material	= new THREE.MeshBasicMaterial();
var mesh	= new THREE.Mesh(geometry, material)
scene.add(mesh)
```

Then we apply our ```videoTexture``` to this material. Thus 
we see the webcam on this plan :)

```
material.map	= videoTexture.texture
```

So we got our face on full screen, cool for ego i guess :)
Now let's apply some deformation to it!

## Post Processing and Rendering

Usually to render a scene, we use the following code.
This is when we render the scene directly on screen.

```
renderer.render( scene, camera )
```

We will use a post processing chain with ```THREE.EffectComposer```. It process the screen as a 2d texture.
More specifically, we will use [threex.toxicpproc](https://github.com/jeromeetienne/threex.toxicpproc), a three.js extension which provide post processing of drunk effects. It got 4 presets *sober*, *drunk*, *high* and *wasted*. There is a nice tweening when you switch between presets so transitions looks smooth.
Try it yourself in [this demo](http://jeromeetienne.github.io/threex.toxicpproc/examples/basic.html).

### THREEx.ToxicPproc

So First lets instanciate a ```THREEx.ToxicPproc.Passes```. It will setup the effect composers passes for our effect. We set it to the ```drunk``` preset.

```
var toxicPasses	= new THREEx.ToxicPproc.Passes('drunk')
// on every render you update it
onRenderFcts.push(function(delta, now){
	toxicPasses.update(delta, now)
})
```

If you want to create other presets, it is entirely possible. There is even a [Dat.GUI](https://code.google.com/p/dat-gui/) provided for you to tweak buttons until it fits your needs. You see it in [the demo](http://jeromeetienne.github.io/threex.toxicpproc/examples/basic.html).
You use it like this.

```
var datGui	= new dat.GUI()
THREEx.addToxicPasses2DatGui(toxicPasses, datGui)
```

### THREE.EffectComposer

Now that we got the toxicpproc passes, let's create the ```THREE.EffectComposer``` to run it.

```
var composer	= new THREE.EffectComposer(renderer);
```

We render the scene on a texture

```
var renderPass	= new THREE.RenderPass( scene, camera );
composer.addPass( renderPass );
```

We send this texture to ```threex.toxicpproc```

```
toxicPasses.addPassesTo(composer)
```

Now we just have to tell the composer the last pass is the one to be rendered on screen.

```
composer.passes[composer.passes.length -1 ].renderToScreen	= true;
```	

### Update on each Frame

We got the rendering to do on each frame. Usually we do

```
renderer.render( scene, camera )
```

But here we render thru the effect composer, so we do

```
// render thru composer
composer.render(delta)
```

## Conclusion

Ok so you have learn how to code a demo like
["Have you seen yourself When you are Drunk ?"](https://github.com/jeromeetienne/demo.seenyourselfdrunk)
Pretty Cool! 
Now you can get more [threex](http://jeromeetienne.github.io/threex/) extensions and
play with it to build your own demos.
This is All for Today Folks, have fun! :) 


