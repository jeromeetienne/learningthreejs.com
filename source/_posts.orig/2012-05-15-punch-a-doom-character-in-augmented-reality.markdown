---
layout: post
title: "Punch A Doom Character in Augmented Reality"
date: 2012-05-15 11:59
comments: true
categories: [tquery, threejs, augmentedreality, webrtc]
---


Did you ever dreamed of punching a doom character ? They look evil and killed
you so many time while you were playing the game. It is revenge time! This
post will help you realize your dream :)
It is about a minigame called "Punch A Doom Character in Augmented Reality"
because in this game, the player can punch Doom Character in augmented reality :)

The character is displayed in 3D with WebGL with [three.js](http://github.com/mrdoob/three.js/).
The player gestures are recognized thru the webcam by [augmentedgesture.js](https://github.com/jeromeetienne/augmentedgesture.js) library.
It uses [WebRTC](http://webrtc.org) [getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html) to get the webcam
using open standards.
You can play this minigame [here](/data/2012-05-15-punch-a-doom-character-in-augmented-reality).
In fact, it is an example of [augmentedgesture.js](https://github.com/jeromeetienne/augmentedgesture.js) library.
We will walk you thru the code. Only 60 lines of Javascript. 

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Aa9945MGRL0" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

We have seen augmented gesture in ["Augmented Reality 3D Pong"](/blog/2012/05/02/augmented-reality-3d-pong/) post
and MD2 Characters in ["tQuery Plugin for Doom Characters"](/blog/2012/05/04/tquery-md2character-a-plugin-for-doom-characters/) post.
Now we gonna associate them together in our mini game :)
I presented it at [Web-5](www.web-5.org) conference in april.
At the time, i recorded a preview ["Doom: a new workout for geek?"](http://www.youtube.com/watch?v=hUYM93xaIgg).
Now let's get started!

 
## The 3D World

First we initialize the world in 3D.
With ```tQuery.createWorld()```, we create a ```tQuery.World```.
With ```.boilerplate()```, we setup a boilerplate on this world. A boilerplate is
a fast way to get you started on the right foot. It is the
[learningthreejs boilerplate for three.js](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/).
With ```.start()```, we start the rendering loop. So from now on, the world scene
gonna be rendered periodically, typically 60time per seconds.

```
	var world	= tQuery.createWorld().boilerplate().start();
```

We setup the camera now. We remove the default camera controls from the boilerplate.
Then we put the camera at ```(0,1.5,5)``` and looking toward ```(0,1,-1)``` 

```
	world.removeCameraControls()
	world.camera().position.set(0,1.5, 4);
	world.camera().lookAt(new THREE.Vector3(0,1,-1));
```

Now we change the background color. This confusing line ensure the background of the
3D scene will be rendered as ```0x000000``` color, aka black. We set a black
background to give an impression of night.

```
	world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );
```

We had a fog to the scene. For that, we use ```tquery.world.createfog.js``` plugins.

```
	world.addFogExp2({density : 0.15});
```

### The Lights 

Here we setup the lights of our scene. This is important as it determine how
your scene looks. We add a ambient light and a directional light.

```
	tQuery.createAmbientLight().addTo(world).color(0x444444);
	tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFFFFFF).intensity(3);
```

### The Ground

We create a large checkerboard with ```tquery.checkerboard.js``` plugin.
We scale the checkerboard to 100 per 100 units in the 3D world. Thus it is
quite large and disappears into the fog. It gives the cheap impression of
an infinite checkerboard.

```
	tQuery.createCheckerboard({
		segmentsW	: 100,	// number of segment in width
		segmentsH	: 100	// number of segment in Height
	}).addTo(world).scaleBy(100);
```

### The Character 

We use ```tQuery.RatamahattaMD2Character``` plugin. Its inherits from
```tQuery.MD2Character``` plugin. All the configuration for this particular
character ```ratamahatta``` is already done for you.
We attach it to tQuery world.

```
	var character	= new tQuery.RatamahattaMD2Character().attach(world);
```

When an animation is completed, switch to animation 'stand'. 

```
	character.bind('animationCompleted', function(character, animationName){
		console.log("anim completed", animationName);
		this.animation('stand');
	});
```

## Recognize Augmented Gestures

First we instanciate an object of **AugmentedGesture** class.
```.enableDatGui()``` will add a [Dat.GUI](http://workshop.chromeexperiments.com/examples/gui).
This is a nice library to tune parameters. We use it to tune augmentedgesture pointers.
You can read more about it in ["Dat-gui - Simple UI for Demos"](http://learningthreejs.com/blog/2011/08/14/dat-gui-simple-ui-for-demos/) post.
```.start()``` asks it to begin monitoring the webcam and see if it finds markers.
```.domElementThumbnail()``` put the webcam view as a thumbnail on the screen. This is what you
see on top-left.
This is usefull for the user, it is used as feedback to know what is happening

```
	var aGesture	= new AugmentedGesture().enableDatGui().start().domElementThumbnail();
```

### The Pointers

Now that we got our AugmentedGesture instance, we gonna configure the pointers.
One for the right hand, one for the left hand. For each, we setup the options
to adapt each hand colors.
In my case, the right hand is containing a green ball and the left hand contains a red ball.

```
	var pointerOpts	= new AugmentedGesture.OptionPointer();
	pointerOpts.pointer.crossColor	= {r:    0, g: 255, b:   0};
	pointerOpts.colorFilter.r	= {min:   0, max:  95};
	pointerOpts.colorFilter.g	= {min: 115, max: 255};
	pointerOpts.colorFilter.b	= {min:  25, max: 150};
	aGesture.addPointer("right", pointerOpts);
```

Now we do the same for the left pointer.

```
	var pointerOpts	= new AugmentedGesture.OptionPointer();
	pointerOpts.pointer.crossColor	= {r:    255, g:   0, b: 128};
	pointerOpts.colorFilter.r	= {min: 190, max: 255};
	pointerOpts.colorFilter.g	= {min:  30, max: 255};
	pointerOpts.colorFilter.b	= {min:   0, max: 100};
	aGesture.addPointer("left", pointerOpts);
```

### Gesture Analysis

Now that augmentedgesture.js is giving us the position of each hand, we gonna
convert that into events. ```punchingRight``` when the user gives a punch with
the right hand and ```punchingLeft``` for the left hand.
We establish a variable to store the user moves. It is quite simple
```.punchingRight``` is true when the use is punching with his right hand.
```.punchingLeft``` is the same for the left hand.
and ```.changed``` is true when values change.

```
	var userMove	= {
		punchingRight	: false,
		punchingLeft	: false,
		changed		: false
	};
```

we bind the event ```mousemove.left``` thus we are notified when the user moves his
left hand. The algo we use is very simple: if the left hand is on the right part of
the screen, then the user is considered "punchingLeft". Dont forget
to ```.changed``` to true

```
	aGesture.bind("mousemove.left", function(event){
		var state	= event.x > 1 - 1/3;
		if( state === userMove.punchingLeft )	return;
		userMove.punchingLeft	= state;
		userMove.changed	= true;
	});
```

Now we need the same thing for the other hand. all the the same.

```
	aGesture.bind("mousemove.right", function(event){
		var state	= event.x < 1/3;
		if( state === userMove.punchingRight )	return;
		userMove.punchingRight	= state;
		userMove.changed	= true;
	});
```

## Bind Character and Augmented Gestures

Now we hook a function to the rendering loop. This function will be executed
every time the scene is renderered. The first thing we do in this function
is to check that userMove has ```.changed```. If not, we do nothing.

```
	world.loop().hook(function(){
		if( userMove.changed === false )	return;
		userMove.changed = false;
```

Now we process each move of the user. If the user is ```punchingRight```, play
the animation ```crdeath``` of the character. If he is ```punchingLeft```,
play ```crplain```.

```
		if( userMove.punchingRight )		character.animation('crdeath');
		else if( userMove.punchingLeft )	character.animation('crpain');
	});
```

And you are **DONE**! Pretty nice no ? :)

## Conclusion
In this post we built a mini-game where users can punch doom character in augmented reality.
All that in 60 lines of javascript.
The Character is displayed in WebGL with
[three.js](https://github.com/mrdoob/three.js/)
and the augmented reality is handled
by [augmentedgesture.js](https://github.com/jeromeetienne/augmentedgesture.js).
I like how those libraries makes the code so small, and the developement time
so short.

That's all folks, have fun :)


