# AB - Another Brick

AB is a package of plugins built on a flexible CommonJS/AMD Javascript pattern (http://www.smashingmagazine.com/2011/10/essential-jquery-plugin-patterns/ ; https://github.com/addyosmani/essential-js-design-patterns).

I'll try to add convenient plugins. I'll extract some from frameworks, I'll write others.
The idea behind this project is to give you bricks of Javascripts to solve usual design difficulties.

Available plugins:
* AB-deviceDetect: detect mobile Browser and OS (inspired by unknown sources)
* AB-equalizer: Equalize elements height whatever the layout
* AB-mediaQuery: Use media-queries on JS side (Inspired a lot from http://foundation.zurb.com/)
* AB-imagesLoaded: callback when images loaded (from http://foundation.zurb.com/)
* AB-scrollTo


## Basic usage
AB depend on jQuery, so load jQuery first, then load AB.js.
AB is directly executed and give you access to its methods.

Check "example-usage.js" for usage in your scripts.

* ## AB-fn
  It's a pack of utilities functions:
  * AB.fn.isJson(string)
    return true is a string can be parsed to JSON format to prevent famous Uncaught SyntaxError: Unexpected token ;-)


* ## AB-mediaQuery
  First, you need to prepare your SCSS. CSS and JS breakpoints will be shared:

  ### SCSS preparation and usage
    Add `@import "AB-settings";` at the top of your main SCSS file, then you can define your breakpoints variables with the unit you want.

    You can use in your SCSS files like that:
      ```
      @media #{$medium-up} {
        // here comes styles for medium and up breakpoints
      }
      ```
    ... or you can still use your prefered scss framework indeed assuming you are using same breakpoints values ;-).

  ### JS usage
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
    $(window).on('changed.ab.mediaquery', function(e, newSize, current) {
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


* ## AB.equalizer
    This plugin will allow you to equalize elements. Usage is quite simple. First, define a container with data-equalizer attribute, then give the same attribute to element you want to equalize: data-equalizer-watch="xxx". All elements with the same attribute and value will be equalized.

    ```
    <div data-equalizer>
      <div data-equalizer-watch="test1">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Minima hic debitis ut consectetur.
        Molestias quod dolore veniam, rem nostrum modi nulla a, et veritatis,
        nobis quae error quidem illo ea.
      </div>

      <div data-equalizer-watch="test1">
        Lorem
      </div>

      <div data-equalizer-watch="paragraph">
        Lorem ipsum dolor sit amet.
      </div>

      <div data-equalizer-watch="paragraph">
        Lorem nobis quae error quidem illo ea.Lorem nobis quae.
      </div>
    </div>
    ```

    You can also nest different data-equalizer-watch. Anyway, it's limited to 1 extra level:

    ```
    <div data-equalizer>
      <div data-equalizer-watch="test1">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Minima hic debitis ut consectetur.
        Molestias quod dolore veniam, rem nostrum modi nulla a, et veritatis,
        nobis quae error quidem illo ea.

        <div data-equalizer-watch="nested">
          Lorem ipsum dolor sit amet.
        </div>

        <div data-equalizer-watch="nested">
          Lorem nobis quae error quidem illo ea.Lorem nobis quae.
        </div>
      </div>

      <div data-equalizer-watch="test1">
        Lorem
      </div>

      <div data-equalizer-watch="paragraph">
        Lorem ipsum dolor sit amet.
      </div>

      <div data-equalizer-watch="paragraph">
        Lorem nobis quae error quidem illo ea.Lorem nobis quae.
      </div>
    </div>
    ```


* ## AB.deviceDetect
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


* ## AB.imagesLoaded
    Run callback when images are loaded.
    Can be useful after ajax response: call it onSuccess with correct selector of course
    ```
    var imagesLoadedCallback = function() {
      console.log('imagesLoadedCallback: Images loaded');
    };
    AB.imagesLoaded( $('img'), imagesLoadedCallback );
    ```

* ## AB.scrollTo
    Smooth scroll to link anchors or to the element specified in data-ab-scrollto attribute
    ```
    AB.scrollTo = new AB.scrollTo();

    AB.scrollTo = new AB.scrollTo({
      duration: 1000,
      offset: 0,
      easing: 'swing'
    });
    ```
