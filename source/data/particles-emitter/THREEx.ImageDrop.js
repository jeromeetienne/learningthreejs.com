var THREEx	= THREEx 		|| {};
THREEx.ImageDrop	= THREEx.ImageDrop	|| {};

THREEx.ImageDrop	= function(renderer, callback)
{
	callback	= callback	|| THREEx.ImageDrop.defaultCallback;
	var onDrop	= function(event){
		event.preventDefault();
		//console.log("DROPPED nfiles", event.dataTransfer.files.length)
		for(var i = 0; i < event.dataTransfer.files.length; i++){
			var file	= event.dataTransfer.files[i];
			// sanity check - file mimetype MUST be an image
			console.assert(file.type.match(/^image\//), "only image/* mimetype are accepted");
			// build the FileReader
			var reader	= new FileReader();
			reader.onload = function (event){
				var imageUrl	= event.target.result;

// hmmm apparently i got trouble when the imageUrl is a dataUrl
// - not sure why, but if i put the normal url in there. it works...
// - if i put the dataUrl, nothing worked
// - works on firefox, not on chrome
//imageUrl	= 'images/lensFlare/Shine1.png';

				var image	= new Image();
				image.onload	= function(){
					callback(image);
				};
				image.crossOrigin = '';
				image.src	= imageUrl;
			};
			reader.readAsDataURL(file);
		}
	};
	var onDragOver	= function(event){
		// no idea why this one is needed
		// - without it the image replace the current page
		event.preventDefault();		
	}

	// TODO here bind renderer.element or something
	document.addEventListener("drop"	, onDrop	, false);
	document.addEventListener("dragover"	, onDragOver	, false);
	
	return {
		unbind	: function(){
			window.removeEventListener('drop'	, onDrop	);
			window.removeEventListener('dragover'	, onDragOver	);
		}
	}
}

THREEx.ImageDrop.defaultCallback	= function(image)
{
	window.open(image.src);
}
