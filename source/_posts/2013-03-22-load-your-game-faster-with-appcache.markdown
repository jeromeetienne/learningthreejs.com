---
layout: post
title: "Load Your Game Faster with AppCache"
date: 2013-03-22 05:31
comments: true
categories: 
---

This post is about loading your game faster. 
Appcache may be great help on this.
In this post, i will use a little game of mine called
['Marble Labyrinth'](http://jeromeetienne.github.com/demo.poollabyrinth/)
as an example to show how i got from 2.4mbyte to 0byte of download in 5min of work.
Appcache provides faster access to your users, and less bandwidth cost to you. A well used time :)

<center>
  <iframe width="425" height="349" src="http://www.youtube.com/embed/FY4UQpu1ijM" frameborder="0" allowfullscreen></iframe>
</center>


<!-- more -->

### What Is Appcache
This is a way to cache the files more efficiently and with support for offline.
Other already explained it better that i could. 
["A Beginner's Guide to Using the Application Cache"](http://www.html5rocks.com/en/tutorials/appcache/beginner/)
by 
[Eric Bidelman](https://twitter.com/ebidel) 
on 
[html5rocks](http://www.html5rocks.com/) is a very nice intro.
This site got plenty of data about [offline support](http://www.html5rocks.com/en/features/offline).
Here is a [appcache factsheet](http://appcachefacts.info/)
and the [specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#appcache).

### In The Rought

How to generate an appcache file without hassle ?
Something which support dynamic stuff like xhr ? It is surprisingly easy.

* *Step 1:* Do 'Copy ALL as HAR' in chrome devtools network
* *Step 2:* in js console, do 'var har = ' and there you paste it
* *Step 3:* generate teh appcache file with the following javascript

```
console.log('CACHE MANIFEST\n\nCACHE:');
har.log.entries.forEach(function(entry){ console.log(entry.request.url) });
console.log('\nNETWORK:\n*');
```

Simple no ? Well unfortunatly even a basic har file is large.
The one for 
['Marble Labyrinth'](http://jeromeetienne.github.com/demo.poollabyrinth/)
is more than 7000 lines long. So i wrote a little tool to ease up the process
on large project.


### Let's Get Started
First, we install a little utility which gonna generate the appcache for us.
It is called *har2appcache*.
It is available on a 
[github repository](https://github.com/jeromeetienne/har2appcache) as usual.


```bash
sudo npm install -g har2appcache
```

This one got the advantage to use the info from the HAR file.
So you will get all the dynamic request too. All the models that
you load with ```THREE.OBJMTLLoader``` or your textures 
with ```THREE.ImageUtils.loadTexture``` are all loaded dynamically 
without insertion in the DOM.

btw HAR stands for 'HTTP Archive'.
You can read [HTTP Archive specification](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/HAR/Overview.html) 
if you are so inclined.
To get this HAR file, we will use Chrome.

### Let's Play With Chrome Devtools

{% img right /data/2013-03-22-load-your-game-faster-with-appcache/devtool-network-small.png %}

So first, you open chrome devtool, go in the network tab and reload your game.
You press right button of your mouse and you should see 'Copy ALL as HAR'
in the popup menu.
Then you take your [favorite editor](http://www.sublimetext.com/2),
create a file named ```sample.har```
and paste the HAR you just copied.
This is a rather large JSON structure.

### Let's Generate This File

```bash
har2appcache sample.har > manifest.appcache
```

There you got your appcache file, rather easy no ?
You may need to edit it a bit to fit your needs,
e.g. to remove the url of dynamic content.
Now you just need to change the html tag of your page
and you are **DONE!**

```html
 <html manifest='manifest.appcache'>
```

### Smooth Workflow
Appcache is so efficient to cache that it may become hard to disable it :)
When the page load, the browser will check if ```manifest.appcache``` has changed.
If there is no update, it won't reload what has been cached, not even the original HTML page.
It may be bothering while your develop. 
Personnaly, i rename the file during developement.

```bash
mv manifest.appcache manifest.appcache.dev
```

and comment the attribute in the html.

```html
<!-- <html manifest='manifest.appcache'> -->
<html>
```

It does the job smoothly.

 
### Conclusion
With this technic, you gain a lot of time to download.
So your user got faster access and you get less bandwidth cost.
A nice win-win situation! All that in 5min top. It definitly worth it.

That's all for today, have fun :)



