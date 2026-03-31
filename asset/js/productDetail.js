import { addToCart, getCart } from "./cart.js";
import { APIproduct } from "./contain.js";
import { drawProductDetail } from "./drawProductDetail.js";
import { drawRelatedProduct } from "./drawRelatedProduct.js";
import { fetchApi } from "./function.js";

// --- LAY DU LIEU SAN PHAM TU URL ---
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
let api = `${APIproduct}?slug=${slug}`;
let currentProduct = null;

// Goi API de lay thong tin san pham dua tren slug
fetchApi(api)
  .then(response => {
    const product = response[0];
    if (!product) {
      console.log("Khong tim thay san pham");
      return;
    }
    currentProduct = product; // Luu thong tin san pham vao bien toan cuc
    drawProductDetail(product); // Ve chi tiet san pham
    drawRelatedProduct(product, product.id); // Ve danh sach san pham lien quan
  });

// --- XU LY TANG GIAM SO LUONG MUA ---
const buttonDown = document.querySelector(".detail-product__quantity-btn--down");
const quantity = document.querySelector(".detail-product__number");
const buttonUp = document.querySelector(".detail-product__quantity-btn--up");

// Ham lay gia tri so luong hien tai tu giao dien
const getQuantityProduct = () => {
  return parseInt(quantity.innerHTML);
}

buttonDown.addEventListener("click", () => {
  let quantityCurrent = getQuantityProduct();
  if (quantityCurrent > 1) { // Nen de toi thieu la 1
    quantityCurrent -= 1;
    quantity.innerHTML = quantityCurrent;
  }
})

buttonUp.addEventListener("click", () => {
  let quantityCurrent = getQuantityProduct();
  quantityCurrent += 1;
  quantity.innerHTML = quantityCurrent;
})

// --- XU LY CUON SLIDER SAN PHAM LIEN QUAN ---
const slider = document.querySelector(".related-product__list");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");

// Tinh toan khoang cach cuon dua tren chieu rong cua 1 item
const getScrollAmount = () => {
  const item = document.querySelector(".related-product__item");
  const gap = 20; // Khoang cach giua cac item (phai trung voi CSS)
  return item ? (item.offsetWidth + gap) : 300;
};

leftBtn.onclick = () => {
  slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
};

rightBtn.onclick = () => {
  slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
};

// --- LOGIC KIEM TRA TRUOC KHI THEM VAO GIO ---
const addCart = document.querySelector(".detail-product__action--add");
const buyItem = document.querySelector(".detail-product__action--buy");

// Ham kiem tra xem nguoi dung da chon mau, size va so luong chua
const checkItem = (currentQuantity, activeColor, activeSize) => {
  if (currentQuantity <= 0) {
    alert("Vui long chon so luong");
    return false;
  }
  if (!activeColor) {
    alert("Vui long chon mau sac");
    return false;
  }
  if (!activeSize) {
    alert("Vui long chon size");
    return false;
  }
  return true;
}

// --- THAO TAC THEM VAO GIO HANG (ADD TO CART) ---
addCart.addEventListener("click", () => {
  if (!currentProduct) return;

  const activeColor = document.querySelector(".detail-product__btn--colors-option.active");
  const activeSize = document.querySelector(".detail-product__btn--sizes-option.active");
  const cart = getCart();
  const currentQuantity = getQuantityProduct();

  if (checkItem(currentQuantity, activeColor, activeSize)) {
    const productToCard = {
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      color: activeColor.innerHTML,
      size: activeSize.innerHTML,
      checked: false, // Mac dinh chua tich chon trong gio hang
      slug: currentProduct.slug
    };

    addToCart(productToCard, currentQuantity, cart);

    // Hien thi thong bao (Toast message)
    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    } else {
      alert("Da them vao gio thanh cong!");
    }
  }
})

// --- THAO TAC MUA NGAY (BUY NOW) ---
buyItem.addEventListener("click", () => {
  if (!currentProduct) return;

  const activeColor = document.querySelector(".detail-product__btn--colors-option.active");
  const activeSize = document.querySelector(".detail-product__btn--sizes-option.active");
  const cart = getCart();
  const currentQuantity = getQuantityProduct();

  if (checkItem(currentQuantity, activeColor, activeSize)) {
    const productToCart = {
      id: currentProduct.id,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      color: activeColor.innerHTML,
      size: activeSize.innerHTML,
      checked: true, // Tu dong tich chon de thanh toan luon
      slug: currentProduct.slug
    };

    addToCart(productToCart, currentQuantity, cart);
    // Chuyen huong thang den trang gio hang
    window.location.href = "cart.html";
  }
})