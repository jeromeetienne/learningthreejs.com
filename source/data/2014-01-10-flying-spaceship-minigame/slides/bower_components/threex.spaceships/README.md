threex.spaceships
===================

It is a 
[threex](http://jeromeetienne.github.io/threex/) extension 
for 
[three.js](http://threejs.org)
to easily display a bunch of spaceships models.
It contains 3 space fighters and 2 shuttles.
The spaceships got the ability to shoot.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.spaceships/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.spaceships/blob/master/examples/basic.html)\] :
It shows the available spaceships.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.spaceships.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.spaceships
```

How To Use It
=============

When you want to load the ```SpaceFighter01```, just do

```javascript
THREEx.SpaceShips.loadSpaceFighter01(function(object3d){
	// object3d is the loaded spacefighter
	// now we add it to the scene
	scene.add(object3d)
})
```

It is the same for ```SpaceFighter02```, just do

```javascript
THREEx.SpaceShips.loadSpaceFighter02(function(object3d){
	scene.add(object3d)
})
```

You get the idea. here is how to add ```SpaceFighter03```, ```Shuttle01```
and ```Shuttle02```.

```javascript
THREEx.SpaceShips.loadSpaceFighter03(function(object3d){
	scene.add(object3d)
})
THREEx.SpaceShips.loadShuttle01(function(object3d){
	scene.add(object3d)
})
THREEx.SpaceShips.loadShuttle02(function(object3d){
	scene.add(object3d)
})
```

Now suppose you want a ```SpaceFighter01``` 
which shoots, do the following.

```javascript
THREEx.SpaceShips.loadSpaceFighter03(function(object3d){
	var spaceship	= object3d
	scene.add(spaceship)

	// the right shoot
	var shoot	= new THREEx.SpaceShips.Shoot()
	shoot.position.x= 0.5
	shoot.position.z= 0.3
	scene.add(shoot)

	// the left shoot
	var shoot	= new THREEx.SpaceShips.Shoot()
	shoot.position.x=-0.5
	shoot.position.z= 0.3
	scene.add(shoot)

	// the right detonation effect
	var detonation	= new THREEx.SpaceShips.Detonation()
	detonation.position.x= 0.5
	detonation.position.z= 0.1
	scene.add(detonation)

	// the left detonation effect
	var detonation	= new THREEx.SpaceShips.Detonation()
	detonation.position.x=-0.5
	detonation.position.z= 0.1
	scene.add(detonation)
})
```

Possible Improvements
=====================
* add a trail behind the ships and/or their shoots
  * how to do a trail
  * you get a geometry depending on the trail
    * single plane
      * single plane with a lot of segments for details
    * multiple intersecting planes
    * a cylinder
  * how to make it move to appear as it follows the emitter object
  * this is a trail so there is a moving object which emit this trail
  * the moving object will need to push new coordinates to the trail
  * update the trails based on emitter object 
    * the coordinates are likely in world axis
    * a quaternion for trail's orientation based on the velocity of emitter object









