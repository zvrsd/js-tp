/*eslint-env es6*/

const HOME_FRAG_URL = "../frag/home.html";
const NEWS_FRAG_URL = "../frag/news.html";
const CART_FRAG_URL = "../frag/cart.html";
const CONTACT_FRAG_URL = "../frag/contact.html";

var contentDiv = null;
var homeLink = null;
var cartLink = null;
var cartLink = null;
var contactLink = null;

var menuTabs = null;

/*
 * Initalizes variables and stuffs
 *
 */
function init() {

    contentDiv = document.getElementById("page_content");

    homeLink = document.getElementById("home_link");
    cartLink = document.getElementById("cart_link");
    contactLink = document.getElementById("contact_link");

    menuTabs = document.querySelectorAll(".menu_tab");
    menuTabs.forEach(function (element) {
        element.addEventListener("click", selectTab);
    });
}

function displayHomePage(event) {
    getFile("../frag/home.html", displayContent);
    console.log(event);
    homeLink.classList.add("active");
    homeLink.setAttribute("class", "active");
}

function selectTab(event) {
    
    var element = event.target;
    console.log(event.target);

    // Sets the current element as active
    setActiveTab(element);
    
    // Home tab is selected
    if (element == homeLink) {
        setHTMLContent("../frag/home.html", displayContent);
    }
    // Cart tab is selected
    if (element == cartLink) {
        setHTMLContent("../frag/cart.html", displayContent);
    }
    // Contact tab is selected
    if (element == contactLink) {
        setHTMLContent("../frag/contact.html", displayContent);
    }

}

function displayContent(content) {
    
    contentDiv.innerHTML = content;
    loadScript("../js/cart.js");
}

function setHTMLContent(path, callback) {

    let req = new XMLHttpRequest();

    req.open("GET", path);
    req.onload = function () {

        if (req.status == 200) {
            callback(this.responseText);
        } else {
            callback("Error: " + req.status);
        }
    }
    req.send();
}

/* 
 * Sets a specified element to be the active tab
 *
*/
function setActiveTab(element) {
    
    // Remove active class from tabs
    menuTabs.forEach(function (element) {
        element.classList.remove("active");
    });
    
    // Make this element get the active class
    element.classList.add("active");
}
/*
 * Loads a JS script
 */
function loadScript(path) {
    
    // Create new script element
    const script = document.createElement("script");
    script.src = path;
    
    var scripts = contentDiv.querySelectorAll("script");

    
    scripts.forEach(function(e){
        contentDiv.appendChild(script); 
        console.log("scr : "+script);
        console.log("cd : "+scripts.length);
    });
    console.log("cd : "+scripts.length);
    

    // Append to the `head` element
    //document.body.appendChild(script);
}