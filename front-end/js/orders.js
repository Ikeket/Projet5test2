"use strict";
import { cart, createContainer, sumBuying } from "./utils.js";

let date = new Date();
let orderJSON = JSON.parse(localStorage.getItem("order"));

if (orderJSON === "" || orderJSON === null) {
	console.log("Vous n'avez rien acheté !");
	let noOrder = document.createElement("div");
	noOrder.innerHTML += `Vous n'avez rien commandé.`;
	createContainer.appendChild(noOrder);
} else {
	let orders = document.createElement("article");
	orders.className = "orders";
	createContainer.appendChild(orders);
	let order = document.createElement("div");
	order.className = "orders__box text-center";
	order.innerHTML += `
	<h3>Votre commande</h3><br>
    <div class="orders__box-order">N° de commande : ${orderJSON.orderId}</div>
    <div class="orders__box-date">Passée le : ${date.getDate()}/${
		date.getMonth() + 1
	}/${date.getFullYear()}.</div> 
    <div class="orders__box-adresse">Livrée chez ${orderJSON.contact.firstName} ${
		orderJSON.contact.lastName
	} au ${orderJSON.contact.address} à  ${orderJSON.contact.city}</div>
    <div class="orders__box-email">Email de contact : ${orderJSON.contact.email}</div>
    `;
	orders.appendChild(order);

	cart.forEach((teddy) => {
		let displayProduct = document.createElement("div");
		displayProduct.className = "orders__box-details";
		displayProduct.innerHTML += `<h4>${teddy.name} x ${teddy.quantity}</h4>`;
		orders.appendChild(displayProduct);
	});

	let totalPrice = document.createElement("div");
	totalPrice.className = "orders__box";
	totalPrice.innerHTML += `Total de la commande : ${sumBuying}€`;
	orders.appendChild(totalPrice);
}
