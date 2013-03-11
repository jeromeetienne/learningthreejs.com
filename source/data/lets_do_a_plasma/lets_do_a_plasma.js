// This source is the javascript needed to build a simple moving
// planeMesh in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/r44/examples/canvas_geometry_planeMesh.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var planeMesh;

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
// initialiaze everything
init();
// make it move			
animate();


/**
 * Build ui with Data.GUI
*/
function buildGui(options, callback)
{
	var gui = new DAT.GUI({
		height	: 7 * 32 - 1
	});

	gui.add(options, 'speed').min(0).max(10)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c0').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c1').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c2').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c3').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c4').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c5').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
}

// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera	= new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z	= 45;
	//camera.position.z	= 200;

	// create the Scene
	scene	= new THREE.Scene();

	// build the GUI 
	buildGui(userOpts, function(){
		//console.log("userOpts", JSON.stringify(userOpts, null, '\t'))
	});
	
	// create the material
	var material	= new THREE.MeshShaderMaterial({
		vertexShader	: THREEx.ShaderLib['plasma'].vertexShader,
		fragmentShader	: THREEx.ShaderLib['plasma'].fragmentShader,
		uniforms	: THREEx.UniformsLib['plasma']
	});
	//var material	= new THREE.MeshShaderMaterial({
	//	vertexShader	: THREEx.ShaderLib['cel'].vertexShader,
	//	fragmentShader	: THREEx.ShaderLib['cel'].fragmentShader,
	//	uniforms	: THREEx.UniformsLib['cel']
	//});

	//var material	= new THREE.MeshNormalMaterial();
	//var material	= new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );

	//var geometry	= new THREE.CubeGeometry( 100*4/3, 100, 100 );
	var geometry	= new THREE.PlaneGeometry( 100*4/3, 100 );
	//var geometry	= new THREE.TorusGeometry( 50, 20, 45, 45 );
	//var geometry	= new THREE.SphereGeometry( 50, 25, 25 );
	
// TODO make a plan facing camera instead
	// create the Mesh
	planeMesh	= new THREE.Mesh( geometry, material );
	
	// add the object to the scene
	scene.addObject( planeMesh );

	// create the container element
	container	= document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	// init the Stats and append it to the Dom - performance vuemeter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top	= '0px';
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

/**
 * @param {Object} uniforms the uniforms of the shader
*/
function animatePlasma(uniforms)
{
	var seconds		= (Date.now() - startTime) / 1000;

	uniforms.time.value	= seconds * userOpts.speed;
	uniforms.rotation.value	= Math.sin(seconds/10)*Math.PI;
	uniforms.scale.value	= 0.4 - 0.2*Math.sin(seconds);
	uniforms.opacity.value	= 1.0;

	uniforms.c0.value	= userOpts.c0;	
	uniforms.c1.value	= userOpts.c1;	
	uniforms.c2.value	= userOpts.c2;	
	uniforms.c3.value	= userOpts.c3;	
	uniforms.c4.value	= userOpts.c4;	
	uniforms.c5.value	= userOpts.c5;
	
	console.log("uniforms", uniforms.time.value)
}

// ## Render the 3D Scene
function render(){
	// to animate the plasma
	animatePlasma(planeMesh.materials[0].uniforms);
		
	// animate the planeMesh
	if( false ){
		planeMesh.rotation.x += 0.005/2.5;
		planeMesh.rotation.y += 0.0125/2.5;
		planeMesh.rotation.z += 0.0085/2.5;
	}
	// make the planeMesh bounce
	if( false ){
		var dtime	= Date.now() - startTime;
		planeMesh.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);		
	}
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
