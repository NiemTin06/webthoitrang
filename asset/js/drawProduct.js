import { fetchApi, getAPI } from "./function.js";
import { params } from "./variable.js";
// import { updateBreadCrumb } from "./product.js";
const product_list = document.querySelector(".product__list");

// export const drawProduct = () => {
//   let api = getAPI();
//   fetchApi(api).then((response) => {
//     let products = response;
//     if (products.length === 0) {
//       product_list.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
//       return;
//     }
//     let htmls = products
//       .map(
//         (item) => `
//         <div class="product__item" ${item.discount_percent > 0 ? 
//           `data-discount="-${item.discount_percent}%"` 
//           : ""} >
//           <a href="productdetailpage.html?slug=${item.slug}" > 
//           <div class="product__image">
//           <img src="${item.image}" alt="${item.title}">
//           </div>
//           <div class="product__content">
//           <h3 class="product__name">${item.title}</h3>
//           <div class="product__price">
//               <span class="product__price--current">
//                 ${item.price.toLocaleString()}đ
//                 </span>
//               ${ item.price < item.original_price
//                     ? `<span class="product__price--old">${item.original_price.toLocaleString()}đ</span>`
//                     : ""
//                 }
//                 </div>
//                 </div>
//                 </a>
//                 </div>
//           `,
//         )
//       .join("");

//     product_list.innerHTML = htmls;
//   });
// };
export const drawProduct = () => {
  let api = getAPI();
  fetchApi(api).then((response) => {
    let products = response.data || response;
    

    if (Array.isArray(products)) {
        products = products.filter(item => item.slug && item.title);
    }

    if (!Array.isArray(products) || products.length === 0) {
      product_list.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
      return;
    }

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
                  ${item.price.toLocaleString()}đ
                </span>
                ${ item.price < item.original_price
                      ? `<span class="product__price--old">${item.original_price.toLocaleString()}đ</span>`
                      : ""
                  }
              </div>
            </div>
          </a>
        </div>
          `,
        )
      .join("");

    product_list.innerHTML = htmls;

    // Thêm cơ chế click bằng JS để đảm bảo 100% ổn định (ngăn lỗi padding hoặc các lớp đè)
    const productItems = product_list.querySelectorAll(".product__item");
    productItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        // Nếu không click trực tiếp vào link (ví dụ bấm padding máy tính hoặc khoảng trống)
        const slug = item.getAttribute("data-slug");
        if (slug) {
            window.location.href = `productdetailpage.html?slug=${slug}`;
        }
      });
    });
  });
};