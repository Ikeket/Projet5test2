let siteTitle = document.createElement("h2");
siteTitle.innerHTML += `Qu'attendez-vous pour craquer ?`;
createContainer.appendChild(siteTitle);
let productBox = document.createElement("article");
productBox.className = "product";
createContainer.appendChild(productBox);

fetch(`http://localhost:3000/api/teddies`)
	.then((response) => response.json())
	.then((product) => {
		let teddies = product;
		teddies.forEach((teddy) => {
			let teddyBox = document.createElement("div"); // créé la box qui contient chaque teddy
			teddyBox.className = "product__box";
			productBox.appendChild(teddyBox);
			let teddyLink = document.createElement("a"); // créé un lien qui redirige sur le teddy
			teddyLink.className = "product__box__link";
			teddyLink.href = `teddy.html?id=${teddy._id}`;
			teddyLink.setAttribute("target", "_blank");
			teddyLink.innerHTML += `<span class="product__box__text"><span class="product__box-name name">${
				teddy.name
			}</span><span class="product__box-price price">${
				teddy.price / 100
			}€</span></span><img src="${teddy.imageUrl}" class="teddy__picture" alt="Produit : ${
				teddy.name
			}" height="450">`;
			teddyBox.appendChild(teddyLink);
		});
	});
