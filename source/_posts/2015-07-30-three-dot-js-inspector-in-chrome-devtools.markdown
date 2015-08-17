---
layout: post
title: "Three.js Inspector in Chrome Devtools"
date: 2015-07-30 13:21
comments: true
categories: [three.js, debug, devtools]
---

Hey guys, 

Recently people started to experiment with three.js and Chrome devtools. The excellent [@thespite](https://twitter.com/thespite) first did [Shader Editor Extension](https://github.com/spite/ShaderEditorExtension) and then [Three.js Editor Extension](https://twitter.com/thespite/status/624256879766712320). [@mrdoob](https://twitter.com/mrdoob) did it too [here](https://twitter.com/mrdoob/status/616042217464012800) where he links directly to the [three.js editor](http://threejs.org/editor) itself. The goal is to make an extension which allows to inspect your page when you are debugging three.js. 

All that is very early work, but the concept seems really promising. It will allow to interact with almost all three.js demos out there. It is a great tool to debug your own work, or to understand how a demo is done. You can even use it to fine tune your parameters.

I loved it so I decided to give it a shot. I forked @thespite work and looked at it over the last weekend. I reused the UI layer from the three.js editor, improved the UI a bit, and applied it to the Chrome Dev tools. The implementation still clearly has some quirks, but I love the concept. I believe it can be a very strong tool to debug three.js. 

You can find the [Three.js Inspector Extension](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi) on chrome app store and play with it.


### [Install THREE.js Inspector](https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi)

<iframe width="420" height="315" src="//www.youtube.com/embed/0GQlp9IdLjM" frameborder="0" allowfullscreen></iframe>
