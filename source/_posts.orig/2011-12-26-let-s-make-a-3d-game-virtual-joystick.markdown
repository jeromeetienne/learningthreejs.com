---
layout: post
title: "Let’s Make a 3D Game: Virtual Joystick"
date: 2011-12-26 12:21
comments: true
categories: [tutorial3dgame, library]
---

Here is another article of the "Let's Make a 3D Game"
[series](/blog/categories/tutorial3dgame/).
We have already seen how to handle other inputs like
[keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/)
and 
[device orientation](/blog/2011/09/20/lets-make-a-3D-game-device-orientation/).
This post is about [virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
It **virtual joystick**, another input you can use for your games.
A virtual joystick emulates a joystick behaviour on a touch screen.
[virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
has been coded in a effort to port
[marblesoccer](http://marblesoccer.com)
to mobile device.
Show, dont tell, 
[Try it out](http://jeromeetienne.github.com/virtualjoystick.js/).

This
[demo](http://jeromeetienne.github.com/virtualjoystick.js/)
works with mouse events too thus, it is easier to test/debug.
[virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
has been widely inpired by
[this post](http://sebleedelisle.com/2011/04/multi-touch-game-controller-in-javascripthtml5-for-ipad/)
by
[Seb Lee-Delisle](http://sebleedelisle.com/).
The screencast below is short introduction about
[virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/viyr_W0z1U8?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Let's Get Started

First step, you download
[virtualjoystick.js](https://raw.github.com/jeromeetienne/virtualjoystick.js/master/virtualjoystick.js)
from its
[github](https://github.com/jeromeetienne/virtualjoystick.js)
Then include it in your own code.

```html
	<script src="virtualjoystick.js"></script>
```

The joystick is composed of 2 parts: the *base* and the *stick*.
First the plare touch the screen, it gives the position of the *base*.
Then it drags its fingers to gives the position of the *stick*

## Let's Use it

<iframe src="http://jeromeetienne.github.com/virtualjoystick.js/"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

First step is to create the object from ```VirtualJoystick``` class.

```javascript
	var joystick = new VirtualJoystick()
```

The constructor has some options.
They have sensible default.
You can change them to fit your specific needs.
See
[github README](https://github.com/jeromeetienne/virtualjoystick.js#readme)
for a full API description.
You may look at the [index.html](https://github.com/jeromeetienne/virtualjoystick.js/blob/master/index.html).
It is an example which uses the library.

It is possible to read
[analogic](http://en.wikipedia.org/wiki/Analog_stick)
coordinates.
```joystick.deltaX()``` gives the *delta x* between the base and the stick in pixel.
```joystick.deltaY()``` gives the *delta y*.
Those analogic coordinates may be interpreted as a
[joystick with 4 switches](http://www.slagcoin.com/joystick/restrictors.html).
Similar to
[arrow keys](http://en.wikipedia.org/wiki/Arrow_keys)
in a way.
```joystick.up()``` tells you if your joystick is up or not.
You guessed the meaning of ```.down()```, ```.right()``` and ```.left()```.

## Conclusion
The source is available on
[github](https://github.com/jeromeetienne/virtualjoystick.js)
under MIT license.
Later, a button may be implemented as well.
It is alway usefull to able to fire in video games :)
That's all folks, have fun.