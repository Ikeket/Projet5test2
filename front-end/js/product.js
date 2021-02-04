let returnIndex = document.createElement("h2"); // créé un h2 qui ramène à la page d'accueil
returnIndex.innerHTML += `<a href="index.html"><span class="fas fa-chevron-left"></span> Accueil</a>`;
createContainer.appendChild(returnIndex);

fetch(`http://localhost:3000/api/teddies/${productId}`)
	.then((response) => response.json())
	.then(function (product) {
		let teddy = product;

		let teddyProduct = document.createElement("article"); // créé le container qui abrite le teddy
		teddyProduct.className = "teddy";
		teddyProduct.innerHTML += `<img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${teddy.name}" width="900">`; // ajout de l'image dans la boite du teddy
		createContainer.appendChild(teddyProduct);
		let teddyBox = document.createElement("div"); // créé le container des informations du teddy
		teddyBox.className = "teddy__box";
		teddyProduct.appendChild(teddyBox);
		let displayText = document.createElement("div"); // créé le container qui regroupe nom, prix et description du teddy
		displayText.className = "teddy__box__text";
		displayText.innerHTML += `<h3>${teddy.name}</h3><p class="teddy__box__text-price">Prix : ${
			teddy.price / 100
		}€</p><p class="teddy__box__text-description">${teddy.description}</p>`;
		teddyBox.appendChild(displayText);

		let displayInput = document.createElement("div");
		displayInput.className = "teddy__box__input";
		teddyBox.appendChild(displayInput);
		let teddyColors = document.createElement("select");
		teddyColors.name = "colors";
		teddyColors.id = "teddy_colors";
		product.colors.forEach(function (product_color) {
			teddyColors.innerHTML += `<option value="${product_color}">${product_color}</option>`;
		});
		displayInput.appendChild(teddyColors);
		let numberProduct = document.createElement("select");
		numberProduct.name = "quantity";
		numberProduct.id = "teddy_quantity";
		productQuantity = [1, 2, 3, 4, 5];
		productQuantity.forEach(function (productQuantity) {
			numberProduct.innerHTML += `<option value="${productQuantity}">${productQuantity}</option>`;
		});
		displayInput.appendChild(numberProduct);

		let displayBuyingButton = document.createElement("span");
		displayBuyingButton.className = "btn";
		displayBuyingButton.textContent = `Craquer pour ${teddy.name}`;
		teddyBox.appendChild(displayBuyingButton);

		let dynamicTitle = document.querySelector("title");
		dynamicTitle.textContent = `Orinours, découvrez ${teddy.name}`;
	});
