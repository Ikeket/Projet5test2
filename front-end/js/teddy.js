"use strict";
import { productId, cart, createContainer, messageError } from "./utils.js";

if (productId !== null) {
	fetch(`http://localhost:3000/api/teddies/${productId}`)
		.then((response) => response.json())
		.then((teddy) => {
			console.log(teddy.name);
			if (teddy.name !== undefined) {
				let teddyProduct = document.createElement("article");
				teddyProduct.className = "teddy";
				teddyProduct.innerHTML += `<img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${teddy.name}" width="900">`;
				createContainer.prepend(teddyProduct);

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
							<button class="add-to-cart btn buy-btn text-center" type="button">
								Craquer pour ${teddy.name}
							</button>
						</div>
						`;
				teddyProduct.appendChild(teddyBox);
				let teddyColors = document.getElementById("teddy__colors");
				teddy.colors.forEach(function (product_color) {
					teddyColors.innerHTML += `<option value="${product_color}">${product_color}</option>`;
				});
				let dynamicTitle = document.querySelector("title");
				dynamicTitle.textContent = `Orinours, découvrez ${teddy.name}`;

				/*
					FR : création et gestion du localStorage
					EN : creation and management of localStorage
					*/
				let teddyObject = {
					name: teddy.name,
					quantity: 1,
					imageUrl: teddy.imageUrl,
					description: teddy.description,
					price: teddy.price / 100,
					_id: teddy._id,
					color: teddyColors,
				};

				let addToCart = document.querySelector(".add-to-cart");
				addToCart.addEventListener("click", () => {
					window.location.reload(); // rappeler fonction relaod cart
					let teddyAdded = document.createElement("div");
					alert(`${teddy.name} a bien été ajouté à votre panier`);
					teddyBox.append(teddyAdded);

					if (cart.length === 0) {
						cart.push(teddyObject);
						localStorage.setItem("teddy", JSON.stringify(cart));
					} else {
						for (let i = 0; i < cart.length; i++) {
							if (teddyObject.name === cart[i].name) {
								cart[i].quantity += 1;
								localStorage.setItem("teddy", JSON.stringify(cart));
								return;
							}
						}
						cart.push(teddyObject);
						localStorage.setItem("teddy", JSON.stringify(cart));
					}
				});
			} else {
				let wrongTeddy = document.createElement("div");
				wrongTeddy.className = "container";
				wrongTeddy.innerHTML += "Cet ourson n'existe pas. Veuillez retourner à l'accueil !";
				createContainer.appendChild(wrongTeddy);
			}
		})
		.catch((error) => {
			messageError();
			console.error(error);
		});
} else {
	let noTeddy = document.createElement("div");
	noTeddy.className = "container";
	noTeddy.innerHTML +=
		"Vous n'avez pas sélectionné d'ourson. Retournez à l'accueil pour en choisir un !";
	createContainer.appendChild(noTeddy);
}
