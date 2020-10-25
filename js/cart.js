var cartElementHTML = '<tr class="data_row_%ID%"><td><label class="ref_label_%ID%">%PRODUCT%</label></td><td><input type=number name="qty" id="qty_input_%ID%" value="%QTY%"></td><td><label class="price_label_%ID%">%PRICE%</label>&euro;</td><td><label class="price_total_label_%ID%">%TOTAL%</label>&euro;</td><td><button id="remove_%ID%" class="remove_button">Retirer</button></td></tr>';
var MESSAGE_TIMEOUT = 3000;
var MAX_QTY = 777;
var MAX_PRICE = 9000;
var REF_MIN_LENGTH = 3;
var REF_MAX_LENGTH = 16;

var listInput = document.querySelectorAll('input[name="qty"]');
var cartTable = document.getElementById("cart_table");
var totalTable = document.getElementById("total_table");
var priceTotalLabel = document.getElementById("price_total_label");
var removeButtons = document.querySelectorAll('.remove_button');

var addButton = document.getElementById("add_product");
var refNew = document.getElementById("add_ref_input");
var qtyNew = document.getElementById("add_qty_input");
var priceNew = document.getElementById("add_price_input");

var errorMessage = document.querySelector(".error_message");
var infoMessage = document.querySelector(".info_message");

var infoCart = document.querySelector("#info_label");
var infoTotal = document.querySelector("#total_info_label");
var errorCart = document.querySelector("#error_label");

var newRowID = cartTable.getElementsByTagName("tr").length - 1;

var infoMessageTimeout = null;
var errorMessageTimeout = null;
var errorCartTimeout = null;

console.log(removeButtons);

updateCart();

// Add event listener for add product button
addButton.addEventListener('click', addProduct);
refNew.addEventListener('input', checkRefField);
qtyNew.addEventListener('input', checkQtyField);
priceNew.addEventListener('input', checkPriceField);

// Calculate prices for each row
function calculatePrices(event) {

    var nodeElements = cartTable.getElementsByTagName("tr");
    var total = 0;

    // Loop throught each row
    for (var i = 0; i <= newRowID; i++) {

        var qtyInput = document.querySelector("#qty_input_" + i);
        var priceLabel = document.querySelector(".price_label_" + i);
        var totalLabel = document.querySelector(".price_total_label_" + i);

        // If the current id doesnt exist anymore - skip
        if (qtyInput == null) {
            continue;
        }

        // Checks the quantity from the current row
        checkQtyFieldCart(qtyInput);

        var productQty = qtyInput.value;
        var productPrice = priceLabel.innerHTML;
        var totalPrice = totalLabel.innerHTML;

        // If quantity == 0 - removes
        if (productQty === 0) {
            removeProductById(i);
        }

        // If quantity is too high - prevents to go beyond
        if (qtyInput.value > MAX_QTY) {
            qtyInput.value = MAX_QTY;
            productQty = qtyInput.value;
            displayErrorMessage("La quantité ne peut pas être               superieure à " + MAX_QTY);
        }
        // Sets the total price
        totalLabel.innerHTML = parsePrice(eval(productQty * productPrice));
        total += eval(totalLabel.innerHTML);
    }

    // Sets the cart's total price
    priceTotalLabel.innerHTML = parsePrice(total);
}

// ===== ADD NEW PRODUCT ===== //
function addProduct(id, name, price) {
    console.log("add");
}

function addProduct() {

    var reference = refNew.value;
    var quantity = qtyNew.value;
    var price = priceNew.value;

    // If some fields are not valid - abort
    if (!areFieldsValid()) {
        return false;
    }

    price = parsePrice(priceNew.value);

    var newElement = cartElementHTML;
    newElement = newElement.replaceAll('%ID%', newRowID + 1);
    newElement = newElement.replaceAll('%PRODUCT%', reference);
    newElement = newElement.replaceAll('%PRICE%', price);
    newElement = newElement.replaceAll('%QTY%', quantity);
    newElement = newElement.replaceAll('%TOTAL%', eval(quantity * price));
    cartTable.lastElementChild.insertAdjacentHTML('beforeend', newElement);

    // Updates cart buttons etc
    updateCart();

    displayInfoMessage("Le produit [" + reference + "] vient d'être ajouté au panier");

}

// ===== REMOVE PRODUCT ===== //
/*
 * This is the function we call when a product has to be removed from
 * The cart
 */
function removeProduct(event) {

    // Gets the current row id
    var rowId = event.target.id.split('_').pop();
    console.log("event : " + event.target.id);
    console.log("rowid : " + rowId);

    removeProductById(rowId);
}

