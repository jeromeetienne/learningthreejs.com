# Which content
* a mini game called 'flying spaceship'
* all in browser
* three.js to get 3d
* webaudio api to get sound

# presentation
* we will code this game
* TODO put metrics of the final game



# Step 1 - lets install three.js boilerplate

```
mkdir flyingspaceship
cd flyingspaceship
yo threejs-boilerplate
make server
# goto http://127.0.0.1
```

# Step 2 - add spaceships

```
bower install threex.spaceships
```

```
require([ 'bower_components/threex.spaceships/package.require.js'
	, 'bower_components/threex.spaceships/examples/vendor/three.js/examples/js/loaders/OBJMTLLoader.js'
	, 'bower_components/threex.spaceships/examples/vendor/three.js/examples/js/loaders/OBJLoader.js'
	, 'bower_components/threex.spaceships/examples/vendor/three.js/examples/js/loaders/MTLLoader.js'
    	], function(){
    // ...     
});
```

```
THREEx.SpaceShips.loadSpaceFighter03(function(object3d){
	scene.add(object3d)
})
```

# step 6 - move spaceship with keyboard

```
bower install threex.keyboardstate
```

```
require([ 'bower_components/threex.keyboardstate/package.require.js'
    ], function(){
    // ...     
});
```

basic usage
```
    var keyboard  = new THREEx.KeyboardState();
    if( keyboard.pressed("shift+H") ){
        console.log('you are pressing shift and H')
    }
```

```
	var keyboard	= new THREEx.KeyboardState();
	updateFcts.push(function(delta, now){
		// only if the spaceship is loaded
		if( spaceship === null )	return;
		// set the speed
		var speed	= 1;
		// only if spaceships is loaded
		if( keyboard.pressed('down') ){
			spaceship.position.y	-= speed * delta;
		}else if( keyboard.pressed('up') ){
			spaceship.position.y	+= speed * delta;
		}
	})
```

# Step 4 - add planets


```
bower install threex.planets
```

```
require([ 'bower_components/threex.planets/package.require.js'
    ], function(){
    // ...     
});
```

```
var moonMesh	= THREEx.Planets.createMoon()
moonMesh.scale.multiplyScalar(0.5)
scene.add(moonMesh)
```

# step 3 - add Stars

```
	var geometry	= new THREE.SphereGeometry(90, 32, 32)
	var material	= new THREE.MeshBasicMaterial({
		map	: THREE.ImageUtils.loadTexture('bower_components/threex.planets/examples/images/galaxy_starfield.png'),
		side	: THREE.BackSide
	})
	var starSphere	= new THREE.Mesh(geometry, material)
	scene.add(starSphere)
```

# Step 5 - move planets

```
	function resetMoon(){
		moonMesh.position.x	= 5
		moonMesh.position.x	+= 5 * (Math.random()-0.5)
		moonMesh.position.y	= 2 * (Math.random()-0.5)		
	}
	resetMoon()
```

```	
	updateFcts.push(function(delta, now){
		// move the moon to the left
		moonMesh.position.x	+= -1 * delta;
		// make it warp
		if( moonMesh.position.x < -3 )	resetMoon()
	})
```

# step 7 - collision between planets and spaceship

```
	updateFcts.push(function(delta, now){
		// only if the spaceship is loaded
		if( spaceship === null )	return
		// compute distance between spaceship and the moon
		var distance	= moonMesh.position.distanceTo(spaceship.position)
		if( distance < 0.3 ){
			resetMoon()
		}
	})
```

# step 8 - add explosions sounds

Init Web Audio

```
	var context	= new AudioContext()
	var lineOut	= new WebAudiox.LineOut(context)
	lineOut.volume	= 0.2
```

Load Sound

```
	var soundBuffer;
	// load the sound
	var soundUrl	= 'sounds/102720__sarge4267__explosion.wav'
	WebAudiox.loadBuffer(context, soundUrl, function(buffer){
		soundBuffer	= buffer
	})
```

Function to play

```
	// setup a play function
	function playExplosionSound(){
		if( !soundBuffer )	return
		var source	= context.createBufferSource()
		source.buffer	= soundBuffer
		source.connect(lineOut.destination)
		source.start(0)
		return source
	}
```

Play Sound on contact

```
		var distance	= moonMesh.position.distanceTo(spaceship.position)
		if( distance < 0.3 ){
			resetMoon()
			playExplosionSound()
		}
```

# done