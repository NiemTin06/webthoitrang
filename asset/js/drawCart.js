import { getCart } from "./cart.js";

export const drawCart = () => {
    const cart = getCart();
    const cartlist = document.querySelector(".cart__list");
    const checkout = document.querySelector(".checkout");
    const cartAll = document.querySelector(".cart__all");

    // Clear cart if empty
    if (!cart || cart.length === 0) {
        if (cartlist) cartlist.innerHTML = "<div style='text-align: center; font-size: 1.2rem; padding: 40px 20px; color: #555; background: #e2e2e2; border-radius: 20px; font-weight: 500;'>Giỏ hàng của bạn đang trống.</div>";
        if (checkout) checkout.style.display = "block";
        if (cartAll) cartAll.style.display = "none";
        return;
    }

    if (checkout) checkout.style.display = "block";
    if (cartAll) cartAll.style.display = "block";

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
              <h2 class="cart__title">${e.title} (Màu: ${e.color}, Size: ${e.size})</h2>
              <div class="cart__price">
                <span class="cart__price--current">${e.price.toLocaleString()}đ</span>
              </div>
            </div>
            <div class="cart__quantity">
              <span class="cart__quantity-btn cart__quantity-btn--down" data-index="${index}"> - </span>
              <span class="cart__number">${e.quantity}</span>
              <span class="cart__quantity-btn cart__quantity-btn--up"> + </span>
            </div>
            <div class="cart__deletebutton">
              <button style="border: none; background: transparent; cursor: pointer; color: red; font-weight: bold;"> X </button>
            </div>
          </div>
        `).join("");
        cartlist.innerHTML = text;
    }
}

drawCart();