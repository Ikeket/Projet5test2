"use strict";
import { cart, createContainer, total, orderData } from "./utils.js";

// FR : permet d'obtenir la date au moment de la commande
// EN : allows to obtain the date for the order
let date = new Date();

// FR : vérifie qu'il y a bien une commande, sinon affiche un message d'erreur à l'utilisateur
// EN : checks if there is an order, otherwise display an error message to the user
if (orderData !== null) {
	let orders = document.createElement("article");
	orders.className = "orders";

	let order = document.createElement("div");
	order.className = "orders__box text-center";
	order.innerHTML += `
		<h3>Votre commande</h3><br>
		<div class="orders__box-order">N° de commande : ${orderData.orderId}</div>
		<div class="orders__box-date">
			Passée le : ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}.
		</div>
		<div class="orders__box-adresse">
			Livrée chez ${orderData.contact.firstName} ${orderData.contact.lastName} 
			au ${orderData.contact.address} à  ${orderData.contact.city}
		</div>
		<div class="orders__box-email">Email de contact : ${orderData.contact.email}</div>
		`;

	// FR : affiche le nom et la quantité des produits achetés par l'utilisateur
	// EN : display the name and the quantity of products bought by the user
	cart.forEach((teddy) => {
		let displayProduct = document.createElement("div");
		displayProduct.className = "orders__box-details";
		displayProduct.innerHTML += `<h4>${teddy.name} x ${teddy.quantity}</h4>`;
		orders.append(displayProduct);
	});

	let totalPrice = document.createElement("div");
	totalPrice.className = "orders__box";
	totalPrice.innerHTML += `Total de la commande : ${total}€`;

	orders.append(totalPrice);
	orders.prepend(order);
	createContainer.append(orders);
} else {
	let noOrder = document.createElement("div");
	noOrder.innerHTML += `Vous n'avez rien commandé. Veuillez retourner à l'accueil pour passer commande.`;
	createContainer.append(noOrder);
}
