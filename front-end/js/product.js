"use strict";

import { productId, cart, createContainer } from "./utils.js";

fetch(`http://localhost:3000/api/teddies/${productId}`)
	.then((response) => response.json())
	.then(function (teddy) {
		// affiche le teddy
		let teddyProduct = document.createElement("article");
		teddyProduct.className = "teddy";
		teddyProduct.innerHTML += `<img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${teddy.name}" width="900">`;
		createContainer.appendChild(teddyProduct);

		let teddyBox = document.createElement("div");
		teddyBox.className = "teddy__box";
		teddyBox.innerHTML += `
		<div class="teddy__box__text">
			<h3 class="teddy__box__text-name">${teddy.name}</h3>
			<p class="teddy__box__text-price">Prix : ${teddy.price / 100}€</p>
			<p class="teddy__box__text-description">${teddy.description}</p>
		</div>
		<div class="teddy__box__input">
			<select name="colors" id="teddy__colors"></select>
		</div>
		<button class="add-to-cart btn buy-btn text-center" type="button">Craquer pour ${
			teddy.name
		}</button>`;
		teddyProduct.appendChild(teddyBox);
		let teddyColors = document.getElementById("teddy__colors");
		teddy.colors.forEach(function (product_color) {
			teddyColors.innerHTML += `<option value="${product_color}">${product_color}</option>`;
		});
		let dynamicTitle = document.querySelector("title");
		dynamicTitle.textContent = `Orinours, découvrez ${teddy.name}`;

		// *************** création et gestion du local storage *************** //

		let teddyObject = {
			name: teddy.name,
			quantity: 1,
			imageUrl: teddy.imageUrl,
			description: teddy.description,
			price: teddy.price / 100,
			_id: teddy._id,
			color: teddyColors.value,
		};

		let addToCart = document.querySelector(".add-to-cart");
		addToCart.addEventListener("click", () => {
			if (localStorage.length === 0) {
				cart.push(teddyObject);
				localStorage.setItem("teddy", JSON.stringify(cart));
			} else {
				for (let i = 0; i < cart.length; i++) {
					if (cart[i].name === teddyObject.name) {
						console.log(`ils ont le même prénom ${cart[i].name}`);
						cart[i].quantity += 1;
						localStorage.setItem("teddy", JSON.stringify(cart));
						break;
					} else {
						cart.push(teddyObject);
						localStorage.setItem("teddy", JSON.stringify(cart));
						console.log(`test ${teddy.name}`);
						break;
					}
				}
			}
			// window.location.reload();
		});
	});

let returnIndex = document.createElement("h2");
returnIndex.innerHTML += `<a href="index.html"><span class="fas fa-chevron-left"></span> Accueil</a>`;
createContainer.appendChild(returnIndex);
