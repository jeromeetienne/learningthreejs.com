---
layout: post
title: "Let's Make a 3D Game: Map Editor"
date: 2011-09-14 19:07
comments: true
categories: [tutorial3dgame, three.js]
---

This is a new article of the "Let's Make a 3D Game" [series](/blog/categories/tutorial3dgame/).
In the previous one, we focused
on [keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/). We will
focus on *map editor* for this one.
In most games, the player moves around a map, sometime they are
called [levels](http://en.wikipedia.org/wiki/Level_\(video_gaming\)).
*Maps* are a key part of a game. They describes the world the player lives in,
its rules, its limits, its geography.
Additionnaly when a player completes a map, he
goes in another better/harder map. It gives a sense
progression which is fun. Players like fun things :)

## So let's make a map editor

{% img right /data/lets_make_a_game_map_editor/images/200px-Voxels.svg.png Example %}

So i searched for a way to do map for our *marble game*.
I wanted something **very reusable and hackable**,
something you could easily use in your own games.
I picked [voxels](http://en.wikipedia.org/wiki/Voxel).
The illustration from [wikipedia](http://en.wikipedia.org/wiki/File:Voxels.svg)
on the right, may help understanding.
They are easy to code, simple to understand, yet efficient and flexible.
On top of that, one of [three.js examples](https://github.com/mrdoob/three.js/tree/master/examples) is a
[voxel painter](http://mrdoob.github.com/three.js/examples/webgl_interactive_voxelpainter.html)
in WebGL. So most of the work was already done for us!

Only two features were missing to make it a [map editor](http://en.wikipedia.org/wiki/Level_editor). 
**First**, we need to load and save those maps.
Thus we can edit those maps, and tune them until to get a good [gameplay](http://en.wikipedia.org/wiki/Gameplay).
**Second**, the map must be composed of various type of cubes.
Different type of cubes will have different purposes in the game. e.g. one cube
may be wood or be water, one may make your explode on contact, one may
make you teleport, anything you want.
So i did those modifications and came up with
this [editor](http://jeromeetienne.github.com/marbleGame/editor).

<!-- more -->

## Now Let's Use This Editor

{% img right /data/lets_make_a_game_map_editor/images/webgl-rocks.png Example %}

The [editor](http://jeromeetienne.github.com/marbleGame/editor)
got an inline help on top. So it should be rather simple.
Once you are done, you save the map, the editor
will open a window containing a string
describing the saved data. Just copy this data in a file.
To load it back, you just have to drag/drop this file on the
editor window. It is as simple as that.

## How To Use Saved Maps

You load the file you saved into your javascript.
Maps are stored in [JSON](http://en.wikipedia.org/wiki/JSON). It is a data format
which fits well with javascript.
"Everything should be made as simple as possible, but no simpler"
as a [cool guy](http://en.wikipedia.org/wiki/Albert_Einstein) said.
So following the [occam razor](http://en.wikipedia.org/wiki/Occam%27s_razor),
this format is just
an [Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array) with
each element is one [Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object)
representing a voxel.
The object properties are: ```x```, ```y```, ```z```being the
coordinates of this voxel, and ```t``` being its type.

## Progress

Yesterday, i started coding [early visuals](http://jeromeetienne.github.com/marbleGame)
for the game. Ok it takes some imaginations to see where it will goes. But it
will improve i promise :)