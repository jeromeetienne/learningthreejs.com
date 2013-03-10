var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

// TODO the update could be done in GPU, so less js

THREEx.Particle.item	= function()
{
	this.reset();
	this.kill();
}

/**
 * Set all parameters to a reasonable default
*/
THREEx.Particle.item.prototype.reset	= function()
{
	this._deleteIn	= 2000;

	this._position	= new THREE.Vector3( 0,0,0 );

	this._speed	= new THREE.Vector3();
	this._speed.copy(this._position).normalize().multiplyScalar( 2 );
	this._speedInc	= new THREE.Vector3(0, -0.05, 0);
	this._speedMul	= new THREE.Vector3(1.0, 1.0, 1.0);

	this._color	= new THREE.Color(0xFFFFFF);
	this._colorInc	= new THREE.Color(0x000000);

	this._rotation	= 0*Math.PI/180;
	this._rotationInc = 0;

	this._size	= 16;
	this._sizeInc	= 0;

	this._opacity	= 1.0;
	this._opacityInc= 0;
	
	return this;
}


/**
 * @returns {Boolean} true if the particle is dead, false otherwise
*/
THREEx.Particle.item.prototype.isDead	= function()
{
	return this._opacity === 0.0;
}

/**
 * kill this particle
 * - it wont be visible after that
*/
THREEx.Particle.item.prototype.kill	= function()
{
	this._opacity	= 0.0;
}

/**
 * @param {Object} params to setup this ParticleItem
*/
THREEx.Particle.item.prototype.start	= function(params)
{
	Object.keys(params).forEach(function(param){
		console.assert( this['_'+param] !== undefined, 'param '+param+' isnt defined' );
		this['_'+param]	= params[param];
	}.bind(this));
}

/**
 * @param {Number} delta time since the last update in milliseconds
*/
THREEx.Particle.item.prototype.update	= function(deltaTime)
{
	if( this._deleteIn > 0 ){
		this._deleteIn	-= deltaTime;
		if( this._deleteIn <= 0 )	this.kill();
	}
	if( this.isDead() ) return;
	
	this._speed	.multiplySelf( this._speedMul );
	this._speed	.addSelf( this._speedInc );

	this._position	.addSelf( this._speed );

	this._color.r	+= this._colorInc.r;
	this._color.g	+= this._colorInc.g;
	this._color.b	+= this._colorInc.b;
	
	
	this._size	+= this._sizeInc;

	this._rotation	+= this._rotationInc;
	
	this._opacity	+= this._opacityInc;
	this._opacity	= Math.max(this._opacity, 0.0);
}


THREEx.Particle.item.prototype.position	= function()
{
	return this._position;
}

THREEx.Particle.item.prototype.rotation	= function()
{
	return this._rotation;
}

THREEx.Particle.item.prototype.size	= function()
{
	return this._size;
}

THREEx.Particle.item.prototype.color	= function()
{
	return this._color;
}
THREEx.Particle.item.prototype.opacity	= function()
{
	return this._opacity;
}