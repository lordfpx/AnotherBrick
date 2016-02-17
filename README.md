# AB - Another Brick
When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that.
It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.


## Basic usage
AB depend on jQuery. You need to load it first, then AB.js.
AB is directly executed and give you access to its methods.

Some plugins are optional and can be initialized that way:

```
AB.init({
  // equalizer: no specific options
  equalizer: {},

  /* scrollTo:
  options:
  - duration: 500,
  - offset: 0, (scroll before or after the target, usefull when using sticky navigation)
  - easing: 'easeOutQuad' (check AB.easing opbject in browser console for all available easings)
  */
  scrollTo: {
    duration: 1000
  },

  // interchange: no specific options
  interchange: {}
});
```

Check "example-usage.js" for usage and open index.html to inspect, test and look in the browser console.

* ### AB-fn
    It's a pack of utilities functions. By now, it's quite limited:
    * AB.fn.isJson(string)
      return true is a string can be parsed to JSON format to prevent famous Uncaught SyntaxError: Unexpected token ;-)


* ### AB-easing
    (From https://github.com/danro/jquery-easing/blob/master/jquery.easing.js)
    Lots of well known easing collection of functions.


* ### AB-mediaQuery
    (Inspired a lot from http://foundation.zurb.com/)
    First, you need to prepare your SCSS by editing and importing "AB-settings" in your scss. CSS and JS breakpoints will be shared It's VERY important to use same values defined in AB-settings.scss and your own breakpoints!

    #### SCSS preparation and usage
      Add `@import "AB-settings";` at the top of your main SCSS file, then you can define your breakpoints variables with the unit you want.

      You can then use in your SCSS files like that (instead of creating duplicate variables on your side):
        ```
        @media #{$medium-up} {
          // here comes styles for medium and up breakpoints
        }
        ```
      ... but you can still use your preferred scss framework indeed assuming you are using same breakpoints values again.

    #### JS usage
      * Get current breakpoint:
      ```
      AB.mediaQuery.current;
      ```
      => return current breakpoint (small, medium, large, xlarge, xxlarge)

      * Match specific breakpoint:
      ```
      AB.mediaQuery.atLeast('small');
      ```
      => return true or false

      * Listener on breakpoint change
      ```
      $(window).on('changed.ab-mediaquery', function(e, newSize, current) {
        console.log(newSize, current);
      });
      ```

      * List queries object
      ```
      AB.mediaQuery.getQueries();
      ```

      * Return real media-query from breakpoint name
      ```
      AB.mediaQuery.get('small');
      ```


* ### AB.equalizer
    This plugin will allow you to equalize elements with data-ab-equalize. All elements with the same value will be equalized.

    ```
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


* ### AB.deviceDetect
    (inspired by unknown sources)
    That allow you to test mobile browser and OS:
    ```
    AB.deviceDetect.get('browser', 'Android');
    ```
    => return true or false

    ```
    AB.deviceDetect.isTouch();
    ```
    => return true on touch devices

    Look at that object to see possible browser test :
    ```
    AB.deviceDetect.browser
    ```

    Look at that object to see possible OS test:
    ```
    AB.deviceDetect.OS
    ```


* ### AB.imagesLoaded
    (from http://foundation.zurb.com/)
    Run callback when images are loaded.
    Can be useful after ajax response: call it onSuccess with correct selector of course
    ```
    var imagesLoadedCallback = function() {
      console.log('imagesLoadedCallback: Images loaded');
    };
    AB.imagesLoaded( $('.some-element'), imagesLoadedCallback );
    ```

* ### AB.scrollTo
    Smooth scroll to link anchors or to the element specified in data-ab-scrollto attribute
    ```
    AB.scrollTo = new AB.scrollTo();

    AB.scrollTo = new AB.scrollTo({
      duration: 1000,
      offset: 0,
      easing: 'swing'
    });
    ```