import { drawProduct } from "./drawProduct.js";

drawProduct();

// Search 
const inputSearch = document.querySelector(".search input");
const buttonSearch = document.querySelector(".search button");

buttonSearch.addEventListener("click", () => {
  let keyword = inputSearch.value;
  drawProduct(keyword);
})
// End seacrh