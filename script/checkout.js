import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

function renderOrderSummary() {

let checkOutHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

const deliveryOptionId = cartItem.deliveryOptionId;

	let deliveryOption;
	
deliveryOptions.forEach((option) => {
	if (option.id === deliveryOptionId) {
	  deliveryOption = option;
	}
});

	const today = dayjs();
	const deliveryDate = today.add(deliveryOption.deliveryDays, `days`);

	const dateString = deliveryDate.format(`dddd, MMMM D`);
  


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
		const today = dayjs();
		const deliveryDate = today.add(deliveryOption.deliveryDays, `days`);

		const dateString = deliveryDate.format(`dddd, MMMM D`); 
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
    updateCart();
    renderOrderSummary();
  });
});


document.querySelectorAll('.js-link-primary').forEach((updateButton) => {
	updateButton.addEventListener(`click`, () => {
	const productId = updateButton.dataset.productId; // takes the product id from the button to controll the all product.
	const container = document.querySelector(`.js-cart-item-container-${productId}`);
	container.classList.add('is-editing-quantity');
	
	});
});

document.querySelectorAll(`.js-delivery-option`).forEach
((element) => {
element.addEventListener(`click`, () => {
  const {productId, deliveryOptionId} = element.dataset;
updateDeliveryOption(productId, deliveryOptionId);
renderOrderSummary();
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

 function paymantSummary() {

  let cartQuantitySummary = 0;
  let priceSummary = 0;
  let shippingPrice = 0;
  
  cart.forEach((cartItem) => {

  cartQuantitySummary += cartItem.quantity;

  const deliveryOptionId = cartItem.deliveryOptionId;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      shippingPrice += option.priceCents;
    }
  });

  const productId = cartItem.productId;

  products.forEach((product) => {
    if (product.id === productId) {
      priceSummary += product.priceCents;
    }
  });

  }) 

const totalBeforeTax = priceSummary + shippingPrice;
const estimatedTax = Number(totalBeforeTax / 10);
const orderTotal = totalBeforeTax + estimatedTax;

const HTML = `
<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${cartQuantitySummary}):</div>
  <div class="payment-summary-money">$${formatCurrency(priceSummary)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>
</div>
`;

return HTML;

}

document.querySelector(`.js-payment-summary`).innerHTML = paymantSummary();


}

renderOrderSummary();






