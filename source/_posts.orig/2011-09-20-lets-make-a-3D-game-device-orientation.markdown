---
layout: post
title: "Let's Make a 3D Game: Device Orientation"
date: 2011-09-20 10:35
comments: false
categories: [three.js, html5, tutorial3dgame]
---

Here is another article of the "Let's Make a 3D Game" [series](/blog/categories/tutorial3dgame/).
It is about **device orientation**, another input you can use for your games.
We have already seen how to handle the [keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/) input.
Device orientation input is more instinctive tho. The user doesnt need to learn controls.
It is already enabled in our game [marblesoccer](http://marblesoccer.com).
Here is a [video](http://www.youtube.com/watch?v=kW4oHaHCilo) of me playing with it.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/kW4oHaHCilo" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

You need a computer which support WebGL *and* device orientation to actually play
with it. Unfortunatly, macbook is the only computer i know able to do that.
On one hand, most smartphones already support *device orientation API*.
On the other hand, smartphones support for WebGL is sparse at best.
So this input will become very usefull if we start supporting
[three.js renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers)
available on phones, such as canvas or DOM.

## Let's get started

As usual, i did a little helper to make it easier for you to include it in
your games. It is called [THREEx.DeviceOrientationState](/data/THREEx/THREEx.DeviceOrientationState.js).
You download this API from [here](/data/THREEx/THREEx.DeviceOrientationState.js) and include
it in your page like this

```html
	<script src='THREEx.DeviceOrientationState.js'></script>
```

## How to use it ?

Now that the script is included, create a ```device``` variable like this.

```javascript
    var device = new THREEx.DeviceOrientationState();
```

After that, if you want the angle the device with the x axis, just use
```.angleX()``` function. You can use ```.angleY()``` and ```.angleZ()```, you
guessed which angle they provide.
Suppose you want a ```THREE.Mesh``` to stay still on y axis while you are moving the device,
just copy this line

```javascript
    mesh.rotation.y	= device.angleY();
```

If you ever want to stop listening to the device orientation, just use this line

```javascript
    device.destroy()
```

## What about the standard ?

Sometime it may be interesting to understand the root of things.
Let's do a rapid introduction of the device orientation API itself.
For authoritative details, the [spec](http://www.w3.org/TR/orientation-event/)
is always a nice place.
If you want more info on it, [html5rocks](http://www.html5rocks.com/en/tutorials/device/orientation/)
or [mdn](https://developer.mozilla.org/en/detecting_device_orientation)
articles are a good start.
First let's bind the event.

```javascript
    window.addEventListener('deviceorientation',  callback, false);
```

Here is an example of callback

```javascript
    function callback(event){
        console.log("orientation gamma:", event.gamma, "beta", event.beta, "alpha", event.alpha);
    }
```

Be carefull tho, gamma, beta, alpha may not be set depending on the device your game is
running on. For example on macbook, ```alpha``` is always ```null```.

## Conclusion

For more details on [THREEx.DeviceOrientationState](/data/THREEx/THREEx.DeviceOrientationState.js),
see its [annoted source](/data/THREEx/docs/THREEx.DeviceOrientationState.html).
It is a simple and instinctive way to control the player.
It is closer to real-life and thus provides a more immersive experience.
In the future we will likely do be
a [virtual joystick](http://www.youtube.com/watch?v=-sEJ4Lo0cm8) for touch enabled device. 
