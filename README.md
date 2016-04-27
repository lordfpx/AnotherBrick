## Modules

<dl>
<dt><a href="#module_AB">AB</a></dt>
<dd><p>When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element&#39;s height, etc. AB is there to help you deals with that.
It&#39;s a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.</p>
</dd>
<dt><a href="#module_AB-easing">AB-easing</a></dt>
<dd><p>This is a collection of easing functions that can be used when
Taken from <a href="https://github.com/danro/jquery-easing/blob/master/jquery.easing.js">https://github.com/danro/jquery-easing/blob/master/jquery.easing.js</a>
You can use that in jQuery animations replacing &#39;easeInOutQuad&#39; by &#39;AB.easeInOutQuad&#39; for example or your own scripts</p>
</dd>
<dt><a href="#module_AB-equalizer">AB-equalizer</a></dt>
<dd><p>This plugin will allow you to equalize elements with data-ab-equalize. All elements with the same value will be equalized.</p>
</dd>
<dt><a href="#module_AB-imagesLoaded">AB-imagesLoaded</a></dt>
<dd><p>You can run a callback when images inside of an element are loaded.
That can be useful after ajax response.
Heavily inspired by <a href="https://github.com/zurb/foundation-sites">https://github.com/zurb/foundation-sites</a></p>
</dd>
<dt><a href="#module_AB-interchange">AB-interchange</a></dt>
<dd><p>While responsive image loading is not really an easy task still today, here is a solution
to manage conditional (based on breakpoints) loading of img, background-image or even HTML content with that plugin.
Heavily inspired by <a href="https://github.com/zurb/foundation-sites">https://github.com/zurb/foundation-sites</a></p>
</dd>
<dt><a href="#module_AB-mediaQuery">AB-mediaQuery</a></dt>
<dd><p>That&#39;s the JavaScript side of Media Queries. That propose you some very usefull methodes to condition your scripts
Heavily inspired by <a href="https://github.com/zurb/foundation-sites">https://github.com/zurb/foundation-sites</a></p>
</dd>
<dt><a href="#module_AB-scrollTo">AB-scrollTo</a></dt>
<dd><p>Smooth scroll to anchor links or to the element specified in data-ab-scrollto attribute.</p>
</dd>
</dl>

<a name="module_AB"></a>

## AB
When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that.
It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.


* [AB](#module_AB)
    * [.about()](#module_AB.about)
    * [.init()](#module_AB.init)
    * [.reflow()](#module_AB.reflow)

<a name="module_AB.about"></a>

### AB.about()
Display AB informations in the browser console

**Kind**: static method of <code>[AB](#module_AB)</code>  
**Example**  
```js
AB.about();
```
<a name="module_AB.init"></a>

### AB.init()
Initialize AB

**Kind**: static method of <code>[AB](#module_AB)</code>  
**Example**  
```js
// Initialize AB with default settings
AB.init();

// Initialize with personal settings (that's only an example)
AB.init({
  mediaQuery: {
    small: "639px",
    medium: "640px",
    large: "1024px",
    xlarge: "1200px",
    xxlarge: "1440px"
  },
  equalizer: {},
  scrollTo: {
    duration: 1000
  },
  interchange: {}
});
```
<a name="module_AB.reflow"></a>

### AB.reflow()
Reflow plugins when the DOM is changed (after an ajax response for ex.)

**Kind**: static method of <code>[AB](#module_AB)</code>  
**Example**  
```js
AB.reflow();
```
<a name="module_AB-easing"></a>

## AB-easing
This is a collection of easing functions that can be used when
Taken from [https://github.com/danro/jquery-easing/blob/master/jquery.easing.js](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js)
You can use that in jQuery animations replacing 'easeInOutQuad' by 'AB.easeInOutQuad' for example or your own scripts

<a name="module_AB-equalizer"></a>

## AB-equalizer
This plugin will allow you to equalize elements with data-ab-equalize. All elements with the same value will be equalized.

**Example**  
```js
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
```
<a name="module_AB-imagesLoaded"></a>

## AB-imagesLoaded
You can run a callback when images inside of an element are loaded.
That can be useful after ajax response.
Heavily inspired by [https://github.com/zurb/foundation-sites](https://github.com/zurb/foundation-sites)

**Example**  
```js
var imagesLoadedCallback = function() {
  console.log('imagesLoadedCallback: Images loaded');
};
AB.imagesLoaded( $('.some-element-wrapper'), imagesLoadedCallback );
```
<a name="module_AB-interchange"></a>

## AB-interchange
While responsive image loading is not really an easy task still today, here is a solution
to manage conditional (based on breakpoints) loading of img, background-image or even HTML content with that plugin.
Heavily inspired by [https://github.com/zurb/foundation-sites](https://github.com/zurb/foundation-sites)

**Example**  
```js
// loading of img source:
<img src="" data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]">

// background-image:
<div data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]"></div>
```
<a name="module_AB-mediaQuery"></a>

## AB-mediaQuery
That's the JavaScript side of Media Queries. That propose you some very usefull methodes to condition your scripts
Heavily inspired by [https://github.com/zurb/foundation-sites](https://github.com/zurb/foundation-sites)


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | user options |
| [options.small] | <code>string</code> | <code>&quot;639px&quot;</code> | max-width on small devices (mobiles) |
| [options.medium] | <code>string</code> | <code>&quot;640px&quot;</code> | min-width on medium devices (tablets) |
| [options.large] | <code>string</code> | <code>&quot;1024px&quot;</code> | min-width on large devices (small desktops) |
| [options.xlarge] | <code>string</code> | <code>&quot;1200px&quot;</code> | min-width on large devices (medium desktops) |
| [options.xxlarge] | <code>string</code> | <code>&quot;1440px&quot;</code> | min-width on large devices (big desktops) |

**Example**  
```js
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
```
<a name="module_AB-scrollTo"></a>

## AB-scrollTo
Smooth scroll to anchor links or to the element specified in data-ab-scrollto attribute.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> |  | user options |
| [options.duration] | <code>number</code> | <code>500</code> | Duration of the scroll |
| [options.offset] | <code>number</code> | <code>0</code> | offset target (usefull when using a sticky navigation for ex.) |
| [options.easing] | <code>string</code> | <code>&quot;swing&quot;</code> | [easing](easing) |

**Example**  
```js
AB.init({
	scrollTo: {
		duration: 1000,
		offset: 0,
		easing: 'swing'
	}
});

// Usage
<a href="#target">...</a>
// or
<div data-ab-scrollto=".target">...</div>
```
