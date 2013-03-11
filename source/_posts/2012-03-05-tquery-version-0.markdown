---
layout: post
title: "tQuery v0 - Let's get started"
date: 2012-03-05 10:42
comments: true
categories: [tquery, three.js]
---

This post is an update on
[tquery](https://github.com/jeromeetienne/tquery) progress.
[Our previous posts](/blog/categories/tquery/)
were previews,
for example
[valentine card in tQuery](/blog/2012/02/15/valentine-card-in-tquery/)
or
[linkify, a tQuery extension](/blog/2012/02/27/linkify-tquery-extension/).
This post is the release of *version 0*.
It will walk you thru the website and shows how to run your first tQuery project
with the boilerplate.
You should be able to play with tQuery after that :)


Ok It is still experimental.
I have been paddling hard to make it usable by other people tho.
The [playground](http://jeromeetienne.github.com/tquery/www/playground/)
is the easiest way to start experimenting. It is all online.
no install, no download, simple and understandable.
tQuery code is all on [github repository](https://github.com/jeromeetienne/tquery).
The
[screencast](http://www.youtube.com/watch?feature=player_embedded&v=iby6kijX5Zw)
below will walk you thru the
[website](http://jeromeetienne.github.com/tquery/www/).

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/iby6kijX5Zw" frameborder="0" allowfullscreen></iframe>
</center>

## Solid Ground to Build On

I would like tQuery to be a solid ground. Thus people can easily build
their three.js extensions on top of it. So the code is
documented, tested and performance is monitored. Here is some principles that
i consider important for tQuery.
Note that those principles are the theory.
It doesnt imply i implement them well in practice :)

**Code must be tested**. It helps detect bugs earlier.
Our [tests](http://jeromeetienne.github.com/tquery/tests/)
are done with
[mocha](http://visionmedia.github.com/mocha/).
**API must be documented**. It helps new users to use the library.
[API documentation](http://jeromeetienne.github.com/tquery/docs/)
is done with
[jsdoc](http://code.google.com/p/jsdoc-toolkit/).
**Performance must be monitored**. Thus developpers are immediatly aware of performance
change when the code is modified.
Our
[benchmarks](http://jeromeetienne.github.com/tquery/bench/)
are done with
[benchmark.js](http://benchmarkjs.com/)
and displayed by 
[benchrunner](https://github.com/jeromeetienne/benchrunner).

## How to Get Started

or how to get the boilerplate :)
tQuery Boilerplate is a template to get you started. You download it and
modify it until it fits your needs. It is a fast way to start a
clean project with tquery.
The running boilerplate looks [like that](http://jeromeetienne.github.com/tqueryboilerplate/).
The
[screencast](http://www.youtube.com/watch?feature=player_embedded&v=YOsnKMesyRk)
below shows how to use it.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/YOsnKMesyRk" frameborder="0" allowfullscreen></iframe>
</center>

## Running tQuery Boilerplate

You can try the boilerplate online with the [playground](http://jeromeetienne.github.com/tquery/www/playground/).
Want to run it on your computer ?
First you get boilerplate's files
[here](https://github.com/downloads/jeromeetienne/tquery/tqueryboilerplate.zip).
Then you launch the http server to serve them. Here is a little shell script which does it all for you.

```bash
    curl -OL https://github.com/downloads/jeromeetienne/tquery/tqueryboilerplate.zip
    unzip tqueryboilerplate.zip
    cd tqueryboilerplate
    make server
```

Then you open a browser on [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to
see it running. Up to you to modify ```index.html``` until it fits your needs. ```index.html```
looks like the code below... Quite short.

```html
    <!doctype html><title>Minimal tQuery Page</title>
    <script src="./tquery-all.js"></script>
    <body><script>
        var world   = tQuery.createWorld().boilerplate().start();
        var object  = tQuery.createTorus().addTo(world);
    </script></body>
```

## Conclusion

This is the initial release of tQuery.
I like how it looks.
API is documented,
code is tested, and performance measured.
The code produced by the API seems short and quite understandable.
Nice foundations especially for a version 0.

The next step is about stabilizing tquery.js itself, cleaning it up.
I am currently quite busy doing just that.
So please dont hammer me with feature requests at the moment, i won't have
time to handle them.
Pull requests are welcomed tho.
Things will change when tQuery core become more stable.

That's all folks, have fun :)
