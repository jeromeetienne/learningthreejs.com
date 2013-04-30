---
layout: post
title: "Move a Cube With Your Head or Head-Tracking with WebGL"
date: 2013-03-12 13:28
comments: true
published: true
categories: [three.js, tquery]
---

This post is about head tracking and how to use it in 3D.
It is surprisingly easy to do with the suitable libraries.
We will experiment with 
[headtrackr.js](https://github.com/auduno/headtrackr) and
[three.js](http://github.com/mrdoob/three.js/).
[headtrackr.js](https://github.com/auduno/headtrackr)
is a nice library from 
[auduno](https://github.com/auduno) to do head tracking in the browser. 
You will learn how to do head tracking in webgl in only 20lines of javascript. 
I love the web and how easy it is :)

## tl;dr; links 

* For a simple example. see the ["move a cube with your head"](http://jeromeetienne.github.com/tquery/plugins/headtrackr/examples/index.html) demo
* To mess with the code now without any installation, see this [jsfiddle example](http://jsfiddle.net/jetienne/tSQQ8/)
* for an attempt to make 3d more immersive by using head tracking, see this [demo](http://jeromeetienne.github.com/tquery/plugins/headtrackr/examples/demo.html)

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/gnVfqfjXxmM" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## WebRTC is great!

WebRTC starts to get traction. I love that! We have seen
[WebRTC](http://www.webrtc.org/)
and 
[getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html)
several times in the past: in 
["Punch a Doom Character in Augmented Reality"](http://learningthreejs.com/blog/2012/05/15/punch-a-doom-character-in-augmented-reality/)
post, in 
["Fun With Live Video in WebGL"](http://learningthreejs.com/blog/2012/02/07/live-video-in-webgl/)
post and
["Augmented Reality 3D Pong"](http://learningthreejs.com/blog/2012/05/02/augmented-reality-3d-pong/)
post.
It is 
[already in chrome stable](http://www.webrtc.org/blog/seeyouontheweb)
, and will be in firefox
[real soon](https://hacks.mozilla.org/2012/11/progress-update-on-webrtc-for-firefox-on-desktop/).
They already 
[talk to each other](https://hacks.mozilla.org/2013/02/hello-chrome-its-firefox-calling/).
Here we don't need the network part of webrtc. 
We only need get the webcam video, so 
[getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html)
is enougth. It is in
[opera 12](http://www.opera.com/browser/)
too as you can read 
[here](http://dev.opera.com/articles/view/head-tracking-with-webrtc/).

[auduno](https://github.com/auduno) is part of
[Opera](http://opera.com) team.
He wrote it as a demo for
[opera 12](http://www.opera.com/browser/)
release  which contained
[getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html).
For more info on the library, [auduno](https://github.com/auduno)
blogged 
about internals of 
[his library](https://github.com/auduno/headtrackr). You can find details in his
[blog post](http://auduno.tumblr.com/post/25125149521/head-tracking-with-webrtc).
Additionnal info are available in the 
[reference documentation](http://auduno.github.com/headtrackr/documentation/reference.html).
Some examples are already in three.js, like 
[targets](http://auduno.github.com/headtrackr/examples/targets.html)
or
[facekat](http://www.shinydemos.com/facekat/).


## Demo Time !!

{% img left /data/2013-03-12-playing-with-headtrackr-dot-js/screenshots/screenshot-box3d-small.png %}
As usual we did a plugin for
[tQuery API](http://jeromeetienne.github.com/tquery)
to make it easy to use in our environement.
One can find 2 examples for it:
A [educational example](http://jeromeetienne.github.com/tquery/plugins/headtrackr/examples/index.html)
where your heads controls a box in 3d. 
For best result, *make sure your face is well and evenly lighted*


{% img right /data/2013-03-12-playing-with-headtrackr-dot-js/screenshots/screenshot-demo-small.png %}
Another [demo](http://jeromeetienne.github.com/tquery/plugins/headtrackr/examples/demo.html)
where the camera follows your head. 
The whole scene moves as you move your head, providing quite an immersive experience.
You can play with it [thru jsfiddle](http://jsfiddle.net/jetienne/tSQQ8/) too.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/jetienne/tSQQ8/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Let's Get Started

Ok now lets see how to use this library with 
[tQuery API](http://jeromeetienne.github.com/tquery).
First, we include the ```tquery.headtrackr``` files in your code.
tQuery plugins supports
[require.js](http://requirejs.com). 
It makes dependancies much easier to handle. ```tquery.headtrackr``` is no exception, so to include it you can do

```javascript
require(['tquery.headtrackr'], function(){
	// Your code ...	
});
```

Or if you use the good old ```<script>```, do something like that
to include 
[headtrackr.js](https://github.com/auduno/headtrackr) itself, the library which handle the head tracking. Then you just include the plugin itself, and you are done.

```html
<script src="headtrackr.js"></script>
<script src="tquery.headtrackr.js"></script>
```

### Start Tracking Heads

First, you instanciate the object with this simple line.
You can pass various options to ```.createHeadtrackr(opts)```. 
Here, ```opts``` is an 
[Object](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object)
with those properties

* **opts.width :** width of the image containing the face. default to 320px
* **opts.height :** height of the image containing the face. default to 240px
* **opts.headtrackrOpts :** options passed directly to headtrackr.js. default to ```{}```


```javascript
var headTracker	= tQuery.createHeadtrackr();
```

Default are reasonable, so chances are you dont need to specify anything. To start tracking the head on the webcam, just do the following 

```javascript
headTracker.start();
```

It is possible to stop it with ```.stop()``` or to reset it via ```.reset()```.


### Debug View is Cool For User Feedback

{% img right /data/2013-03-12-playing-with-headtrackr-dot-js/screenshots/screenshot-debugview-small.png %}
If you wish enable the debugView, aka the little visualisation the headtracker result.
It gives feedback to the user on what is happening.
Thus the user can move his head accordingly or to change lighting of the room.

```
headTracker.debugView(true);
```

### Face Position Notified thru Events

When a face is found, events are dispatched to notify the detected positions.

```
headTracker.addEventListener("found", function(event){
	// Your code ...
});
```

```event``` contains normalized coordinates of the detected face.
They use the same axis as WebGL.
If the head is on the center, ```event.x``` and ```event.y``` will be 0.
And if the head is vertical, ```event.angle``` is 0. More precisely

* ```.x``` and ```.y``` : It is the center position. it varies from [-1,+1], from left to right
and bottom to top.
* ```.width``` and ```.height```: the width and height :) If it is half of whole image, it is equal to 1.
* ```.angle```: the Z rotation of the detected head. It is in radian as usual.
* ```.headtrackrEvent```: the original facetrackingEvent event from
[headtrackr.js](https://github.com/auduno/headtrackr)
(see
[reference](http://auduno.github.com/headtrackr/documentation/reference.html)
)

## Head tracking... Kesaco ?

Head tracking is a [well known concept](http://example.com). One can find 
[head tracking on ipad](http://www.youtube.com/watch?v=bBQQEcfkHoE).
One can find [head tracking on wii](http://www.youtube.com/watch?v=Jd3-eiid-Uw).
They got impressive result using the informations from the [wiimote](http://en.wikipedia.org/wiki/Wii_Remote) or even the [device orientation](http://example.com).
With the [kinect](http://en.wikipedia.org/wiki/Kinect), they even
track the [features](http://example.com) of the face itself (e.g. mouth, noze, eyes etc...)

In our case, we use the image from the webcam.
Unfortunatly face localisation from an image isn't exactly 100% accurate to say the least :)
See [here](http://auduno.github.com/headtrackr/examples/targets.html),
this is the same demo as the 
[wii one](http://www.youtube.com/watch?v=Jd3-eiid-Uw)
or the 
[ipad one](http://www.youtube.com/watch?v=bBQQEcfkHoE).
Yet the result isn't as convincing.
With [headtrackr.js](https://github.com/auduno/headtrackr) and 
[webrtc](http://webrtc.org)
, we use only the webcam in a uncontrolled environement.
So the accuracy is in consequences.

You can improve efficiency by following a few simples advices:
Avoid hats or a too crazy haircut. Being bold with a beard doesn't help :) 
Make sure your face is well and evenly lighted and you should be fine.

## Conclusion

In this post, we have seen it is now possible to do head tracking in a web browser !!
Impressive if you ask me!
Even better, it is easy if you use suitable libraries. Coupled with
[three.js](http://github.com/mrdoob/three.js/)
and
[tQuery API](http://jeromeetienne.github.com/tquery),
it is possible provide new immersive experience in 
[20lines of javascript](http://jsfiddle.net/jetienne/tSQQ8/). 
Im so excited.
This kind of things was academic research 5 years ago, and now everybody can easily use it.
We will likely do more with 
[headtrackr.js](https://github.com/auduno/headtrackr).
This is a very nice library with lots of possibilities.
For example, one can use it the head as a game controller, or in a artistic exposition. Stay tuned!

That's all folks, have fun :)




