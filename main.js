"use strict";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDOM = document.querySelector(".cart");
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
	cart.forEach((cartItem) => {
		const product = cartItem;

		cartDOM.insertAdjacentHTML(
			"beforeend",
			`
      <div class="cart__item">
        <img class="cart__item__image" src="${product.image}" alt="${product.name}">
        <h3 class="cart__item__name">${product.name}</h3>
        <h3 class="cart__item__price">${product.price}</h3>
        <button class="btn btn--primary btn--small${
			product.quantity === 1 ? " btn--danger" : ""
		}" data-action="DECREASE_ITEM">&minus;</button>
        <h3 class="cart__item__quantity">${product.quantity}</h3>
        <button class="btn btn--primary btn--small" data-action="INCREASE_ITEM">&plus;</button>
        <button class="btn btn--danger btn--small" data-action="REMOVE_ITEM">&times;</button>
      </div>
    `
		);

		addToCartButtonsDOM.forEach((addToCartButtonDOM) => {
			const productDOM = addToCartButtonDOM.parentNode;

			if (productDOM.querySelector(".product__name").innerText === product.name) {
				addToCartButtonDOM.innerText = "In Cart";
				addToCartButtonDOM.disabled = true;

				const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
				cartItemsDOM.forEach((cartItemDOM) => {
					if (cartItemDOM.querySelector(".cart__item__name").innerText === product.name) {
						cartItemDOM
							.querySelector('[data-action="INCREASE_ITEM"]')
							.addEventListener("click", () => {
								cart.forEach((cartItem) => {
									if (cartItem.name === product.name) {
										cartItemDOM.querySelector(
											".cart__item__quantity"
										).innerText = ++cartItem.quantity;
										cartItemDOM
											.querySelector('[data-action="DECREASE_ITEM"]')
											.classList.remove("btn--danger");
										localStorage.setItem("cart", JSON.stringify(cart));
									}
								});
							});

						cartItemDOM
							.querySelector('[data-action="DECREASE_ITEM"]')
							.addEventListener("click", () => {
								cart.forEach((cartItem) => {
									if (cartItem.name === product.name) {
										if (cartItem.quantity > 1) {
											cartItemDOM.querySelector(
												".cart__item__quantity"
											).innerText = --cartItem.quantity;
											localStorage.setItem("cart", JSON.stringify(cart));
										} else {
											cartItemDOM.classList.add("cart__item--removed");
											setTimeout(() => cartItemDOM.remove(), 250);
											cart = cart.filter(
												(cartItem) => cartItem.name !== product.name
											);
											localStorage.setItem("cart", JSON.stringify(cart));
											addToCartButtonDOM.innerText = "Add To Cart";
											addToCartButtonDOM.disabled = false;
										}

										if (cartItem.quantity === 1) {
											cartItemDOM
												.querySelector('[data-action="DECREASE_ITEM"]')
												.classList.add("btn--danger");
										}
									}
								});
							});

						cartItemDOM
							.querySelector('[data-action="REMOVE_ITEM"]')
							.addEventListener("click", () => {
								cart.forEach((cartItem) => {
									if (cartItem.name === product.name) {
										cartItemDOM.classList.add("cart__item--removed");
										setTimeout(() => cartItemDOM.remove(), 250);
										cart = cart.filter(
											(cartItem) => cartItem.name !== product.name
										);
										localStorage.setItem("cart", JSON.stringify(cart));
										addToCartButtonDOM.innerText = "Add To Cart";
										addToCartButtonDOM.disabled = false;
									}
								});
							});
					}
				});
			}
		});
	});
}

