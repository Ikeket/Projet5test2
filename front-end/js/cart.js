"use strict";
import { cart, createContainer } from "./utils.js";

if (cart.length === 0) {
	let emptyCart = document.createElement("div");
	emptyCart.className = "container";
	emptyCart.innerHTML += `Votre panier est vide, et si vous craquiez pour l'un de nos oursons ?`;
	createContainer.append(emptyCart);
	/*
	Améliorations / Improvement
	FR : ajouter les visuels de produit phares afin d'inciter le client à en acheter
	EN : add featured product visuals to encourage customers to buy them
	*/
} else {
	let cartBox = document.createElement("article");
	cartBox.className = "cart";
	cartBox.innerHTML += `<div class="cart__price price">Prix</div>`;
	createContainer.prepend(cartBox);

	fetch(`http://localhost:3000/api/teddies/`) //fetch inutile
		.then((response) => response.json())
		.then(function (teddy) {
			JSON.parse(localStorage.getItem("teddy")).forEach((teddyInCart) => {
				let displayCart = document.createElement("div");
				displayCart.className = "cart__box";
				displayCart.innerHTML += `
                    <img src="${
						teddyInCart.imageUrl
					}" class="cart__box__teddy-picture" alt="Produit : ${
					teddyInCart.name
				}" width="150" />
                    <div class="cart__box-text">
                        <p><strong>${teddyInCart.name}</strong></p>
                        <p>x ${teddyInCart.quantity}</p>
                    </div>
                    <div  class="cart__box-price">${
						teddyInCart.price * teddyInCart.quantity
					}€</div>`;
				cartBox.appendChild(displayCart);
			});

			let sum = 0;
			for (let y = 0; y < cart.length; y++) {
				let price = Number(cart[y].price);
				let quantity = Number(cart[y].quantity);
				let sumTeddy = price * quantity;
				sum += sumTeddy;
				localStorage.setItem("prices", JSON.stringify(sum));
			}

			let displayTotalCart = document.createElement("div");
			displayTotalCart.className = "cart__total";
			displayTotalCart.innerHTML += `Le total de votre panier s'élève à ${sum}€ `;
			cartBox.append(displayTotalCart);
		});

	let formUser = document.createElement("article");
	formUser.innerHTML += `<h3>Vos coordonnées</h3>
	<form method="POST" class="form" id="form-user">
			<label for="firstame">Prénom</label><br>
			<input name="firstname" type="text" id="firstname" /><br>
			<label for="lastname">Nom</label><br>
			<input name="lastname" type="text" id="lastname" /><br>
			<label for="address">Adresse</label><br>
			<input name="address" type="text" placeholder="n° et rue" id="adress" /><br>
			<input
				name="address"
				type="text"
				placeholder="code postal et ville"
				id="city"
			/><br>
			<label for="email">Email</label><br>
			<input name="email" type="text" id="email" /><br>
		<button type="submit" name="Submit" id="form-button">Envoyer</button>
	</form>`;
	createContainer.append(formUser);

	document.getElementById("form-button").addEventListener("click", function (event) {
		event.preventDefault();

		const contact = {
			firstName: document.getElementById("firstname").value,
			lastName: document.getElementById("lastname").value,
			address: document.getElementById("adress").value,
			city: document.getElementById("city").value,
			email: document.getElementById("email").value,
		};
		let products = [];
		for (let i = 0; i < cart.length; i++) {
			products.push(cart[i]._id); // ajouter une boucle sur la quantité
		}

		fetch("http://localhost:3000/api/teddies/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ contact, products }),
		})
			.then((response) => response.json())
			.then((userData) => {
				localStorage.setItem("order", JSON.stringify(userData));
				alert(`Votre commande a été passée avec succès !`);
				document.location.href = "./orders.html";
			})
			.catch((error) => {
				window.alert(error);
			});
	});
}
