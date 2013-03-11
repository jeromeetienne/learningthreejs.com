---
layout: post
title: "Augmented Reality 3D Pong"
date: 2012-05-02 13:38
comments: true
categories: [tquery, threejs, augmentedreality, webrtc]
---

This post presents a livecoding screencast of **Augmented Reality 3D Pong**.
This is an experiment to use [augmented gestures](https://github.com/jeromeetienne/augmentedgesture.js)
as a way to interact with game. So i picked a game classic ["pong"](http://en.wikipedia.org/wiki/Pong).
We gonna learn how to code a pong in augmented reality with webgl. The result code
is only
[100lines](https://github.com/jeromeetienne/augmentedgesture.js/blob/master/examples/augmentedpong/index.html)!!
Nice for augmented reality + webgl + a game :)

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/ZTwhHwAHc3c" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

But First... What is *augmented gestures* ?
I made [augmentedgesture.js](https://github.com/jeromeetienne/augmentedgesture.js).
This is a library which use [getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html)
and [WebRTC](http://www.webrtc.org/) to grab the webcam.
It analizes the image with [imageprocessing.js](https://github.com/jeromeetienne/imageprocessing.js)
and extract the location of flashy balls.
I presented it first at [Web-5 conference](http://www.web-5.org/) with me punching
Doom characters in augmented reality :)
['Doom: a new workout for geek?'](http://www.youtube.com/watch?v=hUYM93xaIgg) on youtube
is preview of it. For the webgl, we obviously gonna use
[three.js](https://github.com/mrdoob/three.js/)
and
[tQuery](http://jeromeetienne.github.com/tquery/).

Controllers for the [Wii](http://en.wikipedia.org/wiki/Wii_Remote)
or
[PS3](http://us.playstation.com/ps3/playstation-move/) did good as game controllers.
[kinect](http://en.wikipedia.org/wiki/Kinect)
is super cool obviously.
They all requires to buy specific hardware tho... So the money is *a barrier*.
Some even require specific installation on your computer, with code to compile.
This is *another barrier*.
{% img left /data/2012-05-02-augmented-reality-3d-pong/images/Household-Latex-Gloves-HY-H001-1-small.jpg %}
{% img right /data/2012-05-02-augmented-reality-3d-pong/images/postit-small.jpg %}
With augmented gestures, you dont need specific devices. I like to use objects
which are cheap and readily available in our everyday life.
Thus people got easily access to the content, in a pure web vibe.
I use children toys that i paid 3euro per ball.
Another possibility is to use [post it](http://en.wikipedia.org/wiki/Post-it_note).
They work well thanks to their flashy colors as you can see
in [this video](http://www.youtube.com/watch?v=k8R1y0oqiic).
They are available in most offices.
Another is to use [dish gloves](http://en.wikipedia.org/wiki/Rubber_glove). They are
readily available and cheap.

[Try it](http://jeromeetienne.github.com/augmentedgesture.js/examples/augmentedpong/)!
This [screencast](http://www.youtube.com/watch?v=iunNd5lmAVE)
is a presentation on how to code
[augmented reality pong 3D](http://jeromeetienne.github.com/augmentedgesture.js/examples/augmentedpong/).
The code is on [github](https://github.com/jeromeetienne/augmentedgesture.js/tree/master/examples/augmentedpong)
under [MIT license](https://github.com/jeromeetienne/augmentedgesture.js/blob/master/MIT-LICENSE.txt).
The slides of the presentation are
[here](http://jeromeetienne.github.com/augmentedgesture.js/examples/augmentedpong/slides).
Im not sure about the format of this video... the mix live coding + slides + screencast is usual.
Anyway publishing it in "publish early, publish often" mood :)

Enjoy

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/iunNd5lmAVE" frameborder="0" allowfullscreen></iframe>
</center>
