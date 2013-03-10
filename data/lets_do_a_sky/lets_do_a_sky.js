// This source is the javascript needed to build a sky box in **three.js**
// It is the source about this [blog post](/blog/2011/08/15/lets-do-a-sky/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var skyboxMesh;

// ## bootstrap functions
// initialiaze everything
init();
// make it move			
animate();

// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 100000 );

	// create the Scene
	scene = new THREE.Scene();
	
	// ## Begining of the Skybox Code
	
	// load the cube textures
	var urlPrefix	= "images/Bridge2/";
	var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
			urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
			urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	
	// init the cube shadder
	var shader	= THREE.ShaderUtils.lib["cube"];
	var uniforms	= THREE.UniformsUtils.clone( shader.uniforms );
	uniforms['tCube'].texture= textureCube;
	var material = new THREE.MeshShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms
	});

	// build the skybox Mesh
	skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );
	// add it to the scene
	scene.addObject( skyboxMesh );

	// ## End of the Skybox Code

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
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
}


// ## Render the 3D Scene
function render() {
	// move the camera based on a timer
	var timer = - new Date().getTime() * 0.0002; 
	camera.position.x = 1000 * Math.cos( timer );
	camera.position.z = 1000 * Math.sin( timer );
 

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
