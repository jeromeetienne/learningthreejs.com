---
layout: post
title: "An Extension System for three.js"
date: 2012-02-08 15:24
comments: true
categories: [three.js, tquery]
---

  This post an overview of a work-in-progress.
It is about an extension system on top of three.js which mimics jQuery API.
I came up with the idea while thinking about how to
trim three.js and make it easier to maintain. I have always been impressed
with jQuery plugin ecosystem. It is lively, varied,
and contains impressive specimens. I would love to have such
a rich ecosystem for three.js's plugins.

  Let's call this experiment **tQuery** as in "three.js + jQuery".
It makes it easier to understand if you already known this library.
This is a v0 in the
["publish early, publish often"](http://catb.org/~esr/writings/homesteading/cathedral-bazaar/ar01s04.html)
vibe.
The goal of this little project is to see if we can mix
to mix three.js power with jquery API usability...
How far this concept can fly ? We will see.


So what do we want ? The code must make **three.js easy to extend**
and should **mimics jQuery whenever possible**.
In order to see if the system hold under load, i wrote several extensions already.
It is very early. The architecture of it all is far from stable.
Code is advancing at fast pace tho :)
The screencast below is short live coding session. Just to give an idea of the current
status.

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Aa7sHUE224A" frameborder="0" allowfullscreen></iframe>
</center>

## DOM
With jQuery and the
[DOM](http://en.wikipedia.org/wiki/Document_Object_Model), you
get a tree of
[elements](https://developer.mozilla.org/en/DOM/element)
from the page.
In fact, three.js got this tree as well. Surprising hey ?
We just name it a
[scene](https://github.com/mrdoob/three.js/blob/master/src/scenes/Scene.js)
instead of a tree.
And our element are called
[Object3D](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js).
But all that is just a matter of vocabulary.

One one hand, jquery one, you got the dom and its tree of element.
on the other hand, three.js one, you got the scene and its tree of object3D.
Same Thing!

## Chained API
jQuery got a chained API, so tQuery got a chained API. When we said
*copy jQuery whenever possible*, we were not kidding :)

```javascript
    tQuery('.fooKlass').scale(2).translate(1,0,0);
```

## IDs and classes
They got
[Ids](http://api.jquery.com/id-selector/)
and
[classes](http://api.jquery.com/class-selector/)
, or more recently
[data](http://api.jquery.com/data/).
So we did all the same with tQuery.

```javascript
    var cube	= tQuery().createCube();
    cube.id("myId");	// set the id of this element
    cube.addClass('fooKlass');	// add 'fooKlass' class to this cube
    cube.data('goom', 'baa');
```

## Selector
jQuery got selectors so tQuery got selectors too.
Here are the selector based on geometry, they are similar to the
[element selector] in jQuery, e.g. ```jQuery('span')```.

```javascript
    tQuery('sphere');	// select all objects with a sphere gemotry
    tQuery('cube');	// smae with a cube gemotry
    // and so on
```

Here are the one for classes and id.
Note how the syntax is similar to css selector.

```javascript
    tQuery('#myId')	// to get the object with the 'myId' id
    tQuery('.fooklass')	// to get objects with the class 'fooklass'
```

obvious we got compose them like with jQuery

```javascript
    tQuery('.bar.foo')	// objets with the class 'bar' and 'foo'
    tQuery('.bar cube')	// objets with the class 'bar' with a cube as descandant
```

## Events
Obviously jQuery got events, so we got events in tQuery.
we use *domEvents* we saw a few week back in
['dom events in 3D space' post](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/)

```javascript
    tQuery('cube').on('mouseover', function(){
        console.log("somebody put the mouse over a cube");
    });
```

## A Basic Page

<iframe src="http://jeromeetienne.github.com/tquery/plugins/minimal/examples"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="260" height="280" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

This is a minimal page. the code is below, the preview on the right.
Quite short.

```html
    <!doctype html><title>tQuery Basic Page</title>
    <script src="tquery-bundle.js"></script>
    <body>
        <script>

        var world = tQuery.createWorld().fullpage().start();
        var object = tQuery.createTorus().addTo(world);

        </script>
    </body>
```


## Conclusion

This was early presentation of tQuery. I like the idea, we will see how it goes.
The purpose of this experiement is to help those who know jQuery to use three.js.
So they reuse jquery syntax but inside a webgl context.
This is a very early project.
How far is it possible to push this concept of *"three.js power + jQuery API usuability"*.
It seems all very cute at first sight but only time will tell.

That's all folks. More on tQuery soon. Have fun :)
