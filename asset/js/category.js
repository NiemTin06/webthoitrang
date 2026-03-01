import { fetchApi } from "./function.js";
import { APIcategories } from "./contain.js";
import { drawProduct } from "./drawProduct.js";
import { params } from "./variable.js";
import { pageNumber } from "./product.js";

const urlParams = new URLSearchParams(window.location.search);
const category = document.querySelector(".category__list");
const api =`${APIcategories}?category=${urlParams.get("category")}`;
fetchApi(api)
  .then (data => {
    let categories = data[0].sub_categories
    let html = categories.map(element => `
        <div class="category__item" data-sub="${element.sub_category}">
          <img src="asset/image/subcategory/${element.sub_category}.jpg"alt="ha">
              <div class="category__content">
                <h3 class="category__name"> ${element.name} </h3>
                <div class="category__icon">
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
          </div>
    `).join("");
    category.innerHTML = html;
    let category__item = document.querySelectorAll(".category__item");
    category__item.forEach(item =>{
      item.addEventListener("click", ()=> {
        params.page = 1;
        if (pageNumber) pageNumber.innerHTML = params.page;
        params.category = data[0].category;
        params.subCategory = item.getAttribute("data-sub");
        drawProduct();
      })
    })
  })