addToCartButtonsDOM.forEach((addToCartButtonDOM) => {
	addToCartButtonDOM.addEventListener("click", () => {
		const productDOM = addToCartButtonDOM.parentNode;
		const product = {
			image: productDOM.querySelector(".product__image").getAttribute("src"),
			name: productDOM.querySelector(".product__name").innerText,
			price: productDOM.querySelector(".product__price").innerText,
			quantity: 1,
		};

		const isInCart = cart.filter((cartItem) => cartItem.name === product.name).length > 0;

		if (!isInCart) {
			// cart.push(product);
			// localStorage.setItem("cart", JSON.stringify(cart));
			// addToCartButtonDOM.innerText = "In Cart";
			// addToCartButtonDOM.disabled = true;

			const cartItemsDOM = cartDOM.querySelectorAll(".cart__item");
			cartItemsDOM.forEach((cartItemDOM) => {
				if (cartItemDOM.querySelector(".cart__item__name").innerText === product.name) {
					cartItemDOM
						.querySelector('[data-action="INCREASE_ITEM"]')
						.addEventListener("click", () => {
							cart.forEach((cartItem) => {
								if (cartItem.name === product.name) {
									cartItemDOM.querySelector(
										".cart__item__quantity"
									).innerText = ++cartItem.quantity;
									cartItemDOM
										.querySelector('[data-action="DECREASE_ITEM"]')
										.classList.remove("btn--danger");
									localStorage.setItem("cart", JSON.stringify(cart));
								}
							});
						});

					cartItemDOM
						.querySelector('[data-action="DECREASE_ITEM"]')
						.addEventListener("click", () => {
							cart.forEach((cartItem) => {
								if (cartItem.name === product.name) {
									if (cartItem.quantity > 1) {
										cartItemDOM.querySelector(
											".cart__item__quantity"
										).innerText = --cartItem.quantity;
										localStorage.setItem("cart", JSON.stringify(cart));
									} else {
										cartItemDOM.classList.add("cart__item--removed");
										setTimeout(() => cartItemDOM.remove(), 250);
										cart = cart.filter(
											(cartItem) => cartItem.name !== product.name
										);
										localStorage.setItem("cart", JSON.stringify(cart));
										addToCartButtonDOM.innerText = "Add To Cart";
										addToCartButtonDOM.disabled = false;
									}

									if (cartItem.quantity === 1) {
										cartItemDOM
											.querySelector('[data-action="DECREASE_ITEM"]')
											.classList.add("btn--danger");
									}
								}
							});
						});

					cartItemDOM
						.querySelector('[data-action="REMOVE_ITEM"]')
						.addEventListener("click", () => {
							cart.forEach((cartItem) => {
								if (cartItem.name === product.name) {
									cartItemDOM.classList.add("cart__item--removed");
									setTimeout(() => cartItemDOM.remove(), 250);
									cart = cart.filter(
										(cartItem) => cartItem.name !== product.name
									);
									localStorage.setItem("cart", JSON.stringify(cart));
									addToCartButtonDOM.innerText = "Add To Cart";
									addToCartButtonDOM.disabled = false;
								}
							});
						});
				}
			});
		}
	});
});

// // initialise la variable CART
// let cart = JSON.parse(localStorage.getItem(teddy)) || [];
// console.log(cart);

// // vérifie si l'objet est bien dans le panier
// let isInCart = false; // initialise la variable comme fausse
// console.log("pas de le panier");

// // ajoute l'objet dans le panier
// let addToCart = document.querySelector(".add-to-cart");
// console.log("variable addToCart");

// // vérifie que l'objet est dans le panier et si c'est le cas, empêche de le remettre
// if (cart._id === productId) {
// 	addToCart.innerText = `Déjà dans le panier`;
// 	addToCart.disabled = true;
// 	console.log("bouton adopté désactivé");
// } else {

// 	addToCart.addEventListener("click", () => {
// 		const productObject = {
// 			imageUrl: teddy.imageUrl,
// 			name: teddy.name,
// 			description: teddy.description,
// 			price: teddy.price,
// 			quantity: 1,
// 			_id: teddy._id,
// 			color: teddy.colors,
// 		};
// 		cart.push(productObject);
// 		isInCart = true;
// 		console.log("ajouté");
// 		addToCart.innerText = "Adopté !";
// 		addToCart.disabled = true;
// 		console.log(productObject);
// 		localStorage.setItem(`teddy`, JSON.stringify(productObject));
// 		console.log("Test : ");
// 	});
// }

// ce qui se passe quand on click sur "ajouter au panier quand disponible"
