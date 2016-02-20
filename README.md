<a name="ScrollTo"></a>
## ScrollTo
Smooth scroll to anchor links or to the element specified in data-ab-scrollto attribute

**Kind**: global class  

* [ScrollTo](#ScrollTo)
    * [new ScrollTo(opt)](#new_ScrollTo_new)
    * [.getTarget($el)](#ScrollTo+getTarget)
    * [.getAnchor(el)](#ScrollTo+getAnchor)
    * [.scroll($target)](#ScrollTo+scroll)

<a name="new_ScrollTo_new"></a>
### new ScrollTo(opt)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>object</code> |  | user options |
| opt.duration | <code>number</code> | <code>500</code> | Duration of the scroll |
| opt.offset | <code>number</code> | <code>0</code> | offset target (usefull when using a sticky navigation for ex.) |
| opt.easing | <code>string</code> | <code>&quot;swing&quot;</code> | [easing](easing) |

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
or
<div data-ab-scrollto=".target">...</div>
```
<a name="ScrollTo+getTarget"></a>
### scrollTo.getTarget($el)
Get the target element from data-ab-scrollto

**Kind**: instance method of <code>[ScrollTo](#ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $el | <code>object</code> | Element triggered to get it's target |

<a name="ScrollTo+getAnchor"></a>
### scrollTo.getAnchor(el)
Get the target element from href

**Kind**: instance method of <code>[ScrollTo](#ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>object</code> | Link triggered |

<a name="ScrollTo+scroll"></a>
### scrollTo.scroll($target)
Scroll to that element

**Kind**: instance method of <code>[ScrollTo](#ScrollTo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $target | <code>object</code> | scroll to that element target |

