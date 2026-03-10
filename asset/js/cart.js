export const initStorage = () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  if (!localStorage.getItem("purchaseHistory")) {
    localStorage.setItem("purchaseHistory", JSON.stringify([]));
  }

  if (!localStorage.getItem("discount")) {
    const discount = [
        {
            code: "thanhhoa36",
            discount: 36000,
            require: 67000,
            desc: "Giảm 36 ngàn đồng cho người Thanh Hóa khi món đồ có giá trị trên 67 ngàn đồng"
        }

    ]

    localStorage.setItem("discount", JSON.stringify(discount));
  }
};

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
export const getTotalPrice = (cart) => {
    let total = 0;
    cart.forEach(item => {
        if (item.checked){
            total += item.price * item.quantity;
        }
    });
    return total;
}
export const addToCart = (product, quantity, cart) => {
    const exitingProduct = cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
    if (exitingProduct) {
        exitingProduct.quantity += quantity;
        exitingProduct.checked = product.checked;
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

const totalPrice = document.querySelector(".checkout__price--before")
const lastTotalPrice = document.querySelector(".checkout__price--after")
const buyItem = document.querySelector(".checkout__pay");
const updateTotal = () => {
      const cart = getCart();
    const total = getTotalPrice(cart);
    if (total != null && lastTotalPrice && totalPrice){
        totalPrice.innerHTML = `${total}đ`;
        lastTotalPrice.innerHTML = `${total}đ`;
    }
}
updateTotal();

if (cartList) {
    cartList.addEventListener("change", (e) => {
        const checkbox = e.target.classList.contains("cart__checkbox");
        if (checkbox) {
            const cartItem = e.target.closest(".cart__item");
            const isChecked = e.target.checked;
            updateChecked(cartItem, isChecked);
            updateTotal();
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
            const color = cartItem.dataset.color;
            const size = cartItem.dataset.size;
            const product = cart.find(item =>
                item.id == id &&
                item.color == color &&
                item.size == size
            );
            if (product) {
                product.quantity = quantity;
            }
            saveCart(cart);
            updateTotal();
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
                const color = cartItem.dataset.color;
                const size = cartItem.dataset.size;
                const product = cart.find(item =>
                    item.id == id &&
                    item.color == color &&
                    item.size == size
                );
                if (product) {
                    product.quantity = quantity;
                }
                saveCart(cart);
                updateTotal();
            }
        }
        if (e.target.closest(".cart__deletebutton")) {
            const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
            if (confirmDelete) {
                deleteCart(cartItem, cart);
                cartItem.remove();
                updateTotal();
            }
        }
    })
}
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
                method: document.querySelector('input[name="payment"]:checked')?.value,
                time: new Date(),
                totalPrice:  item.quantity * item.price
                }       
            )
        })
         localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
         window.location.href = "../../thanks.html"
    })
}

const vocher = document.querySelector(".checkout__voucher button");
if (vocher){

    vocher.addEventListener("click", () => {
        const detailPercent = document.querySelector(".checkout__discount--number");
        const detailDiscount = document.querySelector(".checkout__detailDiscount");
        const current = document.querySelector(".checkout__price--after");
        const before = document.querySelector(".checkout__price--before");
        const code = document.querySelector(".checkout__voucher input").value;
        let found = false;
        const discountList = JSON.parse(localStorage.getItem("discount"));
        discountList.forEach((item) => {
            if (item.code === code) {
                const priceCurrent = current.innerHTML.replace("đ", "");
                if (Number(priceCurrent) > Number(item.require)){
                    detailDiscount.innerHTML= item.desc
                    detailPercent.innerHTML = `${item.discount}đ`
                    current.innerHTML = `${Number(priceCurrent) - Number(item.discount)}đ`;
                    
                }
                else alert("Mã giảm giá không dùng được");
                found = true;
            }
        });
    
        if (!found) {
            alert("Mã giảm giá không đúng");
            detailDiscount.innerHTML= "";
            detailPercent.innerHTML = `0đ`;
            current.innerHTML = before.innerHTML;
        }
    });
}