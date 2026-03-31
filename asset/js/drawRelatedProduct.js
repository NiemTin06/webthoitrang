import { APIproduct } from "./contain.js";
import { fetchApi } from "./function.js";

// --- HAM VE DANH SACH SAN PHAM LIEN QUAN ---
// element: thong tin san pham hien tai, id: id de loai tru khoi danh sach lien quan
export const drawRelatedProduct = (element, id) => {
  const category = element.category;
  const relativeProduct = document.querySelector(".related-product__list");

  // Goi API lay tat ca san pham cung danh muc (category)
  fetchApi(`${APIproduct}?category=${category}`)
  .then(response => {
    
    // Loai bo san pham hien tai ra khoi danh sach goi y
    const filtered = response.filter(p => p.id != id);
    const related = [];

    // --- THUAT TOAN LAY NGAU NHIEN 4 SAN PHAM ---
    while (related.length < 4 && filtered.length > 0) {
      // Lay mot chi so index ngau nhien
      const index = Math.floor(Math.random() * filtered.length);
      // Cat phan tu do ra khoi mang filtered va day vao mang related
      related.push(filtered.splice(index, 1)[0]);
    }

    // --- TAO CHUOI HTML CHO CAC SAN PHAM GOI Y ---
    let htmls = related.map(item => `
      <div class="related-product__item">
        <a href="productdetailpage.html?slug=${item.slug}" > 
          <div class="related-product__image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="related-product__content">
            <h3 class="related-product__name">${item.title}</h3>
            <div class="related-product__price">
                <span class = "related-product__price--current ${item.discount_percent > 0 ? "related-product__discount_percent" : ""}"> 
                  ${item.price.toLocaleString()}d 
                </span>
                
                ${item.price < item.original_price ? 
                  `<span class="related-product__price--old">${item.original_price.toLocaleString()}d</span>` : ''}
            </div>
          </div>
        </a>
      </div>
    `).join("");

    // Neu tim thay phan tu container tren giao dien thi do HTML vao
    if (relativeProduct) {
      relativeProduct.innerHTML = htmls;
    }
  })
}