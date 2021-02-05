"use strict";

let returnIndex = document.createElement("h2");
returnIndex.innerHTML += `<a href="index.html"><span class="fas fa-chevron-left"></span> Accueil</a>`;
createContainer.appendChild(returnIndex);

fetch(`http://localhost:3000/api/teddies/${productId}`)
	.then((response) => response.json())
	.then(function (product) {
		let teddy = product; // transforme produit en teddy

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

		// Je souhaite ajouter l'objet dans mon panier et le mettre dans mon localstorage.
		let cart = JSON.parse(localStorage.getItem("teddy")) || [];

		// Pour cela, je dois créer un objet nommé "teddyObject" afin que le localstorage puisse récupérer ses informations
		let addToCart = document.querySelector(".add-to-cart");
		addToCart.addEventListener("click", () => {
			let teddyObject = {
				imageUrl: teddy.imageUrl,
				name: teddy.name,
				description: teddy.description,
				price: teddy.price,
				quantity: 1,
				_id: teddy._id,
				color: teddy.colors,
			};

			cart.push(teddyObject);
			localStorage.setItem("teddy", JSON.stringify(cart));
			console.log(`${teddy.name} a bien été ajouté au panier`);
		});

		console.log(cart);
		console.log(localStorage);
		let dynamicTitle = document.querySelector("title");
		dynamicTitle.textContent = `Orinours, découvrez ${teddy.name}`;
	});
