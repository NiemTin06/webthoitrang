// export const initStorage = () => {
//   if (!localStorage.getItem("cart")) {
//     localStorage.setItem("cart", JSON.stringify([]));
//   }

//   if (!localStorage.getItem("purchaseHistory")) {
//     localStorage.setItem("purchaseHistory", JSON.stringify([]));
//   }

//   if (!localStorage.getItem("discount")) {
//     const discount = [
//         {
//             code: "muasamthara",
//             discount: 36000,
//             require: 67000,
//             desc: "Giảm 36 ngàn đồng cho đơn giá trị trên 67 ngàn đồng"
//         }

//     ]

//     localStorage.setItem("discount", JSON.stringify(discount));
//   }
// };

// export const getCart = () => {
//     const cart = localStorage.getItem("cart");
//     if (!cart) return [];
//     try {
//         const parsedCart = JSON.parse(cart);
//         const validCart = parsedCart.filter(item => item && item.id && item.id !== "undefined");
//         if (validCart.length !== parsedCart.length) {
//             localStorage.setItem("cart", JSON.stringify(validCart));
//         }
//         return validCart;
//     } catch (e) {
//         return [];
//     }
// }
// export const getPurchaseHistory = () => {
//     const list = localStorage.getItem("purchaseHistory");
//     return list ? JSON.parse(list) : [];
// }
// export const saveCart = (cart) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
// }
// export const deleteCart = (cartItem, cart) => {
//     const id = cartItem.dataset.id;
//     const color = cartItem.dataset.color;
//     const size = cartItem.dataset.size;
//     const newCart = cart.filter(item =>
//         String(item.id) !== String(id) ||
//         String(item.color) !== String(color) ||
//         String(item.size) !== String(size)
//     );
//     saveCart(newCart);
// }
// export const getTotalPrice = (cart) => {
//     let total = 0;
//     cart.forEach(item => {
//         if (item.checked){
//             total += item.price * item.quantity;
//         }
//     });
//     return total;
// }
// export const addToCart = (product, quantity, cart) => {
//     const exitingProduct = cart.find(item => 
//         String(item.id) === String(product.id) && 
//         String(item.color) === String(product.color) && 
//         String(item.size) === String(product.size)
//     );
//     if (exitingProduct) {
//         exitingProduct.quantity += quantity;
//         exitingProduct.checked = product.checked;
//     } else {
//         cart.push({
//             ...product,
//             quantity: quantity
//         });
//     }
//     saveCart(cart);
// }
// export const updateChecked = (cartItem, isChecked) => {
//     const cart = getCart();
//     const id = cartItem.dataset.id;
//     const color = cartItem.dataset.color;
//     const size = cartItem.dataset.size;

//     const product = cart.find(item =>
//         String(item.id) === String(id) &&
//         String(item.color) === String(color) &&
//         String(item.size) === String(size)
//     );

//     if (product) {
//         product.checked = isChecked; // Cập nhật true hoặc false
//     }
//     saveCart(cart); // Lưu lại vào LocalStorage
// }
// const cartList = document.querySelector(".cart__list");

// const totalPrice = document.querySelector(".checkout__price--before")
// const lastTotalPrice = document.querySelector(".checkout__price--after")
// const buyItem = document.querySelector(".checkout__pay");

// const checkEmptyCartState = () => {
//     const cart = getCart();
//     if (!cart || cart.length === 0) {
//         if (cartList) cartList.innerHTML = "<div style='text-align: center; font-size: 1.2rem; padding: 40px 20px; color: #555; background: #e2e2e2; border-radius: 20px; font-weight: 500;'>Giỏ hàng của bạn đang trống.</div>";
//         const checkout = document.querySelector(".checkout");
//         const cartAll = document.querySelector(".cart__all");
//         if (checkout) checkout.style.display = "block";
//         if (cartAll) cartAll.style.display = "none";
//     }
// }

