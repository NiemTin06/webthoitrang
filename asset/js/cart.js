// --- KHOI TAO DU LIEU TRONG LOCALSTORAGE ---
export const initStorage = () => {
  // Tao gio hang rong neu chua co
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  // Tao lich su mua hang neu chua co
  if (!localStorage.getItem("purchaseHistory")) {
    localStorage.setItem("purchaseHistory", JSON.stringify([]));
  }

  // Khoi tao danh sach ma giam gia (Voucher)
  let discountList = JSON.parse(localStorage.getItem("discount")) || [];
  
  const defaultDiscounts = [
    {
        code: "muasamthara",
        discount: 36000,
        require: 67000,
        desc: "Giam 36 ngan dong cho don gia tri tren 67 ngan dong"
    },
    {
        code: "thanhhoa36",
        discount: 36000,
        require: 67000,
        desc: "Giam 36 ngan dong cho nguoi Thanh Hoa khi don tren 67 ngan dong"
    }
  ];

  // Them ma mac dinh vao neu ma do chua ton tai
  defaultDiscounts.forEach(defaultItem => {
    const exists = discountList.some(item => item.code === defaultItem.code);
    if (!exists) {
      discountList.push(defaultItem);
    }
  });

  localStorage.setItem("discount", JSON.stringify(discountList));
};

// --- CAC HAM TIEN ICH QUAN LY GIO HANG ---

// Lay danh sach san pham tu gio hang
export const getCart = () => {
    const cart = localStorage.getItem("cart");
    if (!cart) return [];
    try {
        const parsedCart = JSON.parse(cart);
        // Loc bo cac san pham loi (khong co id)
        const validCart = parsedCart.filter(item => item && item.id && item.id !== "undefined");
        if (validCart.length !== parsedCart.length) {
            localStorage.setItem("cart", JSON.stringify(validCart));
        }
        return validCart;
    } catch (e) {
        return [];
    }
}

// Lay lich su mua hang
export const getPurchaseHistory = () => {
    const list = localStorage.getItem("purchaseHistory");
    return list ? JSON.parse(list) : [];
}

// Luu gio hang vao localStorage
export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Xoa san pham khoi gio hang dua tren ID, mau sac va kich thuoc
export const deleteCart = (cartItem, cart) => {
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    const size = cartItem.dataset.size;
    const newCart = cart.filter(item =>
        String(item.id) !== String(id) ||
        String(item.color) !== String(color) ||
        String(item.size) !== String(size)
    );
    saveCart(newCart);
}

// Tinh tong tien cac san pham dang duoc tich chon (checked)
export const getTotalPrice = (cart) => {
    let total = 0;
    cart.forEach(item => {
        if (item.checked){
            total += item.price * item.quantity;
        }
    });
    return total;
}

