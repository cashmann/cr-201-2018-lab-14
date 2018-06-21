/* global Product, CartItem */

'use strict';

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var opt = document.createElement('option');
    opt.innerText = Product.allProducts[i].name;
    selectElement.appendChild(opt);
    
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  saveCartToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  var itemSelector = document.getElementById('items');
  var cartItems = itemSelector.options[itemSelector.selectedIndex].text;
  
  // TODO: get the quantity
  var itemQuan = document.querySelector('#quantity');
  var quantity = parseInt(itemQuan.value);
  console.log(cartItems, quantity);
  // TODO: using those, create a new Cart item instance
  new CartItem(cartItems, quantity);
  //console.log(new CartItem(cartItems, quantity));
  console.log(CartItem.allItems);
}

// TODO: Save the contents of the cart to Local Storage
function saveCartToLocalStorage() {
  localStorage['cartItems'] = JSON.stringify(CartItem.allItems);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var count = 0;
  for(var i=0; i<CartItem.allItems.length; i++){
    var itemCount = CartItem.allItems[i].quantity;
    count += itemCount;
  }
  console.log(count);
  var counter = document.querySelector('#itemCount');
  counter.innerText = count;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  var cartContents = document.querySelector('#cartContents');
  cartContents.innerHTML = '';
  for(var i=0; i<CartItem.allItems.length; i++){
    var itemName = CartItem.allItems[i].item;
    var itemQuantity = CartItem.allItems[i].quantity;
    var li = document.createElement('li');
    li.innerText = itemName + ':' + itemQuantity;
    cartContents.appendChild(li);
  }
 
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
