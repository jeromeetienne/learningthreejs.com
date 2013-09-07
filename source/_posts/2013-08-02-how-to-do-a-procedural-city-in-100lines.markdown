---
layout: post
title: "How To Do A Procedural City In 100 Lines"
date: 2013-08-02 12:47
comments: true
categories: [three.js]
---

This post explains how to code 
["city"](http://www.mrdoob.com/lab/javascript/webgl/city/01/)
, a  demo [recently released](https://twitter.com/mrdoob/status/350730133319073792) by 
[@mrdoob](http://mrdoob.com).
He built a fully procedural city in 100-lines of javascript.
I found the algorithm very elegant, a simple and efficient solution. 
So I made a post explaining it.

<iframe width="425" height="349" src="http://www.youtube.com/embed/huTF047XVvQ" frameborder="0" allowfullscreen></iframe>

<!-- more -->

 
## A Few Remarks on the Algorithm

It always helps to get a big picture before going down to the details.
The used algorithm is [fully procedural](http://en.wikipedia.org/wiki/Procedural_generation).
This means the whole city is built dynamically, so no download.
It is quite elegant as well.
The algorithm to generate the city in 3d is less than 100 lines long.
What is this algo in a nutshell? 
Every building is a cube, they got random size and position.
Simple enough ?
It may seem far from realism but it is ok.
The illusion is surprisingly convincing if you fly over at low altitude.

From a performance point of view, all buildings are merged into a single geometry,
with a single material.
As a cherry on the cake, we remove the bottom face as it is never seen.
It is very efficient as there is no shader swap and a single draw call.

To improve realism, we simulate ambient occlusion thru a cheap trick 
using ```vertexColor```.
In the city, at the street level you got shadow from the other buildings.
So the bottom of the buildings are darker than the top.
We can reproduce this effect with ```vertexColor```.
We take the bottom vertices of the building and make them darker than the top.

## Let's get started

To explain those 100 lines, we will explain it step by step:
First, we *"generate the base geometry for the building"*.
Then we use this geometry to know *"where to place buildings in the city"*.
We use some clever trick *"using vertexColor for ambient occlusion"*.
Then we *"merge all buildings to make a city"*, thus the whole city may 
be drawn in a single draw call.
At the end we detail the *"procedural generation of building’s texture"*.

Ok so let's get started!!

## Generate the base Geometry for the building

We build a base geometry of our building. 
It will be reused several time while building the whole city.
So we build a simple CubeGeometry

```javascript
var geometry = new THREE.CubeGeometry( 1, 1, 1 );
```

We change the pivot point to be at the bottom of the cube, instead of its center.
So we translate the whole geometry.

```javascript
geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
```

Then we remove the bottom face. 
This is an optimisation. 
The bottom face of a building is never seen by the viewer as it is always on the ground.
It is useless and we remove it.

```javascript
geometry.faces.splice( 3, 1 );
```

Now we fix the [UV mapping](http://en.wikipedia.org/wiki/UV_mapping) for the roof face. 
We set them to the single coordinate ```(0,0)```.
So the roof will be the same color as a floor row.
As each face of the building is using a single texture, it can be drawn in a single draw call.
Sweet trick for optimisation.

```javascript
geometry.faceVertexUvs[0][2][0].set( 0, 0 );
geometry.faceVertexUvs[0][2][1].set( 0, 0 );
geometry.faceVertexUvs[0][2][2].set( 0, 0 );
geometry.faceVertexUvs[0][2][3].set( 0, 0 );
```

Ok now that we got the geometry of a single building, let's assemble buildings together to make a city!

## Where to place buildings in the city

Well... to be honest we put them anywhere.
All is random ;)
Obviously, there are collisions but the illusion is nice if you fly at low altitude.
So first, we put the building at random position.

```javascript
buildingMesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;
buildingMesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
```

Then we put a random rotation in Y.

```javascript
buildingMesh.rotation.y = Math.random()*Math.PI*2;
```

Then we change the mesh.scale to change the building size.
First how wide and deep a building can be.

```javascript
buildingMesh.scale.x  = Math.random()*Math.random()*Math.random()*Math.random() * 50 + 10;
buildingMesh.scale.z  = buildingMesh.scale.x
```

Then how high it is.

```javascript
buildingMesh.scale.y  = (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
```

What's the deal with all those multiplication of ```Math.random()``` ?
Well it is a way to change the statistic distribution of the result
and center it closer to 0. ```Math.random()``` is between 0 and 1 
and got an average of 0.5. ```Math.random() * Math.random()``` is 
between 0 and 1 but got an average of 0.25. ```Math.random() * Math.random() * Math.random()``` 
got an average of 0.125 and so on.
That's it :)
We got the position/rotation/scale of our building all set.
Now let's set its color, and how to use it to simulate shadows.

### Using VertexColor for Ambient Occlusion

{% img right /data/2013-08-02-how-to-do-a-procedural-city/screenshots/screenshot-building-with-vertexcolor-small.png %}

In a city with lots of buildings, the bottom of the building tends to be darker than the top.
This is because the sun light hits the top harder than the bottom, at the bottom you have the shadow of another building.
This is what we call
[ambient occlusion](http://http.developer.nvidia.com/GPUGems/gpugems_ch17.html) in graphic programming.
This concept may be implemented in various ways:
for example in screen space with [screen space ambient occlusion or ssao](http://en.wikipedia.org/wiki/Screen_space_ambient_occlusion)
or in this 
[minecraft example from three.js](http://threejs.org/examples/webgl_geometry_minecraft_ao.html)

{% img left /data/2013-08-02-how-to-do-a-procedural-city/screenshots/screenshot-building-without-vertexcolor-small.png %}

With three.js, it is is possible to assign a color to a vertice. 
It will alter the final color of the face.
We gonna use that to simulate shadows at the bottom of building.
First we define the base colors for the part which receives lights, and the ones
which get shadows. 

```javascript
var light = new THREE.Color( 0xffffff )
var shadow  = new THREE.Color( 0x303050 )
```

Those are constants for each building. Now we need to get a color 
for this particular building. We put some randomness for variety.

```javascript
var value = 1 - Math.random() * Math.random();
var baseColor = new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
```

Now we need to assign the .vertexColor every vertex of every face.
If the face is a top face, we use ```baseColor``` of the building.
If it is a side face, we use ```baseColor``` multiplied by our ```light```
for the top vertices and ```shaddow``` for the bottom vertices,
as cheap ambient occlusion.

```javascript
// set topColor/bottom vertexColors as adjustement of baseColor
var topColor  = baseColor.clone().multiply( light );
var bottomColor = baseColor.clone().multiply( shadow );
// set .vertexColors for each face
var geometry  = buildingMesh.geometry;    
for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
  if ( j === 2 ) {
    // set face.vertexColors on root face
    geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
  } else {
    // set face.vertexColors on sides faces
    geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
  }
}
```

We got a single building fully setup. Now let's make a city with many buildings.

## Merge all buildings to make a city

To make our city, we gonna merge 20000 buildings together.
So we gonna loop and apply the above formulas for each building we add.
We have already seen that reducing draw calls is good for performance.
see ["Performance: Merging Geometry"](/blog/2011/10/05/performance-merging-geometry/) post.
Here all buildings share the same material, so we gonna merge them all
in a single geometry. 

```javascript
var cityGeometry= new THREE.Geometry();
for( var i = 0; i < 20000; i ++ ){
  // set the position/rotation/color the building in the city
  // ... 

  // merge it with cityGeometry - very important for performance
  THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
}
```

Now we got a single large geometry for the whole city, let's build
a mesh from it.

```javascript
// build the mesh
var material  = new THREE.MeshLambertMaterial({
  map           : texture,
  vertexColors  : THREE.VertexColors
});
var mesh = new THREE.Mesh(cityGeometry, material );
```

This mesh is a whole city.
Rather cool!
Now one last step, let's explain how to make this texture.

## Procedural Generation of Building's Texture

Here we want to generate the texture for the side of each building.
In a nutshell, it will show the floors for realism and variety.
So it alternates between row of window and row of floor.
Window rows are dark with a small noise to simulate light variations in each room.
Then we upscale texture carefully avoiding filtering.

First you build a canvas. Make it small, 32x64.

```javascript
var canvas  = document.createElement( 'canvas' );
canvas.width  = 32;
canvas.height = 64;
var context = canvas.getContext( '2d' );
```

Then you paint it in white

```javascript
context.fillStyle = '#ffffff';
context.fillRect( 0, 0, 32, 64 );
```

Now we need to draw on this white surface. We gonna draw floors on it.
one windows row, then a floor row and we loop.
In fact, as the face is already white, we just have to draw the window rows.
To draw the window row, we add some random to simulate lights variations in each windows.

```javascript
for( var y = 2; y < 64; y += 2 ){
  for( var x = 0; x < 32; x += 2 ){
    var value = Math.floor( Math.random() * 64 );
    context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
    context.fillRect( x, y, 2, 1 );
  }
}
```

{% img right /data/2013-08-02-how-to-do-a-procedural-city/screenshots/screenshot-texture-smoothing-small.png %}

Now we got the texture... just it is super small, 32, 64
We need to increase its resolution. But lets be careful.
By default when you increase the resolution, you get a smoothed result, so it may easily appears blurry.
See on the right side, it doesn't look good... 
To avoid this artefact, we disable ```.imageSmoothedEnabled``` on each plateform.
You can see the result on the left.
The blurry effect is no more.
It is as sharp as the original but with a better resolution.
Ok now lets code exactly that. First we create the large canvas of 1024 by 512.

```javascript
var canvas2 = document.createElement( 'canvas' );
canvas2.width = 512;
canvas2.height  = 1024;
var context = canvas2.getContext( '2d' );
```

We disable the smoothing

```javascript
context.imageSmoothingEnabled   = false;
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled  = false;
```

Now we just have to copy the small canvas into the big one.

```javascript
context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
```

Then all we need to do is to actually build the ```THREE.Texture```.
We set the anisotropie to a high number to get better result.
see [tojiro on anisotropy](http://blog.tojicode.com/2012/03/anisotropic-filtering-in-webgl.html) for detail.

```javascript
var texture   = new THREE.Texture( generateTexture() );
texture.anisotropy  = renderer.getMaxAnisotropy();
texture.needsUpdate = true;
```

This was the last step. Now, you know how to do a procedural city 
in webgl with three.js. Rather cool! 
As a summary here is the whole code put together.

## The Whole Code

Let's put all that together. Here is the whole code commented.

```javascript
// build the base geometry for each building
var geometry = new THREE.CubeGeometry( 1, 1, 1 );
// translate the geometry to place the pivot point at the bottom instead of the center
geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
// get rid of the bottom face - it is never seen
geometry.faces.splice( 3, 1 );
geometry.faceVertexUvs[0].splice( 3, 1 );
// change UVs for the top face
// - it is the roof so it wont use the same texture as the side of the building
// - set the UVs to the single coordinate 0,0. so the roof will be the same color
//   as a floor row.
geometry.faceVertexUvs[0][2][0].set( 0, 0 );
geometry.faceVertexUvs[0][2][1].set( 0, 0 );
geometry.faceVertexUvs[0][2][2].set( 0, 0 );
geometry.faceVertexUvs[0][2][3].set( 0, 0 );
// buildMesh
var buildingMesh= new THREE.Mesh( geometry );

// base colors for vertexColors. light is for vertices at the top, shaddow is for the ones at the bottom
var light	= new THREE.Color( 0xffffff )
var shadow	= new THREE.Color( 0x303050 )

var cityGeometry= new THREE.Geometry();
for( var i = 0; i < 20000; i ++ ){
	// put a random position
	buildingMesh.position.x	= Math.floor( Math.random() * 200 - 100 ) * 10;
	buildingMesh.position.z	= Math.floor( Math.random() * 200 - 100 ) * 10;
	// put a random rotation
	buildingMesh.rotation.y	= Math.random()*Math.PI*2;
	// put a random scale
	buildingMesh.scale.x	= Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
	buildingMesh.scale.y	= (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
	buildingMesh.scale.z	= buildingMesh.scale.x

	// establish the base color for the buildingMesh
	var value	= 1 - Math.random() * Math.random();
	var baseColor	= new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
	// set topColor/bottom vertexColors as adjustement of baseColor
	var topColor	= baseColor.clone().multiply( light );
	var bottomColor	= baseColor.clone().multiply( shadow );
	// set .vertexColors for each face
	var geometry	= buildingMesh.geometry;		
	for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
		if ( j === 2 ) {
			// set face.vertexColors on root face
			geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
		} else {
			// set face.vertexColors on sides faces
			geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
		}
	}
	// merge it with cityGeometry - very important for performance
	THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
}

// generate the texture
var texture		= new THREE.Texture( generateTexture() );
texture.anisotropy	= renderer.getMaxAnisotropy();
texture.needsUpdate	= true;

// build the mesh
var material	= new THREE.MeshLambertMaterial({
	map		: texture,
	vertexColors	: THREE.VertexColors
});
var cityMesh = new THREE.Mesh(cityGeometry, material );

function generateTexture() {
	// build a small canvas 32x64 and paint it in white
	var canvas	= document.createElement( 'canvas' );
	canvas.width	= 32;
	canvas.height	= 64;
	var context	= canvas.getContext( '2d' );
	// plain it in white
	context.fillStyle	= '#ffffff';
	context.fillRect( 0, 0, 32, 64 );
	// draw the window rows - with a small noise to simulate light variations in each room
	for( var y = 2; y < 64; y += 2 ){
		for( var x = 0; x < 32; x += 2 ){
			var value	= Math.floor( Math.random() * 64 );
			context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
			context.fillRect( x, y, 2, 1 );
		}
	}

	// build a bigger canvas and copy the small one in it
	// This is a trick to upscale the texture without filtering
	var canvas2	= document.createElement( 'canvas' );
	canvas2.width	= 512;
	canvas2.height	= 1024;
	var context	= canvas2.getContext( '2d' );
	// disable smoothing
	context.imageSmoothingEnabled		= false;
	context.webkitImageSmoothingEnabled	= false;
	context.mozImageSmoothingEnabled	= false;
	// then draw the image
	context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
	// return the just built canvas2
	return canvas2;
}
```

## threex.proceduralcity extension

As usual, this code is gathered in easy-to-reuse threex package,
[threex.proceduralcity](https://github.com/jeromeetienne/threex.proceduralcity).
It makes stuff super simple, just create an instance and it will return a ```THREE.Mesh```.

```javascript
var city  = new THREEx.ProceduralCity()
scene.add(city) 
```

The [demo live](http://jeromeetienne.github.io/threex.proceduralcity/examples/demo.html)
contains this city plus a ground, a first person control and a fog.
This is rather cool result for such a small effort.

## Conclusion

So now you know how to generate a whole city in 100 lines.
No download. 
Rather clever algorithm.
I hope you learned from it, 
it contains many tricks that you can reused in your own demos. 

That's all for today! Have fun :)


