---
layout: post
title: "Video Conference on Top of WebGL"
date: 2012-04-12 13:20
comments: true
categories: [webrtc, three.js]
---

This post presents
[WebGL Meeting](http://webglmeeting.appspot.com),
a very simple WebGL application to do webrtc call.
It is a follow up of ["Fun with live video on webgl"](/blog/2012/02/07/live-video-in-webgl/).
It was presenting how to use the WebCam using
[WebRTC getUserMedia()](http://dev.w3.org/2011/webrtc/editor/getusermedia.html).
This one goes one step further and make an actual
[WebRTC call](http://www.webrtc.org/)
displayed in a WebGL scene.

In fact, it has already been done a month ago! As you can see
[here](http://www.youtube.com/watch?v=em5RWcstfI0&feature=watch_response)
:)
The video from the first post, ['being on tv, watching tv'](http://www.youtube.com/watch?v=vnNihxl3taE) has been answered
by [Ethan Hugg](https://plus.google.com/109216128632357967445/posts) from cisco.
My very first video reponse btw! He
[shows a SIP video call](http://www.youtube.com/watch?v=em5RWcstfI0&feature=watch_response)
using an version of Chromium hacked by
[Suhas Nandakumar](https://plus.google.com/102821430095362232437/posts).
Definitly cool stuff!
[WebGL Meeting](http://webglmeeting.appspot.com) is similar but run on unmodified browsers.
The
[screencast](http://youtu.be/Fjb7xBnxq9k)
below is short demo of it.

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Fjb7xBnxq9k" frameborder="0" allowfullscreen></iframe>
</center>

## WebRTC progress

Using a modified browser is cool for make nice demo like
[this one](https://plus.google.com/109216128632357967445/posts/QkFu7cxmbzi).
Nevertheless it reduces how widely the technology can spread.
It is now possible to do it using opensource and mainstream browsers.
This field advances so fast!

{% img right /data/2012-04-12-video-conference-on-top-of-webgl/twoTVsWithWebGLTeam-small.jpg 320 240 %}

[Mozilla team](http://mozillamediagoddess.org/) is
[working hard](http://hacks.mozilla.org/2012/04/webrtc-efforts-underway-at-mozilla/)
to make it happen as soon as possible.
It is even available on mobile with
[Opera Mobile 12](http://weblog.bocoup.com/javascript-webrtc-opera-mobile-12/).
Some ["protothon"](http://www.youtube.com/watch?v=wpwjtzXgNFQ]) are happening about it.
[WebRTC](http://www.webrtc.org/)
is on the edge but it is definitly coming hard.
The picture on the right is Chrome WebRTC team doing thumb up on
[WebGLMeeting](webglmeeting.appspot.com)
at an WebRTC event for
[IETF 83](http://www.ietf.org/meeting/83/index.html) 
:)

## What about the code ?

[WebGLMeeting source](https://github.com/jeromeetienne/webglmeeting)
is available on Github under MIT license.
It uses three.js to handle the WebGL.
It is the [AppRTC app](http://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/)
mostly unmodified, with a simple WebGL skin on top.

A post from Chrome WebRTC team recently announced
["Source code to apprtc.appspot.com example app available"](http://www.webrtc.org/blog/sourcecodetoapprtcappspotcomexampleappavailable).
The post releases the
[source](http://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/)
on google code.
The [apprtc demo](https://apprtc.appspot.com)
is a very simple, one-to-one, webrtc call.
Go look at the [source](http://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/), dont be shy :)
It is very small, the whole code client+server, is less than 15kbyte.
It is easy to understand and deploy thanks too google App Engine.

## Face tracker seeking love ?
Surprising hey ? Well the source contains a face tracker,
[face.html](http://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/html/face.html).
It works rather well but it is slow. If somebody could give it more love...
It is a rather naive implementation which works well but got many rooms for speed improvement.
It could make face tracking, less clumsy than wearing augmented reality marker on top
of your head like
[i did a while back](http://learningthreejs.com/blog/2012/03/12/augmented-reality-in-the-browser/)
:)

## Conclusion
I got the feeling WebRTC gonna change a lot of things soon. The peer-to-peer aspect makes it super
cheap to integrate live video conferences to your own sites.

That's all folks, have fun!
