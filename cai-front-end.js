/* This Library is a compilation of functions to be used in building
custom elements and functionalities in the GHL website website builder */

// Used to reduce the height of an element relative to scroll depth
// Height will be set in px
// ex. sticky navbar
// Parameters: HTMLElement, min height INT, max height INT, maximum scroll INT
function squashOnScrollDepth(elem, min_height, max_height, max_scroll_depth) {
  window.addEventListener("scroll", function(){
    const scroll_pos = window.scrollY;
    const subtract_height = max_height - min_height;
    const divide_scroll_depth = max_scroll_depth / subtract_height;

    if(scroll_pos <= max_scroll_depth) {
      elem.style.height = (max_height - (scroll_pos / divide_scroll_depth)) + "px";
    }
    else { elem.style.height = min_height; }
  });
}

// Checks if an element is in view in the Y axis
/* Parameters: 
  elem => HTMLElement
  top => INT top margin (0-1) 
  bottom => INT bottom margin (0-1) */
// Return type: bool
function isInViewport(elem, top, bottom) {
  let rect = elem.getBoundingClientRect();
  let html = document.documentElement;

  return (
    rect.top >= (window.innerHeight*top) &&
    rect.bottom <= (window.innerHeight * (1 - bottom) || html.clientHeight * (1 - bottom))
  );
}

// Waits until an element appears in the DOM
// Parameters: selector => string
// Return type: HTMLElement
/* 
How to use:
  waitForElem('.test-class').then((elem) => {
    *do something*
  });
*/
function waitForElem(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}