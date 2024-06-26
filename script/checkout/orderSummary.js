import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, getDeliveryOptionDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {

let checkOutHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);


  const deliveryOptionId = cartItem.deliveryOptionId;

	const deliveryOption = getDeliveryOption(deliveryOptionId);
  
	
	const dateString = getDeliveryOptionDate(deliveryOption);
  


checkOutHTML += `
  <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>

                <div class="product-price">
$${formatCurrency(matchingProduct.priceCents * cartItem.quantity)}
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
		  </div>
                ${deliveryOptionsHTML(productId, cartItem, matchingProduct)}
              </div>
            </div>
          </div>
  `;
  
});

function deliveryOptionsHTML(productId, cartItem, matchingProduct) {
	let HTML = ``;
	
	deliveryOptions.forEach((deliveryOption) => {
		
		const dateString = getDeliveryOptionDate(deliveryOption);
		const priceString = deliveryOption.priceCents === 0
			? `Free`
			: `$${formatCurrency(deliveryOption.priceCents)} -`;
		
		const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
		
		HTML += `
  		<div class="delivery-option js-delivery-option"
       data-product-id="${matchingProduct.id}"
       data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" ${isChecked ? `checked` : ``}
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
                </div>
		`
	});
	return HTML;
}


document.querySelector(`.js-order-summary`).innerHTML = checkOutHTML;

document.querySelectorAll(`.js-delete-link`).forEach((link) => {
	  link.addEventListener(`click`, () => {
    const productId = link.dataset.productId; // takes the product id from the button to controll the all product.
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    renderPaymentSummary();
  });
});


document.querySelectorAll('.js-link-primary').forEach((updateButton) => {
	updateButton.addEventListener(`click`, () => {
	const productId = updateButton.dataset.productId; // takes the product id from the button to controll the all product.
	const container = document.querySelector(`.js-cart-item-container-${productId}`);
	container.classList.add('is-editing-quantity');
  renderPaymentSummary();

	
	});
});

document.querySelectorAll(`.js-delivery-option`).forEach
((element) => {
element.addEventListener(`click`, () => {
  const {productId, deliveryOptionId} = element.dataset;
updateDeliveryOption(productId, deliveryOptionId);
renderOrderSummary();
renderPaymentSummary();
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
    renderOrderSummary();
    renderPaymentSummary();
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




}

renderOrderSummary();






