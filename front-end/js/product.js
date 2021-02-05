"use strict";
view = "product";

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
		product.colors.forEach(function (product_color) {
			teddyColors.innerHTML += `<option value="${product_color}">${product_color}</option>`;
		});

		let isInCart = false;
		console.log("salut");

		let addToCart = document.querySelector(".add-to-cart");
		if (cart._id === productId) {
			console.log("déjà dans le panier");
			addToCart.innerText = "Adopté !";
			addToCart.disabled = true;
		}

		addToCart.addEventListener("click", () => {
			const productObject = {
				imageUrl: teddy.imageUrl,
				name: teddy.name,
				description: teddy.description,
				price: teddy.price,
				quantity: 1,
				_id: teddy._id,
				color: teddy.colors,
			};

			if (!isInCart) {
				isInCart = true;
				console.log("ajouté");
				addToCart.innerText = "Adopté !";
				addToCart.disabled = true;
				console.log(productObject);
				localStorage.setItem("teddy", JSON.stringify(productObject));
			}
		});

		let dynamicTitle = document.querySelector("title");
		dynamicTitle.textContent = `Orinours, découvrez ${teddy.name}`;
	});
