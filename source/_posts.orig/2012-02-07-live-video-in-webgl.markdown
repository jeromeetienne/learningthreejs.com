---
layout: post
title: "Fun With Live Video in WebGL"
date: 2012-02-07 13:41
comments: true
categories: [three.js, html5, webrtc]
---

This post is about live video in webgl.
It is possible in today browsers to read the webcam using a new feature from html5, called WebRTC.
This standard is
about real-time communications such video conferences.
It is an open source project supported by Google, Mozilla and Opera.
Quite neat hey!

I think live video has a lot of potential usages in 3D.
It is so cool for interactivity.
The player sees himself on the screen. It becomes part of the actions.
Quite immersive effect.
We can imagine something like [second life](http://secondlife.com/), where
people wander around and interact live with each other in a virtual world.
Our demo is about TV... Another obvious use may be
[reflections](http://en.wikipedia.org/wiki/Reflection_\(physics\))
like
[mirror](http://en.wikipedia.org/wiki/Mirror)
or
[water](http://en.wikipedia.org/wiki/Specular_reflection).
What about your face from the webcam reflecting in water with animated waves ?
Would be nice!

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/vnNihxl3taE" frameborder="0" allowfullscreen></iframe>
</center>

It is surely nice but WebRTC is still quite on the edge.
To enable webrtc on your computer, see how to
[run webrtc demos](http://www.webrtc.org/running-the-demos).
It is currently available only in
[Canari](http://tools.google.com/dlpage/chromesxs).
Mozilla people are working hard to make it happen as soon as possible.
So it may be too early to use it for 'serious' things.
But way enougth to do cool experiments like the one we gonna do today :)

[Try it out](/data/live-video-in-webgl)!!
The first step will be to create a video element.
We gonna start to make it play either a normal video file
then to play video from the webcam using
[mediastream API](https://dvcs.w3.org/hg/audio/raw-file/tip/streams/StreamProcessing.html).
After that, we gonna map this video to a normal texture.
And we will be done !
It is that simple, now let's get started.

## Let's create the video element

The
[video element](http://en.wikipedia.org/wiki/HTML5_video)
is the DOM way to handle video in webpage.
Let's create the video element.
Later we will use it as texture and display it in WebGL.

```javascript
	video		= document.createElement('video');
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= true;
```

It you wish to create a video from a file webm, mp4 or ogv, just set
its ```.src``` property. 

```javascript
	video.src = "http://example.com/supercatvideo.webm";
```

It wasn't too hard, hey :) So now we know how to get a video from a file.
Let's see if we can use the webcam and get this nice immersive effect for our
users.

## Let's Use the Webcam if Available

Our first step is to detect if the media stream API is available.
The following line will do the job nicely.
```hasUserMedia``` will be true if it is available, false otherwise.

```javascript
	var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
```

If it isn't, you may point the users to 
[this doc](http://www.webrtc.org/running-the-demos)
on how to get it
and/or using a normal video file.
Now we need to check if we can read the webcam.
For that, we use the following lines. 

```javascript
	navigator.webkitGetUserMedia('video', function(stream){
		video.src	= webkitURL.createObjectURL(stream);
	}, function(error){
		console.log("Failed to get a stream due to", error);
	});
```

A pseudo URL will be created by ```.createObjectURL```.
It would allows the video element to automagically read the webcam.
It looks a bit like that.

```
    blob:http%3A//learningthreejs.com/e33eb278-08a8-4052-9dca-3c7663c88bc0
```

## Handle the textures

Now we got the [video element](https://developer.mozilla.org/En/HTML/Element/Video) ready.
Let's create a texture using it as source.
The last step before seeing the video moving on screen :)
Use this simple line. It is enougth.

```javascript
	var videoTexture = new THREE.Texture( video );
```

This texture is a normal texture and can be used as usual in materials.
For example, in a [lambert](http://en.wikipedia.org/wiki/Lambertian_reflectance) material.

```javascript
	var material	= new THREE.MeshLambertMaterial({
		map	: videoTexture
	});
```

But this texture is special, it is a video. So it need to be constantly updated.
In your render loop, add those lines. They monitor the state of your video.
Every time the video got enougth data to be display, the texture is updated
and sent to the GPU.

```javascript
	if( video.readyState === video.HAVE_ENOUGH_DATA ){
		videoTexture.needsUpdate = true;
	}
```

## Conclusion

Now you can display your webcam inside your webgl !!
This is simple and cool.
Browser support will increase with time.
Live video is a very powerfull tool.
The image from the webcam is a normal one.
On it, you can perform
[post processing](https://github.com/mrdoob/three.js/tree/master/examples/js/postprocessing),
[edge detection](http://en.wikipedia.org/wiki/Edge_detection),
and many other crazy things. Up to you to experiment.
Let's all for today folks, have fun :)

