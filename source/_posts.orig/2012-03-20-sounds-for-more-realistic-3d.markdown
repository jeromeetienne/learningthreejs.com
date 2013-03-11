---
layout: post
title: "tQuery WebAudio for More Realistic 3D"
date: 2012-03-20 01:08
comments: true
categories: audio, threejs, tquery
---

This post is about
[Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html).
It is a new HTML5 api which provide great controls on the audio layer.
It is much better than the
[audio tag](http://www.w3.org/TR/html5/the-iframe-element.html#the-audio-element).
It is more suitable for games or music software.
As 3D lovers, the one feature that we care about is
[audio spacialization](http://en.wikipedia.org/wiki/3D_audio_effect).
This makes Web Audio a complement to webgl.
It implements positional sounds, so you
get
[panning](http://en.wikipedia.org/wiki/Panning_\(audio\)),
[dopler](http://en.wikipedia.org/wiki/Doppler_effect)
and all.
It makes the scene so much more realistic.

The user tends to associate 3D to reality, so efficient 3D is a lot about realism.
The brain identifies 2D as artificial while 3D seems immediatly more natural.
Anything which appears close to reality increase this effect.
Feeding this illusion creates a more immersive experience to the user.
Realistic physics is one (stay tuned :).
Web Audio audio spacialization is another.

The
[screencast](http://youtu.be/QjRF0_KENQ8)
below is a live coding session using ```tQuery.WebAudio```.
If you want, you can experiment with this code in our playground. Just click 
[here](http://bit.ly/GApgWg)
and start coding :)

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/QjRF0_KENQ8" frameborder="0" allowfullscreen></iframe>
</center>

## Background on WebAudio API

To learn about WebAudio API is a large subject.
It is out of the scope of this introduction.
You can refere to many dedicated tutorials tho.
The [specification](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
itself is clear and very readable.

You can find more comprehensive documentation at [html5rocks](html://html5rocks.com).
It contains several very usefull tutorials to learn Web Audio API.
They go from
["Getting started with the web audio API"](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
to
["mixing positional audio and webgl"](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/)
or
["developing game audio"](http://www.html5rocks.com/en/tutorials/webaudio/games/).
If you want, you can find demos in
[chromium samples](http://chromium.googlecode.com/svn/trunk/samples/audio/index.html).

Now let's start coding :)

## Let's get Started

First you need to enable WebAudio into your world. 
Thus you will be able to play sound in it. 

```javascript
    world.enableWebAudio();
```

Now that the world is able to do sound, let's create one

```javascript
    var sound = tQuery.createSound();
```

Now we need to load a sound file and to start playing it. The callback
is notified when the file is downloaded. At this point, the sound
it ready to play.

```javascript
    sound.load('techno.mp3', function(sound){
        sound.play();
    });
```

If you want to know more, the full API is documented 
[here](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.Sound.html)
and
[here](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.html)
thanks to jsdoc.

## Spacialization and Animation

Now that we can play a sound, what else can we do ? One definitively interesting part for
[webaudio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
is the ability to spacialize the sound.
The easiest way to do that is to use ```.follow()``` function. 

```javascript
    sound.follow(object3d);
```

If you want more controls, you can check
```.updateWithObject3d()``` or ```.updateWithMatrix4()```.
You may want to animate your 3D object based on the sound you hear.
For that, a simple function ```.amplitude()``` has been written.
It is likely a naive implementation but it does the trick, i think.

```javascript
    var amplitude = sound.amplitude();
```

It returns an average of low frequencies of the sound.
Note that i dunno if it is the proper term in audio world.
Most likely not :) If you know the proper term, please leave a comment.

## Want more info ?

You get two examples in
[the source](https://github.com/jeromeetienne/tquery/tree/master/plugins/webaudio/examples).
The
[minimal one](http://jeromeetienne.github.com/tquery/plugins/webaudio/examples/)
simply play a sound.
The other is more interactive. It is the
[playground](http://jeromeetienne.github.com/tquery/plugins/webaudio/examples/playground).
It allows to play with various parameters.
tQuery API documentation is provided via
[jsdoc](http://code.google.com/p/jsdoc-toolkit/).
You can find the whole API 
[here](http://jeromeetienne.github.com/tquery/).
The plan is to do the same for the plugins.

So for tQuery WebAudio plugin, you get API documentation of each class: the main class
[tQuery.WebAudio](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.html)
and the
[Sound class](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.Sound.html).
You can even check the
[Node chain builder](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.NodeChainBuilder.html)
doc if you want to go deep and configure your own audio nodes chain :)

## Conclusion

Ok so now you can play sounds in your 3D scene. You can make the sound follows a given
object3d with realistic sound spatialization. All that in just a few lines. Rather cool
if you ask me :)
[Winamp](http://en.wikipedia.org/wiki/Winamp) effects are back !!
Later i will likely implement
click detection as seen
[here](http://www.html5rocks.com/en/tutorials/webaudio/games/#toc-clip-detect)
and environmental effect like 'cathedral', 'telephone' etc...
as seen
[here](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/#toc-enveffects).

I love how sound make our 3D scene more realistic. That's all for today, have fun :)


