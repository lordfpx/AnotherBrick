<a name="module_AB"></a>
## AB
# AB - Another Brick
When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that.
It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.


* [AB](#module_AB)
    * [~ScrollTo](#module_AB..ScrollTo)
        * [new ScrollTo([opt])](#new_module_AB..ScrollTo_new)
        * [.getTarget($el)](#module_AB..ScrollTo+getTarget)
        * [.getAnchor(el)](#module_AB..ScrollTo+getAnchor)
        * [.scroll($target)](#module_AB..ScrollTo+scroll)
    * [~about()](#module_AB..about)
    * [~init()](#module_AB..init)
    * [~reflow()](#module_AB..reflow)

<a name="module_AB..ScrollTo"></a>
### AB~ScrollTo
**Kind**: inner class of <code>[AB](#module_AB)</code>  

* [~ScrollTo](#module_AB..ScrollTo)
    * [new ScrollTo([opt])](#new_module_AB..ScrollTo_new)
    * [.getTarget($el)](#module_AB..ScrollTo+getTarget)
    * [.getAnchor(el)](#module_AB..ScrollTo+getAnchor)
    * [.scroll($target)](#module_AB..ScrollTo+scroll)

<a name="new_module_AB..ScrollTo_new"></a>
#### new ScrollTo([opt])
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
<a name="module_AB..ScrollTo+getTarget"></a>
#### scrollTo.getTarget($el)
Get the target element from data-ab-scrollto

**Kind**: instance method of <code>[ScrollTo](#module_AB..ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $el | <code>object</code> | Element triggered to get it's target |

<a name="module_AB..ScrollTo+getAnchor"></a>
#### scrollTo.getAnchor(el)
Get the target element from href

**Kind**: instance method of <code>[ScrollTo](#module_AB..ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>object</code> | Link triggered |

<a name="module_AB..ScrollTo+scroll"></a>
#### scrollTo.scroll($target)
Scroll to that element

**Kind**: instance method of <code>[ScrollTo](#module_AB..ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $target | <code>object</code> | scroll to that element target |

<a name="module_AB..about"></a>
### AB~about()
Display AB informations such as version, description, author

**Kind**: inner method of <code>[AB](#module_AB)</code>  
**Example**  
```js
AB.about();
```
<a name="module_AB..init"></a>
### AB~init()
Initialize AB

**Kind**: inner method of <code>[AB](#module_AB)</code>  
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
<a name="module_AB..reflow"></a>
### AB~reflow()
Reflow plugins when the DOM is changed (after an ajax response for ex.)

**Kind**: inner method of <code>[AB](#module_AB)</code>  
**Example**  
```js
AB.reflow();
```
