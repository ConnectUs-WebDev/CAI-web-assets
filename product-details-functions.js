const elem_classes = {
    "items": "hl-cart-item", //class containing the whole product
    "prod_name": "hl-cart-product-name", //class containing the name
    "prod_price": "hl-cart-product-price", //class containing the price for monthly/quarterly marking
    "prod_quantity": "hl-quantity-input", // class containing product quantity
    "error_element": "hl-cart-item", //element in item will have the "err" class in case of error
  };
  
  const drawer_class = "drawer__content";
  const cart_btn_id = "view-cart-btn";
  
  document.addEventListener("DOMContentLoaded", function () {
    let product = document.getElementsByClassName("hl-product-detail-product-name");
    let price = document.getElementsByClassName("hl-product-detail-product-price");

    if (product.length && price.length) {
      let product_name = product[0].getAttribute("title");
      let is_cai_platform = cai_packages[0].includes(product_name) || cai_packages[1].includes(product_name);

      if (mnth_prods.includes(product_name) && !is_cai_platform) {
        price[0].classList.add("mnth");
      } else if (qrt_prods.includes(product_name) && !is_cai_platform) {
        price[0].classList.add("qrt");
      }

      let description = document.getElementById("description");
      let show_btn = document.getElementsByClassName("show-more")[0];

      if (description) {
        let is_overflown = description.scrollHeight > 350;

    //    if (socmed_accs.includes(product_name)) {
    //      description.classList.remove("description");
     //     description.classList.add("description-full");
      //  }

        if (!is_overflown && show_btn) {
          show_btn.classList.add("hide");
        }
      }
    }
    
    const node_observer = new MutationObserver(function(mutations_list) {
      mutations_list.forEach(function(mutation) {
          if (mutation.addedNodes.length){
            quantityAction(drawer_class, cart_btn_id, elem_classes);
            addActionButtonListeners(drawer_class, cart_btn_id, elem_classes, "action-icon");
            addActionButtonListeners(drawer_class, cart_btn_id, elem_classes, "delete-item-container");
            observer.disconnect();
          }
      });
    });
    
    const drawer = document.getElementsByClassName(drawer_class)[0];
  
    node_observer.observe(drawer, { subtree: false, childList: true });
    
  });
  
function addActionButtonListeners(drawer_class, cart_btn_class, elem_classes, btn_class){
	const btn_list = document.getElementsByClassName(btn_class);
    for (const btn of Array.from(btn_list)) {
      btn.addEventListener("click", function() {
      	quantityAction(drawer_class, cart_btn_class, elem_classes);
      });
    }
}
  
function quantityAction(drawer_class, cart_btn_class, classes) {
	const quantity_check_result = checkQuantity(classes);
    const view_cart_btn = document.getElementById(cart_btn_class);
    const drawer = document.getElementsByClassName(drawer_class)[0];
  
  	if(quantity_check_result == "error") {
      drawer.classList.remove("warn-caution");
      drawer.classList.add("warn");
      drawer.classList.add("warn-invalid");
      view_cart_btn.classList.add("hide");
    }
  	else if(quantity_check_result == "warning") {
      drawer.classList.remove("warn-invalid");
      drawer.classList.add("warn");
      drawer.classList.add("warn-caution");
      view_cart_btn.classList.remove("hide");
    }
  	else {
      drawer.classList.remove("warn");
      drawer.classList.remove("warn-invalid");
      drawer.classList.remove("warn-caution");
      view_cart_btn.classList.remove("hide");
    }
    addActionButtonListeners(drawer_class, cart_btn_class, classes, "action-icon");
    addActionButtonListeners(drawer_class, cart_btn_class, classes, "delete-item-container");
}

function checkQuantity(classes) {
    let has_monthly = false;
    let has_quarterly = false;
    let cai_pack_count = 0;
    let bk_count = 0;
    let bk_setup_count = 0;
    let brand_count = 0;
    
    // Get all Products in Cart
    let cart_items = document.getElementsByClassName(classes["items"]);
    // Stop if cart is empty
    if(!Array.from(cart_items).length) { 
        return "empty"; 
    }
    
    for(const product of cart_items) {
        // Collect Product Details
        let product_name = product.getElementsByClassName(classes["prod_name"])[0];
        let price = product.getElementsByClassName(classes["prod_price"])[0];
        let quantity = null;

        function htmlDecode(input) {
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }

        if(classes["prod_quantity"].includes("checkout")) {
            quantity = product.getElementsByClassName(classes["prod_quantity"])[1].innerHTML;
            quantity = parseInt(quantity.substring(5));
            product_name = product_name.innerHTML;
        	product_name = htmlDecode(product_name);
        }
        else {
            quantity = product.getElementsByClassName(classes["prod_quantity"])[0].value;
            product_name = product_name.title;
        }

        product.classList.remove("cai");
        product.classList.remove("bk");
        product.classList.remove("bk-setup");
        
        // Check product type and set quantity
        if(cai_packages[0].includes(product_name) || cai_packages[1].includes(product_name)) { 
            product.classList.add("cai");
            cai_pack_count += quantity;
        }
        if(bookkeeping[0].includes(product_name) || bookkeeping[1].includes(product_name)) { 
            product.classList.add("bk");
            bk_count+=quantity; 
        }
        /*if(brand.includes(product_name)) { 
            brand_count+=quantity; 
        }*/
        if(bk_setup.includes(product_name)) { 
            product.classList.add("bk-setup");
            bk_setup_count+=quantity; 
        }
        
        // Add payment period to product price
        if(mnth_prods.includes(product_name)) { 
            has_monthly = true;
            price.classList.add("mnth"); 
        }
        else if(qrt_prods.includes(product_name)) { 
            has_quarterly = true;
            price.classList.add("qrt"); 
        }
    }
    
    const has_multiple_recurring = bk_count > 1 || brand_count > 1 || cai_pack_count > 1 || bk_setup_count > 1;
    const count = {
        "bk": bk_count,
        "brand": brand_count,
        "cai": cai_pack_count,
        "bk_setup": bk_setup_count
    }

    let result = null;
    
    // Show warning message and hide check out button in case of invalid product combination or quantity
    if(has_multiple_recurring) {
        result = "error";
    }
    else if(has_monthly && has_quarterly) {
        result = "warning";
    }
    else {
        result = "valid";
    }

    markProducts1(count, classes["error_element"]);

    return result;
}

// add Exclamation mark for products with error
function markProducts1(count, error_element_class) {
    let prod_types = [];
    if(count["bk"]>1) { prod_types.push("bk") }
    if(count["brand"]>1) { prod_types.push("brand") }
    if(count["cai"]>1) { prod_types.push("cai") }
    if(count["bk_setup"]>1) { prod_types.push("bk-setup") }
    
    let cart = document.getElementsByClassName("err");
    
    for(const product of cart) {
        product.classList.remove("err");
    }
    
    if(prod_types.length>0) {
    
        for(const type of prod_types) {
            let cart = document.getElementsByClassName(type);

            for(const product of cart) {
                const error_class_check = product.getElementsByClassName(error_element_class)[0];
                const error_element = error_class_check ? error_class_check : product;
                error_element.classList.add("err");
            }
        }
    }
}

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}
  