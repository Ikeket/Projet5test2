let afficherpanier = document.createElement("div");
afficherpanier.innerHTML += `
<p>${cart.name} est actuellement dans le panier.
Son prix est de ${cart.price / 100}€<p>`;
createContainer.appendChild(afficherpanier);
