---
layout: post
title: "How To Make The Earth In WebGL?"
date: 2013-08-16 10:13
comments: true
published: true
categories: 
---

So today we gonna learn how to display the earth in webgl.
That's will be a nice introduction on material and textures.
First let me show you the demo we gonna do

<iframe width="425" height="349" src="http://www.youtube.com/embed/huTF047XVvQ" frameborder="0" allowfullscreen></iframe>

<!-- more -->

You can see the demo live here

<iframe width="100%" height="349" src="/data/2013-08-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/examples/earth.html" frameborder="0" allowfullscreen></iframe>


### to render the earth itself

* TODO show only map, then add bumpMap, then add specular

### How To Do a Sphere ?

{% img right /data/2013-08-16-how-to-make-the-earth-in-webgl/screenshots/earth-color.png 160 120 %}

```javascript
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= new THREE.MeshPhongMaterial()
var mesh	= new THREE.Mesh(geometry, material)
```

TODO make a blabla on the geometry

<br clear='both'/>

### How To Do a Diffuse Texture ?

{% img right /data/2013-08-16-how-to-make-the-earth-in-webgl/screenshots/earth-diffuse.png 320 240 %}
{% img left /data/2013-08-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthmap1k.jpg  410 240 %}

Above you can see the 
[diffuse texture](http://wiki.splashdamage.com/index.php/Basic_Texture_Overview)
from
[planetpixelemporium](http://planetpixelemporium.com/planets.html). 
When we apply it to a sphere, we got the image on the right.
Here is the code to produce it.

<br clear='both'/>

```javascript
material.map	= THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
```

### How To Do a Bump Map ?

{% img right /data/2013-08-16-how-to-make-the-earth-in-webgl/screenshots/earth-bump.png 320 240 %}
{% img left /data/2013-08-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthbump1k.jpg 410 240 %}

Above is the bump map we use.
According to 
[wikipedia definition](http://en.wikipedia.org/wiki/Bump_mapping),
a bump map "perturbate the surface normals of the object 
and using the perturbed normal during lighting calculations".
Each of its pixel acts as a height on the surface.
See the result on the right. 
The montains appear more clearly thanks to their shadow.
It is possible to change how much the map affects lighting with
```bumpScale``` parameter.
Play with it to fit your needs.

```javascript
material.bumpMap	= THREE.ImageUtils.loadTexture('images/earthbump1k.jpg')
material.bumpScale	= 0.05
```

### specular

{% img right /data/2013-08-16-how-to-make-the-earth-in-webgl/screenshots/earth-specular.png 320 240 %}
{% img left /data/2013-08-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthspec1k.jpg 410 240 %}

Above is the specular map we use.
Each pixel determines the intensity of specularity.
In this case, only the sea is specular because water reflects water more than earth.
You can control the specular color with ```.specular``` parameter.

<br clear='both'/>


```javascript
material.specularMap	= THREE.ImageUtils.loadTexture('images/earthspec1k.jpg')
material.specular	= new THREE.Color('grey')
```

### The end result

* TODO show only map, then add bumpMap, then add specular

```javascript
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= new THREE.MeshPhongMaterial({
	map		: THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),

	bumpMap		: THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
	bumpScale	: 0.05,

	specularMap	: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
	specular	: new THREE.Color('grey'),
})
var mesh	= new THREE.Mesh(geometry, material)
```


### How To Do Stars ?

We will see how to render the galaxy starfield.
The star field as you see it in the demo is a "environment sphere",
aka it is a large sphere, we are in the center and we see what is inside.

```javascript
// create the geometry sphere
var geometry	= new THREE.SphereGeometry(90, 32, 32)
// create the material, using a texture of startfield
// - NOTE the ```THREE.BackSide``` to show the interior of the sphere
var material	= new THREE.MeshBasicMaterial({
	map	: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
	side	: THREE.BackSide
})
// create the mesh based on geometry and material
var mesh	= new THREE.Mesh(geometry, material)
```

### How To Render The Clouds

we build ```canvasCloud``` and use it as texture. 
It is based on 2 jpg images:
one for the color
and the other for the transparency.
It is because [jpg](http://en.wikipedia.org/wiki/JPEG) doesn't handle an alpha channel.
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
var moonMesh	= new THREE.Mesh(geometry, material)
// add it to the earth mesh thus they move together
earthMesh.add(moonMesh)
```

Notice the parameters of the material.
We set ```transparent``` to warn three.js.
we set ```side``` to ```DoubleSide``` thus both sides will be visible. 
This avoid artefacts on the edge of the earth.
and finnaly we set ```opacity``` to make them more translucide.

### How to Make It Rotate ?

First let's orientate the earth by 23.4 degree.
In reality, the earth got a little tilt in the solar system plane, 
and this tilt is of 23.4 degree :)

```javascript
earthMesh.rotation.z	= -23.4 * Math.PI/180
```

Now let's make the earth rotates! 
Now that we got the cloud mesh, we need to animate it thus they looks more realistic.
For example in your render loop, you do this

```javascript
onRenderFcts.push(function(delta, now){
	earthMesh.rotation.y	+= 1/32 * delta;
	moonMesh.rotation.y	+= 1/8 * delta;
})
```

### Here is the moon

As we already did the earth, it is pretty straighforward to the moon. We reuse
the same technics with [moon textures](http://planetpixelemporium.com/earth.html).

```javascript
var geometry	= new THREE.SphereGeometry(0.5, 32, 32)
var material	= new THREE.MeshPhongMaterial();
var moonMesh	= new THREE.Mesh(geometry, material)
material.map		= THREE.ImageUtils.loadTexture('images/moonmap1k.jpg');
material.bumpMap	= THREE.ImageUtils.loadTexture('images/moonbump1k.jpg');
material.bumpScale	= 0.002;
```

### Conclusion

After that, we add a atmosphere shader to reproduce the halo created by the atmosphere,
a moon and some shadow casting. and you got the following.




