---
layout: post
title: "Lets Make a 3D Game: microphysics.js"
published: true
date: 2011-10-17 12:36
comments: true
categories: [physics, tutorial3dgame]
---

This post is part of the ["Lets make a 3D game"](/blog/categories/tutorial3dgame/) series.
3D and physics simulation always go well together
[even](http://www.youtube.com/watch?v=Rd7TyU9RdQk)
[more](http://www.youtube.com/watch?v=o_xr8Htj9GI)
[so](http://www.youtube.com/watch?v=Xfrzi-yVcsM)
[with](http://www.youtube.com/watch?v=uvCbc8vFUMo)
[marble](http://www.youtube.com/watch?v=7lBUBBW_sF0)
[games](http://www.youtube.com/watch?v=c7npJ3E-ydA).
One is required for [marblesoccer](http://marblesoccer.com) but i wasnt
convinced by current 3d physics engines. I explain why at the end.
Fortunatly, [@pyalot](http://twitter.com/#!/pyalot) from [codeflow.org](http://codeflow.org/)
has been kind enough to write one taylor-made for us: **microphysics.js**!!

It is bite-sized, elegant and efficient.
Less than 500 lines at the moment!!
It is small engouh to be understood, important feature for a tutorial blog.
It is a work in progress tho.
We aren't aware of any bugs.
New features will be added and the API is expected to move.
Currently it implements moving spheres and static boxes (or [AABB](http://en.wikipedia.org/wiki/Axis-aligned_bounding_box) as we like to say).
This is all we need for [marblesoccer](http://marblesoccer.com), the good thing about tailor-made.
*We are in business!!!*

Below is a screencast of me doing a short introduction of the 
[playground](http://jeromeetienne.github.com/microphysics.js/playground/).
This just a page for you to experiment with microphysics.js.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/DI5PV2_sLoM" frameborder="0" allowfullscreen></iframe>
</center>


## Let's get started 

So lets see how to use it.
First step, you download it [here](https://raw.github.com/jeromeetienne/microphysics.js/master/codeflow/physics.js).
Then include it in your own code with this line.

```html
    <script src="physics.js"></script>
```

<!-- more -->


## Let's Create a World

{% img right /data/lets-make-a-3d-game-microphysics-js/images/galactus.png %}

Quite a title hey ?
Dont you feel like [galactus](http://en.wikipedia.org/wiki/Galactus) when you say it ?
First you instanciate the physics ```world``` like this.

```javascript
	var world = new vphy.World()
```

Now you start it. Dont forget to give it the date as you see it.

```javascript
	world.start(Date.now()/1000);
```

The ```world``` is now fully initialized.
You just have to periodically update it in your game/render loop.

```javascript
	var timeStep	= 1/180;
	world.step(timeStep, Date.now()/1000);
```

The ```timeStep``` parameter is the precision of the physics engine, expressed in seconds.
Quite a subtle tradeoff.
The smaller it is, the more accurate is the physics, but the slower it is to compute.
Up to you to find the balance that fit your needs.

## Let's Add Bodies

{% img left /data/lets-make-a-3d-game-microphysics-js/images/The_shining_heres_johnny.jpg %}

Don't worry, this is not about killing people and dispose of their dead bodies :)
In physics, A [body](http://en.wikipedia.org/wiki/Rigid_body) is a solid object that you put in your world.
microphysics bodies can be spheres or static boxes.
Lets start right away by creating a sphere. 

```javascript
	var sphere	= new vphy.Sphere({
		x : 10,
		y : 10,
		z : 10,
		restitution	: 0.6,
		radius : 5,
	});
```

This will position it at ```(10,10,10)``` in the world.
[restitution](http://en.wikipedia.org/wiki/Coefficient_of_restitution) will determine how
bouncy is this during a collision.
A bouncing ball restitutes a lot.
A falling eggs restitutes less :)
This declaration seems quite verbose at first.
Don't worry those parameters got sensible defaults, no need to specify them all.

Now lets add it to our world

```javascript
    world.add(sphere);
```

If you need to remove it, just do ```world.remove(sphere)```. Not too hard hey ?
Now lets create a static box.
Boxes are called *AABB*.
It stands for [Axis-aligned bounding box](http://en.wikipedia.org/wiki/Axis-aligned_bounding_box).
It is graphic jarguon for the smallest box containing your object.
```vphy.Sphere```and ```vphy.AABB``` both derived from ```vphy.Body```.
```x, y, z, resitution``` are ```vphy.Body``` parameters, common to both.
So we wont review them again.

```javascript
    var body = new vphy.AABB({
        width : 1,
        height: 1,
        depth : 1
    });
```

```width```, ```height``` and ```depth``` gives the dimensions of the box.
After ```world.step()```, you can read the new position of each body. Quite usefull
to push back the resulting physics in your 3D scene :)

```javascript
	var pos	= body.getPosition();	// x = pos[0], y = pos[1], z = pos[2]
```

Ok, so we got a ```world``` with solid objects in it, all bound to [physical law](http://en.wikipedia.org/wiki/Physical_law).
Now what about moving them ?

## Let's move our Bodies

{% img right /data/lets-make-a-3d-game-microphysics-js/images/aerobic-small.jpg %}

Lets make our sphere moves.
The bodies you added to the world will move according to the [forces](http://en.wikipedia.org/wiki/Force) applied on them.
All that according to 
[laws of motion](http://en.wikipedia.org/wiki/Newton%27s_laws_of_motion)
from [Newton](http://en.wikipedia.org/wiki/Isaac_Newton).
He discovered that by receiving an [apple on the head](http://en.wikipedia.org/wiki/Isaac_Newton#Apple_analogy),
creativity can take strange paths sometime :)

Ok let's add [gravity](http://en.wikipedia.org/wiki/Gravity_of_Earth), the force which moved this falling apple.
This force is applied along a given direction to all our objects.
The library already contains an helper just for that. Simply do

```javascript
	world.add(new vphy.LinearAccelerator({
		x	:  0, 
		y	: -9.8,
		z	:  0
	}));
```

Quite easy, no? Now lets see a custom accelerator, for example a player moving 
according to the keyboard. The player will be a ```vphy.Sphere``` and we will
reuse the [keyboard helper](http://learningthreejs.com/data/THREEx/THREEx.KeyboardState.js) we
did in this [post](http://learningthreejs.com/blog/2011/09/12/lets-Make-a-3D-game-keyboard/).

```javascript
	var player	= new vphy.Sphere({ radius : 20 });
	world.add({
		type: vphy.types.ACCELERATOR,   // let the lib know it is an accelerator
		perform: function(bodies){      // bodies is the array of all vphy.Body
			if( keyboard.pressed('right') )	player.accelerate(1,0,0);
			if( keyboard.pressed('left') )	player.accelerate(-1,0,0);
			if( keyboard.pressed('up') )	player.accelerate(0,0,1);
			if( keyboard.pressed('down') )	player.accelerate(0,0,-1);
		}
	});
```

```.perform()``` will be called at every world step.
It accesses ```player``` via
[closure](https://developer.mozilla.org/en/JavaScript/Guide/Closures)
, read current keyboard state and accelerate in the proper direction.

## Motivation

The need for 3D physics is clear for [marblesoccer](http://marblesoccer.com).
Marble in physics are fun, generic and instinctive for the player.
Ok so how to get a 3D physics engine ?

* **Do it yourself ? **
Well no, it is hard, long and im lazy :)
* **Use an existing one ? **
i tried some and left unimpressed. All those are new experimental stuff.
Documentation is inexistant.
They are issued from existing libraries in other languages and convert them to js, sometime multiple conversions in a row.
I experienced major bugs when i tried. Were those bugs ? Was it me misusing it ?
Quite possible as the doc is inexistant.
All in all, i didnt feel it would be a reliable dependancy for our game.
* **Used a 2D one, like Box2D ? **
Box2D is kind of special.
[Seth Ladd](http://blog.sethladd.com/) recently did
[a](http://blog.sethladd.com/2011/09/box2d-collision-damage-for-javascript.html)
[lot](http://blog.sethladd.com/2011/09/box2d-impulse-and-javascript.html)
[of](http://blog.sethladd.com/2011/09/box2d-with-complex-and-concave-objects.html)
[good](http://blog.sethladd.com/2011/09/box2d-and-polygons-for-javascript.html)
[things](http://blog.sethladd.com/2011/09/box2d-web-workers-better-performance.html)
to explain box2D. Ok, box2D is a converted one but it is of very good quality.
So why not using box2D ?
Well because it is 2D and we do 3D.
Quite an insight, hey :)
It would be such a tough limitation.
This webgl + box2D strategy can produce excelent results tho, like this
[game demo](http://game.2x.io/) from [@einaros](http://twitter.com/#!/einaros).
Take a close look at the physics when object move, it is amazingly
realistic and it is all box2D.
* **Ask somebody else to do it ? **
We got a *winner!* [@pyalot](http://twitter.com/#!/pyalot) from [codeflow.org](http://codeflow.org/) 


## Credits
All images are from [wikipedia](http://en.wikipedia.org). All hard work is from [@pyalot](http://twitter.com/#!/pyalot)

## Conclusion

This is the first post about physics.
It presented microphysics.js API.
Thus you can start playing with it immediatly.
More posts will come shortly.
At least, one about performance and another one on how to easily bind microphysics to your three.js game.
That's all folks.
Have fun with microphysics.js :)

