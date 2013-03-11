function buildNodeLogo()
{
	var logoGreen	= 0x8BC84B;
	var logoWhite	= 0xE0E0E0;

	var extrudeSettings	= { amount: 20,  bevelEnabled: true, bevelSegments: 2, steps: 2 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5,

	// build geometry
	var geometryN	= NodeLogo.shapeN(100)		.extrude( extrudeSettings );
	var geometryO	= NodeLogo.shapeO(100)		.extrude( extrudeSettings );
	var geometryD	= NodeLogo.shapeD(100)		.extrude( extrudeSettings );
	var geometryE	= NodeLogo.shapeE(100)		.extrude( extrudeSettings );
	var geometryEh	= NodeLogo.shapeO(100/4)	.extrude( extrudeSettings );

	THREEx.GeometryUtils.attachRightLeft(geometryN, geometryO, 20)
	THREEx.GeometryUtils.attachRightLeft(geometryO, geometryD, 20)
	THREEx.GeometryUtils.attachRightLeft(geometryD, geometryE, 20)

	var eMiddle	= THREEx.GeometryUtils.middlePoint(geometryE);
	THREEx.GeometryUtils.translate(geometryEh, eMiddle);

	var geometries	= [geometryN, geometryO, geometryD, geometryE, geometryEh];
	
	
	var tmpGeometry	= new THREE.Geometry();
	geometries.forEach(function(geometry){
		THREE.GeometryUtils.merge(tmpGeometry, geometry);
	})
	var middle	= THREEx.GeometryUtils.middlePoint(tmpGeometry).negate();
	middle.y	= 0;
	geometries.forEach(function(geometry){
		THREEx.GeometryUtils.translate(geometry, middle);
	})


	// build the Mesh and add it to the scene
	var parent	= new THREE.Object3D();
	var meshN	= new THREE.Mesh(geometryN, new THREE.MeshLambertMaterial({ color: logoWhite }) );
	parent.addChild(meshN)
	var meshO	= new THREE.Mesh(geometryO, new THREE.MeshLambertMaterial({ color: logoGreen }) );
	parent.addChild(meshO)
	var meshD	= new THREE.Mesh(geometryD, new THREE.MeshLambertMaterial({ color: logoWhite }) );
	parent.addChild(meshD)
	var meshE	= new THREE.Mesh(geometryE, new THREE.MeshLambertMaterial({ color: logoWhite }) );
	parent.addChild(meshE)
	var meshEh	= new THREE.Mesh(geometryEh, new THREE.MeshLambertMaterial({ color: logoGreen }) );
	parent.addChild(meshEh)
	
	//parent.position.x	= - 300;
	
	return parent;
}