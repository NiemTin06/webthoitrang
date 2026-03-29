import { APIproduct } from "./contain.js";
import { drawProduct } from "./drawProduct.js";
import { fetchApi } from "./function.js";
import { lengthProduct, params } from "./variable.js";

const urlParams = new URLSearchParams(window.location.search);
const breadcrumbItems = document.querySelectorAll(".breadcrumb__item");

if (urlParams.get("category")) {
  console.log(params)
  params.category = urlParams.get("category");
  let api = `${APIproduct}?category=${params.category}`;
  console.log(api);
  fetchApi(api)
  .then(response => {
    console.log(response);
    const product = response[0];
    console.log(product);
    if (!product) {
      return;
    }
    breadcrumbItems[1].innerHTML = product.category_breadcrumb;
  } ) }


const pagePrev = document.querySelector("#paginationPrev")
const pageNext = document.querySelector("#paginationNext")
export const pageNumber = document.querySelector("#paginationNumber")

// Search 
const inputSearch = document.querySelector(".search input");
const buttonSearch = document.querySelector(".search button");

let search = () => {
  params.title = inputSearch.value;
  drawProduct();
} 


//   });

if (buttonSearch && inputSearch){
  buttonSearch.addEventListener("click", () => { 
    params.page = 1;
    pageNumber.innerHTML = params.page;
    params.category= "";
    search()
  })
  inputSearch.addEventListener("keydown", (e) =>{
    if (e.key == "Enter"){
      params.page = 1;
      pageNumber.innerHTML = params.page;
      params.category= "";
      
      search();
    }
  })
}
// End seacrh
drawProduct();
const allItem = document.querySelector(".category__item.all");
allItem?.click();

//  filter

const filter = document.querySelector("#filter");
if (filter){
  
  filter.addEventListener("change", (e) => {
    switch (e.target.value){
      case "mac-dinh":
        params.sort = "";
        params.order = "";
        break;
        case "gia-thap-den-cao":
          params.sort = "price";
          params.order = "asc";
        break;
      case "gia-cao-den-thap":
        params.sort = "price";
        params.order = "desc";
        break;
      case "giam-gia":
        params.sort = "discount_percent";
        params.order = "desc"
        break;
      default: 
        break
      }
      params.page =1;
      pageNumber.innerHTML = params.page;
      drawProduct();
  });
}
//  End filter

// Pagination
if (pageNext && pagePrev && pageNumber) {
  pageNext.addEventListener("click", () => {
    if (params.page < Math.ceil(lengthProduct / params.limit)) {
      params.page++;
      pageNumber.innerHTML = params.page;
      console.log("ok")
      drawProduct();
    }
  });
  
  pagePrev.addEventListener("click", () => {
    if (params.page > 1) {
      params.page--;
      pageNumber.innerHTML = params.page;
      console.log("ok")

      drawProduct();
    }
  });
}

// End pagination

