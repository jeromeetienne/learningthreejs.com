// This source is the javascript needed to build a simple moving
// mesh in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/r44/examples/canvas_geometry_mesh.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var mesh, meshClouds;

// maybe replace that by window... or something
var userOpts	= {
	speed		: 4.0,
	c0		: 5.0,
	c1		: 3.0,
	c2		: 6.0,
	c3		: 7.0,
	c4		: 5.0,
	c5		: 3.0
};

// ## bootstrap functions
if ( !Detector.webgl ){
	Detector.addGetWebGLMessage();
}else{
	// initialiaze everything
	init();
	// make it move			
	animate();	
}


// ## Initialize everything
function init() {

	// create the camera
	camera	= new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z	= 80;
	camera.position.z	= 200;

	// create the Scene
	scene	= new THREE.Scene();


	var ambientLight= new THREE.AmbientLight( 0xaaaaaa, 1.0 );
	scene.addLight( ambientLight );

	var dirLight	= new THREE.DirectionalLight( 0xaaaaaa, 1.0 );
	dirLight.position.set( -2, 1, 1 ).normalize();
	scene.addLight( dirLight );
		
	var dirLight	= new THREE.DirectionalLight( 0x448800, 0.5 );
	dirLight.position.set( 2, -1, -1 ).normalize();
	scene.addLight( dirLight );
		

	var material	= new THREE.MeshNormalMaterial();
	var material	= new THREE.MeshPhongMaterial( {
		//opacity		: 0.5,
		//transparent	: false,
		//shininess	: 100.0,
		color		: 0xFFFFFF,
		ambient		: 0x222222,
		specular	: 0xFF6600,
		//specular	: 0x221100,
		//wireframe		: true,
		//wireframeLinewidth	: 10,
		map		: THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" ),
		//lightMap	: THREE.ImageUtils.loadTexture( "images/earth_normal_2048.jpg" ),
		//lightMap	: THREE.ImageUtils.loadTexture( "images/earth_specular_2048.jpg" ),
	});
	//var material	= new THREE.MeshLambertMaterial( { color: 0xAA8822 } );

	var material	= [];
	material.push(new THREE.MeshPhongMaterial( { specular: 0xFF8800, color: 0x000, shininess: 500}) );
	material.push(new THREE.MeshLambertMaterial({
		map 	: THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" ),
		//color	: 0x111111,
		ambient	: 0x888888,
		opacity	: 0.5
	}));
	//material.push( new THREE.MeshLambertMaterial( { color: 0xAA8822, opacity: 0.2 }) );
	//material.push( new THREE.MeshLambertMaterial( { color: 0xAA8822 } ) );
	//material.push( new THREE.MeshBasicMaterial( { color: 0xAA8822, wireframe: true } ) );

	var material	= MaterialEarthMapping.buildHearthMaterial();



(function(){
	var path = "images/SwedishRoyalCastle/";var format = '.jpg';
	//var path = "images/skybox/";		var format = '.jpg';
	//var path = "images/pisa/";		var format = '.png';
	var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];

	var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
	var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );

	//var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );
	//var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
	var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0x408820, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.5, opacity : 0.4 } );
	var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00, envMap: refractionCube, refractionRatio: 0.95 } );
	var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } )

	var cubeMaterial0	= new THREE.MeshPhongMaterial({
		//color		: 0xffffff,
		color		: 0x88FF88,
		ambient		: 0x44FF44,
		specular	: 0xFF4040,
		shininess	: 1000,
		envMap		: refractionCube,
		//combine		: THREE.MixOperation,
		combine		: THREE.MultiplyOperation,
		reflectivity	: 0.7,
		refractionRatio	: 0.95,
		//opacity		: 0.2
	});

	material	= cubeMaterial0;


(function(){
	// init the cube shadder
	var shader	= THREE.ShaderUtils.lib["cube"];
	shader.uniforms["tCube"].texture = reflectionCube;

	var material = new THREE.MeshShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms
	});

	// build the skybox Mesh
	skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 10000, 10000, 10000, 1, 1, 1, null, true ), material );
	// add it to the scene
	scene.addObject( skyboxMesh );
})()
	
})();


	var geometry	= new THREE.CubeGeometry( 100, 100, 100 );
	//var geometry	= new THREE.TorusGeometry( 50, 20, 45, 45 );
	//var geometry	= new THREE.SphereGeometry( 50, 50, 50 );
	var geometry	= new THREE.SphereGeometry( 80, 50, 50 );
	geometry.computeTangents();
	
	// center the geometry
	// is that still needed ? it was to fix text
	THREEx.GeometryUtils.center(geometry);
	
	// wobble preparation
	THREEx.GeometryWobble.init(geometry);
	THREEx.GeometryWobble.cpuAxis(geometry, 'x', 0.025);
	
	// add wireframe
	//material	= [material, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } )]; 
	
	// create the Mesh
	mesh	= new THREE.Mesh( geometry, material );
	
	// add the object to the scene
	scene.addObject( mesh );
/**
 * use this as a base for crazy-wold and "gello drop losts in stratosphere"
 * -----------------------------------
 * - material of the subject
 * - cubemap or not
 * - animation
 * - user control
*/


	// build the coulds
	if( false ){
		meshClouds	= MaterialEarthMapping.buildCloudMesh(50);
		scene.addObject( meshClouds );
	}

	// create the container element
	container	= document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		//preserveDrawingBuffer	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	// call THREEx.WindowResize
	THREEx.WindowResize(renderer, camera);
	
	// init the Stats and append it to the Dom - performance vuemeter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}

// ## Animate and Display the Scene
function animate() {
	// render the 3D scene
	render();
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
	// update the stats
	stats.update();
	// update the tweens from TWEEN library
	TWEEN.update();
}

var tweenForward, tweenBackward;
// ## Render the 3D Scene
function render(){
	
	// subject animation
	subjectAnimation();


(function(){
	// move the camera based on a timer
	var timer	= - new Date().getTime() / 1000 * Math.PI;
	var angle	= timer/5;
	//angle		= Math.PI/3;
	camera.position.x = 200 * Math.cos( angle );
	camera.position.z = 200 * Math.sin( angle );
})()

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
