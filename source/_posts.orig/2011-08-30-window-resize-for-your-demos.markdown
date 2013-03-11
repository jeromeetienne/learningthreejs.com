---
layout: post
title: "Window Resize For Your Demos"
date: 2011-08-30 11:24
comments: true
categories: [THREEx]
---

It is cool when you look at a demo and it is resized automatically
when you change the dimension of the browser's window. To switch it fullscreen
or such.
[THREEx.WindowResize](/data/THREEx/THREEx.WindowResize.js) is an little piece of code.
It helps you do exactly that on your own demos in a single line.

## Let's include the script

You download it from [here](/data/THREEx/THREEx.WindowResize.js) and include
it in your page like this

```html
	<script src='THREEx.WindowResize.js'></script>
```

<!-- more -->

## Let's use it

Now that the script is included, simply call the following line, and you are done!
Your renderer will follow the window size.

```javascript
	THREEx.WindowResize(renderer, camera);
```

As usual you got a ```renderer``` and a ```camera``` variable, just pass
them to the function and they will be updated on window resize. 

## Conclusion
For more details, see the [annoted source](/data/THREEx/docs/THREEx.WindowResize.html) of 
[THREEx.WindowResize](/data/THREEx/THREEx.WindowResize.js).

