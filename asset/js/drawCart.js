import { getCart } from "./cart.js";

const drawCart = () => {
    const cart = getCart();
    const cartlist = document.querySelector(".cart__list");
    if (cart) {
        let text = cart.map((e, index) => `
                <div class="cart__item">
            <div class="cart__check">
              <label>
                <input type="checkbox" class="cart__checkbox" 
                data-price="${e.price}" 
       data-quantity="${e.quantity}">
                <div class="cart__image">
                  <img src= ${e.image} alt="ha">
                </div>
              </label>
            </div>
            <div class="cart__content">
              <h2 class="cart__title ">${e.title}</h2>
              <div class="cart__price">
                <span class="cart__price--current">${e.price}</span>
                <span class="cart__price--">${e.price}</span>
              </div>
            </div>
            <div class="cart__quantity">
              <span class="cart__quantity-btn cart__quantity-btn--down" data-index="${index}"> - </span>
              <span class=" 
                cart__number">${e.quantity}</span>
              <span class="
                cart__quantity-btn
                cart__quantity-btn--up" data-index="${index}"> + </span>
            </div>
            <div class="cart__deletebutton" data-index="${index}">
              <button> X </button>
            </div>
          </div>
            `
        ).join("");
        cartlist.innerHTML = text;

    }
    else cartlist.innerHTML =  "Gio hang trong" ;
}

drawCart();
