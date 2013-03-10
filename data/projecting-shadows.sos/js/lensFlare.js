function addLensFlare()
{
	var textureFlare0	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare0.png" );
	var textureFlare1	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare1.png" );	
	var textureFlare2	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare2.png" );	
	var textureFlare3	= THREE.ImageUtils.loadTexture( "images/lensflare/lensflare3.png", undefined, function(){
		var texture	= textureFlare3;
		Pixastic.process(texture.image, "lighten", {amount:2}, function(newImage){
			texture.image		= newImage;
			texture.needsUpdate	= true;
		});
	});
	var textureHexangle	= THREE.ImageUtils.loadTexture( "images/lensflare/hexangle.png", undefined, function(){
		var texture	= textureHexangle;
		Pixastic.process(texture.image, "lighten", {amount:2}, function(newImage){
			texture.image		= newImage;
			texture.needsUpdate	= true;
		});
	});

	//var position	= shadowLight.position.clone().setLength(30)
	//addLight( 0.1, 0.825, 0.99	, position.x, position.y, position.z );
	addLight( 0.1, 0.825, 0.99	, -2.5*30, 5*30, -25*30);

	function addLight( h, s, v, x, y, z ) {

		var light	= new THREE.PointLight( 0xffffff, 1.5, 45000 );
		light.position.set( x, y, z );
		light.color.setHex( 0xFFaa88 );
		scene.add( light );


		var flareColor = new THREE.Color( 0xffffff );
		flareColor.copy( light.color );
		THREE.ColorUtils.adjustHSV( flareColor, 0, -0.5, 0.5 );

		var lensFlare = new THREE.LensFlare( textureFlare0, 500, 0.0, THREE.AdditiveBlending, flareColor );

		lensFlare.add( textureFlare2, 512	, 0.0, THREE.AdditiveBlending );

		lensFlare.add( textureFlare3	, 80	, 0.6-0.3, THREE.AdditiveBlending );
		lensFlare.add( textureHexangle	, 100	, 0.7-0.3, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3	, 150	, 0.9-0.3, THREE.AdditiveBlending );
		lensFlare.add( textureFlare3	, 90	, 1.0-0.3, THREE.AdditiveBlending );

		lensFlare.position		= light.position;

		scene.add( lensFlare );
	}
}
