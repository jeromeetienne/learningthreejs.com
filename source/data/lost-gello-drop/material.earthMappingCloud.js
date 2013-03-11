/**
 * taken from the trackball camera example from three.js
*/

var MaterialEarthMapping	= MaterialEarthMapping	|| {}

// build the coulds	
MaterialEarthMapping.buildCloudMesh	= function(sphereRadius)
{
	var geometry		= new THREE.SphereGeometry( sphereRadius, 50, 50 );
	THREEx.GeometryUtils.center(geometry);
	THREEx.GeometryWobble.init(geometry);
	THREEx.GeometryWobble.cpuAxis(geometry, 'x', 0.02);

	var cloudsTexture	= THREE.ImageUtils.loadTexture( "images/earth_clouds_1024.png" );
	var cloudsMaterial	= new THREE.MeshLambertMaterial( { color: 0xffffff, map: cloudsTexture, transparent:true } );
	var cloudsScale		= 1.005;
	meshClouds		= new THREE.Mesh( geometry, cloudsMaterial );
	meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
	
	return meshClouds;
}