import { fetchApi, getAPI } from "./function.js"

// --- HAM VE GIAO DIEN QUAN LY SAN PHAM (ADMIN) ---
export const drawProductManager = () => {
    
    let api = getAPI(); // Lay duong dan API (co the bao gom filter hoac search)
    
    fetchApi(api)
        .then(data => {
            const productManagerList = document.querySelector(".product-manager__wrap");
            let html = "";

            // --- DUYET QUA DANH SACH SAN PHAM DE TAO HTML ---
            data.forEach(e => {
                html += `
            <div class="product-manager__item" data-id="${e.id}">
                <div class="product-manager__id">${e.id}</div>
                
                <div class="product-manager__image">
                    <img src="${e.image}" alt="product-img">
                </div>

                <div class="product-manager__name">${e.title}</div>

                <div class="product-manager__price">${e.price.toLocaleString()}d </div>

                <div class="product-manager__quantity">SL: ${e.quantity}</div>

                <div class="product-manager__status ${e.quantity ? 'in-stock' : 'out-stock'}">
                    ${e.quantity ? "Con hang" : "Het hang"}
                </div>

                <div class="product-manager__action">
                    <button class="product-manager__action--update">
                        <i class="fa-solid fa-pen"></i> Cap nhat
                    </button>
                    <button class="product-manager__action--delete">
                        <i class="fa-solid fa-trash"></i> Xoa
                    </button>
                </div>
          </div>`
            });

            // Do toan bo danh sach vao khung wrap
            productManagerList.innerHTML = html;
        })
}