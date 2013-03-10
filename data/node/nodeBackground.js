//////////////////////////////////////////////////////////////////////////////////
//		NodeLogoBackground						//
//////////////////////////////////////////////////////////////////////////////////

var NodeLogoBackground	= function(opts)
{
	this._ctx	= opts.ctx	|| console.assert(false, "canvas context CTX MUST be defined");
	this._nbNodes	= opts._nbNodes	!== undefined ? opts._nbNodes	: 10;
	this._nbLinks	= opts._nbLinks	!== undefined ? opts._nbLinks	: 50;

	this._width	= this._ctx.canvas.width;
	this._height	= this._ctx.canvas.height;
	
	// erase the background	
	this._clearCanvas();

	// build all the nodes
	this._nodes	= [];
	for(var i = 0; i < this._nbNodes; i++){
		var node	= new NodeLogoBackground.Node({
			ctx	: this._ctx,
			radius	: 10+Math.random()*40,
			posX	: Math.floor(Math.random()*this._width),
			posY	: Math.floor(Math.random()*this._height)
		})
		this._nodes.push(node);
		
		node.render();		
	}

	// build all the links
	this._links	= [];
	for(var i = 0; i < this._nbLinks; i++){
		var nodeIdx1	= Math.floor(Math.random()*this._nbNodes);
		var nodeIdx2	= Math.floor(Math.random()*this._nbNodes);
		var node1	= this._nodes[nodeIdx1];
		var node2	= this._nodes[nodeIdx2];
		var link	= new NodeLogoBackground.Link({
			ctx	: this._ctx,
			node1	: node1,
			node2	: node2
		});
		this._links.push(link);
		link.render();
	}
}

NodeLogoBackground.prototype._clearCanvas	= function()
{
	var ctx		= this._ctx;
	ctx.save();
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();
}

//////////////////////////////////////////////////////////////////////////////////
//		NodeLogoBackground.Link						//
//////////////////////////////////////////////////////////////////////////////////

NodeLogoBackground.Link	= function(opts)
{
	this._ctx	= opts.ctx	|| console.assert(false, "canvas context CTX MUST be defined");
	this._node1	= opts.node1	|| console.assert(false, "node1 MUST be defined");
	this._node2	= opts.node2	|| console.assert(false, "node2 MUST be defined");
	this._style	= opts.style	|| "#8BC84B";

	var range1	= this._node1.opts().radius;
	var range2	= this._node2.opts().radius;
	
	this._x1	= this._node1.opts().posX + (Math.random() * range1) - range1/2;
	this._y1	= this._node1.opts().posY + (Math.random() * range1) - range1/2;
	this._x2	= this._node2.opts().posX + (Math.random() * range2) - range2/2;
	this._y2	= this._node2.opts().posY + (Math.random() * range2) - range2/2;
}


NodeLogoBackground.Link.prototype.render	= function()
{
	var ctx		= this._ctx;
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle	= this._style;
	ctx.lineWidth	= 3;
	ctx.moveTo( Math.floor(this._x1), Math.floor(this._y1) )
	ctx.lineTo( Math.floor(this._x2), Math.floor(this._y2) )
	ctx.closePath();
	ctx.stroke();
	ctx.restore();	
}

//////////////////////////////////////////////////////////////////////////////////
//		NodeLogoBackground.Node						//
//////////////////////////////////////////////////////////////////////////////////

NodeLogoBackground.Node	= function(opts)
{
	this._ctx	= opts.ctx	|| console.assert(false, "canvas context CTX MUST be defined");
	this._posX	= opts.posX !== undefined	? opts.posX	: console.assert(false, "posX MUST be defined");	
	this._posY	= opts.posY !== undefined	? opts.posY	: console.assert(false, "posY MUST be defined");	
	this._radius	= opts.radius !== undefined	? opts.radius	: console.assert(false, "radius MUST be defined");
}

NodeLogoBackground.Node.prototype.opts	= function()
{
	return {
		ctx	: this._ctx,
		posX	: this._posX,
		posY	: this._posY,
		radius	: this._radius
	};
}


NodeLogoBackground.Node.prototype.render	= function()
{
	this._canvasNode(this._posX, this._posY, this._radius);
}

NodeLogoBackground.Node.prototype._canvasHexagone	= function(posX, posY, radius)
{
	var ctx		= this._ctx;
	var edgeLength	= radius * Math.sin(Math.PI/6) * 2;

	ctx.beginPath();
	// 
	ctx.translate(posX, posY);
	ctx.rotate(0.5 *Math.PI/3);

	// add each Edge
	var nbEdges	= 6;
	for(var i = 0; i < nbEdges; i++){
		ctx.lineTo(edgeLength,0);
		ctx.rotate(Math.PI / 3);
	}
	// close the path
	ctx.closePath();	
}

NodeLogoBackground.Node.prototype._canvasNode	= function(posX, posY, radius, style)
{
	var ctx	= this._ctx;
	// set default parameters
	radius	= radius !== undefined ? radius	: 30;
	style	= style	|| "#8BC84B";

	// build the filled one
	ctx.save();
	this._canvasHexagone(posX, posY, radius);
	ctx.fillStyle	= style;
	ctx.fill();
	ctx.restore();

	// build the stroke ones
	var nbBorders	= 3;	
	for(var i = 0; i < nbBorders; i++){
		radius	*= 1.5;
		ctx.save();
		this._canvasHexagone(posX, posY, radius);
		ctx.strokeStyle= style;
		ctx.stroke();
		ctx.restore();		
	}
}

/**
*/
function buildNodeBackground()
{
	var logoGreen	= 0x8BC84B;
	var logoWhite	= 0xE0E0E0;

	var canvasEl	= document.createElement('canvas');
	canvasEl.width	= window.innerWidth;
	canvasEl.height	= window.innerHeight;
	canvasEl.id	= "nodeBackgroundCanvas";

console.log("canvas", canvasEl)
	
	var ctx		= canvasEl.getContext('2d');	
	document.body.appendChild(canvasEl);
	
	var logoBackground	= new NodeLogoBackground({
		ctx	: ctx
	});
}