"use strict";

// ************************************************** //
// ********* exported variables & constants ********* //

export const productId = new URLSearchParams(window.location.search).get("id");
// export const urlAPI = `http://localhost:3000/api/teddies`;

export let cart = JSON.parse(localStorage.getItem("teddy")) || [];
// export let clearCart = cart.clear();
export let createContainer = document.getElementById("main__container");

// ************************************************** //
// *************** exported functions *************** //
