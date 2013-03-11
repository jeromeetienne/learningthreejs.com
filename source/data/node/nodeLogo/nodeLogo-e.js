var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeE	= function(radius)
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
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distance)
		.turn(Math.PI/3)
		.forward(distance/2)
		.turn(Math.PI/2)
		.turn(0.5 * Math.PI/3)
		.forward(distance)
		.turn(- Math.PI/3)
		.forward(distanceIn)
		.turn(- Math.PI/3)
		.forward(distanceIn)
		.turn(- Math.PI/3)
		.forward(distanceIn)
		.turn(- Math.PI/3)
		.forward(0.5 * distanceIn)
		.turn(Math.PI/2)
		.turn(0.5 * Math.PI/3)
		.forward(distanceIn)
		
	var shape	= new THREE.Shape( turtle.points() );
	return shape;
}
