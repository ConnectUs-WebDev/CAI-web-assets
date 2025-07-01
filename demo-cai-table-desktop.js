 
// Utility to get URL query params
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        if (key) params[key] = decodeURIComponent(value || "");
    });
    return params;
}

// Set sessionStorage values from URL
(function () {
    const params = getQueryParams();
    if (params.tab) {
        let tabIndex = 0;
        if (params.tab === "social") tabIndex = 1;
        else if (params.tab === "book") tabIndex = 2;

        sessionStorage.setItem("activeTabIndex", tabIndex.toString());
    }

    if (params.submenu === "ac-management") {
        sessionStorage.setItem("activateTab", "account-management-social");
    } else if (params.submenu === "ac-setup") {
        sessionStorage.setItem("activateTab", "account-setup-social");
    } else if (params.submenu === "book-management") {
        sessionStorage.setItem("activateTab", "bookkeeping-management");
    } else if (params.submenu === "book-setup") {
        sessionStorage.setItem("activateTab", "bookkeeping-setup");
    }
})();

 
window.addEventListener("pageshow", function () {
    const sections = [
        document.getElementById("platform-tab"),
        document.getElementById("social-media-tab"),
        document.getElementById("bookkeepers-tab")
    ];

    sections.forEach(section => {
        if (section) {
            section.style.position = "absolute";
            section.style.opacity = "0";
            section.style.visibility = "hidden";
        }
    });

    const sessionTab = sessionStorage.getItem("activateTab");
    const shouldLoadSocial = sessionTab === "account-management-social" || sessionTab === "account-setup-social";
    const shouldLoadBookkeeping = sessionTab === "bookkeeping-management" || sessionTab === "bookkeeping-setup";
    const savedIndex = sessionStorage.getItem("activeTabIndex");
    const indexToLoad = shouldLoadSocial ? 1 : shouldLoadBookkeeping ? 2 : (savedIndex !== null ? parseInt(savedIndex) : 0);

    toggleSwitch(indexToLoad);

    // Handle sub-tab clicks
    setTimeout(() => {
        if (sessionTab === "account-management-social") {
            document.getElementById("compare-brand")?.classList.add("active");
            document.getElementById("compare-brand")?.click();
        }

        if (sessionTab === "account-setup-social") {
            const setup = document.querySelector("#social-media-tab .sub-item");
            setup?.classList.add("active");
            setup?.click();
        }

        if (sessionTab === "bookkeeping-management") {
            document.getElementById("compare-bookkeeping")?.classList.add("active");
            document.getElementById("compare-bookkeeping")?.click();
        }

        if (sessionTab === "bookkeeping-setup") {
            document.getElementById("setup-compare")?.classList.add("active");
            document.getElementById("setup-compare")?.click();
        }

        sessionStorage.removeItem("activateTab");
    }, 150);
});

// Reset visual state and hide all packages
function resetState() {
    document.querySelectorAll("input, textarea").forEach(input => input.value = "");
    document.querySelectorAll(".sub-item").forEach(item => item.classList.remove("active"));

    document.getElementById("business-pages-table")?.style.setProperty("display", "none");
    document.getElementById("brand-package")?.style.setProperty("display", "none");
    document.getElementById("bookkeeping-table")?.style.setProperty("display", "none");
    document.getElementById("setup-package")?.style.setProperty("display", "none");
}

// Main toggle switch logic
function toggleSwitch(index) {
    resetState();
    sessionStorage.setItem("activeTabIndex", index);

    const slider = document.querySelector(".toggle-slider");
    const options = document.querySelectorAll(".toggle-option");
    const sections = [
        document.getElementById("platform-tab"),
        document.getElementById("social-media-tab"),
        document.getElementById("bookkeepers-tab")
    ];

    options.forEach(option => option.classList.remove("active"));
    sections.forEach(section => {
        if (section) {
            section.style.position = "absolute";
            section.style.opacity = "0";
            section.style.visibility = "hidden";
        }
    });

    if (index !== null && sections[index]) {
        options[index].classList.add("active");
        const activeSection = sections[index];
        activeSection.style.position = "relative";
        activeSection.style.opacity = "1";
        activeSection.style.visibility = "visible";

        slider.style.left = `${(index * 100) / 2}%`;

        const firstSubItem = activeSection.querySelector(".sub-item");
        if (firstSubItem) {
            firstSubItem.classList.add("active");
            firstSubItem.click();
        }
    } else {
        slider.style.left = "-100%";
    }
}

