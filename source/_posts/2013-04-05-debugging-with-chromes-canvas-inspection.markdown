---
layout: post
title: "Debugging With Chrome's Canvas Inspection"
date: 2013-04-05 09:15
comments: true
categories: three.js debug chrome
---

This post will present to you how to debug your webgl with  chrome's canvas inspection.
This is an experimental feature available in chrome devtools.
It gives you all the WebGL calls which are done in your webgl scene. 
So it helps if you actually know some raw WebGL :)
In anycase you can see it being replayed call by calls, which is uber cool.

<center>
  <iframe width="425" height="349" src="http://www.youtube.com/embed/837O1YloCRc" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Let's get started
As it is an experimental feature, you first need to enable it.
First let's enable devtool experiment: enter "chrome://flags" url 
in your chrome location bar. There you enable "Enable Developer Tools experiments"
and relaunch chrome.

{% img /data/2013-04-05-debugging-with-chromes-canvas-inspection/screenshots/devtools-enable-experiments.png %}

{% img right /data/2013-04-05-debugging-with-chromes-canvas-inspection/screenshots/devtools-settings-gear.png 160 120 %}

Now that you got the Developer Tools Experiments enabled, let's enable 
'Canvas Inpection' in particular. Click on the little gear on bottom right
of devtools. The one you can see on the right. 

{% img /data/2013-04-05-debugging-with-chromes-canvas-inspection/screenshots/devtools-settings-panel.png %}

It will open the settings panel you see above.
Now, select experiment from the left menu, enable 'Canvas Inpection' and you are done.
Rather clumsy but this is an experiment after all :)

## How to use it
Now that it is enabled, let's see how to use it.
First let's go on the "profile" tab of devtools. We can see "Capture Canvas Frame", this is the one we gonna use. 

{% img /data/2013-04-05-debugging-with-chromes-canvas-inspection/screenshots/devtools-capture-canvas-frame.png %}

Let's enable it and load a page with WebGL. 
As an example, i will use [mmo3d](http://mmo3d.jit.su/montains). It is a multiplayer game
in webgl. It is very hackable so other people can easily do their own world. Let's talk about
that later. For now, lets click 'start' and capture a frame :)
 
## Captured frames

After that you should obtain the following. You got the actual game on the left. 
and you recognise developer tools on the right.

{% img /data/2013-04-05-debugging-with-chromes-canvas-inspection/screenshots/devtools-capture-example-resized.png %}

For every frame you capture, you will get a trace log of each webgl call which has been done during this frame.
Above there is a replay window where you can actually see the scene as it is drawn step by step. 
Thus you can check the order of your calls. It can be usefull when you debug transparency for example. 
Watch for the draw calls, they got huge overhead and should be limited if possible.

## Conclusion
As it is pure webgl, and not at three.js level, it helps if you know raw WebGL. For that, i suggest 
you to read a book on the subject. Personnaly i 
like 
["WebGL Beginner's Guide"](http://www.amazon.com/WebGL-Beginners-Guide-Diego-Cantor/dp/184969172X)
by
[Brandon Jones](http://blog.tojicode.com/).
WebGL may be complex at times, and having cool debug tools help being more efficient.
You can see the excelent paul irish doing a 
[presentation](http://www.youtube.com/watch?v=FY5iiuQRyEE&feature=youtu.be&t=8m23s)
what you can do with canvas inspector.

That's all folks. Have Fun!
