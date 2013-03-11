---
layout: post
title: "Lets Make a 3D Game: Make It Embedded"
date: 2011-11-21 16:32
comments: true
categories: [tutorial3dgame, THREEx, html5]
---

<iframe src="http://marblesoccer.com"
	allowfullscreen webkitallowfullscreen mozallowfullscreen
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

This post is part of the ["Let's make a 3D game"](/blog/categories/tutorial3dgame/) series.
The previous post was on
[fullscreen API](/blog/2011/11/17/lets-make-a-3d-game-make-it-fullscreen/).
Here is another one on resizing the display area.
This post is about embedding your game in another page.
It is usefull to include it in a blog, in facebook, iGoogle or other game plateforms.

[MarbleSoccer](http://marblesoccer.com)
now contains all the tricks explained in this post.
*Show dont tell*, you can see it embedded on the left.
Embedding your game implies various things.
As your game is hosted in another page, it likely got a smaller display area.
HTML5
[CSS media query](http://www.w3.org/TR/css3-mediaqueries/)
makes it easy to fit various sizes.
Another part are the
[DOM events](http://en.wikipedia.org/wiki/DOM_events)
from the iframe.
They will be propagated to the host page and may produce undesirable effects.
We see how to shield them.
But first let's see about
[iframe](http://en.wikipedia.org/wiki/HTML_element#Frames)

## Let's go play in an iframe

[iframe](http://en.wikipedia.org/wiki/HTML_element#Frames)
is an easy and secure way to embed a page in another.
Let's declare it.

```html
	<iframe src="http://marblesoccer.com"
		allowfullscreen webkitallowfullscreen mozallowfullscreen
		width="480" height="320" frameborder="0">
	</iframe>
```

<!-- more -->

The attributes are pretty classics: ```frameborder``` to remove an ugly default border,
```width``` and ```height``` for size and ```src``` for your game page.
The ones ending with ```allowfullscreen``` tell the browser that this iframe is
allowed to go fullscreen. More about fullscreen in this
[previous post](/blog/2011/11/17/lets-make-a-3d-game-make-it-fullscreen/)
or in the [spec](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html).

You may need to determined if your game is embedded or not.
Use this line will tell if it is in a iframe or not.

```javascript
	var isInIframe	= (window != window.top);
```

## Fit in a smaller display area

When your game is embedded, it is likely to have a smaller display area.
How to deal with this ?
First, we have 2 types of rendering in our game:
a 3D display where
[three.js](https://github.com/mrdoob/three.js/)
displays the
[WebGL](http://en.wikipedia.org/wiki/WebGL), and
a DOM display for
[OSD](http://en.wikipedia.org/wiki/On-screen_display)
such as score, timers and other popups.

For *3D rendering*, we have already seen window resizing in
[this post](/blog/2011/08/30/window-resize-for-your-demos/).
Just download
[THREEx.WindowResize](/data/THREEx/THREEx.WindowResize.js)
and add this line and you are done. Not too hard, hey.

```javascript
	THREEx.WindowResize(renderer, camera);
```

Now *the DOM display*. It may simply be done via CSS
and
[media queries](http://www.w3.org/TR/css3-mediaqueries/).
Typically, you may reduce the size of your font or icons.
I won't try to teach css, other do that much
[better](https://developer.mozilla.org/en/CSS/Media_queries)
[than](http://www.html5rocks.com/en/mobile/mobifying.html#toc-mediaqueries)
[me](http://thinkvitamin.com/code/media-queries-width-and-height-video-tutorial/).
Just a pick of what i did, not sure at all it is the best way.
I reduce the OSD display if your game page is 640px or less.

```css
	@media all and (max-width: 640px) {
		/* here put your style specific for embedded case */
		body { font-size : 60%; }
		img { width : 48px; }
	}
```

## Shield Events

Strange section title, hey.
It means *prevents DOM events from the iframe to interfere with the host page*.
Not much clearer...
Maybe with an example ? Let's see the arrows+scroll case.
Show dont tell.
Below are 2 iframes: on the left, no shielding happens, on the right shielding happens.
Try to click on them and use arrows up/down.

<iframe src="/data/THREEx/examples/threex.embedded/noshield-iframe.html" width='50%' height='120px'></iframe>
<iframe src="/data/THREEx/examples/threex.embedded/withshield-iframe.html" width='49%' height='120px'></iframe>

On the left, the host page scrolls, but not on the right.
Why does this happen ? good question :)
If our game iframe got the focus and users press up or down, the iframe will received
[keydown/keyup events](http://www.quirksmode.org/dom/events/keys.html).
Up to now, all is ok...
Troubles appear when those events are bubbling to the host page, they may trigger a scrolling.

Imagine the page going up and down while you play, the game becomes unplayable very fast :)
So here is the code which prevents this behavior. It listens to arrows
[keydown events](http://www.quirksmode.org/dom/events/keys.html).
and prevent their default.

```javascript
	document.addEventListener('keydown', function(event){
		// if it is keydown on a arrow, prevent default
		if( event.keyCode >= 37 && event.keyCode <= 40 ){
			event.preventDefault();
		}
	}, true);
```

## Conclusion

I gathered the code in
[threex.embedded](/data/THREEx/threex.embedded.js),
see its
[annoted source](/data/THREEx/docs/threex.embedded.html).
Iframe is a easy and secure way to make your game embeddable.
We have seen how to handle smaller display area
with
[THREEx.WindowResize](/data/THREEx/THREEx.WindowResize.js)
and
[media queries](http://www.w3.org/TR/css3-mediaqueries/).
Additionnaly we even shield DOM events, so we can use arrow keys for player control.
You are all set! Go embed your game now :)



