export const cart = [{
productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
quantity: 2
}
];

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
console.log(cart);	
}

