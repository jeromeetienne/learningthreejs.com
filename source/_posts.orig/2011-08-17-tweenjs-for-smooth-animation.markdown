---
layout: post
title: "Tween.js for Smooth Animation"
date: 2011-08-17 10:16
comments: true
categories: [animation, tween, library]
---

This post presents [tween.js](https://github.com/sole/tween.js) and how you can use it to easily smooth your animation.
**tween.js** is a "super simple, fast and easy to use tweening engine" from [sole](https://github.com/sole).
It provides tweening and full blown animations thanks to chaining. Let's get started!
But first, here is a [demo](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html)
using tween.js. It has basic parameters for you to play with and get a feel of what tweening
may be.

## Tweening... what's that?

{% img right /data/tweenjs_for_smooth_animation/images/tweenjs-linear-easenone.png Linear %}

From [wikipedia article](http://en.wikipedia.org/wiki/Tweening), *tweening* is an abreviation of *inbetweening*, i
dont know why but i find that funny maybe because *inbetweening* isnt a word to begin with.
Let's get back to business, what is a tween? It is a interpolation between 2 values,
from the ```source``` to the ```target```.
The tween will simply generate the needed values needed inbetween those 2 limits. The key is **where**
are those values.
This is done with the **ease function**. The most obvious one is to go straight from ```source```
to ```target```. This is the linear function you see on on the right.

{% img right /data/tweenjs_for_smooth_animation/images/tweenjs-cubic-easeinout.png Cubic EaseInOut %}
{% img left /data/tweenjs_for_smooth_animation/images/tweenjs-elastic-easeinout.png Elastic EaseInOut %}
But some are more funky, you can
see *Elastic EaseInOut* on the left
and
see *Cubic EaseInOut* on the right.
Many others exist for our delight as you can see [here](http://sole.github.com/tween.js/examples/03_graphs.html).

<!--more -->

## First include the library

Now that we got some understanding of concept, let's see how to use it.
We start by simply including the library file in the page.
Download it [there](https://github.com/sole/tween.js)

``` html
    <script type='text/javascript' src='tween.js'></script>
```

## Now Let's Create a Tween

Let's see how it is used in the [demo](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html).
A practical case is less dry than a theorical explaination, and you can tweak the demo after that.
So our case will be to move a sphere ```x``` position back and forth, say between 0 to 400, and
```y``` between 300 to 50.

First we define the original ```position``` and the ```target```.
This ```position``` variable will be updated by tween.js with new values until it is equal to ```target```values.
Then we create the tween object which do the job for us.

``` javascript
    var position = { x : 0, y: 300 }; 
    var target = { x : 400, y: 50 };
    var tween = new TWEEN.Tween(position).to(target, 2000);
```

Noticed the 2000 at the end? It means the tween will last 2 seconds.
Ok so ```tween``` variable will make position.x goes from 0 to 400 and position.y
from 300 to 50 in 2 seconds. To make the 3D object moves along, we need to be
notified at every modification. This is done with ```onUpdate()```.
If you want to be notified at the end of the tween, use ```onComplete()```.

``` javascript
    tween.onUpdate(function(){
        mesh.position.x = position.x;
        mesh.position.y = position.y;
    });
```

## Want to Tweak it?

Let's customise it some more.
what is about delaying the begining of the tween by say 500 milliseconds
for the fun of it.

``` javascript
    tween.delay(500)
```

{% img right /data/tweenjs_for_smooth_animation/images/tweenjs-elastic-easeinout.png Elastic EaseInOut %}
Obviously you can change the ease function too.
Choose any one you like among [the 31 from tween.js](http://sole.github.com/tween.js/examples/03_graphs.html).
Let's pick the funny one on the right, it is ```TWEEN.Easing.Elastic.EaseInOut```.

``` javascript
    tween.ease(TWEEN.Easing.Elastic.EaseInOut)
```

## Let's run!

Ok now the tween is fully configured, let's run it. First we tell the library the
configuration is over and it can start the tween.

``` javascript
    tween.start();
```

Then we periodically update the tweens we got. This code fits well in the render loop.

``` javascript
    TWEEN.update();
```

And you are done. Now you can go crazy and put tweening everywhere! In object
position like we did here, in colors, or in scale, anywhere, feel free to use/abuse it.

## Chaining Tweens for Animation

The [demo](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html)
has an endless animation, the sphere going back and forth until the end of time.
How do we do that? we chain tweens. They
will be executed one after the other. ```chain()``` provides a easy way
to build longer, more varied animations. Suppose we got ```tweenHead```
and ```tweenBack```.

``` javascript
    // after tweenHead, do tweenBack
    tweenHead.chain(tweenBack);
    // And after tweenBack, do tweenHead, so it is cycling
    tweenBack.chain(tweenHead);
```

## That's All Folks

So [tween.js](https://github.com/sole/tween.js) is a nice small library which
provides an easy way to animate things in your demos. You can get a play with
the parameters of the [example](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html) or
look at its [annotated code](/data/tweenjs_for_smooth_animation/docs/tweenjs_for_smooth_animation.html).


