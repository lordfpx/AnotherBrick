<a name="ScrollTo"></a>
## ScrollTo(opt)
Smooth scroll to link anchors or to the element specified in data-ab-scrollto attribute

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>object</code> | user options |

**Example**  
```js
AB.scrollTo = new AB.scrollTo();
```

* [ScrollTo(opt)](#ScrollTo)
    * [.getTarget($el)](#ScrollTo+getTarget)
    * [.getAnchor(el)](#ScrollTo+getAnchor)
    * [.scroll($target)](#ScrollTo+scroll)

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

