import { APIcategories } from "./contain.js";
import { drawProductManager } from "./drawProductManager.js";
import { fetchApi } from "./function.js";
import { lengthProduct, params } from "./variable.js";

const category = document.querySelector("#category");
const size = document.querySelector("#size");
const subCategory = document.querySelector("#sub-category");
const sizeOptions = {
    quanAo: ["S", "M", "L", "XL", "XXL", "XXXL"],
    giay: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
}
//const filter = document.querySelector('.form-action__submit');


category.addEventListener("change", () => {
    const categoryOption = category.value;
    console.log(categoryOption)
    let html = `<option value=""> Tắt cả</option>`;
    if (categoryOption === "ao" || categoryOption ==="quan"){
        sizeOptions.quanAo.forEach((e)=> {
            html += `<option value=${e}> ${e}</option>`
        });
        size.innerHTML = html;
    }
    else if (categoryOption == "giay"){
        sizeOptions.giay.forEach((e)=> {
            html += `<option value=${e}> ${e}</option>`
        });
        size.innerHTML = html;
    }
    const api =`${APIcategories}?category=${category.value}`;
    fetchApi(api)
        .then (data => {
            let categories = data[0].sub_categories;
            console.log(categories);
            let html = `<option value=""> Tắt cả</option>`;
            categories.forEach(e => {html += `<option value="${e.sub_category}"> ${e.name}</option>`})
            subCategory.innerHTML = html;
        })
})

drawProductManager();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {

    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    params.title = data.title;
    params.category = data.category;
    params.subCategory = data.subCategory;
    
    params.page = 1;
    params.limit = data.show || 12;
    if (data.sale){
        params.sale = true;
    }
    else params.sale = false;
    if (data.new){
        params.new = true;
    }
    else params.new = false;
    if (data.minPrice){
        params.minPrice = data.minPrice;
    }
    if (data.maxPrice){
        params.maxPrice = data.maxPrice;
    }
    params.size = data.size
    switch (data.sort){
        case "":
        params.sort = "";
        params.order = "";
        break;
      case "price-asc":
        params.sort = "price";
        params.order = "asc";
        break;
      case "price-desc":
        params.sort = "price";
        params.order = "desc";
        break;
      case "quantity-asc":
        params.sort = "quantity";
        params.order = "asc"
        break;
      case "quantity-desc":
        params.sort = "quantity";
        params.order = "desc"
        break;
      case "discount":
        params.sort = "discount_percent";
        params.order = "desc"
        break;
      default: 
        break
    }
   drawProductManager();

})

const pagePrev = document.querySelector("#paginationPrev")
const pageNext = document.querySelector("#paginationNext")
export const pageNumber = document.querySelector("#paginationNumber")

// Pagination
pageNext.addEventListener("click" , () =>{
  if (params.page < Math.ceil(lengthProduct / params.limit)){
    params.page = parseInt(params.page) + 1;
    pageNumber.innerHTML = params.page;
    drawProductManager();
  }
})

pagePrev.addEventListener("click" , () =>{
  if (params.page > 1){
    params.page = parseInt(params.page) - 1;
    pageNumber.innerHTML = params.page;
    drawProductManager();
  }
})
// End pagination