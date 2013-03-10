var container, stats, containerObj;
var camera, scene, renderer, particle;
var sprite;
var mouseX = 0, mouseY = 0;
var particleSys;

init();
animate();

/**
 * Build ui with Data.GUI
*/
function buildGui(parameters, callback)
{
	var gui = new DAT.GUI({
		height	: 4 * 32 - 1
	});

	// FIXME disabled because i failed to make the number of points to change
	// - ask mr doob
	//gui.add(parameters, 'iterations').name('Iterations').min(1000).max(12000).step(1)
	//	.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'interval').name('Interval').min(0.001).max(0.1)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'a').name('Sigma').min(1).max(30)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'b').name('Rho').min(1).max(30)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'c').name('Beta').min(0.01).max(3)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
}

function buildObjectParticlesWebgl(nParticles)
{
	// create the particule system if needed
	if( !particleSys ){
		var geometry	= new THREE.Geometry();
		geometry.colors = [];			
		var material	= new THREE.ParticleBasicMaterial({
			map		: THREE.ImageUtils.loadTexture( "lensFlare/Flare1.png" ),
			//map		: THREE.ImageUtils.loadTexture( "ball.png" ),
			vertexColors	: true,
			size		: 16,
			blending	: THREE.AdditiveBlending,
			transparent	: true
		});
		material.color.setRGB( 0.2, 1.0, 0.7 );
		particleSys	= new THREE.ParticleSystem( geometry, material );
		particleSys.sortParticles = true;
		//particleSys.dynamic = true;
		containerObj.addChild( particleSys );
	}

	var geometry	= containerObj.children[0].geometry;
	var particles	= [];
	if( nParticles < geometry.vertices.length ){
		// remove particles if needed
		while( particles.length != nParticles ){
			// remove a particle from the particles
			var particle	= particles.pop();
			// detach it from the Object3D containerObj
			containerObj.removeChild(particle)
		}
	}else if( nParticles > geometry.vertices.length ){
		// add particles if needed
		var toAdd	= nParticles - geometry.vertices.length;
		for(var i = 0; i < toAdd; i++){
			geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( 0,0,0 ) ) );
			geometry.colors.push( new THREE.Color( 0xffffff ) );
		}

		particleSys.geometry.__dirtyVertices = true;
		particleSys.updateMatrix();
	}
	console.assert( nParticles === geometry.vertices.length );
	console.assert( nParticles === geometry.colors.length );
}

function cpuDotLorentz(parameters)
{
	// sanity check
	console.assert( 'iterations' in parameters )
	console.assert( 'a' in parameters )
	console.assert( 'b' in parameters )
	console.assert( 'c' in parameters )
	console.assert( 'interval' in parameters )

	buildObjectParticlesWebgl(parameters.iterations)

console.log("containerObj", containerObj, containerObj.children[0].geometry);

	a	= parameters.a;
	b	= parameters.b;
	c	= parameters.c;
	interval= parameters.interval;

	// initial value
	var x	= 0.1;
	var y	= 0.1;
	var z	= 0.1;
	var scale	= 15;
	// go thru each particle
	for(var i = 0; i < parameters.iterations; i++){
		// compute lorentz delata
		var dx	= (y - x) * a;
		var dy	= (b - z) * x - y;
		var dz	=  x*y - c*z;
		// goto next coord
		x	+= dx * interval;
		y	+= dy * interval;
		z	+= dz * interval;
		// get the coord for this particle
		var vertex	= containerObj.children[0].geometry.vertices[i];
 		vertex.position.x = x*scale;
		vertex.position.y = y*scale;
		vertex.position.z = (z-b)*scale;		
	}
	
(function(){
	var geometry	= containerObj.children[0].geometry;
	var vertices	= geometry.vertices;
	geometry.computeBoundingBox();
	
	var rangeX = (geometry.boundingBox.x[1] - geometry.boundingBox.x[0]);
	var rangeY = (geometry.boundingBox.y[1] - geometry.boundingBox.y[0]);
	var rangeZ = (geometry.boundingBox.z[1] - geometry.boundingBox.z[0]);
	
	for(var i = 0; i < parameters.iterations; i++){
		geometry.colors[i].setHSV(
			Math.pow(0.09	, Math.abs(vertices[i].position.x / rangeX)) 	* 0.8,
			Math.pow(0.002	, Math.abs(vertices[i].position.y / rangeY)) 	* 0.7,
			Math.pow(0.05	, Math.abs(vertices[i].position.z / rangeZ))	* 0.6
		);
	}
})();
    

	//particleSys.geometry.__dirtyNormals	= true;
	//particleSys.geometry.computeFaceNormals();
	//
	particleSys.geometry.__dirtyVertices	= true;
	//particleSys.geometry.computeVertexNormals();
	//
	//particleSys.geometry.computeCentroids();
	//
	//particleSys.geometry.computeBoundingBox();
	//
	//particleSys.geometry.computeBoundingSphere();
	particleSys.updateMatrix();
return
	/**
	 * say value is between 0 and 1
	 * - if v < 0.5, then f(x) = x
	 * - if v >= 0.5, then f(x)= 1.0 - x
	*/
	var f = function(v){
		v	= v % 1.0;
		if( v < 0.5 )	return v*2;
		return (1.0 - v) * 2;
	}

	// go thru each particle
	for(var i = 0; i < particles.length; i++){
		var particle	= particles[i];
		particle.materials[0].color.setHSV(f(i/130)*0.5+0.5, 0.5, f(i/50)*0.7+0.3)
	}
}

