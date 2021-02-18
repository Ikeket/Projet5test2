"use strict";
import { cart, createContainer } from "./utils.js";

let cartBox = document.createElement("article");
cartBox.className = "cart";
cartBox.innerHTML += `<div class="cart__price price">Prix</div>`;
createContainer.prepend(cartBox);

fetch(`http://localhost:3000/api/teddies/`)
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
                            <h3>${teddyInCart.name}</h3>
                            <p>En stock</p>
                            <div class="cart__box-text-quantity">
                                <p>Quantité : ${teddyInCart.quantity}</p>
                            </div>
                        </div>
                    <div  class="cart__box-price">Total : ${
						teddyInCart.price * teddyInCart.quantity
					}€</div>`;
			cartBox.appendChild(displayCart);
		});

		let sum = 0;
		for (let y = 0; y < cart.length; y++) {
			let price = Number(cart[y].price);
			let quantity = Number(cart[y].quantity);
			let sumTeddy = price * quantity;
			console.log(sumTeddy);
			sum += sumTeddy;
			console.log("sum : " + sum);
			localStorage.setItem("prices", JSON.stringify(sum));
		}

		let displayTotalCart = document.createElement("div");
		displayTotalCart.innerHTML += `Le total de votre panier s'élève à ${sum}€ `;
		cartBox.append(displayTotalCart);
	});

let formUser = document.querySelector("#form-user");
console.log(formUser);

let returnIndex = document.createElement("h2");
returnIndex.innerHTML += `<a href="index.html"  class="container"><span class="fas fa-chevron-left"></span> Accueil</a>`;
main.append(returnIndex);
