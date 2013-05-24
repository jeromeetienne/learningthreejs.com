---
layout: post
title: "Mixing HTML pages inside your WebGL"
date: 2013-04-30 11:11
comments: true
categories: [three.js]
---

Wouldn't that be cool if we were able to mix normal web pages in our webgl? To interact with them as we usually do? to view them,  to click on them... To scroll, to hover or even to type in input tags. 
Oh yeah it would be so great! We, webgl people, are currently an isolated Island in the web world.  Being able to mix with normal page would give us access to so much interactive content.
In this post,  we gonna see how to do exactly this: how to seamlessly mix normal DOM elements in our webgl scene.  They will actually  appear as part of the 3d scene. Don't worry it is surprisingly easy with three.js.

<center>
  <iframe width="425" height="349" src="http://www.youtube.com/embed/ScZcUEDGjJI" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Demo of a youtube browser mixed in WebGL

{% img right /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/navigation-bar-small.png %}

First let's see the result in action. Here is a demo I did to show all the videos I have done for this blog. 
[Try it out](http://jeromeetienne.github.io/videobrowser4learningthreejs)! 
It shows a 3d scene with a tv set and three characters sitting on grass.

<a href='http://jeromeetienne.github.io/videobrowser4learningthreejs/' target='_blank'><input type="button" value='Try Learningthree.js video browser!' style='font-size:200%' /></a>
<a href='/data/2013-04-30-closing-the-gap-between-html-and-webgl/index.html' target='_blank'><input type="button" value='Try Demo!' style='font-size:200%' /></a>

The key point is on the tvset screen. This is an actual YouTube player. Not me emulating it, this is the real thing! You can access it anytime from the blog navigation bar as 
you can see on the right.
This 
[demo](http://jeromeetienne.github.io/videobrowser4learningthreejs)
is pretty cool no? Now let's see how to do this.

## Let's Get Started
DOM elements are all about flat 2d rectangles. In 
[three.js](http://threejs.org/)
, such a thing is called a 
[THREE.PlaneGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js).
So let's try to map a 
[dom element](https://developer.mozilla.org/en/docs/DOM/element)
to a 
[THREE.PlaneGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js).
Their position and rotation must match.
The goal is to make them appear as one thus the viewer can't distinguish them.

So first, how to orientate a dom element, would you ask? 
Simple we gonna use a feature introduced by HTML5, called
[css 3D transformation](http://www.w3.org/TR/css3-transforms/).
Here are some [tutorials](http://www.html5rocks.com/en/tutorials/3d/css/)
[about](http://desandro.github.io/3dtransforms/)
[it](https://developer.mozilla.org/en-US/docs/CSS/Tutorials/Using_CSS_transforms).
css3d is done for this exact purpose, to position and rotate a DOM element in 3d.

{% img right /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/grid-only-small.png %}

Good News! three.js can already render things using this technology.
 It is called [THREE.CSS3DRenderer](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CSS3DRenderer.js).
See [various](http://threejs.org/examples/css3d_molecules.html) 
[examples](http://threejs.org/examples/css3d_periodictable.html)
of 
[its](http://threejs.org/examples/css3d_youtube.html)
[usage](http://threejs.org/examples/css3d_panorama.html)
in three.js ```/examples```. 
Now we need to put the same plane on both renderers, WebGL Renderer and CSS3D Renderer.
Here is the code for the plane in 
[WebGLRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js)
, wireframe with segments to see thru.

```javascript
// create the plane mesh
var material = new THREE.MeshBasicMaterial({ wireframe: true });
var geometry = new THREE.PlaneGeometry();
var planeMesh= new THREE.Mesh( geometry, material );
// add it to the WebGL scene
glScene.add(planeMesh);
```

Now that we got the plane in place, here is the code for the DOM element in css 3d.
Notice how we reference the same position and rotation as the ```planeMesh```, thus
they will move together.

```javascript
// create the dom Element
var element = document.createElement( 'img' );
element.src = 'textures/sprites/ball.png';
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
// we reference the same position and rotation 
cssObject.position = planeMesh.position;
cssObject.rotation = planeMesh.rotation;
// add it to the css scene
cssScene.add(cssObject);
```

{% img right /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/grid-css-small.png %}

All seems to go well. 
We got the same plane in css and webgl. Now we need to see the dom element behind the webgl plane.
To do this, let's use webgl renderer and css3d renderer together on the same page.

We use stylesheet to put css renderer exactly behind the webgl one.
Thus they look the same to the viewer, as you can see on the right. 
Use the following line to obtain the same result.

```javascript
var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
```

{% img right /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/object-inmiddle-small.png %}
{% img left /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/object-infront-small.png %}

We are in good shape but not yet done. We still need to make both react as if they were one. 
What happens if we add a torus 3d object in front of webgl plane? As you can see on the
left, it looks Ok. 
What if we put this object behind it? Hmm not so good. As you can see on the right, the object 
is behind the Plane,
but it is in front of the dom element. It should appear as if the torus were behind but it doesn't.
Why's that? It is due to the webgl 
[z-buffer](http://en.wikipedia.org/wiki/Z-buffering). 

It displays our torus because it thinks the torus is closer to the camera than the DOM element.
It's not aware that our webgl plane should act as a see-thru to make our css3d visible.
So nothing behind our webgl plane should be displayed.
How to fix this, you would ask? We're gonna use a tricky part of webgl: the blending.

## Blending them together
 
What is blending ? It is the way to determine the color of a pixel when you add a 
new pixel (fragment in technical terms).
So when doing blending, we use a blend function to combine the colors from both the 
existing and the new fragments to make an entirely new fragment.

It is a weird beast using several WebGL calls and many equations. The total number of possibilities is scary :) 
A complete explanation of blending is way out of scope of this post. For more detail, see 
["WebGL Beginner's Guide"](http://www.amazon.com/WebGL-Beginners-Guide-Diego-Cantor/dp/184969172X)
from
[Brandon Jones](http://blog.tojicode.com/), a great book to start with raw WebGL.
To get a feel of blending,  you can play with them in 
[this example](http://threejs.org/examples/webgl_materials_blending_custom.html).

{% img right /data/2013-04-30-closing-the-gap-between-html-and-webgl/screenshots/object-behind-small.png %}

The one which interest us is called ```THREE.NoBlending```. 
When drawing the face, it will completely ignore the color below and set it to the color of the face.
So if we put our face color to black aka ```(0, 0, 0)``` and opacity to ```0```, we gonna obtained what we want.
The plane will act as a see-thru to the dom element below. Here is how you initialize your material.

```javascript
var material	= new THREE.MeshBasicMaterial();
material.color.set('black')
material.opacity	= 0;
material.blending	= THREE.NoBlending;
// any mesh using this material will act as a see-thru to the css renderer
```

Then we are done ! We got a actual dom element seamlessly integrated in our webgl scene!  Let's pet our back,  i think this is an important step!

## HTML And WebGL Sitting Together In A Tree ?
Well, not quite unfortunatly...
WebGL is 3d inside a [canvas element](http://en.wikipedia.org/wiki/Canvas_element)
and a canvas is a black box from the html page point of view.
You can't bind [DOM events](http://en.wikipedia.org/wiki/DOM_events) inside canvas.
You can't have 
[stylesheet](http://en.wikipedia.org/wiki/Style_sheet_\(web_development\))
to change canvas content.
You can't put dom elements inside your canvas. 
Those two don't talk to each other.

Unfortunatly it isn't all pink, WebGL and HTML aren't really merged.
This is only a nice trick. It has some limitations.
For example, the dom element is rotated using [css 3d](http://example.com/TODO). 
This is a fairly new technology. 
So you may hit bugs.

Moreover, it only appears as a part of 3d... but this remains plain DOM.
So it doesn't benefit from webgl specific display.
For example, it is impossible to get 
[post processing](http://example.com/TODO)
on the dom element.
Indeed, this technic is applied in 2d on the rendered scene and the DOM element is not in it.
Additionally the dom element won't share the lighting as the rest of your webgl scene.
Nevertheless, [css shader](http://example.com/TODO) allows you to apply shader on normal DOM element,
so it may be possible to make a coherent lighting.
The web is so beautiful nowadays!

### Conclusion
Congratulations guys! You can now mix html pages with your webgl content. You have learned how to close the gap between HTML and WebGL. It is a new way to experience and to interact with webgl 3d. 

I love this new trick.
I've been trying to make webgl easier for while now.
My strategy has been to make it closer to what webdevs know today,
copying [jQuery API on top of three.js](http://jeromeetienne.github.com/tquery/),
emulating [dom events inside webgl scene](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/)
or even making [3d text act as web links](http://learningthreejs.com/blog/2012/02/27/linkify-tquery-extension/).
To integrate actual web pages inside webgl scene definitly matches this vibe!

That's all for today, have fun :)











