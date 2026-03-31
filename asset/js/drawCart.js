import { getCart } from "./cart.js";

// --- HAM VE GIAO DIEN GIO HANG ---
export const drawCart = () => {
    const cart = getCart(); // Lay du lieu gio hang tu localStorage
    const cartlist = document.querySelector(".cart__list");
    const checkout = document.querySelector(".checkout");
    const cartAll = document.querySelector(".cart__all");

    // --- KIEM TRA NEU GIO HANG TRONG ---
    if (!cart || cart.length === 0) {
        if (cartlist) {
            cartlist.innerHTML = "<div style='text-align: center; font-size: 1.2rem; padding: 40px 20px; color: #555; background: #e2e2e2; border-radius: 20px; font-weight: 500;'>Gio hang cua ban dang trong.</div>";
        }
        if (checkout) checkout.style.display = "block"; // Van hien khung thanh toan (tuy logic)
        if (cartAll) cartAll.style.display = "none";    // An thanh chon tat ca
        return;
    }

    // Neu co san pham thi hien thi cac khung dieu khien
    if (checkout) checkout.style.display = "block";
    if (cartAll) cartAll.style.display = "block";

    // --- TAO HTML CHO TUNG SAN PHAM TRONG GIO ---
    if (cartlist) {
        let text = cart.map((e, index) => `
          <div class="cart__item" data-id="${e.id}" data-color="${e.color}" data-size="${e.size}">
            
            <div class="cart__check">
              <label>
                <input type="checkbox" class="cart__checkbox" data-price="${e.price}" ${e.checked ? "checked" : ""} data-quantity="${e.quantity}">
              </label>
            </div>

            <a href="productdetailpage.html?slug=${e.slug}">
              <div class="cart__image">
                <img src="${e.image}" alt="${e.title}" style="cursor: pointer;">
              </div>
            </a>

            <div class="cart__content">
              <h2 class="cart__title cart__title--sub">${e.title} (Mau: ${e.color}, Size: ${e.size})</h2>
              <div class="cart__price">
                ${e.price.toLocaleString()}d
              </div>
            </div>

            <div class="cart__quantity">
              <span class="cart__quantity-btn cart__quantity-btn--down" data-index="${index}"> - </span>
              <span class="cart__number">${e.quantity}</span>
              <span class="cart__quantity-btn cart__quantity-btn--up"> + </span>
            </div>

            <button class="cart__delete-icon">
              <i class="fa-solid fa-trash-can"></i> Xoa
            </button>
          </div>
        `).join(""); // Chuyen mang thanh chuoi HTML

        // Do toan bo HTML vao container
        cartlist.innerHTML = text;
    }
}

// Goi ham de thuc thi viec ve giao dien
drawCart();