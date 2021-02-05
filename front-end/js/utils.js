"use strict";

// fonction pour mettre à jour le panier sur toutes les pages

function displayCartStorage() {
	console.log("OK!");
}

let cart = JSON.parse(localStorage.getItem("teddy")) || [];
console.log(cart);

if (cart.quantity >= 1) {
	let addCartNumber = document.querySelector(".cart-number");
	addCartNumber.textContent = "TEST";
	console.log("Il y a un produit dans le local storage");
	console.log(cart.name);
} else {
	console.log("Le local storage est vide");
}

// génére un H2 dynamic en fonction de la page consultée
if (view === "index" || view === "order" || view === "cart") {
	let dynamicH2 = document.createElement("h2");
	switch (view) {
		case "index":
			dynamicH2.innerText = "Nos produits";
			break;
		case "cart":
			dynamicH2.innerText = "Mon panier";
			break;
		case "orders":
			dynamicH2.innerText = "Mes commandes";
			break;
		default:
			dynamicH2.disabled;
	}
	createContainer.prepend(dynamicH2);
}
