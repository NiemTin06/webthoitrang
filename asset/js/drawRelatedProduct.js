import { APIproduct } from "./contain.js";
import { fetchApi } from "./function.js";

export const drawRelatedProduct = (element, id) =>{
  const category = element.category;
  const relativeProduct = document.querySelector(".related-product .row");
  fetchApi(`${APIproduct}?category=${category}`)
  .then (response => {
    
    const filtered = response.filter(p => p.id != id);
    const related = [];
    while (related.length < 4 && filtered.length > 0){
      const index =  Math.floor(Math.random() * filtered.length);
      related.push(filtered.splice(index, 1)[0])
    }
    let htmls = related.map(item => `
      <div class = "col col-6 col-md-4 col-lg-3">
      <a href="productdetailpage.html?slug=${item.slug}" > 
      <div class="product__item">
        <div class="product__image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="product__content">
          <h3 class="product__title">${item.title}</h3>
          <div class="product__price">
              <span class = "product__price--current ${item.discount_percent > 0 ? "product__discount_percent" : 
                ""
              }"> ${item.price.toLocaleString()}đ <span>
              ${item.price < item.original_price ? 
              `<span class="product__price--old">${item.original_price.toLocaleString()}đ</span>` : ''}
          </div>
        </div>
        </div>
        </a>
      </div>
      `).join("");
    relativeProduct.innerHTML = htmls;
  })
}
