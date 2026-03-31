import { fetchApi } from "./function.js";
import { APIcategories } from "./contain.js";
import { drawProduct } from "./drawProduct.js";
import { params } from "./variable.js";
import { pageNumber} from "./product.js";

// Lay tham so tu URL hien tai
const urlParams = new URLSearchParams(window.location.search);
const category = document.querySelector(".category__list");

// Tao duong dan API de lay danh muc con dua tren tham so 'category' tren URL
const api = `${APIcategories}?category=${urlParams.get("category")}`;

fetchApi(api)
  .then(data => {
    console.log(data);
    let categories = data[0].sub_categories;

    // Khoi tao HTML cho muc "Tat ca" san pham
    let html = `
        <div class="category__item all" data-sub="">
          <img src="asset/image/allcate.jpg" alt="ha">
              <div class="category__content">
                <h3 class="category__name"> Tat ca </h3>
                <div class="category__icon">
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
          </div>
    `;

    // Duyet qua danh sach sub_categories de tao HTML cho tung danh muc con
    html += categories.map(element => `
        <div class="category__item" data-sub="${element.sub_category}">
          <img src="asset/image/subcategory/${element.sub_category}.jpg" alt="ha">
              <div class="category__content">
                <h3 class="category__name"> ${element.name} </h3>
                <div class="category__icon">
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
          </div>
    `).join("");

    // Do HTML vao thanh danh muc
    category.innerHTML = html;

    // --- XU LY SU KIEN CLICK VAO TUNG DANH MUC CON ---
    let category__item = document.querySelectorAll(".category__item");
    category__item.forEach(item => {
      item.addEventListener("click", () => {
        // Reset ve trang 1 khi thay doi danh muc
        params.page = 1;
        if (pageNumber) pageNumber.innerHTML = params.page;

        // Cap nhat tham so category va subCategory vao bien params
        params.category = data[0].category;
        params.subCategory = item.getAttribute("data-sub");

        // Goi ham ve lai danh sach san pham theo loc moi
        drawProduct();

        // Cap nhat lai URL tren thanh dia chi ma khong can load lai trang
        const newUrl = params.subCategory
          ? `?category=${params.category}&sub=${params.subCategory}`
          : `?category=${params.category}`;
        
        window.history.pushState({}, "", newUrl);
        console.log(newUrl);
      });
    });
  });