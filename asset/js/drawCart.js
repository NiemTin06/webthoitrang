import { getCart, getTotalPrice } from "./cart.js";

const drawCart = () => {
    const cart = getCart();
    const cartlist = document.querySelector(".cart__list");
    if (cart) {
        let text = cart.map((e, index) => `
                <div class="cart__item" 
                            data-id="${e.id}"
                            data-color="${e.color}" 
                            data-size="${e.size}" 
                            >
            <div class="cart__check">
              <label>
                <input type="checkbox" class="cart__checkbox" 
                data-price="${e.price}"${e.checked ? "checked" : ""} 
       data-quantity="${e.quantity}">
                <div class="cart__image">
                  <img src= ${e.image} alt="ha">
                </div>
              </label>
            </div>
            <div class="cart__content">
              <h2 class="cart__title ">${e.title} (màu sác: ${e.color}, size: ${e.size})</h2>
              <div class="cart__price">
                <span class="cart__price--current">${e.price}</span>
                <span class="cart__price--old">${e.price}</span>
              </div>
            </div>
            <div class="cart__quantity">
              <span class="cart__quantity-btn cart__quantity-btn--down" data-index="${index}"> - </span>
              <span class=" 
                cart__number">${e.quantity}</span>
              <span class="
                cart__quantity-btn
                cart__quantity-btn--up"> + </span>
            </div>
            <div class="cart__deletebutton">
              <button> X </button>
            </div>
          </div>
            `
        ).join("");
        cartlist.innerHTML = text;
    }
    else cartlist.innerHTML =  "Gio hang trong" ;
    const totalPrice = document.querySelector(".total__price")
    totalPrice.innerHTML = `Tổng tiền là: ${getTotalPrice()}đ`

}

drawCart();