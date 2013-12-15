---
layout: post
title: "How To Make The Earth In WebGL?"
date: 2013-09-16 10:13
comments: true
published: true
categories: three.js
---

So today we gonna learn how to display the earth in webgl.
That will be a nice introduction to material and textures.
I got the idea while coding
[threex.planets](http://github.com/jeromeetienne/threex.planets/),
a three.js extension to easily display all the planets from the solar system based on 
[planetpixelemporium](http://planetpixelemporium.com/planets.html). With this post, you will be able to feel like astronauts conquering the outer space for the day and creating your own galaxy. :)

<iframe width="425" height="349" src="http://www.youtube.com/embed/-3ZCZUgvmo0" frameborder="0" allowfullscreen></iframe>

<!-- more -->

So we want to render the earth with three.js... It is surprisingly easy to code.
We gonna use the textures 
from 
[planetpixelemporium](http://planetpixelemporium.com/planets.html)
and proceed step by step.
But first let me show you the
[demo we gonna write](/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/index.html) below.

<iframe width="100%" height="349" src="/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/index.html" frameborder="0" allowfullscreen></iframe>

First the geometry with a sphere, then each texture and their various effects.
We will even add animations to make it more realistic and put it in context with 
a star field background.

## Let's Do a Plain Sphere

{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/earth-color.png 320 240 %}

Well we first create a geometry for the sphere, then 
we add a phong material,
create a mesh from them
and add it to the scene.
The first parameter, ```0.5``` is the radius.
The second parameter, ```32```, is the segments in width
and
the third, ```32```, is the segments in height.
We make it quite detailed for it to be nicer.
We pick ```THREE.MeshPhongMaterial``` to get 
[phong shading](http://en.wikipedia.org/wiki/Phong_shading).
It provides [specular reflection](http://en.wikipedia.org/wiki/Specular_reflection)
which will be used to get a shiny sea.

<br clear='both'/>

```javascript
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= new THREE.MeshPhongMaterial()
var earthMesh	= new THREE.Mesh(geometry, material)
scene.add(earthMesh)
```

Cool but rather flat... What about a diffuse texture to add some colors to our sphere.

## Let's Add a Diffuse Texture

{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/earth-diffuse.png 320 240 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthmap1k.jpg  410 240 %}

Above you can see the 
[diffuse texture](http://wiki.splashdamage.com/index.php/Basic_Texture_Overview)
from
[planetpixelemporium](http://planetpixelemporium.com/planets.html) to set the main color 
of the surface. 
When we apply it to a sphere, we get the image on the right.
Here is the code to produce it.

<br clear='both'/>

```javascript
material.map	= THREE.ImageUtils.loadTexture('images/earthmap1k.jpg')
```

Hmm rather cool but more relief on the earth would be cool. What about a bump texture now ?

## Let's Add a Bump Texture

{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/earth-bump.png 320 240 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthbump1k.jpg 410 240 %}

Above is the bump map we use.
According to [wikipedia definition](http://en.wikipedia.org/wiki/Bump_mapping),
a bump map "perturbates the surface normals of the object 
using the perturbed normal during lighting calculations".
Each of its pixels acts as a height on the surface.
See the result on the right.
The mountains appear more clearly thanks to their shadow.

```javascript
material.bumpMap	= THREE.ImageUtils.loadTexture('images/earthbump1k.jpg')
material.bumpScale	= 0.05
```

It is possible to change how much the map affects lighting with ```bumpScale``` parameter.
Play with it to fit your needs. Now that we change the heights on various parts of the
earth, let's change its shininess with a specular texture.

## Let's Add a Specular Texture

{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/earth-specular.png 320 240 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthspec1k.jpg 410 240 %}

Above is the [specular map](http://wiki.splashdamage.com/index.php/Specular_Maps) we use.
Each pixel determines the intensity of 
[specularity](http://en.wikipedia.org/wiki/Specularity).
In this case, only the sea is specular because water reflects water more than earth.
You can see it on the left with the white halo in the Gulf of Mexico.
You can control the specular color with ```.specular``` parameter.

```javascript
material.specularMap	= THREE.ImageUtils.loadTexture('images/earthspec1k.jpg')
material.specular	= new THREE.Color('grey')
```

Yeah but all this water, where does it go when it is hot ? It evaporates in the sky 
and becomes clouds.

## Let's Add a Cloud Layer

{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthcloudmap.jpg 320 240 %}
{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/earth-cloud.png 320 240 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthcloudmaptrans.jpg 360 240 %}

<br clear='both'/>

We build ```canvasCloud``` and use it as texture. 
It is based on the jpg images you see above:
one for the color and the other for the transparency.
We do that because
[jpg](http://en.wikipedia.org/wiki/JPEG)
doesn't handle an alpha channel.
So you need to make the code to build the texture based on those images.

```javascript
var geometry	= new THREE.SphereGeometry(0.51, 32, 32)
var material	= new THREE.MeshPhongMaterial({
	map		: new THREE.Texture(canvasCloud),
	side		: THREE.DoubleSide,
	opacity		: 0.8,
	transparent	: true,
	depthWrite	: false,
})
var cloudMesh	= new THREE.Mesh(geometry, material)
earthMesh.add(cloudMesh)
```

We attach the cloudMesh to the earthMesh, thus they will move together.
Notice the parameters of the material.
We disable ```depthWrite``` and set ```transparent``` to warn three.js the 
cloud mesh is transparent.
We set ```side``` to ```DoubleSide``` thus both sides will be visible. 
This avoids artefacts to be on the edge of the earth.
Finaly we set ```opacity``` to make them more translucide.
The output is quite convincing but rather static. Let's see what we can do about that!

## "And Yet it Moves"

This is what
[Galileo Galilei](http://en.wikipedia.org/wiki/Galileo_Galilei) said 
about the earth. This sentence has a 
[interesting story](http://en.wikipedia.org/wiki/And_yet_it_moves).
So i am thinking it would be cool to make our earth move too.
In your render loop, you simply do this

```javascript
onRenderFcts.push(function(delta, now){
	earthMesh.rotation.y	+= 1/32 * delta
})
```

As a last step, we gonna animate the cloud layer too, to make it more realistic.

```javascript
onRenderFcts.push(function(delta, now){
	cloudMesh.rotation.y	+= 1/16 * delta
})
```

Definitely better, but still we feel there is something missing. 
What do we see in space ? Stars! duh :)

## Let's Add a Star Field

{% img right /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/galaxy_starfield.png 320 240 %}

We will see how to render the galaxy starfield.
The star field as you see it in the demo is an "environment sphere",
aka it is a large sphere, we are in the center and we see what's inside.
So we ask three.js to show the backside of the faces.
And we use the texture above as diffuse.
The above image is smaller than the actual one so you barely see the stars. 

<br clear='both'/>

```javascript
// create the geometry sphere
var geometry	= new THREE.SphereGeometry(90, 32, 32)
// create the material, using a texture of startfield
var material	= new THREE.MeshBasicMaterial()
material.map	= THREE.ImageUtils.loadTexture('images/galaxy_starfield.png')
material.side	= THREE.BackSide
// create the mesh based on geometry and material
var mesh	= new THREE.Mesh(geometry, material)
```

## threex.planets - All Solar System's Planets Done For You

While i was at it, i made 
[threex.planets](https://github.com/jeromeetienne/threex.planets/),
a 
[threex](http://jeromeetienne.github.io/threex/)
extension for 
[three.js](http://threejs.org).
It provides all the planets from the solar system to be easily usable in your own demo or games.
It is based on 
[planetpixelemporium](http://planetpixelemporium.com/planets.html)
textures using the same technics described in this post.
You can see it live 
[here](http://jeromeetienne.github.io/threex.planets/examples/select.html).
First, the mythical 
[sun](http://jeromeetienne.github.io/threex.planets/examples/select.html#Sun), 
[mercury](http://jeromeetienne.github.io/threex.planets/examples/select.html#Mercury) and 
[venus](http://jeromeetienne.github.io/threex.planets/examples/select.html#Venus).

{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-sun.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-mercury.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-venus.png 230 172 %}

<br clear='both'/>
Now the best known, the 
[earth](http://jeromeetienne.github.io/threex.planets/examples/select.html#Earth)
with its cloud that we previously detailed in this post, the
[moon](http://jeromeetienne.github.io/threex.planets/examples/select.html#Moon)
which isn't
an actual planet but still we could not do without, and 
[mars](http://jeromeetienne.github.io/threex.planets/examples/select.html#Mars)
with the little green people.

{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-earth.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-moon.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-mars.png 230 172 %}

<br clear='both'/>

Follow, 
[jupiter](http://jeromeetienne.github.io/threex.planets/examples/select.html#Jupiter), 
[saturn](http://jeromeetienne.github.io/threex.planets/examples/select.html#Saturn) and 
[uranus](http://jeromeetienne.github.io/threex.planets/examples/select.html#Uranus).
I love the rings there. I added shadow casting to enhance realism.

{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-jupiter.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-saturn.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-uranus.png 230 172 %}

<br clear='both'/>
And the last two, the furthest ones, 
[neptune](http://jeromeetienne.github.io/threex.planets/examples/select.html#Neptune)
and
[pluto](http://jeromeetienne.github.io/threex.planets/examples/select.html#Pluto)

{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-neptune.png 230 172 %}
{% img left /data/2013-09-16-how-to-make-the-earth-in-webgl/screenshots/planets-pluto.png 230 172 %}

<br clear='both'/>

## Conclusion

In this post, we saw how to make a nice looking earth with animated clouds with a star field in
the background. I think it is a nice result for the amount of work.
I hope it was useful to discuver the various roles of textures. 
Now you can use this to make even nicer demos, like 
[this one](http://jeromeetienne.github.io/threex.planets/examples/earth.html).
It shows the same Earth, that we just saw how to do, with the moon close to it.
We add shadow casting and a nice atmosphere shader and the result is quite convincing.

That's all for today folks. Have Fun!
