var NodeLogo	= NodeLogo	|| {};

NodeLogo.pathHexagon	= function(path, radius)
{
	var r		= radius;
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	path.moveTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	path.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	return path;
}

NodeLogo.shapeD	= function(r)
{
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	var shape	= new THREE.Shape();
	shape.moveTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r+1*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r+r/2, Math.sin(a)*r+1*r );
	shape.lineTo(  Math.cos(a)*r+r/2, Math.sin(a)*r-r/4 );
	
	// close the shape
	var a		= 90	* Math.PI/180;
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );

	// get the hole
	var hole	= this.pathHexagon(new THREE.Path(), r/3);
	shape.holes.push( hole );

	return shape;
}
