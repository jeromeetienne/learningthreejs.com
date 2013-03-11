---
layout: post
title: "Particles: Introduction to Sparks.js"
date: 2011-12-14 12:08
published: true
comments: true
categories: [three.js, library, sparks.js, particles]
---

This post is the first of a [serie on particles](/blog/categories/particles).
It specifically is about 
[sparks.js](https://github.com/zz85/sparks.js).
*sparks.js* is lightweight 3d
[Particle system](http://en.wikipedia.org/wiki/Particle_system)
in javascript, for use with
[three.js](https://github.com/mrdoob/three.js/)
and
[tween.js](https://github.com/sole/tween.js).
It is from
[zz85](http://www.lab4games.net/zz85/blog/)
who already did
[3D text](http://mrdoob.github.com/three.js/examples/webgl_geometry_text.html)
and
[Catmull Clark subdivision](http://mrdoob.github.com/three.js/examples/webgl_geometry_subdivison.html).
a productive guy :)

The [demo](http://mrdoob.github.com/three.js/examples/webgl_particles_shapes.html)
below is one of the many [three.js examples](https://github.com/mrdoob/three.js/tree/master/examples).
While im on it, the [example directory](https://github.com/mrdoob/three.js/tree/master/examples) is a gold mine.
Go dig in it to understand how to code three.js :)
Back to the point, this
[demo](http://mrdoob.github.com/three.js/examples/webgl_particles_shapes.html)
is rather cool no ?
You want to do the same ?
During this short post, let me walk you walk thru the code for particles in this example.

<!-- more -->

<iframe src="http://mrdoob.github.com/three.js/examples/webgl_particles_shapes.html" width="100%" height="420" frameborder="0"></iframe>

## Lets Get Started

So lets see how to use it. First step, you download
[sparks.js](https://raw.github.com/zz85/sparks.js/master/Sparks.js)
from
[its github](https://github.com/zz85/sparks.js).
Then include it in your own code.

```html
	<script src="Sparks.js"></script>
```

First a few words on what is a [particle system](http://en.wikipedia.org/wiki/Particle_system).
It is usually composed of 2 big parts: the *emitter* and the *particle* itself.
Emitter creates particles.
Particles are usually smallish objects on the screen.
As you got many particles at the same time, they appears a single mass.

<!-- more -->

## Let's create an emitter

First we create the emitter like this.
```emitter``` is the main object we will play with.

```javascript
	var counter	= new SPARKS.SteadyCounter( 500 );
	var emitter	= new SPARKS.Emitter( counter );
```

```counter``` controls how frequently particles are created. Here it will
emit 500 particles per seconds.
Now let's start emit particles.

```javascript
	emitter.start();
```

Sparks.js has a very flexible core.
It mainly uses two stacks of functions.
*Initializers* is the stack run at the creation of a particle.
*Actions* is another stack which is run at every step of a particle life.
Those functions are run in order.
Up to you to configure them to fit your needs.
You can easily code your own *initializer* or *action*.
Dont worry it got a bunch of predefined ones.

## Let's initialize

Lets me walk you thru the ones used in our example. The whole stack is below.
```emitter.addInitializer()``` to push a new initializer, and ```emitter.removeInitializer()```
to remove it, not too hard :)


```javascript
	emitterpos = new THREE.Vector3( 0, 0, 0 );
	emitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
	emitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
	var vector = new THREE.Vector3( 0, -5, 1 );
	emitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( vector ) ) );
```

```SPARKS.Position(zone)``` initializer set the original position of the particle.
A ```zone``` provide a location in space.
```new SPARKS.PointZone( emitterpos )``` means the particles will always start from this specific point in space.
It is possible to have other zones.
For example, ```SPARKS.LineZone( startVector3, endVector3 )``` represents a line between 2 points, so
your particle would start anywhere on this line.


```SPARKS.Lifetime(mintime, maxtime)``` initializer set particle's lifetime.
You can specify a range and a random value will be assigned.
Don't forget to add ```SPARKS.Age``` action to handle its lifetime.
And the last one.
```SPARKS.Velocity(zone)``` set particle's velocity based on a ```zone``` location.
The initializer stack is setup the particle at the begining of its life.
Let's see what happen during this life.

## Let's do some actions

Actions are performed at every step of a particle life.
Same as with initializers, ```emitter.addAction()``` to push a new action,
```emitter.removeAction()``` to remove it.
For our examples the whole action stack is this.

```javascript
	emitter.addAction( new SPARKS.Age() );
	emitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
	emitter.addAction( new SPARKS.Move() );
	emitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
```

Now lets details it.
We have already seen ```SPARKS.Age()```. It is handle the lifetime of each particle.
```SPARKS.Accelerate(x,y,z)``` changes the velocity by adding a fixed amount at every step.
This one produces a gravity effect with a negative ```y```.
```SPARKS.Move()``` makes the particles move in our 3D space.
```SPARKS.RandomDrift(x,y,z)``` changes the velocity by adding a random amount at every step.

## Conclusion

I hope this short introduction got you excited about
[sparks.js](https://github.com/zz85/sparks.js/).
Next posts on the
[particle series](/blog/categories/particles)
may be a UI editor, stay tuned!
I find sparks.js clean and flexible.
Flexibility is very important for particles.
It helps provide a wide variety of effect in your games/demos.
For more informations and authoritative answer, see the
[github repository](https://github.com/zz85/sparks.js/).
That's all for today folks, have fun.

