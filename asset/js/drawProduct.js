import { fetchApi, getAPI } from "./function.js";
import { lengthProduct, params, updateLength } from "./variable.js";
const product_list = document.querySelector(".product__list");

// --- HAM VE DANH SACH SAN PHAM ---
export const drawProduct = () => {
  let api = getAPI(); // Lay duong dan API tu cau hinh hien tai (category, sort, search...)
  
  fetchApi(api).then((response) => {

    // --- XU LY DU LIEU TRA VE ---
    // Neu response co field .data thi lay, khong thi lay truc tiep response
    let products = response.data || response;
    
    // Loc bo nhung san pham loi (thieu slug hoac title) de tranh loi giao dien
    if (Array.isArray(products)) {
        products = products.filter(item => item.slug && item.title);
    }

    // Kiem tra neu khong co san pham nao hop le
    if (!Array.isArray(products) || products.length === 0) {
      product_list.innerHTML = "<p>Khong tim thay san pham nao.</p>";
      return;
    }

    // --- TAO CHUOI HTML CHO DANH SACH ---
    let htmls = products
      .map(
        (item) => `
        <div class="product__item" data-slug="${item.slug}" ${item.discount_percent > 0 ? 
          `data-discount="-${item.discount_percent}%"` 
          : ""} >
          
          <a href="productdetailpage.html?slug=${item.slug}" class="product__link"> 
            <div class="product__image">
              <img src="${item.image}" alt="${item.title}">
            </div>
            
            <div class="product__content">
              <h3 class="product__name">${item.title}</h3>
              <div class="product__price">
                <span class="product__price--current">
                  ${item.price.toLocaleString()}d
                </span>
                
                ${ item.price < item.original_price
                      ? `<span class="product__price--old">${item.original_price.toLocaleString()}d</span>`
                      : ""
                  }
              </div>
            </div>
          </a>
        </div>
          `,
        )
      .join(""); // Ghep cac phan tu mang thanh chuoi HTML

    // Do du lieu vao container
    product_list.innerHTML = htmls;

    // --- XU LY SU KIEN CLICK (Dung JS de on dinh hon) ---
    const productItems = product_list.querySelectorAll(".product__item");
    productItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        // Lay slug tu attributes va chuyen huong trang
        const slug = item.getAttribute("data-slug");
        if (slug) {
            window.location.href = `productdetailpage.html?slug=${slug}`;
        }
      });
    });
  });
};