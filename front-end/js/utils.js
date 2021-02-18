"use strict";

// ************************************************** //
// ********* exported variables & constants ********* //

export const productId = new URLSearchParams(window.location.search).get("id");
export let cart = JSON.parse(localStorage.getItem("teddy")) || [];
export let createContainer = document.getElementById("main__container");
export let sumBuying = JSON.parse(localStorage.getItem("prices"));

// à enlever quand le formulaire utilisateur sera géré
let firstName = "Jane";
let lastname = "Doe";
let address = "1 rue de la Rue";
let country = "Licorneland";
let email = "email@email.email";

export const userData = {
	name: `${firstName} ${lastname}`,
	address: `${address}, ${country}`,
	email: email,
};

// ************************************************** //
// *************** exported functions *************** //

let teddyQuantityInCart = function total() {
	let sum = 0;
	for (let i = 0; i < cart.length; i++) {
		sum = sum + cart[i].quantity;
	}
	return sum;
};
teddyQuantityInCart();
let updateCart = document.querySelector(".cart-number");
updateCart.textContent = `${teddyQuantityInCart()}`;
