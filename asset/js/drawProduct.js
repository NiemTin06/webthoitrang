import { fetchApi, normalizeText } from "./function.js";
import { APIproduct } from "./contain.js";
const product_list = document.querySelector(".product__list");

export const drawProduct = (keyword) => {
  fetchApi(APIproduct)
   .then(data => {
    const key = normalizeText(keyword);
    const result = data.filter(item => normalizeText(item.name).includes(key));
     let htmls = result.map(item => {
       return `
         <div class="product__item">
           <div class ="product__image">
             <img src="${item.image}" alt="${item.name}">
           </div>
           <div class="product__content">
             <h3 class="product__title">${item.name}</h3>
             <div class ="product__price">
                 ${item.old_price}
             </div>
           </div>
         </div>
       `}).join("");
      product_list.innerHTML = htmls;
    })
}