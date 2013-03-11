---
layout: post
title: "Sound Visualisation: a Vuemeter in WebGL"
date: 2012-05-08 10:32
comments: true
categories: [webaudio, three.js, tquery]
---

This post is about producing a 3D Vuemeter for real time sound.
We gonna walk thru the code of a
[webaudio.js](https://github.com/jeromeetienne/webaudio.js) example.
This example will show you how to create a WebGL vuemetter with
[webaudio.js](https://github.com/jeromeetienne/webaudio.js).
It should be simple to understand, only 40-lines of javascript.
[webaudio.js](https://github.com/jeromeetienne/webaudio.js) is a web audio library
for game. We gonna use it to reach [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html).
We gonna use [tQuery](https://github.com/jeromeetienne/tquery)
to reach [three.js 3D engine](http://github.com/mrdoob/three.js/).

```webaudio.js``` has been first coded as a tQuery plugin.
You can find a [post about it](http://learningthreejs.com/blog/2012/03/20/sounds-for-more-realistic-3d/)
on [learningthreejs](http://learningthreejs.com) blog.
But this technology is so nice, it deserved its [own repository](https://github.com/jeromeetienne/webaudio.js).
The library gained in flexibility in the process: It is now possible to display histogram in canvas2D
of simply play sound, with no 3D at all :) see [here](http://jeromeetienne.github.com/webaudio.js/#examples) for a list of
webaudio.js examples.

[Try the demo](http://jeromeetienne.github.com/webaudio.js/examples/histotquery.html).
This is the result that we gonna build together.
Below is a small [screencast](http://www.youtube.com/watch?v=--Gv2EI2a-U) of me presenting the code.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/--Gv2EI2a-U" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Background Knowledge

**Web Audio API** is aimed for games and based on openAL.
Its API is real nice tho. It is Efficient and flexible.
It is efficient because most processing happen in native code,
still you configure it in js, your favorite language :)
It is flexible as it is based on a routing concept which
give you great controls on the sounds you play.

You can find
[many good tutorials](http://www.html5rocks.com/en/tutorials/#technology:multimedia)
on the matter on
[html5rocks](http://www.html5rocks.com/en/).
I recently did a presentation at [musichackparis](http://www.musichackparis.org) on Web Audio API.
If you want to know more, slides are [here](http://jeromeetienne.github.com/slides/webaudioapi).
This API is available on WebKit based browser, so safari and chrome and its derivative.
Unfortunatly this API isn't compatible with major webgl browsers e.g. firefox and opera.
The **Web Audio API** is real nice tho. Efficient flexible
Sound is still the poor lone child of the web :(
Well let's have fun with what we have.

## Let's get started

Ok the very begining is real simple. We init a basic html page.
Then we include the dependancies in javascript.
We include [webaudio.js](https://github.com/jeromeetienne/webaudio.js) to handle the sound playing and analysis.
Then we just have to include [tquery](https://github.com/jeromeetienne/tquery).
tquery-bundle.js is [tquery](https://github.com/jeromeetienne/tquery)
bundled with
[three.js](http://github.com/mrdoob/three.js/) in a single file for convenience.

```
    <!doctype html><title>webaudio example: histo3d</title>
    <script src="../build/webaudio.js"></script>
    <script src="vendor/tquery/tquery-bundle.js"></script>
    <body><script>
```

## Let's Code in JS

First we gonna intenciate ```WebAudio```. This will initialize the layer.
It will create the [AudioNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioNode-section)`s
for the end of the chain.
By default it contains a
[gainNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioGainNode)
and a
[compressorNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#DynamicsCompressorNode).
The gainNode is used to tune the volume. and the compressNode to smooth the peaks we could
hit in the sound.

```
	var webaudio	= new WebAudio();
```	

Now that we go webaudio available, let's use it to create the sound we gonna play.
```.createSound()``` will create a ```WebAudio.Sound```. Then we ```.load()``` it
from this url 'sounds/perfume.mp3'. The callback will be notified as soon as the sound
is loaded. Then we simply start to play it. Don't forget to get ```.loop(true)```
thus the sound will loop forever.

```
	var sound	= webaudio.createSound().load('sounds/perfume.mp3', function(sound){
		sound.loop(true).play();
	});
```

## Initialize the 3D World

First we initialize the world in 3D.
With ```tQuery.createWorld()```, we create a ```tQuery.World```.
With ```.boilerplate()```, we setup a boilerplate on this world. A boilerplate is
a fast way to get you started on the right foot. It is the
[learningthreejs boilerplate for three.js](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/)
With ```.start()```, we start the rendering loop. So from now on, the world scene
gonna be rendered periodically, typically 60time per seconds.

```
	var world	= tQuery.createWorld().boilerplate().start();
```

We Change the background color. This confusing line ensure the background of the
3D scene will be rendered as ```0x000000``` color, aka black.

```
	world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );
```

Here we setup the lights of our scene. This is a key factor for the look and feel
of your scene. We add a ambient light and 2 directional lights.

```
	tQuery.createAmbientLight().addTo(world).color(0x888888);
	tQuery.createDirectionalLight().addTo(world).position(+1,+1,1).color(0x88FF88);
	tQuery.createDirectionalLight().addTo(world).position(-1,-1, 1).color(0x8888FF);
```

## Some constants

First we initialize ```nBar``` to store number of bars in our 3D vuemeter.
This number MUST be odd, thus the vuemeter is symteric with the middle

```
	var nBar	= 41;
	console.assert(nBar%2, "nBar MUST be a odd number.")
```

Now we need to compute the width of each 3D bar. The whole vuemeter is
 80 wide. So each bar is ```80/nBar``` wide.

```
	var barW	= 80/nBar;
```

We create an array ```bars3d```. We will use it to store the object3D
for all bars of the  histogram.

```
	var bars3d	= [];
```

## Build the 3D VueMeter 

First we create the container group3D which gonna regroup all the bar3D. It is the
container of the whole 3D Vuemeter

```
	var group3d	= tQuery.createObject3D().scale(1/20).addTo(world);
```

We gonna build each bar and add it to ```group3d```.
We loop to create ```nBar``` with ```tQuery.createCube()```. In fact a bar
is a rectangular box, so like a cube with different dimensions.
a bar got a width of ```barW```, an height of 10 and a depth of 5.
The material is a simple [lambert](http://en.wikipedia.org/wiki/Lambertian_reflection).
Once the bar is create, we add it to ```group3d``` and set it to the correct
position in space.
We push every bar3d into ```bars3d``` for future reference.

```
	for(var i = 0; i < nBar; i++){
		var bar3d	= tQuery.createCube(barW, 10, 5, new THREE.MeshLambertMaterial({
			ambient	: 0x888888,
			color	: 0xFFFFFF
		}));
		bar3d.addTo(group3d).position((i-nBar/2)*barW, 0, 0);
		bars3d.push(bar3d);
	}
```

## Update Vuemeter From Sound Analyser
	
Here we hook a function to tQuery rendering loop, ```tQuery.Loop```. Thus
this function gonna be executed everytime our 3D scene is rendered.
if the sound isnt yet loaded, do nothing.

```
	world.loop().hook(function(){
		if( sound.isPlayable() === false )	return;
```

build the histogram of the sound based on
[RealtimeAnalyserNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#RealtimeAnalyserNode)
```.getByteFrequencyData()```

```
	var nBarHalf	= Math.ceil(nBar/2)
	var histo	= sound.makeHistogram(nBarHalf);
```


We gonna loop over each bar3D of our vuemeter. We gonna update
each of them based on the sound histogram we just computed.

```
	bars3d.forEach(function(bar3d, barIdx){
```

We need to determine which value in the histogram match this vuemeter bar.
As our vuemeter is symetric, the vuemeter bar on the far left got the same
histogram value as the one on the far right. This make this computation
a bit confusing.

```
			var histoIdx		= barIdx < nBarHalf ? nBarHalf-1-barIdx : barIdx - nBarHalf;
```

Now we need to compute the height of the vuemeter bar based on histogram value.
This is simple scaling from one to the other: vuemeter height === histo height / 256

```
			var height		= histo[histoIdx] / 256;
```

Now that we computed all that, we update the ```bar3d```. We update ```.scale.y```
to change its size and ```.material.color``` to change its color. The formulas
i used "worked for me". Up to you to be creative and find the one that fit
your own needs
 
```
			bar3d.get(0).scale.y	= height*3;
			bar3d.get(0).material.color.setHSV(0.3+height*0.7,1,1)
		});
	});
```

## Conclusion

So we used
[webaudio.js](https://github.com/jeromeetienne/webaudio.js)
to play a sound and analyses in real time.
We used this information to change 3D objects based on this
analysis.
We leveraged [tQuery](https://github.com/jeromeetienne/tquery)
to reach [three.js 3D engine](http://github.com/mrdoob/three.js/).
Now you can imagine any visual effect based on sound analysis.
The road to winamp effects is open to you :)
We got a rather nice looking WebGL output of a 3D Vuemeter in Real Time
for only 40 lines of javascript. I love how short code
reduces developement time.

That's all folks. Have fun :)