"use strict";
import { cart, createContainer, messageError, otherError, sum, total } from "./utils.js";

// FR : vérifie ce qu'il y a dans le panier pour afficher le contenu du panier ou un message d'erreur à l'utilisateur
// EN : checks what is in the cart to display the contents of the cart or an error message to the user
if (cart.length !== 0) {
	let cartBox = document.createElement("article");
	cartBox.className = "cart";
	cartBox.innerHTML += `<div class="cart__price price">Prix</div>`;
	createContainer.prepend(cartBox);

	// FR : créé les boîtes qui afficheront tous les éléments contenus dans le panier avec leur quantité et le prix total
	// EN : created the boxes that will display all the items contained in the cart with their quantity and the total price
	cart.forEach((teddy) => {
		let displayCart = document.createElement("div");
		displayCart.className = "cart__box";
		displayCart.innerHTML += `
            <img 
			src="${teddy.imageUrl}" 
			class="cart__box__teddy-picture" 
			alt="Produit : ${teddy.name}"
			width="150" />
            <div class="cart__box-text">
                <p><strong>${teddy.name}</strong></p>
                <p>x ${teddy.quantity}</p>
            </div>
            <div  class="cart__box-price">${teddy.price * teddy.quantity}€</div>`;
		cartBox.append(displayCart);
	});

	// FR : appelle la fonction sum qui permet de calculer le total du panier et l'envoie dans le localStorage
	// EN : calls sum function who allows to calculate cart's total and sends it to the localStorage
	sum();
	let displayTotalCart = document.createElement("div");
	displayTotalCart.className = "cart__total";
	displayTotalCart.innerHTML += `Le total de votre panier s'élève à ${total}€ `;
	cartBox.append(displayTotalCart);

	// FR : gestion du formulaire utilisateur et de l'envoi de la commande
	// EN : management of user forma and sending'order
	let formUser = document.getElementById("form-user");
	let sendOrder = document
		.getElementById("form-button")
		.addEventListener("click", function (event) {
			// FR : vérifie que l'utilisateur a bien rempli les champs correctement
			// EN : checks that all fileds are correctly filled
			if (formUser.checkValidity()) {
				const contact = {
					firstName: document.getElementById("firstname").value,
					lastName: document.getElementById("lastname").value,
					address: document.getElementById("adress").value,
					city: document.getElementById("city").value,
					email: document.getElementById("email").value,
				};
				let products = [];
				for (let i = 0; i < cart.length; i++) {
					products.push(cart[i]._id);
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
						document.location.href = "./order.html";
					})
					.catch((error) => {
						console.error(error);
						messageError(otherError);
					});
			}
		});
} else {
	let emptyCart = document.createElement("div");
	emptyCart.className = "container";
	emptyCart.innerHTML += `Votre panier est vide, et si vous craquiez pour l'un de nos oursons ?`;
	createContainer.prepend(emptyCart);
	// FR : permet de ne pas afficher le formulaire lorsque le panier est vide
	// EN : allows to not display the form when the cart is empty
	let hideForm = document.querySelector("#form");
	hideForm.setAttribute("class", "hide");
}

/*******************************************
FR - Amélioration : mettre en place la possibilité de modifier la quantité de produits achetés ou de supprimer le produit du panier
EN - Improvement : add featured product visuals to encourage customers to buy them
*******************************************/
