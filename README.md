## Modules

<dl>
<dt><a href="#module_AB">AB</a></dt>
<dd><p>When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element&#39;s height, etc. AB is there to help you deals with that.
It&#39;s a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.</p>
</dd>
<dt><a href="#module_AB/scrollTo">AB/scrollTo</a></dt>
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
<a name="module_AB/scrollTo"></a>
## AB/scrollTo
Smooth scroll to anchor links or to the element specified in data-ab-scrollto attribute.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opt] | <code>object</code> |  | user options |
| [opt.duration] | <code>number</code> | <code>500</code> | Duration of the scroll |
| [opt.offset] | <code>number</code> | <code>0</code> | offset target (usefull when using a sticky navigation for ex.) |
| [opt.easing] | <code>string</code> | <code>&quot;swing&quot;</code> | [easing](easing) |

**Example**  
```js
AB.init({
	scrollTo: {
		duration: 1000,
		offset: 0,
		easing: 'swing'
	}
})

<a href="#target">...</a>
// or
<div data-ab-scrollto=".target">...</div>
```