function init()
{
	// detect if webgl is needed and available
	if( !Detector.webgl ) Detector.addGetWebGLMessage();
	
	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z = 400;
	
	// build the scene
	scene = new THREE.Scene();

	// define the containerObj of all the particle
	containerObj	= new THREE.Object3D();
	scene.addChild(containerObj)

/**
 * Use blending to make the color cooler good with webgl
*/
	
	// maybe replace that by window... or something
	var parameters = {
		iterations	: 9000,
		interval	: 0.012,
		//iterations	: 2500,
		//interval	: 0.02,
		a		: 5,
		b		: 15,
		c		: 1
	};

	// compute the position of the particles
	cpuDotLorentz(parameters);
	// build the GUI 
	buildGui(parameters, function(){
		console.log("parameters", JSON.stringify(parameters, null, '\t'))
		cpuDotLorentz(parameters);
	});


	// init the renderer
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true		
	});
	//renderer.sortObjects = true;
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// init the Stats
	stats	= new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.top	= '0px';
	container.appendChild( stats.domElement );

	// listen to mousemove to animate the scene
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

/**
 * Experimentation with toDataUrl on the 
*/
if(false){
	jQuery('body').click(function(){
		THREEx.Screenshot.resizeTo(THREEx.Screenshot.toDataURL(renderer), 320, 240, function(imgUrl, error){
			// put it on the DOM for debug
			//jQuery('<img>').attr('src', imgUrl).css({
			//	position:	'absolute',
			//	top:		'0px',
			//	right:		'0px'
			//}).appendTo('body');
			window.location = imgUrl;
			//window.open(imgUrl, '_target')
			//window.open(imgUrl, "super", "height=200, width=200");
		});
	});
}

/**
 * Experimentation with dropping image 
*/
if(false){
	document.addEventListener("drop", function(event){
		event.preventDefault();
		console.log("DROPPED", event.dataTransfer.files.length)
		for(var i = 0;i < event.dataTransfer.files.length; i ++){
			var file	= event.dataTransfer.files[i];
			//console.log("file", file)
			reader = new FileReader();
			reader.onload = function (event) {
				var imgUrl	= event.target.result;
				// put it on the DOM for debug
				jQuery('<img>').attr('src', imgUrl).css({
					position:	'absolute',
					top:		'0px',
					right:		'0px'
				}).appendTo('body');
				//window.open(imgUrl, "super", "height=200, width=200");
			};
			reader.readAsDataURL(file);
		}
	}, true);
	// no idea why this one is needed
	// - without it the image replace the current page
	document.addEventListener("dragover", function(event) {
		event.preventDefault();
	}, true);
}

}

//

function onDocumentMouseMove(event)
{
	mouseX = event.clientX - window.innerWidth / 2;
	mouseY = event.clientY - window.innerHeight / 2;
}


//
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}

function render()
{
	// move the camera
	if( false ){		
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
	}
	// animate the cube
	if( true ){
		containerObj.rotation.x += 0.4*0.02;
		containerObj.rotation.y += 0.4*0.0225;
		containerObj.rotation.z += 0.4*0.0175;		
	}

	// actually render the scene
	renderer.render( scene, camera );
}
