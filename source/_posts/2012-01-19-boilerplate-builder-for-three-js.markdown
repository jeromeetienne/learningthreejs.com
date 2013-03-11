---
layout: post
title: "Boilerplate Builder for Three.js"
date: 2012-01-19 10:59
comments: true
published: true
categories: [three.js, library, boilerplate]
---

We recently introduced a
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate)
in a
[previous post](/blog/2011/12/20/boilerplate-for-three-js/).
It aims to ease your first contact with
[three.js](https://github.com/mrdoob/three.js/).
It contains a template for a simple project,
a sample on which we already applied good practices.
You download it and run it in a matter of minutes.
Thus you can immediatly focus on your own things.
In short, it aims for *Fast bootstrap + Good Practices*.

It seems nice, hey ?
Well there is a glitch.
The
[boilerplate for three.js](https://github.com/jeromeetienne/threejsboilerplate)
needs more flexibily.
In a way, it acts as a ground on top of which you start your own thing.
We do our best to provide good defaults, but they are only defaults.
What if you got specific requirements ?
How to start your project then ?
The
[boilerplate builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
has been written for you :)

[Try it out](http://jeromeetienne.github.com/threejsboilerplatebuilder/).
Go ahead, play with the options,
discover what they do and customize your own boilerplate.
The
[screencast](http://www.youtube.com/watch?v=ANnPWZGRsGk)
below is short introduction where i describe the
[boilerplate builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/).

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/ANnPWZGRsGk?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Making-Of the Builder

The
[builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
itself was interesting to build.
It uses various nice features from the current web.
It is a pure-browser webapp with a file download,
a preview of a webgl project
and a nice looking visual appearance.

### Pure Browser Download

I like to write pure-browser application.
They dont require a server to run, only static files.
It makes it much easier to host your application.
So
[boilerplate builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
has been written as a pure-browser application :)
It uses
[jszip](http://jszip.stuartk.co.uk/)
, a library which create .zip files with Javascript.
Its creates the boilerplater.zip that you download.
Additionally, it uses
[downloadify](https://github.com/dcneiner/Downloadify)
, a small library to create and download files without server.

Together,
[jszip](http://jszip.stuartk.co.uk/)
and 
[downloadify](https://github.com/dcneiner/Downloadify)
makes it easy to pack several files together,
and allow the user to download it.
All that in pure-browser, neat no?
I love what the web is becoming!

### Boilerplate Preview

The preview is a bit different.
We start to load the *index.html* template for the boilerplate.
We apply all the options you configured and produce the final version.
To actually preview this file, we encode it in
[base64](http://en.wikipedia.org/wiki/Base64)
to build a
[data url](http://en.wikipedia.org/wiki/Data_URI_scheme)
with it.
Only then, we create an iframe with this data uri
and you can see the webgl preview :)

[Data url](http://en.wikipedia.org/wiki/Data_URI_scheme)
is [an old thing from 1998](http://tools.ietf.org/html/rfc2397)
which is back in spotlight due to HTML5.
It allows to encode data directly in the URL.
It may be used to include image directly in css for examples.
Very usefull but not for human consumption.
To give you an idea, here is
[index.html](http://pastebin.com/yF3XDSFW)
as a data url in
[base64](http://en.wikipedia.org/wiki/Base64).
You could encode it as text if you
[escape](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURI)
it
[properly](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURIComponent).
It looks like long ugly random string.

```
    data:text/html;base64,PCFkb2N0eXBlIGh0....
```

### Visual Appearance

It includes
[twitter bootstrap](http://twitter.github.com/bootstrap/) for css.
I am quite grateful for this framework.
Without it, the
[builder page](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
will be so ugly, that people run away without even trying the application itself.
[twitter bootstrap](http://twitter.github.com/bootstrap/)
makes it so easy to write a webapp which looks good on the screen.
I think all the css-impaired of the world should thanks twitter for this framework :)


## Conclusion

It has been quite fun to write it.
I learned some web skills,
discovered new part of three.js,
and on top of that, it looks good on screen.
I could not ask for more.
The goal of
[boilerplate builder for three.js](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
is to add more *flexibility* to the *fast bootstrap + good practices* from the
[boilerplate](https://github.com/jeromeetienne/threejsboilerplate).
I hope it will help people starting lots of new
[three.js](https://github.com/mrdoob/three.js/)
projects :)

That's all folks.
Have fun.
