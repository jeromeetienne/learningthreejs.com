title: Plan Slide 
output: plan.html

--

### include threex spaceships

* using require.js (optional, only for rapidity)
  * META explain how to include it manually
  * META do that for all included threex
* using bower (optional only for rapidity)
  * META all available on github
  * META so can use zip or git itself, as you wish

--

### threex.planets

* META Why ? what does it provide for us
  * same for other threex
* META 
  * same for other threex
* META what is it ? from threex page
* META url for repo + demo
* META iframe of earth demo

--

### Whats next ?

* add sound with web audio api
* add particles for collision
* add particles for reactor
* make star coming from the background
* make more type of planets

--

### Step By Steps

1. run boilerplate
1. add the spaceships
1. Lets fill this void
1. add the stars
1. where is it ?
1. remove the cube
1. add the moon
1. why is it black ?
1. add the lights
1. ok we got the moon but where is the spaceship ?
1. put the spaceship in the proper place
   * rotate it
   * on the left
1. nice... how to move the ships
1. add threex.keyboardstate
1. add a function in rendering loop
   * what is a rendering loop
1. use keyboard to make it move up and down
1. oh an error... 
1. lets wait until the spaceship is loaded
1. lets use keyboard up/down arrow to make it move
1. duh the spaceship can go out of the screen
1. lets add limits
1. nice... well the moon is kinda static.
1. move the moon
   * another function in the rendering loop
1. make it warp
1. yep too static
1. make a random y for the moon on warp
1. well...  cool but the spaceship and the moon
1. lets have spaceship and moon to collide
   * simple one based on distance
   * no time for a explosion effect
   * lets simply use color
