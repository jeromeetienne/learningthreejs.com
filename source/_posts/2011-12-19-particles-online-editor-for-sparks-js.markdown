---
layout: post
title: "Particles: Online Editor for Sparks.js"
date: 2011-12-19 12:11
comments: true
published: true
categories: [three.js, library, sparks.js, particles]
---

This post is the second of our [serie on particles](/blog/categories/particles).
It presents
[sparkseditor](https://github.com/jeromeetienne/sparkseditor)
, an online editor for
[sparks.js](https://github.com/zz85/sparks.js)
with
[three.js](https://github.com/mrdoob/three.js/). 
In a few word, it is a webpage which provide an text editor
with a
[sparks.js](https://github.com/zz85/sparks.js)
effect.
You got the code in the editor
and
you see *live* the resulting particles effect. 
I like this *live* aspect a lot :)
I think it makes your design more direct, lower latency, less overhead.
More creative in a way.
[Try it out](http://jeromeetienne.github.com/sparkseditor/).

This editor has been made to lower the barrier of entry on
[sparks.js](https://github.com/zz85/sparks.js)
with
[three.js](https://github.com/mrdoob/three.js/)
particles.
The UI is rather simple and obvious. You can find a small presentation in the
screencast below.

<!-- more -->

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/nu00FhIW5bc?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

## Live editor rocks

[Sparkseditor](http://jeromeetienne.github.com/sparkseditor/)
is widely inpired by
[glsl editor](http://glsl.heroku.com/e)
from
[mrdoob](http://mrdoob.com/)
and
[shadertoy](http://www.iquilezles.org/apps/shadertoy/)
from
[Inigo Quilez](http://www.iquilezles.org/).
On the same vibe,
[lea verou](http://lea.verou.me/)
recently
released
[dablet](http://lea.verou.me/2011/12/introducing-dabblet-an-interactive-css-playground/),
an online editor for
[css](http://en.wikipedia.org/wiki/Cascading_Style_Sheets).
There is a clear trend here...
What is it about those live editors ?
A live editor produces a result immediatly.
This helps design your effect faster.
Be light on your foot kindof style.
Very agile way to design. 

Additionally, it is easy to share with others because we have *bookmarkability*.
We do that by storing state in url.
On the down side, it makes super long+ugly urls...
[url shortening](http://en.wikipedia.org/wiki/URL_shortening)
helps us reduces this issue.
In our case, we use
[bitly](https://bitly.com/)
service.

This editor is purely static files.
No specific server to run, no need to admin and no risk to go offline.
Oh and by the way i dont not even have to pay for hosting this application.
I think it shows html5 in all its power.
The web is becoming something real nice :) html5 i love you!

## conclusion

Under the hood,
[sparkseditor](https://github.com/jeromeetienne/sparkseditor)
uses
[threex.sparks.js](https://github.com/jeromeetienne/threex/blob/master/threex.sparks.js), a
[threex](https://github.com/jeromeetienne/threex)
helper, to make
[sparks.js](https://github.com/zz85/sparks.js/)
even easier to use.
This helper will be the subject of a future post of our
[particles series](/blog/categories/particles).

The source is open-source under
[MIT](https://github.com/jeromeetienne/sparkseditor/blob/master/MIT-LICENSE.txt).
You can get it in its [git repository](https://github.com/jeromeetienne/sparkseditor).
If you hit bugs, fill issues on github.
Feel free to fork and modify it!
That's all folks, have fun :)
