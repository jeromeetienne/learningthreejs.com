function buildPilarObject()
{
	var geometry	= new THREE.TorusGeometry( 1, 0.42 );
	//var geometry	= new THREE.CubeGeometry( 0.2, 2, 0.2 );
	var geometry	= new THREE.CylinderGeometry(0.05,0.4, 2.5, 16)
	var material	= new THREE.MeshLambertMaterial({
		color	: 0xff88AA,
		shading	: THREE.SmoothShading,
		map	: THREE.ImageUtils.loadTexture( "images/water.jpg" )
	});
	material.ambient = material.color;
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.castShadow		= true;
	//mesh.receiveShadow	= false;
	mesh.position.y		= 2.5/2;
	return mesh;
}

function buildHedgeObject()
{
	var group	= new THREE.Object3D();
	var radius	= 4.5;
	var scale	= 1/4;

	var width	= 4*scale;
	var height	= 9*scale;
	var depth	= 1*scale;
	var geometry	= new THREE.CubeGeometry( width, height, depth );
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0xffaaaa,
		shading	: THREE.SmoothShading,
		//map	: THREE.ImageUtils.loadTexture( "images/water.jpg" ),
		map	: THREE.ImageUtils.loadTexture( "images/textures/MarbleBeige0028_5_thumbhuge.jpg" ),
		//map	: THREE.ImageUtils.loadTexture( "images/textures/MarbleGreen0001_39_thumbhuge.jpg" ),
		//map	: THREE.ImageUtils.loadTexture( "images/textures/MarbleTiles0058_5_thumbhuge.jpg" ),
		//map	: THREE.ImageUtils.loadTexture( "images/textures/TilesOrnate0010_2_thumbhuge.jpg" ),
	});
	for( angle = 0; angle < 2*Math.PI; angle += 2*Math.PI/8 ){
		var offsetAngle	= Math.PI/7;
		var mesh	= new THREE.Mesh( geometry, material );
		mesh.position.x	= Math.cos(angle + offsetAngle)*radius;
		mesh.position.y	= +height/2;
		mesh.position.z	= Math.sin(angle + offsetAngle)*radius;
		mesh.rotation.y	= Math.PI/2 - (angle + offsetAngle);
		mesh.castShadow	= true;
		group.add(mesh);
	}
	return group;
}

function buildSunDialObject(){
	sundial	= new THREE.Object3D();
	scene.add(sundial);

	// pilard
	if( true ){
		var mesh	= buildPilarObject();
		sundial.add( mesh );
		
		var mesh	= buildHedgeObject();
		sundial.add( mesh );
	}


	// stone
	if( true ){
		var geometry	= new THREE.CubeGeometry( 5, 0.5, 5 );
		var geometry	= new THREE.PlaneGeometry(10, 10 );
		//var geometry	= new THREE.CubeGeometry( 10, 0.5, 10 );
		var material	= new THREE.MeshLambertMaterial({
			color	: 0xaaaaaa,
			shading	: THREE.SmoothShading,
			map	: buildSunDialTexture()
			//map	: THREE.ImageUtils.loadTexture( "images/water.jpg" )
		});
		material.ambient = material.color;
		var mesh	= new THREE.Mesh( geometry, material );
		mesh.receiveShadow	= true;
		mesh.rotation.x		= 3*Math.PI/2;
		mesh.rotation.z		= 7.5*Math.PI/6;
		//mesh.rotation.y		= 7.5*Math.PI/6;
		sundial.add( mesh );			


		var pyramid	= buildPyramid();
		sundial.add( pyramid );
		
		if( false ){
			var offsetY	= -0.01;
			var material	= new THREE.MeshLambertMaterial({
				color	: 0xaa8888,
				shading	: THREE.SmoothShading,
				map	: THREE.ImageUtils.loadTexture( "images/water.jpg" )
			});
			for(var i = 0; i < 5; i++){
				var cubeW	= 5 * (i*0.5+1);
				var cubeH	= Math.pow(2, i);
				if( i === 0 )	var geometry	= new THREE.CubeGeometry( cubeW, cubeH, cubeW );
				else		var geometry	= new THREE.CylinderGeometry(cubeW/2, cubeW/2, cubeH, 16)
				var mesh	= new THREE.Mesh( geometry, material );
				offsetY	-= cubeH/2;
				mesh.position.y		= offsetY
				mesh.rotation.y		= 7.5*Math.PI/6;
				sundial.add( mesh );
			}					
		}
	}
	// Grass
	if( false ){
		var geometry	= new THREE.CubeGeometry( 200, 1, 200 );
		var texture	= THREE.ImageUtils.loadTexture( "images/water.jpg" );
		texture.repeat.set(5,5);
		texture.wrapS	= THREE.RepeatWrapping;
		texture.wrapT	= THREE.RepeatWrapping;
		var material	= new THREE.MeshLambertMaterial({
			color	: 0xaaFF88,
			shading	: THREE.SmoothShading,
			map	: texture
		});
		material.ambient = material.color;
		var mesh	= new THREE.Mesh( geometry, material );
		mesh.castShadow		= true;
		mesh.receiveShadow	= true;
		mesh.position.y		= -0.1 - 1/2;
		sundial.add( mesh );			
	}
}

function buildPyramid()
{
	var pyramidH	= 500;
	var texture	= THREE.ImageUtils.loadTexture( "images/water.jpg" );
	texture.repeat.set(50,50);
	texture.wrapS	= THREE.RepeatWrapping;
	texture.wrapT	= THREE.RepeatWrapping;
	var width	= 10/2;
	var geometry	= new THREE.CylinderGeometry(Math.sqrt(width*width+width*width), 500/2, pyramidH, 4)
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x404040,
		color	: 0x444444,
		//shading	: THREE.SmoothShading,
		//map	: texture
	});
	//var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.position.y	= -0.01 - pyramidH/2;
	return mesh;
}

function buildSunDialTexture(){
	var canvas	= document.createElement('canvas');
	canvas.width	= 512;
	canvas.height	= 512;
	var texture	= new THREE.Texture(canvas);

	var image	= new Image();
	image.onload	= function () {
		var ctx		= canvas.getContext( '2d' );
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		drawSunDialNumbers(canvas)
		texture.needsUpdate = true;
	};
	image.crossOrigin = '';
	//image.src	= "images/water.jpg";
	image.src	= "images/textures/MarbleTiles0058_5_thumbhuge.jpg";
	//image.src	= "images/textures/MarbleGreen0001_39_thumbhuge.jpg";



	texture.needsUpdate	= true;
	return texture;
}

function drawSunDialNumbers(canvas)
{
	var ctx		= canvas.getContext( '2d' );
	var w		= canvas.width;
	var h		= canvas.height;
	var texts	= [
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII',
		'IX',
		'X',
		'XI',
		'XII'
	];

	ctx.save();
	ctx.fillStyle	= "rgba(32,32,32,128)";  
	ctx.textAlign	= "center";
	ctx.font	= "30pt bolder";
	ctx.translate(w/2, h/2);
	for(var step = 0; step < 12; step++ ){
		ctx.save();
		ctx.rotate(step * 2*Math.PI/12)
		ctx.translate(0, -160);
		// TODO
		// - put roman number
		// - put some funky citation
		// - put actual math for the sundial
		// - when you join i put the position of the sun at your position ?
		ctx.fillText(texts[step], 0,0); 
		//ctx.fillText(""+step, 0,0); 
		ctx.restore();
	}
	ctx.restore();

	var texture	= new THREE.Texture(canvas);
	texture.needsUpdate	= true;
	return texture;
}
