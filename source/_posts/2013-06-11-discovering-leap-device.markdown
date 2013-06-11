---
layout: post
title: "Discovering Leap Device"
date: 2013-06-11 10:58
comments: true
categories: 
---

Imagine controlling your computer without needing a mouse or a keyboard but only with the 
movement of your hands! That is what the Leap motion device is all about! It was
all over the net a few months back. This device is not unlike the kinect, however it is
designed to be used at a shorter range. The leap device is a new way of motion on your
screen and it is able to trace your fingers. Quite sci-fi, don't you think?
Especially when you see the accuracy, even the slightest movement of your fingers is tracked.
They have been nice enough to send me one so that I could play with it and get an idea of
what it does and why it is such a cool device. 

<iframe width="425" height="349" src="http://www.youtube.com/embed/aP_4KPXjDpM" frameborder="0" allowfullscreen></iframe>

<!-- more -->

Here are some applications that I found cool. You can easily install them.

### Visualizer

First the Visualizer. This application is installed when you install the leap itself.
It is a basic display of what the leap detects. It helps you discover what the leap 
can do and diagnose potential issues. 

<iframe width="420" height="315" src="http://www.youtube.com/embed/D2oKfAnEaPQ" frameborder="0" allowfullscreen></iframe>

### Flocking

Then a [flocking application](https://developer.leapmotion.com/blog/new-demo-available-flocking). 
In this beautifully realized application you interact with a swarm of fishes in the deep sea.
It is computed over GPU, so you play with an impressive number of fishes. 
Each of your finger tips is visualized with a nice incandescent fire. 
Fishes are attracted by your fingers. But as soon as you move it you scare them away.
Just excelent!

<iframe width="560" height="315" src="http://www.youtube.com/embed/e--L3pArf-c" frameborder="0" allowfullscreen></iframe>

### Google Earth

Google modified its famous application Google Earth to support leap device.
Now you can fly above the earth with your hands in the air. 
See the [announcement for details](http://www.theverge.com/2013/4/22/4246612/google-will-release-google-earth-app-for-leap-motion). 

<iframe width="560" height="315" src="http://www.youtube.com/embed/RebX7YEn3GQ" frameborder="0" allowfullscreen></iframe>

### LeapDJ

Then there is [LeapDJ](https://developer.leapmotion.com/downloads/leap-motion/leap-dj-demo). 
Leap device goes well with the music field. One can create virtual instruments and play them thru the leap.
It is instinctive and reactive. Quite fit for a musician's state of mind :) here is leapdj demo. 
You mix live music with 2 platines, sliders for volume and balance.
You can push buttons to create sounds effects. And you can do that with all your fingers at the same time. 
Definitely a fun application ;)

<iframe width="420" height="315" src="http://www.youtube.com/embed/cFOYHmRab_Q" frameborder="0" allowfullscreen></iframe>

### Flying Demo

[flying demo](https://developer.leapmotion.com/downloads/leap-motion/leap-flying-demo) is an example where 
the leap is used as a game controller.
You put your hand side to side and move them as if they were the wings of a plane. 

<iframe width="420" height="315" src="http://www.youtube.com/embed/ACEE4yddgQ0" frameborder="0" allowfullscreen></iframe>

To stay updated on what is new and interesting about developing on Leap, you may follow [@LeapMotionDev](https://twitter.com/LeapMotionDev) on twitter

## How To Get One
So, where can you get the Leap motion? 
You can have it shipped to your place by [preordering it](https://www.leapmotion.com/preorder/new) on their site.
The current [release date is July 22nd of this year](http://blog.leapmotion.com/post/48872742284/release-date-update).
The device is announced at 79.99$us.
They will also be available at the [BestBuy nearest you](http://www.bestbuy.com/).

Additionnaly they have 
[parterships with HP](https://developer.leapmotion.com/blog/leap-motion-to-embed-3-d-motion-control-through-hp-collaboration)
and 
[asus PCs](http://uk.ign.com/articles/2013/01/03/kinect-like-motion-tracking-coming-to-asus-pcs)
to include it directly in some of their models.
With all that, we can expect this device will go beyond the geek circle and reach the masses.
For further information, you can go to the [official website](https://www.leapmotion.com/)

## How To Code It

They got an API than they have ported in multiple langages:
[c++](https://developer.leapmotion.com/documentation/guide/Sample_C++_Tutorial),
[C#](https://developer.leapmotion.com/documentation/guide/Sample_C%23_Tutorial),
[Objective C](https://developer.leapmotion.com/documentation/guide/Sample_ObjectiveC_Tutorial),
[Java](https://developer.leapmotion.com/documentation/guide/Sample_Java_Tutorial),
[Python](https://developer.leapmotion.com/documentation/guide/Sample_Python_Tutorial)
and 
[javascript](https://developer.leapmotion.com/documentation/guide/Sample_JavaScript_Tutorial).
Obviously we will focus on the javascript one :) It is called [leapjs on github](https://github.com/leapmotion/leapjs).
It is very simple. There is a driver running as daemon doing the work and providing you information via websocket.
I just started to code on it. I will talk more about this later.

## Conclusion
So we’ve seen that the Leap  motion is a very small device (less than half the size of an Iphone) 
that tracks the movement of your hands and fingers. 
It’s so precise it’s scary! 
The Leap is very reactive and accurate, it is designed to work at a very close range.
I have tried it out and it is pretty cool.
You can move elements in your computer with your fingers, with the palm of your hand 
or even by pointing them with a pen.
And good news....You can code it with javascript and you can find it on github!

We have also seen some cool applications that have been done with this device.
Trust me you don’t want to miss that so take a look at the demos!
Stay tuned for the release date and for more information about Leap Motion.

That’s all for now, folks! 

