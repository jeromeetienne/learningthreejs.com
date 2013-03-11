---
layout: post
title: "Lets Make a 3D Game: Make It Fullscreen"
date: 2011-11-17 07:59
comments: true
categories: [tutorial3dgame, THREEx, html5]
---

This post is part of the ["Lets make a 3D game"](/blog/categories/tutorial3dgame/) series.
It is about the [fullscreen API](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html).
This API allows to make DOM elements fullscreen.
Fullscreen is quite important for games.
It provides a larger display so a more immersive experience for your players.
All that from javascript, so no more needed to ask "please f11" to your
players, isnt that sweet ? :)

{% img right /data/lets-make-a-3d-game-make-it-fullscreen/images/fullscreen-icon.png %}

The [fullscreen API](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html)
is still in discussion, but the basics are settled. At the time of this writing, 
it is available in
[firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
[webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/)and
[chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).
It has been already added in [marbleSoccer](http://marblesoccer.com).
The icon is from [The Noun Project](http://thenounproject.com/), a source of nice and clean icons.
Try it out! Click on it to toggle fullscreen state. If you dont see the icon, your browser
doesn't yet have the fullscreen API.

<center>
	<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="320" src="http://marblesoccer.com" frameborder="0"></iframe>
</center>


Ok now is time for code :)

## Let's get started

As usual, i provide a little helper to make it easier for you to include it in
your games. It is called [THREEx.FullScreen.js](/data/THREEx/THREEx.FullScreen.js).
It hides the prefix of each vendor and the little discrepencies between their API
implementation.
You download this file from [here](/data/THREEx/THREEx.FullScreen.js) and include
it in your page like this

```html
	<script src='THREEx.FullScreen.js'></script>
```

<!-- more -->

## How to use it ?

The API is simple, only 4 calls. Lets see them one by one.
To test if it is possible to have fullscreen on your system, do

```javascript
	THREEx.FullScreen.available();
```

To test if fullscreen is currently activated on your page

```javascript
	THREEx.FullScreen.activated();
```

To Request fullscreen on a given element, just do

```javascript
	THREEx.FullScreen.request(element);
```

If element isnt provided, it defaults to ```document.body```.
To cancel fullscreen on your page, use this line.

```javascript
	THREEx.FullScreen.cancel();
```

Quite straight forward, no ? :) As an example, let's make a toggle, the same used
in [marbleSoccer](http://marblesoccer.com).

```javascript
	if( THREEx.FullScreen.activated() ){
		THREEx.FullScreen.cancel();
	}else{
		THREEx.FullScreen.request();
	}
```


## What about the standard ?

There is a [w3c proposal](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html) in dicussion.
John dyer has written an in-depth [summary](http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/).
Mozilla provides details on [their API](https://wiki.mozilla.org/Gecko:FullScreenAPI).
At the time of this writing
It is available in
[firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
[webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/)
and
[chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).



## Conclusion

For more details on [THREEx.FullScreen](/data/THREEx/THREEx.FullScreen.js),
see its [annoted source](/data/THREEx/docs/THREEx.FullScreen.html).
It is a simple to add in your game.
It provides a more immersive experience to your players.
On a related subject, we will soon likely do a post about embedding your game in another page.
It is usefull when you want to include it in a blog, in facebook or other game plateforms. 

