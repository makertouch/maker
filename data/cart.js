export let cart = JSON.parse(localStorage.getItem(`cart`)); 
// When you enter the page for the first time the cart is an array because the defult value, 
// When it saved it's already an array.
// That's why you must have a defult value.
if (!cart) {
cart = [{ 
productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
quantity: 2
}, {
productId: `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
quantity: 3	
}
];	
}


function saveToStorage() {
	localStorage.setItem(`cart`, JSON.stringify(cart));
}

export function addToCart(productId) {

	let matchingItem;

cart.forEach((cartItem) => {
if (productId === cartItem.productId) {
matchingItem = cartItem;  /* make a shortcut of the item (refrences) */
}
}); 

if (matchingItem) {
matchingItem.quantity += 1;
} else {
cart.push({
productId: productId,
quantity: 1
});
}
	saveToStorage();
}

export function removeFromCart(productId) {
	
const newCart = [];

cart.forEach((cartItem) => {
	if(cartItem.productId !== productId) {
		newCart.push(cartItem);
	}
}); 
	cart = newCart;
	saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
	cart.forEach((cartItem) => {
		if (cartItem.productId === productId) {
		cartItem.quantity = newQuantity;	
		}
	});
	
}
