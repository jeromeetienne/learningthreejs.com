---
layout: post
title: "Lets Do a Sky"
date: 2011-08-15 12:26
comments: true
categories: ['webgl', 'basics', 'three.js']
---

This tutorial is about doing a sky. It makes a nice panorama with a nice immersive effect.
This is much simpler than people would expect : only 3 steps for a total around 20 lines.
You can find a [live demo](/data/lets_do_a_sky/lets_do_a_sky.html) of it. It may be a
easy addition to your effects. This is simple and efficient.

# Background

{% img right /data/lets_do_a_sky/images/Panorama_cube_map.png Close up %}
Technically this is called a [cube mapping](http://en.wikipedia.org/wiki/Cube_mapping).
Why that ? because the principle is so simple: we create a large cube, apply some images
on each face of this cube and put the camera inside it. That's it.

The illustration (from [SharkD](http://en.wikipedia.org/wiki/User:SharkD/Images) at [wikipedia](http://en.wikipedia.org/wiki/File:Panorama_cube_map.png))
on the right, may help understanding.
On the *bottom left*, you can see a 3D scene with a dot in the middle... This is
where the camera will be positionned.
On the *bottom right*, you can see the same 3D scene, with the large cube and now the
camera is inside.
The kind of cross *on the top half* are the images used as texture.
Those are the ones which gonna be applied inside the large sky cube. If you go to
the [demo](/data/lets_do_a_sky/lets_do_a_sky.html),
open your browser debugger and look at downloaded images, you will see those 6 images.

<!-- more -->

# Lets Code it Now!

Now that we got an understanding of the background, lets code it. To add a skybox
to your page is 3 simple steps in around 20 lines. Lets look at them.

## Step 1: Lets load the cube textures

This will create the texture objects and download all the images. They are usually stored
in 6 images: *posx* for the front face on X axis, negx for the back side on the X axis, posy
for the front on Y axis and so on. 

``` javascript
    var urlPrefix = "images/Bridge2/";
    var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
        urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
        urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
```

## Step 2: Lets init the shader

Then we init the shader for the cube.
A [shader](http://en.wikipedia.org/wiki/Shader) is a program which run
directly on the graphic card. It uses a special C-like language, run
super fast as it is massively paralelle.
It is rather standard, dont forget to init ```tCube``` uniform
with your textures.

``` javascript
    var shader = THREE.ShaderUtils.lib["cube"];
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms['tCube'].texture= textureCube;	// textureCube has been init before
    var material = new THREE.MeshShaderMaterial({
        fragmentShader	: shader.fragmentShader,
        vertexShader	: shader.vertexShader,
        uniforms	: uniforms
    });
```

## Step 3: Lets Create the Cube Itself

Now we create the large cube. The actual size is up to you. Note that you need to ensure
your camera is able to see that far. 
The last step is to add it to the scene, and we are done. Rather simple for such a cool effect i would say.

``` javascript
    // build the skybox Mesh 
    skyboxMesh	= new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );
    // add it to the scene
    scene.addObject( skyboxMesh );
```

# Conclusion

This tutorial explained how to do a sky using cube mapping. Additionnaly you can look at [an anotated source of the demo](/data/lets_do_a_sky/docs/lets_do_a_sky.html)
especially the [skybox section](/data/lets_do_a_sky/docs/lets_do_a_sky.html#section-10)
of the [live demo](/data/lets_do_a_sky/lets_do_a_sky.html). You may go out with your camera and
do your own cube images. Just use [Hugin](http://hugin.sourceforge.net/) later to stinch them back together.
It takes around 20 lines, quite small source for such
immersive effect. Use it and tweek it for fun :) Examples are there for that.
