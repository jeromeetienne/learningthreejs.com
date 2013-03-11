---
layout: post
title: "Minecraft Character in WebGL"
date: 2012-07-05 10:22
comments: true
categories: [three.js, tquery, minecraft]
---

This post is about Minecraft Character.
We will play with the minecraft character, learn how to do your own and make it move.
I recently saw this excelent [minecraft items demo](http://djazz.mine.nu/lab/minecraft_items/)
by [@daniel_hede](https://twitter.com/#!/daniel_hede). It triggered a switch in my head :)
I felt in love with minecraft style of 3d. 
It makes modeling so simple.
You don't need to learn how to use 3d modeling software like 
[blender](http://www.blender.org/), 
[maya](http://usa.autodesk.com/maya/) and such.
It is easy to create new model based on this style.

Try the [minecraft plugin demo](/data/2012-07-05-minecraft-character-in-webgl/). This is the 
one we gonna build. I used [@daniel_hede](https://twitter.com/#!/daniel_hede)'s code
and did many plugins to make it all simple and fun :)
In this demo, i introduce
[three.js post processing](https://github.com/mrdoob/three.js/tree/master/examples/js/postprocessing)
for the first time.
This is the 
[Vignetting](http://en.wikipedia.org/wiki/Vignetting)
and 
[sepia color](http://en.wikipedia.org/wiki/Sepia_\(color\))
that you see.
Additionnaly, you can easily change the skins with the UI within the demo.
Now let's get started!

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/eg0qshn4VC0" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Let's start coding

We start to create our world as usual. This initialize the renderer, the camera,
its controls and a rendering loop.
We setup the 
[boilerplate for three.js](http://learningthreejs.com/blog/2012/01/19/boilerplate-builder-for-three-js/)
and add a page title with some info on our little 3D demo.
We just put the camera a little closer to scene center. Thus the character
will be bigger on screen. We just can't get enougth of it, can we ;)

```
	var world	= tQuery.createWorld().boilerplate().pageTitle('#info').start();
	world.tCamera().position.z	= 1.8;
```

Now we add a bit of post processing. It is the first time
we talk about this, so let's details it a bit.
What is post processing (in a 3d context) ?
Post processing is performed after rendering the 3D, hence the name.
It applies on the screen as a whole. So the effects are in 2D.
What's it not ?
It isn't for 3d effect on specific objects in your world.

```tquery.effectcomposer.js``` plugin provides a simple api to add 
postprocessing to our world. It is a chained API on top of 
[three.js effect composer](https://github.com/mrdoob/three.js/tree/master/examples/js/postprocessing). 
In our case, we first apply ```.sepia()``` to change the colors toward 
[sepia color](http://en.wikipedia.org/wiki/Sepia_\(color\)).
Then we apply ```.vignette()``` for
[Vignetting](http://en.wikipedia.org/wiki/Vignetting)
and mark the effects list
as finished. 

```
	world.addEffectComposer().sepia().vignette().finish();
```

Not too hard hey ;)

## Hello Steve!

Now that we go a world. We will create a minecraft character.
In fact, minecraft main character is called ['steve'](http://www.minecraftwiki.net/wiki/The_Player).
```tQuery.MinecraftChar``` is the main class. It will create 
a character model and expose all its limbs too e.g right legs or right arms.
More on that later.
As you can see, we specify ```skinUrl``` parameter. It should point to the 
image of the skin texture. You can change it anytime with ```character.loadSkin(skinUrl)```

```
	var character	= new tQuery.MinecraftChar({
		skinUrl	: 'images/3djesus.png'
	}); 
```

Now that we got our character setup, we just need to include it in our 3D world.

```
	character.model.addTo(world);
```

## Make this model move

So we talked about exposed limbs... kinda gross, almost disturbing :)
In fact it just means each part of our model is exposed for you to 
play with. It has the head, legs right and left, and the same for the arms.
It is all in ```character.parts```.

So the first step is to hook a function in the world rendering loop.
two parameters are passed ```delta``` and ```now```. ```delta``` is the number
of seconds since the last iteration of the rendering loop. ```now``` is the absolute
time in seconds.
We use those values to tune the animation. Thus it will be animated at the same
speed no matter the [fps](http://en.wikipedia.org/wiki/Frame_rate) rate of your computer.
Here is simple animation of the head. So we hook the function and change 
the ```headGroup``` rotation to fit our taste. 
We will make it do an 
[eight](http://en.wikipedia.org/wiki/8_\(number\))
or
[infinite synbol](http://en.wikipedia.org/wiki/Infinity#Infinity_symbol)

```
	world.loop().hook(function(delta, now){
		character.parts.headGroup.rotation.x	= Math.sin(now*1.5)/3;
		character.parts.headGroup.rotation.y	= Math.sin(now)/3;
	}); 
```


This is nice but the body would appear rather static if we move only the head.
Let's make see how to make it walk. 
When people walks or run, they swing theirs arm and legs.
So we need to change the rotation X of each of those limbs. First we get
an angle relative to current time. It will determine the position of the arms/legs.
The amplitude of the move has been tuned to ```1.4```, play with it and find the 
value you like. Then you move the legs and arms by setting the rotation. 
Just take care of balancing legs and arms thus his can keep his balance :)

```
	world.loop().hook(function(delta, now){
		var angle	= 1/2 * now*Math.PI*2;
		// move the arms
		character.parts.armR.rotation.x	= 1.4 * Math.cos(angle + Math.PI);
		character.parts.armL.rotation.x	= 1.4 * Math.cos(angle);
		// move the legs
		character.parts.legR.rotation.x	= 1.4 * Math.cos(angle);
		character.parts.legL.rotation.x	= 1.4 * Math.cos(angle + Math.PI);
	});
```

And we are done! Pretty cool no ? :)

### Conclusion


So we did a little character ala minecraft. 
We got a basic animations of it. Nevertheless it would be neat to make animations 
more robusts and generic. A new post will likely focus on this. 
I so love this field and how it make things easier.

That's all folks. Have fun :)





