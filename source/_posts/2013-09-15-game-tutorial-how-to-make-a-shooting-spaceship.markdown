---
layout: post
title: "Game Tutorial: How To Make a Shooting SpaceShip"
date: 2013-09-15 12:27
comments: true
published: false
categories: 
---


## How to load a space ship

* We gonna learn how to load a model. 
* Where to get a model
* how to export a model

```javascript
// create the loader object - pick the one fitting the file format
var loader	= new THREE.OBJMTLLoader();
// warn me when the model is loaded
loader.addEventListener('load', function( event ){
	// once the model is loaded, add it to our scene
	var object3d	= event.content
	scene.add(object3d)
});
// setup the model urls
var objUrl	= 'models/SpaceFighter01/SpaceFighter01.obj';
var mtlUrl	= 'models/SpaceFighter01/SpaceFighter01.mtl';
// start loading the model
loader.load(objUrl, mtlUrl);		
```

## How to make photon missile
* link to light demo how to 
  ["behind-scenes"](http://www.netmagazine.com/features/behind-scenes-lights-latest-webgl-sensation)
  for 
  [lights](http://lights.elliegoulding.com/)
  by
  [Ellie Goulding](http://en.wikipedia.org/wiki/Ellie_Goulding)
* make screenshoot to understand it

## How to make the detonation flash
* when your space ship shoots a photon missile, there is a detonation
* For that we gonna use an asset from three.js distribution
* this is only a three.plane



# Meta
# Meta
# Meta

############################################################################## Meta
############################################################################## Meta


## How to animate space ships in webgl
* user input
* timer in physics
* photon missile 
  * emittion rate
  * translation
  * attached to world
  * parent of a point light
* detonation
  * point light 
  * detonation Plane with tween.js for animation

## How to include sounds in your space ship
* use webaudiox.js
* add detonation sound
  * localisation of the sound
* add spaceship reactor sound
  * granular sound
* add a electric field sound to each photon missle