// Toggle Code
document.addEventListener("DOMContentLoaded", function () {
    const pricingData = {
        "platform": {
            "essential-price": { 
                monthly: "$3,780<span>/mo</span>",
                quarterly: "$10,206<span>/qtr</span>",
                buttonId: "essential-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57cb100a65751dd7e7a10",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57fac28f1dcca14f44efa"
                }
            },
            "growth-price": { 
                monthly: "$6,120<span>/mo</span>",
                quarterly: "$16,524<span>/qtr</span>",
                buttonId: "growth-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57cf39bc84284ce42265d",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57ffb3e61f19d0a3fa726"
                }
            },
            "premium-price": { 
                monthly: "$9,700<span>/mo</span>",
                quarterly: "$26,190<span>/qtr</span>",
                buttonId: "premium-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57d2528f1dcf4cff44bd4",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e5806200a6574f057e7e31"
                }
            }
        },
        "brand": {
            "brandbuilder-price": { 
                monthly: "$2,400<span>/mo</span>",
                quarterly: "$6,480<span>/qtr</span>",
                buttonId: "brand-builder-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57de846736c4259e51235",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e580c300a65735117e7e69"
                }
            },
            "brandaccelerator-price": { 
                monthly: "$3,600<span>/mo</span>",
                quarterly: "$9,720<span>/qtr</span>",
                buttonId: "brand-accelerator-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57e1428f1dc39c5f44d26",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e581333e61f10c4c3fa82d"
                }
            }
        },
        "bookkeeping": {
            "essentialbookkeeping-price": { 
                monthly: "$1,200<span>/mo</span>",
                quarterly: "$3,240<span>/qtr</span>",
                buttonId: "essential-bookkeeping-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57ef99bc842d6fe4228d8",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e5823d46736ca6f8e516df"
                }
            },
            "premiumbookkeeping-price": { 
                monthly: "$2,400<span>/mo</span>",
                quarterly: "$6,480<span>/qtr</span>",
                buttonId: "premium-bookkeeping-button",
                links: {
                    monthly: "https://cai-packages.connectus-marketing.com/product-details/product/67e57f309bc8421324422919",
                    quarterly: "https://cai-packages.connectus-marketing.com/product-details/product/67e5828b46736c7aa1e51723"
                }
            }
        },
    };


        // Map save messages to their groups
    const saveQuarterlyMap = {
        platform: [
            "save-essential-quarterly",
            "save-growth-quarterly",
            "save-premium-quarterly"
        ],
        brand: [
            "save-brandbuild-quarterly",
            "save-brandaccel-quarterly"
        ],
        bookkeeping: [
            "save-bookessential-quarterly",
            "save-bookpremium-quarterly"
        ]
    };

function toggleBillingPlan(event) {
    const toggle = event.target;
    const container = toggle.closest(".billing-switch-container");
    if (!container) return; // 🚫 Skip if not inside expected container

    const group = container.dataset.group;
    const isChecked = toggle.checked;

    if (pricingData[group]) {
        Object.keys(pricingData[group]).forEach(priceId => {
            let priceElement = document.querySelector(`#${priceId}`);
            let buttonElement = document.querySelector(`#${pricingData[group][priceId].buttonId}`);
            if (priceElement) {
                priceElement.innerHTML = isChecked
                    ? pricingData[group][priceId].quarterly
                    : pricingData[group][priceId].monthly;
            }
            if (buttonElement) {
                buttonElement.href = isChecked
                    ? pricingData[group][priceId].links.quarterly
                    : pricingData[group][priceId].links.monthly;
            }
        });
    }

    if (saveQuarterlyMap[group]) {
        saveQuarterlyMap[group].forEach(saveId => {
            const el = document.getElementById(saveId);
            if (el) {
                el.style.display = isChecked ? "inline-block" : "none";
            }
        });
    }
}



    document.querySelectorAll("input[type='checkbox']").forEach(toggle => {
    toggle.addEventListener("change", toggleBillingPlan);

    // ✅ Apply initial state on page load
    toggleBillingPlan({ target: toggle });
});
});


