import { cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

let checkOutHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

checkOutHTML += `
  <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>

                <div class="product-price">
$${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-link-primary" data-product-id="${productId}">
                    Update
                  </span>
		  <input class="quantity-input js-quantity-input-${productId}">
    		  <span class="save-quantity-link link-primary js-save-link" data-product-id="${productId}">
		    Save
      		  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                ${deliveryOptionsHTML(productId)}
              </div>
            </div>
          </div>
  `;
});

function deliveryOptionsHTML(productId) {
	let HTML = ``;
	deliveryOptions.forEach((deliveryOption) => {
		const today = dayjs();
		const deliveryDate = today.add(
		deliveryOption.deliveryDays, `days`
		);

		const dateString = deliveryDate.format(`dddd, MMMM D`); 
		const priceString = deliveryOption.priceCents === 0
			? `Free`
			: `$${formatCurrency(deliveryOption.priceCents)} -`;
		HTML +=	
		`<div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`
		return HTML;
	})
	
}


document.querySelector(`.js-order-summary`).innerHTML = checkOutHTML;

document.querySelectorAll(`.js-delete-link`).forEach((link) => {
	  link.addEventListener(`click`, () => {
    const productId = link.dataset.productId; // takes the product id from the button to controll the all product.
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});


document.querySelectorAll('.js-link-primary').forEach((updateButton) => {
	updateButton.addEventListener(`click`, () => {
	const productId = updateButton.dataset.productId; // takes the product id from the button to controll the all product.
	const container = document.querySelector(`.js-cart-item-container-${productId}`);
	container.classList.add('is-editing-quantity');
	
	});
});


document.querySelectorAll(`.js-save-link`).forEach((saveButton) => {
	saveButton.addEventListener(`click`, () => {
	const productId = saveButton.dataset.productId; // takes the product id from the button to controll the all product.
	const container = document.querySelector(`.js-cart-item-container-${productId}`);
	container.classList.remove(`is-editing-quantity`);
	 const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
	 const newQuantity = Number(quantityInput.value);
		if (newQuantity > 0 && newQuantity <= 1000) {
			updateQuantity(productId, newQuantity);
		} else {
		alert(`Pick a number between 1 and 1000.
  Thank you and have a nice day :)`);	
		}
		// Displaying at the same moment without refreshing the page.
		updateCartQuantity();
		document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
	});
});



function updateCartQuantity() {
	
let cartQuantity = 0;
	
cart.forEach((cartItem) => {
cartQuantity += cartItem.quantity;
});	
	
document.querySelector(`.js-return-to-home-link`).innerHTML = `${cartQuantity} Items`;
}
 updateCartQuantity();