// const updateTotal = () => {
//     const cart = getCart();
//     const total = getTotalPrice(cart);
//     if (total != null && lastTotalPrice && totalPrice){
//         totalPrice.innerHTML = `${total.toLocaleString()}đ`;
//         lastTotalPrice.innerHTML = `${total.toLocaleString()}đ`;
//     }
// }
// updateTotal();

// const cartAllCheckbox = document.querySelector(".cart__all input[type='checkbox']");
// if (cartAllCheckbox) {
//     cartAllCheckbox.addEventListener("change", (e) => {
//         const cart = getCart();
//         const isChecked = e.target.checked;
//         cart.forEach(item => item.checked = isChecked);
//         saveCart(cart);
//         const itemCheckboxes = document.querySelectorAll(".cart__checkbox");
//         itemCheckboxes.forEach(cb => cb.checked = isChecked);
//         updateTotal();
//     });
// }

// if (cartList) {
//     cartList.addEventListener("change", (e) => {
//         const checkbox = e.target.classList.contains("cart__checkbox");
//         if (checkbox) {
//             const cartItem = e.target.closest(".cart__item");
//             const isChecked = e.target.checked;
//             updateChecked(cartItem, isChecked);
//             updateTotal();
            
//             if (cartAllCheckbox) {
//                 const allCheckboxes = document.querySelectorAll(".cart__checkbox");
//                 const allChecked = allCheckboxes.length > 0 && Array.from(allCheckboxes).every(cb => cb.checked);
//                 cartAllCheckbox.checked = allChecked;
//             }
//         }
//     })
//     cartList.addEventListener("click", (e) => {
//         const cartItem = e.target.closest(".cart__item");
//         const cart = getCart();
//         const id = cartItem.dataset.id;
//         const quantityProduct = cartItem.querySelector(".cart__number");
//         if (e.target.classList.contains("cart__quantity-btn--up")) {
//             let quantity = Number(quantityProduct.innerHTML) + 1;
//             quantityProduct.innerHTML = quantity;
//             const color = cartItem.dataset.color;
//             const size = cartItem.dataset.size;
//             const product = cart.find(item =>
//                 String(item.id) === String(id) &&
//                 String(item.color) === String(color) &&
//                 String(item.size) === String(size)
//             );
//             if (product) {
//                 product.quantity = quantity;
//             }
//             saveCart(cart);
//             updateTotal();
//         }
//         if (e.target.classList.contains("cart__quantity-btn--down")) {
//             let quantity = Number(quantityProduct.innerHTML);
//             if (quantity == 1) {
//                 const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
//                 if (confirmDelete) {
//                     deleteCart(cartItem, cart);
//                     cartItem.remove();
//                     checkEmptyCartState();
//                     updateTotal();
//                 }
//             } else if (quantity > 1) {
//                 quantity -= 1;
//                 quantityProduct.innerHTML = quantity;
//                 const color = cartItem.dataset.color;
//                 const size = cartItem.dataset.size;
//                 const product = cart.find(item =>
//                     String(item.id) === String(id) &&
//                     String(item.color) === String(color) &&
//                     String(item.size) === String(size)
//                 );
//                 if (product) {
//                     product.quantity = quantity;
//                 }
//                 saveCart(cart);
//                 updateTotal();
//             }
//         }
//         if (e.target.closest(".cart__deletebutton")) {
//             const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
//             if (confirmDelete) {
//                 deleteCart(cartItem, cart);
//                 cartItem.remove();
//                 checkEmptyCartState();
//                 updateTotal();
//             }
//         }
//     })
// }
// if (buyItem) {
//     buyItem.addEventListener("click", () => {
//         const cart = getCart();
//         const purchaseHistory = getPurchaseHistory();
//         const productList = cart.filter(item => item.checked == true);
//         productList.forEach((item) =>{
//             purchaseHistory.push(
//                 {
//                 ...item,
//                 quantity: item.quantity,
//                 method: document.querySelector('input[name="payment"]:checked')?.value,
//                 time: new Date(),
//                 totalPrice:  item.quantity * item.price
//                 }       
//             )
//         })
//          localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
//          window.location.href = "../../thanks.html"
//     })
// }

