export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export const getTotalPrice = () => {
    const cartCheck = document.querySelectorAll(".cart__checkbox:checked");
    let total = 0 ;
    cartCheck.forEach(input => {
        const price =parseInt(input.getAttribute("data-price"));
        const quantity = parseInt(input.getAttribute("data-quantity"));
        total += price * quantity;
    });
    return total;
    
}
export const addToCart = (product, quantity) => {
    const cart = getCart();
    const exitingProduct = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
    if (exitingProduct){
        exitingProduct.quantity += quantity;
    } 
    else {
        cart.push({
            ...product, 
            quantity:quantity
        });
    }
    saveCart(cart);
}

const total = document.querySelector(".total__price");
const cartContainer = document.querySelector(".cart__list");
const cartAll = document.querySelector(".cart__all");

if(cartAll){
    cartAll.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        const allCheckBoxes = document.querySelectorAll(".cart__checkbox"
        );
        allCheckBoxes.forEach((checkBox) => {
            checkBox.checked = isChecked;
        })
        const currentTotal = getTotalPrice();
        total.innerHTML = `Tổng tiền là: ${currentTotal.toLocaleString()}đ`;
    })
}
if (cartContainer) {
    cartContainer.addEventListener("change", (e) => {
        const cart = getCart();
        const index = e.target.getAttribute("data-index")
        if (e.target.classList.contains("cart__checkbox")) {
            const currentTotal = getTotalPrice();
            total.innerHTML = `Tổng tiền là: ${currentTotal.toLocaleString()}đ`;
        } 
        if (e.target.classList.contains("cart__quantity-btn--up")) {
            cart[index].quantity += 1;
            saveCart(cart);
            drawCart(); 
        }
        if (e.target.classList.contains("cart__quantity-btn--down")) {
            if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCart(cart);
            drawCart();
            }
        }

        // 3. Nhấn nút Xóa
        if (e.target.classList.contains("btn-delete")) {
            if (confirm("Bạn muốn xóa món này?")) {
            cart.splice(index, 1);
            saveCart(cart);
            drawCart();
            }
        }
    });
}

