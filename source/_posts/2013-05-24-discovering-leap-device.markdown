---
layout: post
title: "Discovering Leap Device"
date: 2013-05-24 10:58
comments: true
categories: 
---


Imagine controlling your computer without needing a mouse or a keyboard but only with the 
movements of your hands and fingers! That is what the Leap motion device is all about! It was
all over the next a few months back. This device is not unlike the kinect, however it is
designed to be used at a shorter range. The leap device is a new way of motion on your
screen and it is able to track your hands fingers. Quite sci-fi, don't you think?
Especially when you see the accuracy, even the slightest move of your fingers is tracked.
They have been nice enough to send me one so that I could play with it and get an idea of
what it does and why it is such a cool device. 



## What is recognized
The leap provides quote a bit of informations on what it recognizes.
It provides raw informations on your hand positions.
Btw it is able to get multiple hands without issues. 

The position,  rotation and velocity of your finger tips are provided.
It calls them 'pointable'. It seems strange at first but it has a reason :)
When you hold a pen in your hand,  the leap is able to recognize it. 
It is thinner and longer than a finger.  It is useful to point so the leap call that pointable.

Another information about the hand is the palm [normal](http://en.wikipedia.org/wiki/Normal_\(geometry\)).
It gives you the position and rotation of your palm. It may use to make a globe rotate, or fly a plane. 
One last information is the hand sphere. It acts a bit as a ball that you would hold in your hand. 
Additionnaly leap software provides various gestures recognition. Those higher level informations allows easier integrations of more complexe interactions.

TODO what about the gestures recognittion ?

## Applications
Here is some applications that i found cool. You can easily install them.


First the Visualizer. This application is installed when you installthe leap itself. It is a basic display of what the leap detects. It helps you discover what the leap can do and diagnose potential issue. 

Then a [flocking application](https://developer.leapmotion.com/blog/new-demo-available-flocking). In this beautifully realized application you interact with a swarm of fishes in deep sea. It is computed over GPU, so you play with an impressive number of fishes. Each of your finger tips is visualized with a nice incandescent fire. Fishes are attracted by your fingers. But as soon as you move you scare them away. Just excelent https://developer.leapmotion.com/blog/new-demo-available-flocking

Google modified its famous application Google earth to support leap device.  Now you can fly above the earth with your hands in the air. See the [announcement for details](http://www.theverge.com/2013/4/22/4246612/google-will-release-google-earth-app-for-leap-motion). 

<iframe width="560" height="315" src="http://www.youtube.com/embed/RebX7YEn3GQ" frameborder="0" allowfullscreen></iframe>

Then there is [leapdj](https://developer.leapmotion.com/downloads/leap-motion/leap-dj-demo). Leap device fit well with the music field. One can create virtual instruments and play them thru the leap. It is instinctive and reactive. Quite fit a musician state of mind :) here is leapdj demo. You mix live music with 2 platines, sliders for volume and balance.  You can push buttons to create sounds effects.  And you can do that with all your fingers at the same time. Defiantly a fun application ;)

[flying demo](https://developer.leapmotion.com/downloads/leap-motion/leap-flying-demo) is an example where the leap is used as a game controller.  You put your hand side to side and move them as if they were the wings of a plane. 

To stay updated what is new and interesting about developing on Leap, you may follow [@LeapMotionDev](https://twitter.com/LeapMotionDev) on twitter

## How to get one
So, where can you get the Leap motion? 
You can have it shipped to your place by [preordering it](https://www.leapmotion.com/preorder/new) on their site.
The current [release date is July 22nd of this year](http://blog.leapmotion.com/post/48872742284/release-date-update).
The device is announced at 79.99$us.
They will also be available at the [BestBuy near you](http://www.bestbuy.com/).


Additionnaly they have 
[parterships with HP](https://developer.leapmotion.com/blog/leap-motion-to-embed-3-d-motion-control-through-hp-collaboration)and 
[asus PCs](http://uk.ign.com/articles/2013/01/03/kinect-like-motion-tracking-coming-to-asus-pcs)
to include it directly in some of their models.
With all that, we can expect this device will go beyond the geek circle and reach the masses.
For further information, you can go to the [official website](https://www.leapmotion.com/)


## comparing with kinect

The leap device has been compared to the Kinect many times. But it is quite different!

First of all the leap is much smaller. the leap is less than half the size of an Iphone, 

the kinect is not.  (include a photo of the leap device in your hand) (TODO find a ref on the kinect size)

The location of the device isnt the same either. The leap has to be really close to your screen (10-20 cm) and it is  designed to work at a very close range (8 cubic feet) https://www.leapmotion.com/support, 

on the contrary the kinect depth sensor range is [minimum 800mm and maximum 4000mm](http://msdn.microsoft.com/en-us/library/hh438998.aspx). So you see, the distances aren't the same!

As you know, the Kinect has a horizontal and frontal orientation to track the movement of your whole body. The Leap is more precise and tracks only the movements of your hands and fingers, it has a vertical orientation. 

This makes the leap motion device much more reactive and accurate. 

## how to code it

They got an API than they have ported in multiple langages:
[c++](https://developer.leapmotion.com/documentation/guide/Sample_C++_Tutorial),
[C#](https://developer.leapmotion.com/documentation/guide/Sample_C%23_Tutorial),
[Objective C](https://developer.leapmotion.com/documentation/guide/Sample_ObjectiveC_Tutorial),
[Java](https://developer.leapmotion.com/documentation/guide/Sample_Java_Tutorial),
[Python](https://developer.leapmotion.com/documentation/guide/Sample_Python_Tutorial)
and 
[javascript](https://developer.leapmotion.com/documentation/guide/Sample_JavaScript_Tutorial)

Obviously we will focus on the javascript one :) It is called leapjs and is on [github](https://github.com/leapmotion/leapjs).
It is very simple. There is a driver running as daemon doing the work and providing you information via websocket.
I just started to code on it. i will talk more about this later.



