---
layout: post
title: "tQuery plugin for Doom Characters"
date: 2012-05-04 10:26
comments: true
published: true
categories: [tquery, threejs]
---

This post is about
[tQuery.md2Character](https://github.com/jeromeetienne/tquery/tree/dev/plugins/md2character)
plugin: a cool plugin which allow you to easily play with doom characters. You can see a live demo
[here](/data/2012-05-04-tquery-md2character-a-plugin-for-doom-characters/examples).
I will walk you thru its example. It include a checkerboard for the ground, a fog for the depth, keyboard to
move your player and obviously plugins for the MD2 characters (doom formats).
We gonna learn how to move doom characters in webgl in only 50lines of javascript!

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/BaCEKbWXbfM" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->
 
## Background knowledge
First what means MD2 ?
[MD2](http://en.wikipedia.org/wiki/MD2_\(file_format\)) is the file format used in the famous
[Quake II](http://en.wikipedia.org/wiki/Quake_II).
Many of the monster you love to hate can be found in this format :)
You can find md2 models
  at [sitters-electronics](http://www.md2.sitters-electronics.nl/models.html)
  or at [planet quake](http://planetquake.gamespy.com/View.php?view=Quake2.Detail&id=69).

You can use it easily in three.js thanks to [oosmoxiecode](https://twitter.com/#!/oosmoxiecode)
He wrote a nice converter from
  [MD2](http://en.wikipedia.org/wiki/MD2_\(file_format\))
  to
  [three.js json format](https://github.com/mrdoob/three.js/wiki/JSON-Model-format-3.0).
  He wrote a [post about it](http://oos.moxiecode.com/blog/2012/01/md2-to-json-converter/)
  with plenty of usefull info on the subject.
[alteredq](http://alteredqualia.com/) wrote
several [cool](http://alteredqualia.com/three/examples/webgl_morphtargets_md2_control.html)
[demos](http://alteredqualia.com/three/examples/webgl_morphtargets_md2.html)
using it.

## Let's Get Started
We gonna walk you thru the 50lines of javascript needed make this demo.
It is rather simple. It implies tQuery obviously, and various plugins:
One for the fog, one for the checkerboard used as ground, one to
bind the keyboard and obviously plugins for the MD2 Character itself.

<iframe src="/data/2012-05-04-tquery-md2character-a-plugin-for-doom-characters/examples"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="100%" height="420" frameborder="0">
</iframe>

Nice demo no ? You can try it
[here](/data/2012-05-04-tquery-md2character-a-plugin-for-doom-characters/examples).
Let's code it!
 
## The 3D World

First we initialize the world in 3D.
With ```tQuery.createWorld()```, we create a ```tQuery.World```.
With ```.boilerplate()```, we setup a boilerplate on this world. A boilerplate is
a fast way to get you started on the right foot. It is the
[learningthreejs boilerplate for three.js](http://learningthreejs.com/blog/2011/12/20/boilerplate-for-three-js/)
With ```.start()```, we start the rendering loop. So from now on, the world scene
gonna be rendered periodically, typically 60time per seconds.

```js
    var world	= tQuery.createWorld().boilerplate().start();
```

Change the background color. This confusing line ensure the background of the
3D scene will be rendered as ```0x000000``` color, aka black. We set a black
background to give an impression of night.

```js
    world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );
```

## The Lights 

Here we setup the lights of our scene. This is important as it determine how
your scene looks. We add a ambient light and 2 directional lights.
The ambient light is a dark grey, to simulate the lack of light during the night.
We setup a directional light in front colored redish.... This is like a setting sun.
In the opposite direction, we put another direction light, bluish. This is like
the moon. Well this was my rational :)

```js
    tQuery.createAmbientLight().addTo(world).color(0x444444);
    tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFF88BB).intensity(3);
    tQuery.createDirectionalLight().addTo(world).position( 1,1,-1).color(0x4444FF).intensity(2);
```

## The fog

We had a fog to the scene.
For that, we use ```tquery.world.createfog.js``` plugins.
It allows to create the 2 types of fog from three.js
: [fogexp2](https://github.com/mrdoob/three.js/blob/master/src/scenes/FogExp2.js)
and
[fog](https://github.com/mrdoob/three.js/blob/master/src/scenes/Fog.js).
```density``` is the density of the fog. 0.01 is very light, 0.9 is almost opaque.
In general, fogs are a nice visual trick. It is rather cheap to compute
and limits the depth of what you see.
It is a nice trick to hide the "end of the world" :)

```js
    world.addFogExp2({density : 0.1});
```

### The Columns

#### initialize a material

We will apply it to all the columns. It is [lambert lighting](http://en.wikipedia.org/wiki/Lambertian_reflectance)
the ```ambient``` is the color which gonna be combined with be combined with the ambient
light we initialized on top. ```color``` will be combined with the
directional lights. and ```map``` gives the texture to use.

```js
    var material	= new THREE.MeshLambertMaterial({
        ambient	: 0xFFFFFF,
        color	: 0xFFAAAA,
        map	: THREE.ImageUtils.loadTexture('../../assets/images/water.jpg')
    });
```

#### Build 15 Columns

loop over each column

```js
    for(var i = 0; i < 15; i++ ){
```

Create the cylinder. We pass some parameters to the contructor to setup
the size we see fit, and we add the material we want to apply on the
cylinder. Then we use ```.addTo()``` to add our object to
our ```tQuery.World```.

```js
        var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
```

Change the position of the column. We translate the column to build
a kind of alley. Thus the character will be able to run inside it :)

```js
        column.translateX(i%2 ? +1 : -1).translateY(1).translateZ(15/2 + -1*i);
    }
```

### The Ground

We create a large checkerboard with ```tquery.checkerboard.js``` plugin.
We scale the checkerboard to 100 per 100 units in the 3D world. Thus it is
quite large and disappears into the fog. It gives the cheap impression of
an infinite checkerboard.

```js
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
Additionnaly we use ```.hookKeyboard()``` which bind arrow key to character moving.
This function is part of
[keyboard plugins for ratamahatta](../../tquery.md2character.ratamahatta.keyboard.js)

```js
    var character	= new tQuery.RatamahattaMD2Character().attach(world).hookKeyboard();
```

Here we show an example of binding the "loaded" event.
It is notified once the whole characters data are loaded (texture, mesh for animations of
body and weapons). It just display the name of the available animations.

```js
    character.bind("loaded", function(){
        console.log("list animmation", Object.keys(character._meshBody.geometry.animations))
    });
```

We setup the user camera controls.
It will determine how the user camera will move in the world scene.
We use ```tQuery.MD2Character.CameraControls``` plugin made specially
for this case. With it, the camera will follow the MD2 character looking
at it from above.
world.setCameraControls(new tQuery.MD2Character.CameraControls(character));

### Change the Skin by Keyboard

hook a function in the rendering loop. This function will be executed everytime
the scene is rendered. Within this function, we will use ```tQuery.Keyboard```
plugins to test the keyboard. if the key ```s``` is pressed, then use ```character.setSkin()```
to change the skin of the character.

```js
    world.loop().hook(function(){
        var keyboard	= tQuery.keyboard();	// get keyboard instance
        if( keyboard.pressed("s") ){		// if the key 's' is pressed, change the skin
            character.setSkin(Math.floor(Math.random()*5));
        }
    });
```

### Conclusion
So we have seen what is possible to do with ```tquery.md2character``` and 50lines of javascript.
It is a rather short code for what you got on the screen, if you ask me.
Btw all that released under MIT license.
I think i like the **code walkthru** format.
I find it efficient to describe tQuery examples and fast for me to generate.
It is directly derived from [annoted doc format](http://jashkenas.github.com/docco/)
as you can see [here](/data/2012-05-04-tquery-md2character-a-plugin-for-doom-characters/examples/docs/).
I will likely do more in the future.  

That's all folks. Have fun :)
