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

// Changes an element's background opacity based on scroll depth
/* Parameters:
selector => string
bg_rgb => string (ex. "255, 255, 255")
max_scroll_depth => int
max_opacity => int (0-1)
*/
function bgOpacityOnScrollDepth(selector, bg_rgb, max_scroll_depth, max_opacity=1){
  window.addEventListener('scroll', function() {
    const scroll_pos = window.scrollY;
    const elem = document.querySelector(selector);
    const calc_var = max_scroll_depth/max_opacity;
    const bg = "background-color: rgba(" + bg_rgb;
    let opacity = 0;

    if(scroll_pos <= max_scroll_depth) {
      opacity = scroll_pos / calc_var;
    }
    else {
      opacity = max_scroll_depth / calc_var;
    }
    
    elem.setAttribute("style", bg + opacity + ")");
  });
}

// Gets all product details and returns them in an object. 
// Can only be used in the Product Details page
// Return type: obj
function getProductDetails() {
  const name = document.getElementsByClassName("hl-product-detail-product-name")[0].title;
  const price = document.getElementsByClassName("hl-product-detail-product-price")[0].innerHTML;
  let sub_desc = document.getElementsByClassName("ec-subscription-description")[0];
  sub_desc = sub_desc ? sub_desc.innerHTML : null; // in case of non-subscription product
  const variants_container = document.getElementsByClassName("variants-container");
  let variants = [];

  for(const variant of variants_container) {
    const variant_header = variant.getElementsByClassName("variant-heading")[0].innerHTML;
    const variant_dropdown = variant.getElementsByClassName("variant-dropdown")[0];
    variant_dropdown.className = '';

    for(const option of variant_dropdown.children) {
      option.className = '';
    }

    variants.push({
      header: variant_header, // string
      dropdown: variant_dropdown // HTML Element
    })
  }

  const quantity_input = document.getElementsByClassName("hl-quantity-input")[0];
  const add_to_cart_btn = document.getElementById("add-to-cart-btn");
  const buy_now_btn = document.getElementById("buy-now-btn");
  let description = document.getElementById("description");
  description = description ? description.innerHTML : null; // in case of empty description

  const img_list_container = document.getElementsByClassName("image-list")[0].getElementsByTagName("img");
  let img_list = [];

  for(const img of img_list_container) {
    img_list.push(img.src.substring(61));
  }

  const product_details = {
    name: name, // string
    price: price, // string
    subscription_description: sub_desc, // string
    variants: variants, // array => object => string(header), HTMLElement(dropdown)
    quantity_input: quantity_input, // HTML Element
    add_to_cart_btn: add_to_cart_btn, // HTML Element
    buy_now_btn: buy_now_btn, // HTML Element
    description: description, // string
    img_list: img_list // array => string
  }

  return product_details;
}