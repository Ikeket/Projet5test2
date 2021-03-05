"use strict";
import { createContainer } from "./utils.js";

fetch(`http://localhost:3000/api/teddies`)
	.then((response) => response.json())
	.then((teddies) => {
		let teddiesBox = document.createElement("article");
		teddiesBox.className = "product";
		createContainer.appendChild(teddiesBox);

		teddies.forEach((teddy) => {
			let teddyBox = document.createElement("div");
			teddyBox.className = "product__box text-center";
			teddyBox.innerHTML += `
		<a href="teddy.html?id=${teddy._id}">
			<img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${teddy.name}" width="450">
			<span class="product__box__text">
					<span class="product__box__text-name name">${teddy.name}</span>
					<span class="product__box__text-price price">${teddy.price / 100}€</span>
			</span>
		</a>`;
			teddiesBox.appendChild(teddyBox);
		});
	})
	.catch((error) => console.error("message : " + error));

/*
Améliorations / Improvement
FR : implémenter la possibilité d'ajouter produit directement dans le panier depuis la homepage
EN : implement the possibility of adding the product directly on cart from the homepage
*/