//Social Media Tab
document.addEventListener("DOMContentLoaded", function () {
    const subItems = document.querySelectorAll(".sub-item");
    const businessTable = document.getElementById("business-pages-table");
    const brandTable = document.getElementById("brand-package");
    const compareBrand = document.getElementById("compare-brand");
    const accountShortcut = document.getElementById("account-management-shortcut");

    function setActiveTab(selectedTab) {
    if (!selectedTab) return;
    subItems.forEach(item => item.classList.remove("active"));
    selectedTab.classList.add("active");

    const selectedText = selectedTab.textContent.trim();
    businessTable.style.display = "none";
    brandTable.style.display = "none";

    // 🔄 Update the hash based on the selected tab
    if (selectedTab.id === "compare-brand") {
        // window.location.hash = "tab=compare";
    } else {
        window.location.hash = ""; // Clear it if not compare
    }

    if (selectedText === "Account Setup") {
        businessTable.style.display = "table";
        return;
    }

    if (selectedText === "Account Management" || selectedTab.id === "compare-brand") {
        brandTable.style.display = "table";
        return;
    }
}

    // Add delay to allow GHL DOM to finish rendering
    setTimeout(() => {
        const hash = window.location.hash;
        if (hash === "#tab=compare") {
            setActiveTab(compareBrand);
            compareBrand?.scrollIntoView({ behavior: "smooth" });
        } else {
            const defaultTab = document.querySelector(".sub-item");
            if (defaultTab) setActiveTab(defaultTab);
        }
    }, 100);

    subItems.forEach(item => {
        item.addEventListener("click", function () {
            setActiveTab(this);
        });
    });

    compareBrand?.addEventListener("click", function () {
        setActiveTab(this);
    });

    accountShortcut?.addEventListener("click", function (event) {
        event.preventDefault();
        setActiveTab(compareBrand);
    });
});


//Bookkeeping Tab 
document.addEventListener("DOMContentLoaded", function () {
const navItems = document.querySelectorAll(".sub-item");
const setupTable = document.getElementById("setup-package");
const bookkeepingTable = document.getElementById("bookkeeping-table");
const compareSetup = document.getElementById("setup-compare");
const compareBookkeeping = document.getElementById("compare-bookkeeping");
const headerSetup = document.getElementById("header-setup");
const bottomSetup = document.getElementById("bottom-setup");
const bookkeepingShortcut = document.getElementById("bookkeeping-shortcut");

const platformTab = document.getElementById("platform-tab");
const socialMediaTab = document.getElementById("social-media-tab");

// Function to hide both header-setup and bottom-setup
function hideSetupElements() {
    if (headerSetup) headerSetup.style.display = "none";
    if (bottomSetup) bottomSetup.style.display = "none";
}

// Function to show both header-setup and bottom-setup
function showSetupElements() {
    if (headerSetup) headerSetup.style.display = "block";
    if (bottomSetup) bottomSetup.style.display = "block";
}

// Hide elements initially
hideSetupElements();

function updateActiveSelection(clickedItem) {
    // Update selection UI
    navItems.forEach(item => item.classList.remove("selected"));
    clickedItem.classList.add("selected");

    const selectedText = clickedItem.textContent.trim();

    if (setupTable) setupTable.style.display = "none";
    if (bookkeepingTable) bookkeepingTable.style.display = "none";

    // Show the correct table based on selection
    if (selectedText === "Bookkeeping Setup" && setupTable) {
        setupTable.style.display = "table";
    } else if (selectedText === "Bookkeeping Management" && bookkeepingTable) {
        bookkeepingTable.style.display = "table";
    }

    // Show or hide setup elements based on clicked item
    if (clickedItem.id === "setup-compare") {
        showSetupElements(); // Show both header and bottom
    } else {
        // Always hide setup elements unless setup-compare is selected
        hideSetupElements();
    }
}

// Menu item listeners
navItems.forEach(item => {
    item.addEventListener("click", function () {
        updateActiveSelection(this);
    });
});

// Compare tab listeners
if (compareSetup) {
    compareSetup.addEventListener("click", function () {
        updateActiveSelection(this);
    });
}

if (compareBookkeeping) {
    compareBookkeeping.addEventListener("click", function () {
        updateActiveSelection(this);
    });
}

// Shortcut listener
if (bookkeepingShortcut) {
    bookkeepingShortcut.addEventListener("click", function (e) {
        e.preventDefault();
        updateActiveSelection(compareBookkeeping);
    });
}

// Additional tab listeners
if (platformTab) {
    platformTab.addEventListener("click", function () {
        updateActiveSelection(this);
    });
}

if (socialMediaTab) {
    socialMediaTab.addEventListener("click", function () {
        updateActiveSelection(this);
    });
}

// Load default tab
const defaultTab = document.querySelector(".sub-item");
if (defaultTab) {
    updateActiveSelection(defaultTab);
}
});




document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".toggleBtn");

    buttons.forEach(button => {
    button.addEventListener("click", () => {
        const th = button.closest("th"); // Find the closest <th> ancestor
        const text = th.querySelector(".text"); // Find the related <p> text
        const promo = th.querySelector(".promo"); // Find the related <p class="promo">

        text.classList.toggle("expanded");
        button.textContent = text.classList.contains("expanded") ? "Show Less" : "Show More";

        // Hide the promo when "Show More" is clicked, show when "Show Less" is clicked
        if (promo) {
        promo.style.display = text.classList.contains("expanded") ? "none" : "block";
        }
    });
    });
});

