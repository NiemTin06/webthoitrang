import { fetchApi } from "./function.js";
import { APIcategories } from "./contain.js";
const category = document.querySelector(".category__list");
fetchApi(APIcategories)
  .then (data => {
    let htmls = data.map(item =>  `<div class="category__item">${item.name}</div>`
    ).join("");
    category.innerHTML = htmls;
  })