"use strict";

let productBox = document.createElement("article");
productBox.className = "product";
createContainer.appendChild(productBox);

fetch(`http://localhost:3000/api/teddies`)
	.then((response) => response.json())
	.then((product) => {
		let teddies = product;
		teddies.forEach((teddy) => {
			let teddyBox = document.createElement("div"); // créé la box qui contient chaque teddy
			teddyBox.className = "product__box text-center";
			teddyBox.innerHTML += `
			<a href="teddy.html?id=${teddy._id}">
				<img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${teddy.name}" width="450">
				<span class="product__box__text">
						<span class="product__box__text-name name">${teddy.name}</span>
						<span class="product__box__text-price price">${teddy.price / 100}€</span>
				</span>
			</a>`;
			productBox.appendChild(teddyBox);
		});
	});