// //Add vocher vao 
// const vocher = document.querySelector(".checkout__voucher button");
// if (vocher){
//     vocher.addEventListener("click", () => {
//         const detailPercent = document.querySelector(".checkout__discount--number");
//         const detailDiscount = document.querySelector(".checkout__detailDiscount");
//         const current = document.querySelector(".checkout__price--after");
//         // const before = document.querySelector(".checkout__price--before");
//         const code = document.querySelector(".checkout__voucher input").value;
//         const discountList = JSON.parse(localStorage.getItem("discount")) || [];
//         let found = false;
//         const cart = getCart();
//         const totalAmount = getTotalPrice(cart);
//         discountList.forEach((item) => {
//             if (item.code === code) {
//                 found = true;
//                 if (totalAmount > Number(item.require)){
//                     detailDiscount.innerHTML= item.desc;
//                     detailPercent.innerHTML = `${item.discount.toLocaleString()}đ`;
//                     const finalAmount = totalAmount - Number(item.discount);
//                     current.innerHTML = `${finalAmount.toLocaleString()}đ`;
//                 } else {
//                     alert(`Đơn hàng phải trên ${item.require.toLocaleString()}đ mới dùng được mã này.`);
//                 }
//             }
//         });

//         if (!found) {
//             alert("Mã giảm giá không hợp lệ");
//             detailDiscount.innerHTML= "";
//             detailPercent.innerHTML = `0đ`;
//             current.innerHTML = `${totalAmount.toLocaleString()}đ`;
//         }
//     });
// }

export const initStorage = () => {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  if (!localStorage.getItem("purchaseHistory")) {
    localStorage.setItem("purchaseHistory", JSON.stringify([]));
  }

  // Khởi tạo hoặc cập nhật mã giảm giá
  let discountList = JSON.parse(localStorage.getItem("discount")) || [];
  
  const defaultDiscounts = [
    {
        code: "muasamthara",
        discount: 36000,
        require: 67000,
        desc: "Giảm 36 ngàn đồng cho đơn giá trị trên 67 ngàn đồng"
    },
    {
        code: "thanhhoa36",
        discount: 36000,
        require: 67000,
        desc: "Giảm 36 ngàn đồng cho người Thanh Hóa khi món đồ có giá trị trên 67 ngàn đồng"
    }
  ];

  // Thêm các mã mặc định nếu chưa có
  defaultDiscounts.forEach(defaultItem => {
    const exists = discountList.some(item => item.code === defaultItem.code);
    if (!exists) {
      discountList.push(defaultItem);
    }
  });

  localStorage.setItem("discount", JSON.stringify(discountList));

};

