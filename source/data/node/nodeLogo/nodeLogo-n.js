var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeN	= function(r)
{
	var rs		= 0.6	* r;
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	var shape	= new THREE.Shape();
	
	shape.moveTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	// left side
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;
	
	// right side

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );

	// close the shape
	var a		= 90	* Math.PI/180;
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	
	return shape;
}

NodeLogo.shapeN	= function(radius)
{
	var distance	= 2 * radius * Math.sin(0.5 * Math.PI/3);
	var distanceIn	= distance / 2;
	var turtle	=  THREEx.LogoTurtle.create()
		.turn(Math.PI/2)
		.moveTo(-radius/2, -radius * Math.cos(0.5 * Math.PI/3))
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distance+distanceIn)
		.turn(2*Math.PI/3)
		.forward(distanceIn)
		.turn(Math.PI/3)
		.forward(distance)
		.turn(-Math.PI/3)
		.forward(distanceIn)
		.turn(-Math.PI/3)
		.forward(distanceIn)
		.turn(-Math.PI/3)
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distanceIn)
		
	return new THREE.Shape( turtle.points() );
}

