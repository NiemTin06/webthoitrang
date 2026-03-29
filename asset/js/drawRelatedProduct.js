import { APIproduct } from "./contain.js";
import { fetchApi } from "./function.js";

export const drawRelatedProduct = (element, id) =>{
  const category = element.category;
  const relativeProduct = document.querySelector(".related-product__list");
  fetchApi(`${APIproduct}?category=${category}`)
  .then (response => {
    
    const filtered = response.filter(p => p.id != id);
    const related = [];
    while (related.length < 4 && filtered.length > 0){
      const index =  Math.floor(Math.random() * filtered.length);
      related.push(filtered.splice(index, 1)[0])
    }
    let htmls = related.map(item => `

      <div class="related-product__item">
      <a href="productdetailpage.html?slug=${item.slug}" > 
        <div class="related-product__image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="related-product__content">
          <h3 class="related-product__name">${item.title}</h3>
          <div class="related-product__price">
              <span class = "related-product__price--current ${item.discount_percent > 0 ? "related-product__discount_percent" : 
                ""
              }"> ${item.price.toLocaleString()}đ <span>
              ${item.price < item.original_price ? 
              `<span class="related-product__price--old">${item.original_price.toLocaleString()}đ</span>` : ''}
          </div>
        </div>
        </a>
        </div>
  
      `).join("");
      if (relativeProduct){

        relativeProduct.innerHTML = htmls;
      }
  })
}
