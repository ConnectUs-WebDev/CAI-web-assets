
 
// Query param utility
function getQueryParamsMobileOnly() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        if (key) params[key] = decodeURIComponent(value || "");
    });
    return params;
}

// Handle query-based mobile tab selection
(function () {
    if (window.innerWidth < 768) {
        const params = getQueryParamsMobileOnly();
        if (params.tabmobile) {
            let cardTabIndex = 0;
            if (params.tabmobile === "social") cardTabIndex = 1;
            else if (params.tabmobile === "book") cardTabIndex = 2;

            sessionStorage.setItem("mobileOnly_activeCardTabIndex", cardTabIndex.toString());

            switch (params.submobile) {
                case "ac-management":
                    sessionStorage.setItem("mobileOnly_activeCardTabIndex", "account-management-social");
                    break;
                case "ac-setup":
                    sessionStorage.setItem("mobileOnly_activeCardTabIndex", "account-setup-social");
                    break;
            }
        }
    }
})();

// Mobile toggle function (renamed)
function setMobileTab_CAI(index) {
    const options = document.querySelectorAll('.card-toggle-option');
    const slider = document.querySelector('.card-toggle-slider');
    const sections = [
        document.getElementById('cai-cards'),
        document.getElementById('social-media-cards')
    ];

    sessionStorage.setItem("mobileOnly_activeCardTabIndex", index);

    options.forEach(option => option.classList.remove('active'));
    if (options[index]) options[index].classList.add('active');

    if (slider) slider.style.left = `${index * 50}%`;

    sections.forEach(section => section?.classList.remove('active'));
    if (sections[index]) sections[index].classList.add('active');
}

// Restore selected mobile tab + subtab
window.addEventListener("pageshow", function () {
    if (window.innerWidth < 768) {
        const savedIndex = sessionStorage.getItem("mobileOnly_activeCardTabIndex");
        const indexToLoad = savedIndex !== null ? parseInt(savedIndex) : 0;
        setMobileTab_CAI(indexToLoad);

        const sessionTab = sessionStorage.getItem("mobileOnly_activeCardTabIndex");

        function waitForAndClick(id) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add("active");
                el.click();
                sessionStorage.removeItem("mobileOnly_activeCardTabIndex");
            } else {
                requestAnimationFrame(() => waitForAndClick(id));
            }
        }

        const tabIdMap = {
            "account-management-social": "mobile-compare-social",
            "account-setup-social": "mobilesetup-social"
        };

        if (sessionTab && tabIdMap[sessionTab]) {
            waitForAndClick(tabIdMap[sessionTab]);
        }
    }
});

// Resize behavior for mobile init
let initializedMobile_CAI = false;
window.addEventListener('resize', function () {
    if (window.innerWidth <= 767 && !initializedMobile_CAI) {
        setMobileTab_CAI(0);
        sessionStorage.setItem("mobileOnly_activeCardTabIndex", "0");
        initializedMobile_CAI = true;
    } else if (window.innerWidth > 767 && initializedMobile_CAI) {
        initializedMobile_CAI = false;
    }
});

 


function priceTogglePlatformMobile_CAI() {
  const toggle = document.getElementById('billing-toggle-platform-mobile-cai');

  const platformPricingMobile = {
    essential: {
      monthly: {
        price: "$3,780",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e57cb100a65751dd7e7a10"
      },
      quarterly: {
        price: "$10,206",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e57fac28f1dcca14f44efa"
      },
      priceId: "price-cai-mobile-essential-value",
      buttonId: "cai-mobile-essential-purchase-button"
    },
    growth: {
      monthly: {
        price: "$6,120",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e57cf39bc84284ce42265d"
      },
      quarterly: {
        price: "$16,524",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e57ffb3e61f19d0a3fa726"
      },
      priceId: "price-cai-mobile-growth-value",
      buttonId: "cai-mobile-growth-purchase-button"
    },
    premium: {
      monthly: {
        price: "$9,700",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e57d2528f1dcf4cff44bd4"
      },
      quarterly: {
        price: "$26,190",
        link: "https://cai-packages.connectus-marketing.com/product-details/product/67e5806200a6574f057e7e31"
      },
      priceId: "price-cai-mobile-premium-value",
      buttonId: "cai-mobile-premium-purchase-button"
    }
  };

 function updateMobilePrices() {
  const isQuarterly = toggle.checked;
  console.log("Toggle changed. Is quarterly?", isQuarterly);

  Object.values(platformPricingMobile).forEach(item => {
    const priceEl = document.getElementById(item.priceId);
    const buttonEl = document.getElementById(item.buttonId);
    const selected = isQuarterly ? item.quarterly : item.monthly;

    console.log("Updating", item.priceId, "to", selected.price);

    if (priceEl) {
      priceEl.textContent = selected.price;
      const unit = priceEl.nextElementSibling;
      if (unit && unit.tagName === "SPAN") {
        unit.textContent = isQuarterly ? "/qtr" : "/mo";
      }
    }

    if (buttonEl) {
      buttonEl.href = selected.link;
    }
  });
}


  // Initialize state on load
  if (toggle) {
    toggle.checked = false; // Start on monthly
    updateMobilePrices();
    toggle.addEventListener("change", updateMobilePrices);
  }
}

document.addEventListener("DOMContentLoaded", priceTogglePlatformMobile_CAI);
 
 