// Them san pham moi vao gio hoac tang so luong neu da co
export const addToCart = (product, quantity, cart) => {
    const exitingProduct = cart.find(item => 
        String(item.id) === String(product.id) && 
        String(item.color) === String(product.color) && 
        String(item.size) === String(product.size)
    );
    if (exitingProduct) {
        exitingProduct.quantity += quantity;
        exitingProduct.checked = product.checked;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    saveCart(cart);
}

// Cap nhat trang thai checkbox cua san pham
export const updateChecked = (cartItem, isChecked) => {
    const cart = getCart();
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    const size = cartItem.dataset.size;

    const product = cart.find(item =>
        String(item.id) === String(id) &&
        String(item.color) === String(color) &&
        String(item.size) === String(size)
    );

    if (product) {
        product.checked = isChecked;
    }
    saveCart(cart);
}

// --- LOGIC HIEN THI TREN GIAO DIEN (UI) ---

const cartList = document.querySelector(".cart__list");
const totalPrice = document.querySelector(".checkout__price--before");
const lastTotalPrice = document.querySelector(".checkout__price--after");
const buyItem = document.querySelector(".checkout__pay");

// Kiem tra gio hang trong de hien thi thong bao
const checkEmptyCartState = () => {
    const cart = getCart();
    if (!cart || cart.length === 0) {
        if (cartList) cartList.innerHTML = "<div class='empty-msg'>Gio hang cua ban dang trong.</div>";
        const checkout = document.querySelector(".checkout");
        const cartAll = document.querySelector(".cart__all");
        if (checkout) checkout.style.display = "block";
        if (cartAll) cartAll.style.display = "none";
    }
}

// Cap nhat tong tien hien thi tren giao dien
const updateTotal = () => {
    const cart = getCart();
    const total = getTotalPrice(cart);
    if (total != null && lastTotalPrice && totalPrice){
        totalPrice.innerHTML = `${total.toLocaleString()}d`;
        lastTotalPrice.innerHTML = `${total.toLocaleString()}d`;
    }
}
updateTotal();

// Su kien click vao checkbox "Chon tat ca"
const cartAllCheckbox = document.querySelector(".cart__all input[type='checkbox']");
if (cartAllCheckbox) {
    cartAllCheckbox.addEventListener("change", (e) => {
        const cart = getCart();
        const isChecked = e.target.checked;
        cart.forEach(item => item.checked = isChecked);
        saveCart(cart);
        const itemCheckboxes = document.querySelectorAll(".cart__checkbox");
        itemCheckboxes.forEach(cb => cb.checked = isChecked);
        updateTotal();
    });
}

// Cac su kien trong danh sach gio hang (thay doi checkbox, tang giam so luong, xoa)
if (cartList) {
    // Thay doi checkbox tung san pham
    cartList.addEventListener("change", (e) => {
        if (e.target.classList.contains("cart__checkbox")) {
            const cartItem = e.target.closest(".cart__item");
            if (!cartItem) return;
            updateChecked(cartItem, e.target.checked);
            updateTotal();

            // Tu dong check/uncheck nut "Chon tat ca"
            if (cartAllCheckbox) {
                const allCheckboxes = document.querySelectorAll(".cart__checkbox");
                const allChecked = allCheckboxes.length > 0 && Array.from(allCheckboxes).every(cb => cb.checked);
                cartAllCheckbox.checked = allChecked;
            }
        }
    });

    // Xu ly click tang/giam so luong va xoa san pham
    cartList.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart__item");
        if (!cartItem) return;

        const cart = getCart();
        const id = cartItem.dataset.id;
        const quantityProduct = cartItem.querySelector(".cart__number");

        // Nut tang so luong
        if (e.target.classList.contains("cart__quantity-btn--up")) {
            let quantity = Number(quantityProduct.innerHTML) + 1;
            quantityProduct.innerHTML = quantity;
            const product = cart.find(item => String(item.id) === String(id));
            if (product) product.quantity = quantity;
            saveCart(cart);
            updateTotal();
        }

        // Nut giam so luong
        if (e.target.classList.contains("cart__quantity-btn--down")) {
            let quantity = Number(quantityProduct.innerHTML);
            if (quantity == 1) {
                if (confirm("Ban co muon xoa san pham nay khong?")) {
                    deleteCart(cartItem, cart);
                    cartItem.remove();
                    checkEmptyCartState();
                    updateTotal();
                }
            } else if (quantity > 1) {
                quantity -= 1;
                quantityProduct.innerHTML = quantity;
                const product = cart.find(item => String(item.id) === String(id));
                if (product) product.quantity = quantity;
                saveCart(cart);
                updateTotal();
            }
        }

        // Nut xoa san pham
        if (e.target.closest(".cart__delete-icon")) {
            if (confirm("Ban co muon xoa san pham nay khong?")) {
                deleteCart(cartItem, cart);
                cartItem.remove();
                checkEmptyCartState();
                updateTotal();
            }
        }
    });
}

// --- XU LY THANH TOAN ---
if (buyItem) {
    buyItem.addEventListener("click", () => {
        const cart = getCart();
        const purchaseHistory = getPurchaseHistory();
        const productList = cart.filter(item => item.checked == true);

        if (productList.length === 0) {
            alert("Gio hang trong, xin hay chon san pham vao gio hang nhe");
            return;
        }

        // Luu cac san pham da chon vao lich su mua hang
        productList.forEach((item) =>{
            purchaseHistory.push({
                ...item,
                method: document.querySelector('input[name="payment"]:checked')?.value,
                time: new Date(),
                totalPrice: item.quantity * item.price
            });
        });
        
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
        window.location.href = "../../thanks.html";
    });
}

// --- XU LY MA GIAM GIA (VOUCHER) ---
const vocher = document.querySelector(".checkout__voucher button");
if (vocher){
    vocher.addEventListener("click", () => {
        const detailPercent = document.querySelector(".checkout__discount--number");
        const detailDiscount = document.querySelector(".checkout__detailDiscount");
        const current = document.querySelector(".checkout__price--after");
        const code = document.querySelector(".checkout__voucher input").value;
        const discountList = JSON.parse(localStorage.getItem("discount")) || [];
        
        let found = false;
        const cart = getCart();
        const totalAmount = getTotalPrice(cart);
        
        discountList.forEach((item) => {
            if (item.code === code) {
                found = true;
                if (totalAmount > Number(item.require)){
                    detailDiscount.textContent = item.desc;
                    detailDiscount.classList.add("active"); // Hien khung vang
                    detailPercent.innerHTML = `${item.discount.toLocaleString()}d`;
                    const finalAmount = totalAmount - Number(item.discount);
                    current.innerHTML = `${finalAmount.toLocaleString()}d`;
                } else {
                    alert(`Don hang phai tren ${item.require.toLocaleString()}d moi dung duoc ma nay.`);
                }
            }
        });

        if (!found) {
            alert("Ma giam gia khong hop le");
            detailDiscount.textContent = "";
            detailDiscount.classList.remove("active");
            detailPercent.innerHTML = `0d`;
            current.innerHTML = `${totalAmount.toLocaleString()}d`;
        }
    });
}