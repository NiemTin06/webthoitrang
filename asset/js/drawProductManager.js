import { fetchApi, getAPI } from "./function.js"

export const drawProductManager = () =>{
    
    let api = getAPI();
    fetchApi(api)
        .then(data => {
            const productManagerList = document.querySelector(".product-manager__wrap")
            let html = ""
            data.forEach(e => {
                html += `
            <div class="product-manager__item">
                <div class="product-manager__id">${e.id}</div>
                <div class="product-manager__image">
                <img src="${e.image}" alt="g">
               </div>
                <div class="product-manager__title">${e.title}</div>
                <div class="product-manager__price">${e.price}</div>
                <div class="product-manager__quantity">${e.quantity}</div>
                <div class="product-manager__status">${e.quantity? "Còn hàng" : "Hết hàng"}</div>
                <div class="product-manager__action">

                </div>
          </div>`
            });
        productManagerList.innerHTML = html;
        })
}