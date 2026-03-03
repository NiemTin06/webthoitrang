import { APIproduct } from "./contain.js";
import { drawProduct } from "./drawProduct.js";
import { fetchApi } from "./function.js";
import { lengthProduct, params } from "./variable.js";

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("category")) {
  params.category = urlParams.get("category");
  let api = `${APIproduct}?scategory=${params.category}`;
  fetchApi(api)
    .then(response => {
      const product = response[0];
      if (!product) {
        return;
      }
     const breadcrumbItem = document.querySelector(".breadcrumb-item:nth-child(2)");
    breadcrumbItem.innerHTML = product.category_breadcrumb
   } ) }

drawProduct();
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
pageNext.addEventListener("click" , () =>{
  if (params.page < Math.ceil(lengthProduct / params.limit)){
    params.page = parseInt(params.page) + 1;
    pageNumber.innerHTML = params.page;
    drawProduct();
  }
})

pagePrev.addEventListener("click" , () =>{
  if (params.page > 1){
    params.page = parseInt(params.page) - 1;
    pageNumber.innerHTML = params.page;
    drawProduct();
  }
})
// End pagination

