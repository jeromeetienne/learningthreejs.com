// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
 * @param {Number} the factor of zoom (optional, default to 1)
*/
THREEx.WindowResize	= function(renderer, camera, ratio){
	ratio	= ratio !== undefined ? ratio : 1;
	var callback	= function(){
		var width	= window.innerWidth*ratio;
		var height	= window.innerHeight*ratio;
		// notify the renderer of the size change
		renderer.setSize( width, height );
		// update the camera
		camera.aspect	= width / height;
		camera.updateProjectionMatrix();
	}
	if( ratio != 1 ){
		renderer.domElement.style.webkitTransformOrigin	= '0px 0px 0px';
		renderer.domElement.style.webkitTransform	= 'scale3d('+(1/ratio)+', '+(1/ratio)+', 1.0)';		
		renderer.domElement.style.MozTransformOrigin	= '0px 0px 0px';
		renderer.domElement.style.MozTransform		= 'scale3d('+(1/ratio)+', '+(1/ratio)+', 1.0)';		
	}

	callback();
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}

THREEx.WindowResize.bind	= function(){
	return THREEx.WindowResize.apply(THREEx, arguments);
}
