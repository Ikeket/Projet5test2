"use strict";

export const productId = new URLSearchParams(window.location.search).get("id");
export const user = JSON.parse(localStorage.getItem("order"));

export let cart = JSON.parse(localStorage.getItem("teddy")) || [];
export let createContainer = document.getElementById("main__container");
export let sumBuying = JSON.parse(localStorage.getItem("prices"));

let teddyQuantityInCart = function total() {
	let sum = 0;
	for (let i = 0; i < cart.length; i++) {
		sum = sum + cart[i].quantity;
	}
	return sum;
};
teddyQuantityInCart(); // rappeler la fonction dans product.js

let updateCart = document.querySelector(".cart-number");
updateCart.textContent = `${teddyQuantityInCart()}`;
