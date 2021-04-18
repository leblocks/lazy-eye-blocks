# Lazy eye blocks game

## Synopsis

"le" in leblocks stands for **L**azy **E**ye. Amblyopia, commonly known as **l**azy **e**ye, causes more visual loss in the under 40 age group than all the injuries and diseases combined in this age group. 

This is a version of a classic blocks game with a little change that allows people with amblyopia use it as a treatment tool. 
Read more about [amblyopia](http://www.lazyeye.org/)

## How does it work?

### idea

The idea is to force brain to use the information that we receive from both eyes simultaneously. This is achieved by separating information sources for the left and the right eye, so that the brain is forced to take into consideration the image coming via the weaker eye and to combine information in order to form a complete image. In that way, the brain learns how to use the weaker eye from scratch.

### implementation

The color of the falling blocks and the ground blocks is adjustable, hence, using 3D glasses (old style red\blue, like the ones shown [here](https://en.wikipedia.org/wiki/Anaglyph_3D#/media/File:Anaglyph_glasses.png)) we can separate images that the left and the right eye see.

## Motivation

I have a lazy eye myself. I was born with a huge difference in sight between the eyes. It was only diagnosed, when I was seven. Now I'm an adult, and, as a result of brain suppression, my right eye is working on just 60% of its ability. Once, I stumbled upon an [article](https://www.medicalnewstoday.com/articles/259547.php) on the lazy eye treatment, recommending a game that helps. After a proper search, I found a few apps for mobile devices, but nothing to use online and free of charge. And so I decided to do it myself. Here are my goals:
 - make the lazy eye blocks game accessible from maximum amount of devices

### Installation
* Install dependencies with ```npm install```
* Run development server: ```npm run start```

### Testing
All tests are located under */test* folder. I've decided to use [mocha](https://mochajs.org/) as a test runner and [chai](https://www.chaijs.com/) as an assertion library.
* */test/main.js* is a test entry point for the webpack bundling, all tests should be included here.
* */test/test.html* html template with browser setup of mocha.
* To run tests start development server and go to *http://localhost:port/test.html*

### Known issues

***Swipe support***
I've developed custom swipe support instead of using
3rd party library (to reduce size of the resulting bundle) therefore there are
several bugs on various screens. Have to be handled properly.

***Outdated nodejs version***
I've used 8.12.0 version of node, due to some constraints. Hence I have a lot of outdated dependencies that make a lot of things harder to do.

***Non-consistent usage of various browser features:***
* Babel loader uses *@babel/preset-env* without any specific configuration.
* Following WebAPIs are being used: *Element.classList.add*, *document.querySelector*, *document.getElementById*, *document.createElement*, *Element.appendChild*. Those APIs are not being transpiled by babel. So correct polyfills should be provided for older browsers.

***CSS issues:***
* There is a usage of CSS flexbox property. If it will remain -> need to adjust transpilation level of babel preset. So code won't be transpiled to support browsers of versions that are lower than flexbox support.
* Order of *@import* statements in *src/mains.scss* is important. This probably can be solved with proper webpack configuration.
