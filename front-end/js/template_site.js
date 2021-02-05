"use strict";

const productId = new URLSearchParams(window.location.search).get("id");

let createContainer = document.createElement("section");
createContainer.id = "main__container";
createContainer.className = "container";
main.appendChild(createContainer);
