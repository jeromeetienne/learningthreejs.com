
function subjectAnimation()
{
	var time	= Date.now()/1000;
	
	var wobble0	= function(){
		THREEx.GeometryWobble.Animate(mesh.geometry, time/Math.PI*15, new THREE.Vector3(7.5,12.5, 00));
		if( meshClouds ){
			THREEx.GeometryWobble.Animate(meshClouds.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));		
		}
	}
	var wobble	= function(){
		THREEx.GeometryWobble.Animate(mesh.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));
		if( meshClouds ){
			THREEx.GeometryWobble.Animate(meshClouds.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));		
		}
	}
	var funkyRotation	= function(){
		var speed	= 0.05;
		var rx		=  5.0 *Math.PI/180*speed;
		var ry		= 12.5 *Math.PI/180*speed;
		var rz		=  7.5 *Math.PI/180*speed;
		var inc		= new THREE.Vector3(rx, ry, rz);
		mesh.rotation.addSelf(inc);
		if( meshClouds ){
			meshClouds.rotation.addSelf(inc);
		}
	}
	var normalEarthRotation= function(){
		mesh.rotation.y		+= 0.0125/7.5;
		if( meshClouds ){
			meshClouds.rotation.y	+= 3*0.0125/7.5;
		}
	}
	var heartbeat	= function(){
		var seconds	= (Date.now() - startTime)/1000;
		var angle	= 1.5*seconds*Math.PI;
		var scale	= Math.abs(Math.cos(angle));

		var from	= 1.0
		var to		= 1.1;
		var value	= from + (to-from) * scale;

		var scaleClouds	= 1.005;
		mesh.scale.x		= mesh.scale.y		= mesh.scale.z		= value;
		if( meshClouds ){
			meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * value;
		}
	}
	var zBounce0	= function(){
			// - may be nice as a vumeter
		var seconds	= (Date.now() - startTime)/1000;
		var angle	= seconds*Math.PI;
		//var angle	= (Date.now() - startTime)/300;
		//var scale	= 0.3*Math.sin(angle)*Math.sin(angle);
		var scale	= Math.sin(angle);
		var scale	= Math.sin(angle)*Math.sin(angle);
		//var scale	= Math.abs(Math.cos(angle));
		var scaleClouds	= 1.005;
		
		//scale	= 
		//var width	= 300;
		//scale= 0;
		//meshClouds.position.x	= mesh.position.x	= scale * width/2;
		//meshClouds.position.x	= scale * width/2;
		//return;
		var offset	= 1.0;
		var range	= 0.3;
		var value	= offset + range * scale;
		mesh.scale.x	= mesh.scale.y	= mesh.scale.z	= value;		
		if( meshClouds ){
			meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * value;
		}
	}
	var zBounce	= function(){
		var scaleClouds	= 1.005;
		var update	= function(){
			mesh.scale.x		= mesh.scale.y		= mesh.scale.z		= this.v;		
			if( meshClouds ){
				meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * this.v;
			}
		};

		// notion of mirror
		// notion of loop, nb loop
		
		if( tweenForward )	return;
		var loops	= 10;
		var duration	= 1000/2;
		
		var offset	= 1.0;
		var range	= 0.1;
		var from	= {v: offset + range};
		var to		= {v: offset - range};

		var position	= JSON.parse(JSON.stringify(from));
		tweenForward	= new TWEEN.Tween(position)
				.to(from, duration)
				.easing(TWEEN.Easing.Circular.EaseOut)
				.onUpdate(update);
		tweenBackward	= new TWEEN.Tween(position)
				.to(to, duration)
				.easing(TWEEN.Easing.Circular.EaseIn)
				.onUpdate(update)
				.onComplete(function(){
					loops--;

					var base	= 1.0;
					var range	= 1/(loops/3+1);
					from.v	= base + range/2 + range;
					to.v	= base + range/2 - range;

					if(loops != 0)	return;
					tweenForward.stop();
					tweenBackward.stop();
				});
		tweenForward.chain( tweenBackward );
		tweenBackward.chain( tweenForward );
		tweenForward.start();
	}
	
	// funky rotation
	//wobble0();
	wobble();
	funkyRotation();
	zBounce0();
	//zBounce();

	//normalEarthRotation();

	//heartbeat();	
}