---
layout: post
title: "Three.js Inspector in Chrome Devtools: v1.2.5 Released"
date: 2015-08-13 14:33
comments: true
categories: [three.js, debug, devtools]
---


Hey everybody, 

We recently [announced three.js inspector](http://learningthreejs.com/blog/2015/07/30/three-dot-js-inspector-in-chrome-devtools/). This chrome devtools extension allows you to inspect the three.js within your page, directly from devtools.

It is also a great debugging tool! With it you can learn how three.js demos are made, interact with them and modify their parameters. You can grab it on [chrome web store](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi) and give it a try. It is definitely fun to work on :) We had some long week ends with sleepless nights, and now the [Three.js Inspector 1.2.5](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi) is released ! 

### [Install THREE.js Inspector](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi)

<iframe width="420" height="315" src="//www.youtube.com/embed/q-c0i0nQn5M" frameborder="0" allowfullscreen></iframe>

<!-- more -->


Some of these new features include cool stuff with textures, material shading, shadow casting and practical exporting and tuning options. We will be writing posts to highlight each of these new features. Here is the ChangeLog with the features recently added to version [Three.js Inspector 1.2.5](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi), revised and improved. 

### ChangeLog

* massive cleanup of the scene capture code
* added range limit to material.opacity
* added ability to create a texture from material popup menu
* added export-in-console for material and geometry
* added upload support for texture
* added dragdrop support for texture
* added "about" tab
* added texture.sourceFile it is now possible to change texture
  * external texture needs to be on a CORS server
* added 'visibility toggle'/'export to console' and better css on treeview
* added an object is now relative to the selected parent
  * better controls over the scene tree when you build something
* added support for face material
* added texture.anisotropy
* added texture handling - repeat/offset/wrapS/wrapT
* added help button linking to three.js documentation
  * good for learning
* added object3d.castShadow / receiveShadow
* added material.shadding
* added left/right/top/bottom for ortho camera
* fixed Sprites crash + castShadow support
* added viewVertices + viewFaces in geometry menu
* added a Config.js and save autoRefresh
* added bounding sphere in geometry
* added linewidth, dashSize in material
* added auto refresh to on by default
* fixed bug in case of typedGeometry, PointCloud
* 'export in console' in object3d inspector popup menu
* implemented a tab for setting
* added autoRefresh setting to periodically refresh the inspector
* added the 'no' panels for a better visibility in the UI
  * simply show it with a object3d selected and without
* uniform live tuning for shader material
* implemented better number tuning with the mouse. 
  * if shift is pressed, it goes 10 times faster
  * it meta is pressed, it goes 100 times faster
  * if shift+meta are pressed, it goes 1000 times faster

Do not hesitate to try it out. If you have any suggestions, feedback or questions please contact us. 

Thanks for sharing this project :) 
