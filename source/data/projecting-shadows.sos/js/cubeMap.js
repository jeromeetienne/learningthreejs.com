function addCubeMap(){
	var path = "images/SwedishRoyalCastle/";
	var path = "images/redsky/";
	var path = "images/skybox/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];
	var reflectionCube	= THREE.ImageUtils.loadTextureCube( urls );
	reflectionCube.format	= THREE.RGBFormat;
	var shader		= THREE.ShaderUtils.lib[ "cube" ];
	shader.uniforms[ "tCube" ].texture = reflectionCube;

	var material	= new THREE.ShaderMaterial( {
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		depthWrite	: false
	});

	var geometry	= new THREE.CubeGeometry( 1000, 1000, 1000 );
	var mesh	= new THREE.Mesh(geometry, material);
	mesh.flipSided	= true;
	scene.add( mesh );
	skyCube	= mesh;
}
