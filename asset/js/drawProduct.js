import { fetchApi, normalizeText } from "./function.js";
import { APIproduct } from "./contain.js";
import { lengthProduct, params } from "./variable.js";
const product_list = document.querySelector(".product__list .row");

export const drawProduct = () => {
  const keyword = normalizeText(params.title || "");
  let api = `${APIproduct}?search_key_like=${keyword}`;
  if (params.category) api += `&category=${params.category}`;
  if (params.subCategory) api += `&sub_category=${params.subCategory}`;
  api += `&_page=${params.page}&_limit=${params.limit}`;
  if (params.sort) api += `&_sort=${params.sort}&_order=${params.order}`;
  console.log(api)
  fetchApi(api).then((response) => {
    let products = response;
    console.log(lengthProduct);
    if (products.length === 0) {
      product_list.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
      return;
    }
    let htmls = products
      .map(
        (item) => `
       <div class = "col col-6 col-md-4 col-lg-3 ">
       <a href="productdetailpage.html?slug=${item.slug}" > 
        <div class="product__item" ${item.discount_percent > 0 ? 
          `data-discount="-${item.discount_percent}%"` 
          : ""} >
          <div class="product__image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="product__content">
            <h3 class="product__title">${item.title}</h3>
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
          </div>
          </a>
        </div>
       `,
      )
      .join("");

    product_list.innerHTML = htmls;
   
  });
};
