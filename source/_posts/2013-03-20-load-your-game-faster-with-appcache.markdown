---
layout: post
title: "Load Your Game Faster with appcache"
date: 2013-03-20 05:31
comments: true
categories: 
---

This post is about loading your game faster. 
appcache may be great help on this.
In this post i will explain how i got from 2.4mbyte to 0byte of download in 5min of work.
It provides faster access to your users, and less bandwidth cost to you. A well used time :)

# What Is Appcache
This is a way to cache the files more efficiently and with support for offline.
Other already explained it better that i could. 
["A Beginner's Guide to Using the Application Cache"](http://www.html5rocks.com/en/tutorials/appcache/beginner/)
by 
[Eric Bidelman](https://twitter.com/ebidel) 
on 
[html5rocks](http://www.html5rocks.com/) is a very nice intro.
This site got plenty of data about [offline support](http://www.html5rocks.com/en/features/offline).
here is a [appcache factsheet](http://appcachefacts.info/)
and the [specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#appcache).

### Let's Get Started
First, we install a little utility which gonna generate the appcache for us.
It is called *har2appcache*


```
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
To get this HAR file, we will use chrome.

### Let's Play With Chrome Devtools

So first, you open chrome devtool, go in the network tab and reload your game.
You press right button of your mouse and you should see 'Copy ALL as HAR'
in the popup menu.

then you take your [favorite editor](http://www.sublimetext.com/2),
create a file named ```sample.har```
and paste the HAR you just copied.
This is a rather large JSON structure.

### let's generate this file

```
har2appcache sample.har > manifest.appcache
```

There you got your appcache file, rather easy no ? you just need to 
change the html tag of your page.

```
 <html manifest='manifest.appcache'>
```

and you are **DONE!**

### Smooth Workflow
appcache is so efficient to cache that it may become hard to disable it :)
When the page load, the browser will check if ```manifest.appcache``` has changed.
If there is no update, it won't reload what has been cached, not even the original HTML page.
It may be bothering while your develop. Personnaly, i simply rename the file during 
developement and it does the job.

```
mv manifest.appcache manifest.appcache.dev
```

### Conclusion
With this technic, you gain a lot of time to download.
So Your user got faster access and you get less bandwidth cost.
A nice win-win situation :)



