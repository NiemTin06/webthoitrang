export const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

export const getPurchaseHistory = () => {
    const list = localStorage.getItem("purchaseHistory");
    return list ? JSON.parse(list) : [];
}
export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


export const deleteCart = (cartItem, cart) => {
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    const size = cartItem.dataset.size;
    const newCart = cart.filter(item =>
        item.id != id ||
        item.color != color ||
        item.size != size
    );
    saveCart(newCart);
}

export const getTotalPrice = () => {
    const cart = getCart();
    const cartCheck = document.querySelectorAll(".cart__checkbox:checked");
    let total = 0;
    cartCheck.forEach(item => {
        const cartItem = item.closest(".cart__item");
        const id = cartItem.dataset.id;
        const color = cartItem.dataset.color;
        const size = cartItem.dataset.size;

        const product = cart.find(item =>
            item.id == id &&
            item.color == color &&
            item.size == size
        );
        if (product) total += product.price * product.quantity;
    });
    return total;
}

export const addToCart = (product, quantity, cart) => {
    const exitingProduct = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
    if (exitingProduct) {
        exitingProduct.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    saveCart(cart);
}

export const updateChecked = (cartItem, isChecked) => {
    const cart = getCart();
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    const size = cartItem.dataset.size;

    const product = cart.find(item =>
        item.id == id &&
        item.color == color &&
        item.size == size
    );

    if (product) {
        product.checked = isChecked; // Cập nhật true hoặc false
    }
    saveCart(cart); // Lưu lại vào LocalStorage
}

const cartList = document.querySelector(".cart__list");
const totalPrice = document.querySelector(".total__price")
if (cartList) {
    cartList.addEventListener("change", (e) => {
        const checkbox = e.target.classList.contains("cart__checkbox");
        if (checkbox) {
            const cartItem = e.target.closest(".cart__item");
            const isChecked = e.target.checked;
            updateChecked(cartItem, isChecked);
            totalPrice.innerHTML = `Tổng tiền là: ${getTotalPrice()}đ`;
        }
    })
    cartList.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart__item");
        const cart = getCart();
        const id = cartItem.dataset.id;
        const quantityProduct = cartItem.querySelector(".cart__number");
        if (e.target.classList.contains("cart__quantity-btn--up")) {
            let quantity = Number(quantityProduct.innerHTML) + 1;
            quantityProduct.innerHTML = quantity;
            const product = cart.find(item => item.id == id);
            if (product) {
                product.quantity = quantity;
            }
            saveCart(cart);
        }
        if (e.target.classList.contains("cart__quantity-btn--down")) {
            let quantity = Number(quantityProduct.innerHTML);
            if (quantity == 1) {
                const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
                if (confirmDelete) {
                    deleteCart(cartItem, cart);
                    cartItem.remove();
                }
            } else if (quantity > 1) {
                quantity -= 1;
                quantityProduct.innerHTML = quantity;
                const product = cart.find(item => item.id == id);
                if (product) {
                    product.quantity = quantity;
                }
                saveCart(cart);
            }
        }
        if (e.target.closest(".cart__deletebutton")) {
            const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
            if (confirmDelete) {
                deleteCart(cartItem, cart);
                cartItem.remove();
            }
        }
    })
}
const buyItem = document.querySelector(".total__buy");
if (buyItem) {
    buyItem.addEventListener("click", () => {
        const cart = getCart();
        const purchaseHistory = getPurchaseHistory();
        const productList = cart.filter(item => item.checked == true);
        productList.forEach((item) =>{
            purchaseHistory.push(
                {
                ...item,
                quantity: item.quantity,
                time: new Date(),
                totalPrice:  item.quantity * item.price
                }       
            )
        })
         localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
         window.location.href = "../../thanks.html"
    })
}