function removeProductById(id) {

    // TODO : change doc to table
    var currentRow = cartTable.querySelector(".data_row_" + id);
    var reference = getProductReferenceById(id);

    currentRow.parentNode.removeChild(currentRow);

    // Updates cart
    updateCart();

    displayInfoMessage("Le produit [" + reference + "] vient d'être retiré du panier");
}

// ===== UPDATE CART ===== //
function updateCart() {

    // Hides the cart table if empty
    if (isCartEmpty()) {
        cartTable.setAttribute("hidden", "");
        totalTable.setAttribute("hidden", "");
        setCartMessage("Votre panier est vide");
        setTotalMessage("Votre panier est vide");
    } else {
        cartTable.removeAttribute("hidden");
        totalTable.removeAttribute("hidden");
        setCartMessage(" ");
        setTotalMessage(" ");
    }

    elements = cartTable.getElementsByTagName("tr");

    lastElement = elements[elements.length - 1];
    //newRowID = cartTable.getElementsByTagName("tr").length - 1;
    newRowID = getRowId(lastElement);

    listInput = document.querySelectorAll('input[name="qty"]');
    removeButtons = document.querySelectorAll('.remove_button');

    // Add event listener to each row quantity input 
    listInput.forEach(function (element) {
        element.addEventListener('input', calculatePrices);
    });

    // Add event listener for each row remove button
    removeButtons.forEach(function (element) {
        element.addEventListener('click', removeProduct);
    });

    // Calcualtes all the prices
    calculatePrices();
}

// ===== GET PRODUCT REFERENCE ===== //
function getProductReferenceById(id) {
    return document.querySelector(".ref_label_" + id).innerHTML;
}

/*
 * Given a row element from the cart, it returns its "id"
 * which corresponds to its class name :
 * <tr class="data_row_21"> ... will return 21
 */
function getRowId(rowElement) {
    var id = parseInt(rowElement.className.split('_').pop());
    return isNaN(id) ? 0 : id;
}

/*
 * Checks if the given reference already exists in the cart
 * return product's id if it exists
 * return null if it doesnt
 */
function containsReference(reference) {

    // Loop throught each row
    for (var i = 0; i <= newRowID; i++) {

        var refLabel = document.querySelector(".ref_label_" + i);

        // If the current id doesnt exist anymore - skip
        if (refLabel == null) {
            continue;
        }

        var currentRef = refLabel.innerHTML;

        // If currentReference matches reference
        if (currentRef == reference) {
            return i;
        }
    }
    return null;
}

/*
 * Checks if the cart is empty
 * returns true if it is
 */
function isCartEmpty() {
    elements = cartTable.getElementsByTagName("tr");
    console.log(elements.length);
    return (elements.length <= 1 ? true : false);
}

/*
 * Checks if the products reference is valid
 */
function checkRefField() {
    var reference = refNew.value;

    // If product's reference is empty
    if (reference == "") {
        displayErrorMessage(
            "La reference du produit ne peut pas etre vide"
        );
        refNew.setAttribute("class", "error_input");
        return false;
    }
    // If the product's reference already exists
    if (containsReference(reference)) {
        displayErrorMessage(
            "Le produit [" + reference + "] existe déja"
        );
        refNew.setAttribute("class", "error_input");
        return false;
    }
    // If product's reference is too long
    if (reference.length > REF_MAX_LENGTH) {
        displayErrorMessage(
            "La reference du produit ne peut pas faire plus de " + REF_MAX_LENGTH + " caractères"
        );
        setRefField(reference.substring(0, reference.length - 1));
        return false;
    }
    // If product's reference is too short
    if (reference.length < REF_MIN_LENGTH) {
        displayErrorMessage(
            "La reference du produit ne peut pas faire moins de " + REF_MIN_LENGTH + " caractères"
        );
        refNew.setAttribute("class", "error_input");
        return false;
    }
    // May cause issues later
    refNew.removeAttribute("class");
    return true;
}
/*
 * Sets new product's ref field to the specified value
 */
function setRefField(value) {
    refNew.value = value;
    refNew.setAttribute("class", "error_input");
    checkRefField();
}

function checkQtyFieldCart(element) {

    var quantity = element.value;

    // If product's qty is empty
    if (quantity === "") {
        displayErrorCart(
            "La quantité du produit ne peut pas etre vide"
        );
        setQtyFieldCart(element, 1);
        return false;
    }
    // If quantity is not correct
    if (quantity <= 0) {
        displayErrorCart(
            "La quantité ne peut pas être inferieure à 1"
        );
        setQtyFieldCart(element, 1);
        return false;
    }
    // If quantity is too high
    if (quantity > MAX_QTY) {
        displayErrorCart(
            "La quantité ne peut pas être superieure à " + MAX_QTY
        );
        setQtyFieldCart(element, MAX_QTY);
        return false;
    }
    // May cause issues later
    element.removeAttribute("class");
    return true;
}

