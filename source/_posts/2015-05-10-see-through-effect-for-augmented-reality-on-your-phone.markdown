---
layout: post
title: "See-through Effect for Augmented Reality On Your Phone"
date: 2015-05-10 19:25
comments: true
categories: [AR, three.js]
published: true
---

This post shows how to read your phone camera and make it appears as 
transparent, aka to act as a see-through.
It may seems unrelated to 3d at first but 
it is extremely useful in augmented reality.
I know it may seem silly :) 
But this see-throught is the base of Augmented Reality in a phone. 
This and other AR tech will be the subject of future posts.

It makes your device 'appears as transparent'
So when the user is looking at her device, she is seeing the reality.
You just have to display your augmented part on top
and you got augmented reality. A Picture is Worth a Thousand Words :)

<a href='http://jeromeetienne.github.io/demo.seethroughphone' target='_blank'><input type="button" value='Try Demo Now' /></a> 

<iframe width="420" height="315" src="//www.youtube.com/embed/q7uRkul5prI" frameborder="0" allowfullscreen></iframe>


<!-- more -->

## How It Is Coded
Webcams are great for interactivity. 
  We will read the webcam thanks to [WebRTC](http://www.webrtc.org/),
  html5 API which can be used to do video/audio conferences like  Skype or Hangout.

In our case, we just get the video from the webcam
  with the [getUserMedia\(\) function](https://w3c.github.io/mediacapture-main/getusermedia.html).
  we dont need all the network part.
  It is quite widespread according [caniuse](http://caniuse.com/#feat=stream) which is great!
  You can learn more about it 
  on [mdn](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia)
  or [html5rocks](http://www.html5rocks.com/en/tutorials/getusermedia/intro/)


Now that we know how to get a video, which camera to pick ?
This demo is intended for phone. They often got multiple cameras nowsadays.
  typically a front camera for selfies
  a back camera for the normal photos.
[MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) will list all the media source available in your browser. 
  In webrtc vocabulary,
  front camera is called 'user' facing video
  back camera is a 'environment' facing .
  So we try to get the environment video camera if we can.
  


For the see-through effect to be convincing, we need to be careful.
  first we display the video stream in full screen, thus it 
  is more real to the user.
  We display it in the background of the page with the proper css
Additionally we ensure we keep a proper 
  [aspect ratio](http://en.wikipedia.org/wiki/Aspect_ratio_%28image%29),
  no matter the size of the browser window. 
  So it isn't streched.
So it must be robust to window resize and orientation change.
  All that makes the resize function more subtle than usual.
  but nothing dramatic

## Source

Here is the full source of the effect.
It is in a [github repo](https://github.com/jeromeetienne/demo.seethroughphone).
Enjoy!
  
  
```html
<!DOCTYPE html>
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<style>
body, html {
        height : 100%;
}
</style>
<body style='margin: 0px;; overflow: hidden;'><script>

// shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL      = window.URL || window.webkitURL;
        

;(function(){

        'use strict;'

        // create video element
        var video        = document.createElement('video')
        video.setAttribute('autoplay', true)
        document.body.appendChild(video)

        /**
         * Resize video element. 
         * - Made complex to handle the aspect change 
         * - it is frequent when the mobile is changing orientation
         * - after a search on the internet, it seems hard/impossible to prevent browser from changing orientation :(
         */
        function onResize(){
                // is the size of the video available ?
                if( video.videoHeight === 0 )   return

                var videoAspect = video.videoWidth / video.videoHeight
                var windowAspect = window.innerWidth / window.innerHeight

                // var video = document.querySelector('video')
                video.style.position = 'absolute'

                if( videoAspect < windowAspect ){
                        video.style.left        = '0%'
                        video.style.width       = window.innerWidth + 'px'
                        video.style.marginLeft  = '0px'

                        video.style.top         = '50%'
                        video.style.height      =  (window.innerWidth/videoAspect) + 'px'
                        video.style.marginTop   = -(window.innerWidth/videoAspect) /2 + 'px'                        
                }else{
                        video.style.top         = '0%'
                        video.style.height      = window.innerHeight+'px'
                        video.style.marginTop   =  '0px'

                        video.style.left        = '50%'
                        video.style.width       =  (window.innerHeight*videoAspect) + 'px'
                        video.style.marginLeft  = -(window.innerHeight*videoAspect)/2 + 'px'
                }
        }

        window.addEventListener('resize', function(event){
                onResize()
        })
        
        // just to be sure - resize on mobile is funky to say the least
        setInterval(function(){
                onResize()
        }, 1000)
        
        // get the media sources
        MediaStreamTrack.getSources(function(sourceInfos) {
                // define getUserMedia() constraints
                var constraints = {
                        video: true,
                        audio: false,                        
                }
                // to mirror the video element when it isnt 'environment'
                // video.style.transform   = 'scaleX(-1)'

                // it it finds the videoSource 'environment', modify constraints.video
                for (var i = 0; i != sourceInfos.length; ++i) {
                        var sourceInfo = sourceInfos[i];
                        console.log('sourceInfo', sourceInfo)
                        if(sourceInfo.kind == "video" && sourceInfo.facing == "environment") {
                                constraints.video = {
                                        optional: [{sourceId: sourceInfo.id}]
                                }
                                // not to mirror the video element when it is 'environment'
                                // video.style.transform   = ''
                        }
                }
              
                // try to get user media
                navigator.getUserMedia( constraints, function(stream){
                        // set the video.src with the userMedia stream
                        video.src = URL.createObjectURL(stream);
                }, function(error){
                        console.error("Cant getUserMedia()! due to ", error);
                });
        });
})()
</script>
</body>
```
