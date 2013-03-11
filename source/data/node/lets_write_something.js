// This source is the javascript needed to build a simple moving
// cube in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/r44/examples/canvas_geometry_cube.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var cube;
var projector;

var mouse = { x: 0, y: 0 }

// ## bootstrap functions
// test if webgl is supported
if( ! Detector.webgl ){
	Detector.addGetWebGLMessage();
}else{
	// initialiaze everything
	init();
	// make it move			
	animate();
}


// ## Initialize everything
function init() {

	buildNodeBackground();
	
	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.y	= 0;
	camera.position.z	= 600;
	camera.target.position.y= 0;

	// create the Scene
	scene		= new THREE.Scene();

	projector	= new THREE.Projector();
	
	scene.fog	= new THREE.Fog( 0xf0f0f0, 250, 1200 );

	var dirLight	= new THREE.DirectionalLight( 0xffffff, 0.8 );
	dirLight.position.set( 0, 0, 1 ).normalize();
	scene.addLight( dirLight );
		
	var pointLight	= new THREE.PointLight( 0x8080f0, 1.5 );
	pointLight.position.set( 0, 100, 50 );
	scene.addLight( pointLight );



(function(){
	triangleMesh	= buildNodeLogo();
	triangleMesh.position.z	= 300;
	scene.addChild( triangleMesh );
}())

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	container.onmousemove	= onDocumentMouseMove;
	
	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	
	// init the Stats and append it to the Dom - performance vuemeter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}

function onDocumentMouseMove( event ){
	event.preventDefault();
	mouse.x	= ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y	= - ( event.clientY / window.innerHeight ) * 2 + 1;
};

function onDocumentClick( event ){
	event.preventDefault();
	
	var mouseX	= (event.clientX / window.innerWidth) * 2 - 1;
	var mouseY	= -(event.clientY / window.innerHeight) * 2 + 1;
};

// ## Animate and Display the Scene
function animate() {
	// render the 3D scene
	render();

	// update the tweens
	TWEEN.update();
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
	
	// update the stats
	stats.update();
}


// ## Render the 3D Scene
function render()
{
	// make the animation
	triangleMesh.rotation.x += 2 * Math.PI/180;
	//triangleMesh.rotation.y += 2 * Math.PI/180;
	//triangleMesh.rotation.z += 2 * Math.PI/180;

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
