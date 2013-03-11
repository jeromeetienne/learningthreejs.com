var MaterialEarthMapping	= MaterialEarthMapping	|| {}

MaterialEarthMapping.buildHearthMaterial	= function()
{
	var planetTexture	= THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" );
	var normalTexture	= THREE.ImageUtils.loadTexture( "images/earth_normal_2048.jpg" );
	var specularTexture	= THREE.ImageUtils.loadTexture( "images/earth_specular_2048.jpg" );

	var shader	= THREE.ShaderUtils.lib[ "normal" ];
	var uniforms	= THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "tNormal" ].texture		= normalTexture;
	uniforms[ "uNormalScale" ].value	= 0.85;

	uniforms[ "tDiffuse" ].texture		= planetTexture;
	uniforms[ "tSpecular" ].texture		= specularTexture;

	uniforms[ "enableAO" ].value		= false;
	uniforms[ "enableDiffuse" ].value	= true;
	uniforms[ "enableSpecular" ].value	= true;

	uniforms[ "uDiffuseColor" ].value.setHex( 0xffffff );
	uniforms[ "uSpecularColor" ].value.setHex( 0xaaaaaa );
	uniforms[ "uAmbientColor" ].value.setHex( 0x000000 );

	uniforms[ "uShininess" ].value		= 30;

	var material	= new THREE.MeshShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms,
		lights		: true
	});

	return material;
}
