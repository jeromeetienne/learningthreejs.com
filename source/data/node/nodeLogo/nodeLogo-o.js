var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeO	= function(radius)
{
	var shape	= this.pathHexagon(new THREE.Shape(), radius);
	return shape;
}
