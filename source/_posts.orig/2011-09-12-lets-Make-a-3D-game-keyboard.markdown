---
layout: post
title: "Let's Make a 3D Game: Keyboard"
date: 2011-09-12 17:31
comments: true
categories: [tutorial3dgame, three.js]
---

This post is the first of a series **Let's Make a 3d game**.
The [series](/blog/categories/tutorial3dgame/) will walk you down the path of
game developement.
It will describe the various parts of a web game: input handling, map generation,
collision, physics, sounds, graphics etc...
Obviously we will glue them to make an actual game. Quite a bit of work
but im super excited !

It will be a [marble](http://en.wikipedia.org/wiki/Marble_Madness)
game. Not sure which kind yet, but they are
[many](http://www.youtube.com/results?search_query=marble+video+game).
I did [pacmaze](http://pacmaze.com), a pacman in 3D  and [buddymaze](http://buddymaze.com),
a multi-player first personn shooter. But this one gonna be from scratch, thus we will
discover things as together :)

We will try to code each part of the game to be as reusable as possible.
The first part will be the **keyboard handling**. It isnt the hardest, nor the most important, but it is
super simple. Perfect to get us started.

## Let's get started

In a game, a keyboard handler is a bit special. Usually this is done with events
, e.g. [jQuery.bind()](http://api.jquery.com/bind/)
or [hotkeys](https://github.com/jeresig/jquery.hotkeys).
But we are doing a game and all games revolve around a [game loop](http://en.wikipedia.org/wiki/Game_programming#Game_structure).
So the keyboard must be queryable at any time during this loop, as opposed
to [event-driven](http://en.wikipedia.org/wiki/Event-driven_architecture).
Our code should keep tracks of which key and which modifier is pressed.
Let's call it *KeyboardState*.

## Let's include the script

You download it from [here](/data/THREEx/THREEx.KeyboardState.js) and include
it in your page like this

```html
	<script src='THREEx.KeyboardState.js'></script>
```

<!-- more -->

## How to use it ?

Now that the script is included, create a ```keyboard``` variable like this.

```javascript
    var keyboard = new THREEx.KeyboardState();
```

After that you can query the current status of the keyboard with ```.pressed("W")```. For
example if you want shift+H to display help, do the following.

```javascript
    if( keyboard.pressed("shift+H") )     displayHelp();
```

If you ever want to stop listening to the keyboard, just use this line

```javascript
    keyboard.destroy()
```

## Conclusion

For more details on [THREEx.KeyboardState](/data/THREEx/THREEx.KeyboardState.js),
see its [annoted source](/data/THREEx/docs/THREEx.KeyboardState.html).
We have seen it is quite simple to use. 
Ok now we got the keyboard handling for our game. Nice but it seems a bit virtual for now.
But i think the game will become more concret when we gonna have stuff moving on the screen.
