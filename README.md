AB
=======
When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that. It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources. The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.

AB.about()
----------
Display AB informations in the browser console.

    AB.about();

AB.init()
---------
Initialize AB with or without custom parameters.

    // Initialize AB with default settings
    AB.init();

    // Initialize with personal settings, for example:
    AB.init({
      mediaQuery: {
        small: "639px",
        medium: "640px",
        large: "1024px",
        xlarge: "1200px",
        xxlarge: "1440px"
      },
      scrollTo: {
        duration: 1000
      }
    });

AB.reflow()
-----------
Reflow plugins when the DOM is changed (after an ajax response for ex.).

    AB.reflow();


----------

AB-scrollTo
-----------
Activate smooth scroll on anchor links and to elements specified in data-ab-scrollto attribute.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | user options |
| [options.duration] | <code>number</code> | <code>500</code> | Duration of the scroll |
| [options.offset] | <code>number</code> | <code>0</code> | offset target (usefull when using a sticky navigation for ex.) |
| [options.easing] | <code>string</code> | <code>&quot;swing&quot;</code> | [easing](easing) |


    // Usage with normal anchor links
    <a href="#target">...</a>
    <div id="target">...</div>
    // or
    <a name="target"></a>

    // Usage for specific cases
    <button data-ab-scrollto=".target">...</button>
    <div class="target">...</div>

AB-easing
---------
This is a collection of easing functions taken from https://github.com/danro/jquery-easing/blob/master/jquery.easing.js.
You can use that in jQuery animations replacing 'easeInOutQuad' by 'AB.easeInOutQuad' for example or your own scripts.

AB-deviceDetect
---------------
An easy way to detect browser and OS, it also detect touch devices (far from being perfect, beware!).

    AB.deviceDetect.get('browser', 'any');
    // => return true or false

    AB.deviceDetect.isTouch();
    // => return true on touch devices

AB-equalizer
------------

This plugin will allow you to equalize elements with data-ab-equalize. All elements with the same value will be equalized.

    // First init the plugin:
    AB.init({
      equalizer: {}
    });

    // Usage
    <div data-ab-equalize="someID">
      Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Minima hic debitis ut consectetur.
      Molestias quod dolore veniam, rem nostrum modi nulla a, et veritatis,
      nobis quae error quidem illo ea.
    </div>
    <div data-ab-equalize="someID">
      Lorem
    </div>

AB.fn
-----
A collection of useful functions.

**AB.fn.isJson(string)**
Check if a string can be transformed into a JSON

**AB.fn.extend()**
A vanilla Js version of $.extend()

**AB.fn.selectorMatches(element, selector)**
element.matches(selector) alike with browser prefixes, but with different syntax.

AB-imagesLoaded
---------------
You can run a callback when images inside of an element are loaded.
That can be useful after ajax response for example.
Heavily inspired by https://github.com/zurb/foundation-sites.

    var imagesLoadedCallback = function() {
       console.log('imagesLoadedCallback: Images loaded');
    };
    AB.imagesLoaded('.some-element-wrapper', imagesLoadedCallback);

AB-interchange
--------------
While responsive image loading is not really an easy task even today, here is a solution to manage conditional (based on breakpoints) loading of img, background-image or even HTML content.
Heavily inspired by https://github.com/zurb/foundation-sites.

    // loading of img source:
    <img src="" data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]">

    // background-image:
    <div data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]"></div>

AB-mediaQuery
-------------
That's the JavaScript side of Media Queries.
It propose you some very useful methods to condition your scripts.
Heavily inspired by https://github.com/zurb/foundation-sites.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | user options |
| [options.small] | <code>string</code> | <code>&quot;639px&quot;</code> | max-width on small devices (mobiles) |
| [options.medium] | <code>string</code> | <code>&quot;640px&quot;</code> | min-width on medium devices (tablets) |
| [options.large] | <code>string</code> | <code>&quot;1024px&quot;</code> | min-width on large devices (small desktops) |
| [options.xlarge] | <code>string</code> | <code>&quot;1200px&quot;</code> | min-width on large devices (medium desktops) |
| [options.xxlarge] | <code>string</code> | <code>&quot;1440px&quot;</code> | min-width on large devices (big desktops) |


    // Get current breakpoint:
    AB.mediaQuery.current;
    // => return current breakpoint (small, medium, large, xlarge, xxlarge)

    // Match specific breakpoint:
    AB.mediaQuery.atLeast('small');
    // => return true or false

    // Listener on breakpoint change:
    $(window).on('changed.ab-mediaquery', function(e, newSize, current) {
     console.log(newSize, current);
    });
    // => will display something like: small large

    // List queries object:
    AB.mediaQuery.getQueries();

    // Return real media-query from breakpoint name:
    AB.mediaQuery.get('small');
    // => return something like "only screen and (max-width: 639px)"

