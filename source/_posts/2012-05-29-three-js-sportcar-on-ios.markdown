---
layout: post
title: "Three.js Sport Car on iOS at 40fps"
date: 2012-05-29 13:48
comments: true
categories: [ios, threejs, tquery]
---

This post is about iOS and three.js.
It may seem surprising, but [iOS](http://en.wikipedia.org/wiki/iOS) supports WebGL since version 4.2.
There is a tough limitation tho, it is available only in their advertisment plateform,
[iAds](http://en.wikipedia.org/wiki/IAd), not in safari browser.
I got a ipad2 so i experimented a bit with three.js on iOS to see what is going on.
Most WebGL examples from
[three.js](https://github.com/mrdoob/three.js/) and
[tQuery](https://github.com/jeromeetienne/tquery)
are working nicely on iOS.

The
[screencast](http://www.youtube.com/watch?v=3yc4qhP87oY)
below shows an ipad2 running the car demo we did last week in
["Sport Car in WebGL"](http://learningthreejs.com/blog/2012/05/21/sport-car-in-webgl/) post.
It runs at 40fps on the video. Rather good!
Especially when you know the demo isn't optimized.
This car is way too detailed.
One could reduce the size of this model by half without loosing much.
So on mobile, the Good part is that *fps are good*.
The Bad part is that *speed is slower* and *balanced differently*.
This unbalanced part worries me a bit i admit. We need to better understand the mobile plateform.
But hey, 40fps is quite good, way enougth to make a game!


<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/3yc4qhP87oY" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Experimenting with WebGL on iOS

Yesterday,
[daeken](http://news.ycombinator.com/user?id=daeken)
published a
[WebGL Enabler](http://demoseen.com/webglenabler/#)
for iOS.
It enables WebGL in the browser for jailbroken iOS devices.
Or if you prefere a less invasive solution, not requiring to jailbreak your devices.
You can use
[WebGL Browser](https://github.com/benvanik/WebGLBrowser)
made by
[Ben Vanik](http://noxa.org/)
, aka [@benvanik](https://twitter.com/#!/benvanik) on twitter.
He is wellknow for [WebGL Inspector](https://github.com/benvanik/WebGL-Inspector).

By the way,
[WebGL Browser](https://github.com/benvanik/WebGLBrowser)
and 
[WebGL Enabler](http://demoseen.com/webglenabler/#),
are both based on a similar trick.
It has been discovered by
[Nathan de Vries](https://twitter.com/#!/atnan)
who told about it in this
[excelent post](http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/).
A very good read to understand the underlying details!
Unfortuntly this is using an unofficial API... so it is
impossible to get it for the apps store unfortunatly. 

## WebGL Status on Mobile

WebGL is starting to be hot on mobile.
[blackberry playbook2](http://www.blackberry.com/playbook)
got it
[by default](http://devblog.blackberry.com/2012/02/playbook-native-webgl-development/).
[boot on gecko](http://www.mozilla.org/en-US/b2g/) got it too with firefox mobile.
It isn't enabled on android and iOS tho, the 2 majors.
Maybe we will have more info in june with
[google.io](https://developers.google.com/events/io/)
and
[apple event](https://developer.apple.com/wwdc/).
google got [chrome on android](http://www.google.com/intl/en/chrome/android/).
iOS already got [support](http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/), this is more a matter of policy.
So lets hope google will announce WebGL support for chrome mobile.
and apple will announce they accepts WebGL on apps store applications.
I am an optimist personn, i hope :)

## Conclusion

WebGL is coming hard on mobile.
[three.js](https://github.com/mrdoob/three.js/) and
[tQuery](https://github.com/jeromeetienne/tquery)
already work on it.
We need the 2 majors mobile OS to support it tho.
It think having it on android and ios would significantly change WebGL landscape.
Meanwhile you can already play with it, and do minigames with it, thus be ready when needed :)

That's all to today folks. Have fun :)
