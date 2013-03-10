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
// initialiaze everything
init();
// make it move			
animate();



// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.y	= 0;
	camera.position.z	= 300;
	camera.target.position.y= 0;

	// create the Scene
	scene		= new THREE.Scene();

	projector	= new THREE.Projector();
	
	scene.fog	= new THREE.Fog( 0xf0f0f0, 250, 1200 );

	var dirLight	= new THREE.DirectionalLight( 0xffffff, 0.8 );
	dirLight.position.set( 0, 0, 1 );
	dirLight.position.normalize();
	scene.addLight( dirLight );
	
	
	var pointLight	= new THREE.PointLight( 0x8080f0, 1.5 );
	pointLight.position.set( 0, 100, 50 );
	scene.addLight( pointLight );



	//var textGeo	= new THREE.TextGeometry( "Hello");
	//var textMaterial= new THREE.MeshNormalMaterial();
	//var textMesh1	= new THREE.Mesh( textGeo, textMaterial );
	//scene.addChild( textMesh1 );
	
	var addPost	= function(postItem){
		// create the parent Object3D
		var parent	= new THREE.Object3D();
		
		var geometry	= new THREE.TextGeometry(postItem.title, {
			size		: 30,
			height		: 10,
			//font		: "gentilis",
			//font		: "optimer",
			//font		: "helvetiker",
			font		: "droid sans",
			//font		: "droid serif",
			weight		: "bold",
			bezelThickness	: 2,
			bezelSize	: 1.5,
			bezelEnabled	: true
		});
		
		title	= new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0x4040a0 } ) );

		geometry.computeBoundingBox();
		title.position.x	= -0.5 * ( geometry.boundingBox.x[ 1 ] - geometry.boundingBox.x[ 0 ] );
		
		parent.addChild( title );
		
		title._userdata	= {
			type	: "title",
			data	: postItem
		};
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( title ) );


		var geometry	= new THREE.TextGeometry("(+)", {
			size	: 30,
			height	: 10
		});
		comments	= new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x808080 } ) );
		geometry.computeBoundingBox();
		comments.position.x	= -0.5 * ( geometry.boundingBox.x[ 1 ] - geometry.boundingBox.x[ 0 ] );
		comments.position.y	= -50;
		parent.addChild( comments );

		comments._userdata	= {
			type	: "comments",
			data	: postItem
		}
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( comments ) );


		//parent.rotation.y	= 40*Math.PI/180;
		return parent;
	}


	mesh	= addPost({
		title	: "Large-scale Amazon EC2 Outage",
		comments: "http://news.ycombinator.com/item?id=2862566",
		link	: "http://status.aws.amazon.com/"
	})
	scene.addChild(mesh)

/**
 * THREEx.hoverable.js
 * - make an object hoverable
 *   - default to : go blue + underline
 * - make object clickable
*/


/**
 * - TODO find a simple way to complete this one
 * - issue in the visualisation
 *   - would be nice to have something beautifull
 *   - i dunno what to do at the moment
 *   - ok sure so find something simple which does the job
 * - simple visualisation
 *   - a function to clear the screen
 *   - a function to load the text from hn
 *   - the data are just happended to a big plan one topic below the other
 * - about putting the + on the right of the title
 *   - use the bounding box of both Mesh
 *   - the right of the title is the same as the right of the +
 *   - same principle for the appending the topic one below the others
 * - about organizing the clicability
 *   - about hover, use tempp javascript object like collision example
 *   - _actastag = {a : { href:"http://dsdfs", target: "dd"}}
 * - see about timeline.js
 *   - is that suitable for some this animation ?
 *   - what about a carefully crafted tween.js
 *   - tween.js would be so much more three.js mood
*/

	

if(false){
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Fnews.ycombinator.com%2Frss'&format=json&diagnostics=false&callback=?";
	jQuery.getJSON(url, function(json){
		var items	= json.query.results.item;
		var item	= items[0]
		console.log("data", json);
	});	
}

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	container.onmousemove	= onDocumentMouseMove;
	container.onclick	= onDocumentClick;
	
(function(){
	var update	= function(){
		mesh.position.y = position.y;
	}

	var position	= {y: 450};
	var tween = new TWEEN.Tween(position)
		.to({y: 0}, 3000)
		.easing(TWEEN.Easing.Elastic.EaseInOut)
		.onUpdate(update);

	var tweenBack = new TWEEN.Tween(position)
		.to({y: 450}, 2000)
		.delay(1000)
		.easing(TWEEN.Easing.Elastic.EaseInOut)
		.onUpdate(update);

	tween.chain(tweenBack);
	tweenBack.chain(tween);
	
	tween.start();
})();

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

	var vector	= new THREE.Vector3( mouseX, mouseY, 0.5 );
	projector.unprojectVector( vector, camera );
	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var collided	= THREE.Collisions.rayCastNearest( ray );

	if( collided ){
		console.log("collide", collided.mesh._userdata)
		var userdata	= collided.mesh._userdata;
		if( userdata.type === 'title' )
			var url	= userdata.data.link;
		else if( userdata.type === 'comments' )
			var url	= userdata.data.comments;
		else	console.assert(false);
		window.open(url);
	} else {
		console.log("not collide")
	}
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
	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );
	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var collided	= THREE.Collisions.rayCastNearest( ray );

	title.materials[0].color.setHex( 0x003300 );
	comments.materials[0].color.setHex( 0x003300 );

	if( collided ){
		document.body.style.cursor	= 'pointer';
		collided.mesh.materials[0].color.setHex( 0x000033 );
	}else{
		document.body.style.cursor	= '';
	}

	// animate the mesh
	//mesh.rotation.x += 0.02;
	//mesh.rotation.y += 0.0125;
	//mesh.rotation.z += 0.0175;

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}


// TODO remove it from here
var info	= THREEx.glCapability( renderer.getContext() );
console.dir(info)
