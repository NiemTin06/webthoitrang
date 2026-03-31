import { APIproduct } from "./contain.js";
import { drawProduct } from "./drawProduct.js";
import { fetchApi } from "./function.js";
import { lengthProduct, params } from "./variable.js";

// --- XU LY URL PARAMS & BREADCRUMB ---
const urlParams = new URLSearchParams(window.location.search);
const breadcrumbItems = document.querySelectorAll(".breadcrumb__item");

// Neu tren URL co tham so category
if (urlParams.get("category")) {
  params.category = urlParams.get("category"); // Cap nhat category vao params
  let api = `${APIproduct}?category=${params.category}`;
  
  // Goi API de lay thong tin category hien thi len breadcrumb
  fetchApi(api).then(response => {
    const product = response[0];
    if (!product) return;
    // Cap nhat text cho breadcrumb
    breadcrumbItems[1].innerHTML = product.category_breadcrumb;
  });
}

// --- KHAI BAO CAC PHAN TU UI ---
const pagePrev = document.querySelector("#paginationPrev");
const pageNext = document.querySelector("#paginationNext");
export const pageNumber = document.querySelector("#paginationNumber");

// --- CHUC NANG TIM KIEM (SEARCH) ---
const inputSearch = document.querySelector(".search input");
const buttonSearch = document.querySelector(".search button");

// Ham thuc hien tim kiem
let search = () => {
  params.title = inputSearch.value; 
  drawProduct(); 
} 

if (buttonSearch && inputSearch) {
  // Click nut tim kiem
  buttonSearch.addEventListener("click", () => { 
    params.page = 1; // Reset ve trang 1
    pageNumber.innerHTML = params.page;
    params.category = ""; // Xoa loc category khi search moi
    search();
  });

  // Nhan phím Enter de tim kiem
  inputSearch.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      params.page = 1;
      pageNumber.innerHTML = params.page;
      params.category = "";
      search();
    }
  });
}

// Ve san pham lan dau khi load trang
drawProduct();

// Tu dong click vao muc tat ca san pham
const allItem = document.querySelector(".category__item.all");
allItem?.click();

// --- CHUC NANG BO LOC (FILTER) ---
const filter = document.querySelector("#filter");
if (filter) {
  filter.addEventListener("change", (e) => {
    // Thay doi tham so sap xep dua tren value cua filter
    switch (e.target.value) {
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
        params.order = "desc";
        break;
      default:
        break;
    }
    params.page = 1; // Reset ve trang 1 khi loc
    pageNumber.innerHTML = params.page;
    drawProduct(); 
  });
}

// --- CHUC NANG PHAN TRANG (PAGINATION) ---
if (pageNext && pagePrev && pageNumber) {
  // Nut tiep theo
  pageNext.addEventListener("click", () => {
    // Kiem tra neu chua den trang cuoi
    if (params.page < Math.ceil(lengthProduct / params.limit)) {
      params.page++;
      pageNumber.innerHTML = params.page;
      drawProduct();
    }
  });
  
  // Nut quay lai
  pagePrev.addEventListener("click", () => {
    // Kiem tra neu trang hien tai > 1
    if (params.page > 1) {
      params.page--;
      pageNumber.innerHTML = params.page;
      drawProduct();
    }
  });
}