export const getCart = () => {
    const cart = localStorage.getItem("cart");
    if (!cart) return [];
    try {
        const parsedCart = JSON.parse(cart);
        const validCart = parsedCart.filter(item => item && item.id && item.id !== "undefined");
        if (validCart.length !== parsedCart.length) {
            localStorage.setItem("cart", JSON.stringify(validCart));
        }
        return validCart;
    } catch (e) {
        return [];
    }
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
        String(item.id) !== String(id) ||
        String(item.color) !== String(color) ||
        String(item.size) !== String(size)
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
    const exitingProduct = cart.find(item => 
        String(item.id) === String(product.id) && 
        String(item.color) === String(product.color) && 
        String(item.size) === String(product.size)
    );
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
        String(item.id) === String(id) &&
        String(item.color) === String(color) &&
        String(item.size) === String(size)
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

const checkEmptyCartState = () => {
    const cart = getCart();
    if (!cart || cart.length === 0) {
        if (cartList) cartList.innerHTML = "<div style='text-align: center; font-size: 1.2rem; padding: 40px 20px; color: #555; background: #e2e2e2; border-radius: 20px; font-weight: 500;'>Giỏ hàng của bạn đang trống.</div>";
        const checkout = document.querySelector(".checkout");
        const cartAll = document.querySelector(".cart__all");
        if (checkout) checkout.style.display = "block";
        if (cartAll) cartAll.style.display = "none";
    }
}

const updateTotal = () => {
    const cart = getCart();
    const total = getTotalPrice(cart);
    if (total != null && lastTotalPrice && totalPrice){
        totalPrice.innerHTML = `${total.toLocaleString()}đ`;
        lastTotalPrice.innerHTML = `${total.toLocaleString()}đ`;
    }
}
updateTotal();

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

if (cartList) {
    cartList.addEventListener("change", (e) => {
        const checkbox = e.target.classList.contains("cart__checkbox");
        if (checkbox) {
            const cartItem = e.target.closest(".cart__item");
            if (!cartItem) return;

            const isChecked = e.target.checked;
            updateChecked(cartItem, isChecked);
            updateTotal();

            if (cartAllCheckbox) {
                const allCheckboxes = document.querySelectorAll(".cart__checkbox");
                const allChecked = allCheckboxes.length > 0 && Array.from(allCheckboxes).every(cb => cb.checked);
                cartAllCheckbox.checked = allChecked;
            }
        }
    })
    cartList.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart__item");
        if (!cartItem) return; // FIX: Ngăn crash khi click vùng trống

        const cart = getCart();
        const id = cartItem.dataset.id;
        const quantityProduct = cartItem.querySelector(".cart__number");

        if (e.target.classList.contains("cart__quantity-btn--up")) {
            let quantity = Number(quantityProduct.innerHTML) + 1;
            quantityProduct.innerHTML = quantity;
            const color = cartItem.dataset.color;
            const size = cartItem.dataset.size;
            const product = cart.find(item =>
                String(item.id) === String(id) &&
                String(item.color) === String(color) &&
                String(item.size) === String(size)
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
                    checkEmptyCartState();
                    updateTotal();
                }
            } else if (quantity > 1) {
                quantity -= 1;
                quantityProduct.innerHTML = quantity;
                const color = cartItem.dataset.color;
                const size = cartItem.dataset.size;
                const product = cart.find(item =>
                    String(item.id) === String(id) &&
                    String(item.color) === String(color) &&
                    String(item.size) === String(size)
                );
                if (product) {
                    product.quantity = quantity;
                }
                saveCart(cart);
                updateTotal();
            }
        }
        if (e.target.closest(".cart__delete-icon")) { // FIX: Dùng class đồng bộ với SCSS
            const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không");
            if (confirmDelete) {
                deleteCart(cartItem, cart);
                cartItem.remove();
                checkEmptyCartState();
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

        // FIX: Thông báo khi giỏ hàng trống hoặc chưa chọn sản phẩm
        if (productList.length === 0) {
            alert("Giỏ hàng trống xin hãy chọn sản phẩm vào giỏ hàng nhé");
            return;
        }

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

//Add vocher vao 
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
                    detailDiscount.classList.add("active"); // HIỆN KHUNG VÀNG
                    detailPercent.innerHTML = `${item.discount.toLocaleString()}đ`;
                    const finalAmount = totalAmount - Number(item.discount);
                    current.innerHTML = `${finalAmount.toLocaleString()}đ`;
                } else {
                    alert(`Đơn hàng phải trên ${item.require.toLocaleString()}đ mới dùng được mã này.`);
                }
            }
        });

        if (!found) {
            alert("Mã giảm giá không hợp lệ");
            detailDiscount.textContent = "";
            detailDiscount.classList.remove("active"); // ẨN KHUNG VÀNG
            detailPercent.innerHTML = `0đ`;
            current.innerHTML = `${totalAmount.toLocaleString()}đ`;
        }
    });
}