function setQtyFieldCart(element, value) {
    element.value = value;
    element.setAttribute("class", "error_input");
    checkQtyFieldCart(element);
}
/*
 * Checks if the product's qty is valid
 */
function checkQtyField() {

    var quantity = qtyNew.value;

    // If product's qty is empty
    if (quantity === "") {
        displayErrorMessage(
            "La quantité du produit ne peut pas etre vide"
        );
        setQtyField(1);
        return false;
    }
    // If quantity is not correct
    if (quantity <= 0) {
        displayErrorMessage(
            "La quantité ne peut pas être inferieure à 1"
        );
        setQtyField(1);
        return false;
    }
    // If quantity is too high
    if (quantity > MAX_QTY) {
        displayErrorMessage(
            "La quantité ne peut pas être superieure à " + MAX_QTY
        );
        setQtyField(MAX_QTY);
        return false;
    }
    // May cause issues later
    qtyNew.removeAttribute("class");
    return true;
}
/*
 * Sets new product's quantity field to the specified value
 */
function setQtyField(value) {
    qtyNew.value = value;
    qtyNew.setAttribute("class", "error_input");
    checkQtyField();
}

/*
 * Checks if the product's price is valid
 */
function checkPriceField() {

    var price = priceNew.value;

    // If product's price is empty
    if (price === "") {
        displayErrorMessage(
            "Le prix du produit ne peut pas etre vide"
        );
        setPriceField(0.01);
        return false;
    }
    // If price is not correct
    if (price <= 0) {
        displayErrorMessage(
            "Le prix ne peut pas être inferieur ou égal à 0"
        );
        setPriceField(0.01);
        return false;
    }
    // If price is too high
    if (price > MAX_PRICE) {
        displayErrorMessage(
            "Le prix ne peut pas être superieur à " + MAX_PRICE
        );
        setPriceField(MAX_PRICE);
        return false;
    }
    // May cause issues later
    priceNew.removeAttribute("class");
    return true;
}
/*
 * Sets new product's price field to the specified value
 */
function setPriceField(value) {
    priceNew.value = value;
    priceNew.setAttribute("class", "error_input");
    checkPriceField();
}

/*
 * Checks if the product to be added is valid
 *
 */
function areFieldsValid() {

    if (checkPriceField() && checkQtyField() && checkRefField()) {
        return true;
    }
    return false;
}
/*
 * Parses the price so it always displays 2 decimals
 * 10 = 10.00
 * 10.562 = 10.56
 */
function parsePrice(price) {
    return Number(price).toFixed(2);;
}
/*
 * Displays info messages near cart's products, when a product is
 * removed, added, etc
 */
function displayInfoMessage(message) {

    clearTimeout(infoMessageTimeout);
    // Message display
    infoMessage.innerHTML = message;

    // Hides after some time
    infoMessageTimeout = setTimeout(
        hideInfoMessage, MESSAGE_TIMEOUT);
}
/*
 * Prevents the next message to be hidden too fast if the previous
 * message timeout was still in progress
 */
function hideInfoMessage() {
    infoMessage.innerHTML = "&nbsp";
}

/*
 * Displays error messages near cart's products, when a product 
 * cannot be added or when any error occurs
 */
function displayErrorMessage(message) {

    clearTimeout(errorMessageTimeout);
    // Message display
    errorMessage.innerHTML = message;

    // Hides after some time
    errorMessageTimeout = setTimeout(
        hideErrorMessage, MESSAGE_TIMEOUT);
}
/*
 * Prevents the next message to be hidden too fast if the previous
 * message timeout was still in progress
 */
function hideErrorMessage() {
    errorMessage.innerHTML = "&nbsp";
}

/*
 * Displays error messages under cart's products
 */
function displayErrorCart(message) {

    clearTimeout(errorCartTimeout);
    // Message display
    errorCart.innerHTML = message;

    // Hides after some time
    errorCartTimeout = setTimeout(
        hideErrorCart, MESSAGE_TIMEOUT);
}
/*
 * Prevents the next message to be hidden too fast if the previous
 * message timeout was still in progress
 */
function hideErrorCart() {
    errorCart.innerHTML = "&nbsp";
}

/*
 * Sets a message that is displayed under the cart's products
 */
function setCartMessage(message) {
    infoCart.innerHTML = message;
}
/*
 * Sets a message that is displayed under the total's products
 */
function setTotalMessage(message) {
    infoTotal.innerHTML = message;
}