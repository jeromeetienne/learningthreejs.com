---
layout: post
title: "Closing The Gap Between HTML And WebGL"
date: 2013-04-23 11:11
comments: true
categories: 
---

Wouldn't that be cool if we were able to mix normal Web page in our webgl? To interact with them as we usually do? to viewthem,  to click on them... To scroll,  to hover or even to type in input tag. 
Oh yeah it would be so great! We,  webgl people, are currently an isolated Island in the web world.  Being able to mix with normal page would give us access to so much interactive content.
In this post,  we gonna see how to do exactly this: how to seamlessly mix normal DOM elements in our webgl scene.  They will actually  appear as part of the 3d scene. Don't worry it is surprisingly easy with three.js.


<center>
  <iframe width="425" height="349" src="http://www.youtube.com/embed/837O1YloCRc" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## Demo of a youtube browser mixed in WebGL

First let's see the result in action. Here is a demo I did to show all the videos I do for this blog. [Try it out](http://jeromeetienne.github.io/videobrowser4learningthreejs)! 
It shows a 3d scene with a tv set and three characters sitting on grass. The key point is on the tvset screen. This is an actual YouTube player. Not me emulating it, this is the real thing! You can access it anytime from the blog navigation bar.
(See screenshot on the right)

Pretty cool no? Now let's see how to do this

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

So first, how to orientate a dom element, would you ask? 
Simple we gonna use a feature introduced by HTML5, 
[css 3D transformation](http://www.w3.org/TR/css3-transforms/).
Here are some [tutorials](http://www.html5rocks.com/en/tutorials/3d/css/)
[about](http://desandro.github.io/3dtransforms/)
[it](https://developer.mozilla.org/en-US/docs/CSS/Tutorials/Using_CSS_transforms).
css3d is done for this exact purpose, to position and rotate a DOM element in 3d.

Good News! three.js can already render things using this technology.
 It is called [css3drenderer](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CSS3DRenderer.js).
See [various](http://threejs.org/examples/css3d_molecules.html) 
[examples](http://threejs.org/examples/css3d_periodictable.html) 
[using](http://threejs.org/examples/css3d_youtube.html)
[it](http://threejs.org/examples/css3d_panorama.html)
in three.js ```/examples```. 
Now we need to put the same plane on both renderers, WebGL Renderer and CSS3D Renderer.
Here is the code for the plane in 
[WebglRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js)
, wireframe with segments to see thru.

```javascript
var material = new THREE.MeshBasicMaterial({ wireframe: true });
var geometry = new THREE.PlaneGeometry();
var planeMesh= new THREE.Mesh( geometry, material );
```

Now that we got the plane in place, here is the code for the domelement in css 3d.
Notice how we reference the same position and rotation as the ```planeMesh```

```javascript
// create the dom Element
var element = document.createElement( 'img' );
element.src = 'textures/sprites/ball.png';
// create the object3d for this element
var cssObject = new THREE.CSS3DObject( element );
cssObject.position = planeMesh.position;
cssObject.rotation = planeMesh.rotation;
// add it to the css scene
cssScene.add(cssObject);
```

All seems to go well. 
We got the same plane in css and webgl. now we need to see the rotated dom element behind the webgl plane
So let's use webgl renderer and css3d renderer together.
We use css on the page to put cssRenderer exactly behind webglRendererer.
Thus they look the same to the viewer. Something along this line

```javascript
var cssRenderer = new THREE.CSS3DRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
```

#### meta
* (Screenshot of each steps)
* lack of screenshot .... unclear
* to review

## Blending them together
We are in good shape but not yet done. We still need to make both react as if they were one. 
What happen if we add a 3d object in front of webgl three.plane? As you can see on the right,  It looks Ok.
What if we put this object behind it? Hmm not so good. The object is behind the Plane, good.
But it is in front of the rotated dom element. It should appear as if it were behind but it doesnt.
Why that? It is due to the webgl z-buffer. 
It displays our torus because it thinks the torus is the closest to the camera.
It is not aware that our THREE.PlaneGeometry acts as a see thru to make our css3d visible.
So that nothing behind thethe THREE.PlaneGeometry should be displayed.
How to fix this, would you ask? We gonna use a tricky part of Webgl: the blending.

When you are doing blending, we use a blend function to combine the colors from both the existing and the new fragments
to make an entirely new fragments. 
What is it ? it is the way to dertermine the colors of a pixel (fragment in technical term) when you add a new pixel.
So when doing blending, we use a blend function to combine the colors from both the existing and the new fragments
to make an entirely new fragment.
It is a weird beast using several WebGL calls and many equations. The total number of possibilities is scary :) An complete explanation of blending is way out of thescope of this post. For more detail, see 
["WebGL Beginner's Guide"](http://www.amazon.com/WebGL-Beginners-Guide-Diego-Cantor/dp/184969172X)
from 
[Brandon Jones](http://blog.tojicode.com/), a great book to start with raw WebGL.
To get a feel of blending,  you can play with them in 
[this example](http://threejs.org/examples/webgl_materials_blending_custom.html).

The one which interest us is called ```THREE.NoBlending```. 
When drawing the face, it will completely ignore the color below and set it to the color of the face.
So if we put our face color to black aka 0, 0, 0 and opacity to 0, we gonna obtained what we want.
The plane will act as a see thru to the dom element below. Here is how to init your material.

```javascript
var material	= new THREE.MeshBasicMaterial();
material.color.set('black')
material.opacity	= 0;
material.blending	= THREE.NoBlending;
// any mesh using this material will act as a see-thru to the css renderer
```

* (Provide Screenshot for each step and alternative)
* Then we are done ! We got a actual dom element seamlessly integrated in our webgl scene!  Let's pet our back,  i think this is an important step!
* (Here put the paragraph in Webgl)















