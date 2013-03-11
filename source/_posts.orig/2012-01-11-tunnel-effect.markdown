---
layout: post
title: "Tunnel Effect for your Demo"
date: 2012-01-11 13:00
comments: true
categories: [demo, threejs, tunnel]
---

This post presents a tunnel effect.
This is a classic in 3D demo.
They are visually efficient and easy to code.
In fact, tunnels are so trendy that
even
[doctor who](http://en.wikipedia.org/wiki/Doctor_Who)
and
[stargate](http://en.wikipedia.org/wiki/Stargate)
have
[fun](http://www.youtube.com/watch?v=IKo9f5npLNM)
[in them](http://www.youtube.com/watch?v=KDIdJtW0vN4)
:)

[Try the demo](http://jeromeetienne.github.com/tunnelgl/).
It has been built using the
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate)
seen in a
[previous post](/blog/2011/12/20/boilerplate-for-three-js/).
The code is simple and small.
Less than 20lines has been added on top of the boilerplate.
We will create a
[THREE.Geometry](https://github.com/mrdoob/three.js/blob/master/src/core/Geometry.js)
to get the shape of tunnel.
Then we will use a
[texture](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js)
trick to create the
[visual illusion](http://en.wikipedia.org/wiki/Optical_illusion)
of moving.

<!-- more -->

<iframe src="http://jeromeetienne.github.com/tunnelgl/"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="100%" height="420px" frameborder="0">
</iframe>


## Let's build the walls

The first step is to build the *walls* of the tunnel.
It is easier that one would expect.
A tunnel may be seen as a cylinder with the camera inside.
Once you realized that, most of the work is done.
Luckily for us,
[three.js](https://github.com/mrdoob/three.js/)
got an easy way to build cylinders, called
[CylinderGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CylinderGeometry.js).
Nevertheless our tunnel / cylinder got 2 special points.

First, it is open-ended. So we must not build its top and bottom.
We need this to see thru its extremities.
This is handled by a parameter in
[CylinderGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CylinderGeometry.js).
We just set ```openended``` parameter to true and the rest is done for us :)

Second, the camera is usually located outside of objects.
But our tunnel/cylinder has the camera inside it.
To make our object visible from the inside, we need to turn it inside out.
For that, just use ```mesh.flipSided = true```

## Let's go forward

Now we need to go forward in this tunnel
For that we will use an old trick.
We won't move the tunnel walls themselves, only their appearance.
It gives the visual illusion that we are moving.
Remember what they say in matrix ?
["there is no spoon"](http://www.youtube.com/watch?v=dzm8kTIj_0M).
It is all the same, we are moving while staying still :)

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/dzm8kTIj_0M?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## A Texture isn't a spoon

First we want to move the appearance of the cylinder, thus the player got the illusion to go forward.
We will use [THREE.Texture](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js) for that.
We wont move the actual pixels of the textures, only its coordinates.
Additionnaly we want the texture to repeat on the cylinder, thus it appears as continuous.
WebGL texture is a powerfull and flexible tool.
You can tweak so many features.

First let's make this texture move.
Suppose we want the texture to loop once every 10 seconds.
So the coordinate ```.offset.y``` needs to go from 0 to 1 in 10 seconds.
This line is enougth to make the tunnel move forward.
You can change your speed within the tunnel by changing this number.

```javascript
	texture.offset.y	+= 0.1 * seconds;
```

Now the texture repetition. 
For that we will use a texture parameter called *wrap*.
It indicates how the gpu repeat the texture on a face.
Here is a good
[tutorial on opengl wrap](http://lucera-project.blogspot.com/2010/06/opengl-wrap.html).
By default, wrapS / wrapT are set to ```THREE.ClampToEdgeWrapping```.
So the texture is scaled to match exactly the size of the face.
In our case, we want to repeat the texture and not scale it.
So we use ```THREE.RepeatWrapping```.

```javascript
	texture.wrapT	= THREE.RepeatWrapping;
```

## Conclusion
We have seen how to do a tunnel with
[three.js](https://github.com/mrdoob/three.js/).
This is very simple to code and awesome on the screen.
It is less than 20 lines added to the [boilerplate](https://github.com/jeromeetienne/threejsboilerplate).
The cylinder geometry was already provided.
We used
[THREE.Texture](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js)
offsets to provide the optical illusion of moving.

Later, we may add a [blue phonebooth](http://en.wikipedia.org/wiki/TARDIS)
and play *doctor who* :)
The code is available on
[github](https://github.com/jeromeetienne/tunnelgl)
under MIT license.
Feel free to fork and modify.
That's all folks, have fun.
