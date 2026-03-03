import { addToCart } from "./cart.js";
import { APIproduct } from "./contain.js";
import { drawProductDetail } from "./drawProductDetail.js";
import { drawRelatedProduct } from "./drawRelatedProduct.js";
import { fetchApi } from "./function.js";

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
let api = `${APIproduct}?slug=${slug}`;
let currentProduct = null;
fetchApi(api)
  .then(response => {
    const product = response[0];
    if (!product) {
      console.log("Không tìm thấy sản phẩm");
      return;
    }
    currentProduct = product;
    drawProductDetail(product);
    drawRelatedProduct(product, product.id);
  });

const buttonDown = document.querySelector(".detail-product__quantity-btn--down");
const quantity = document.querySelector(".detail-product__number")
const buttonUp = document.querySelector(".detail-product__quantity-btn--up");

const getQuantityProduct = () => {
  return parseInt(quantity.innerHTML)
}
buttonDown.addEventListener("click", () =>{
  let quantityCurrent  = getQuantityProduct();
  if (quantityCurrent > 0){
    quantityCurrent -= 1;
    quantity.innerHTML = quantityCurrent;
  }
})
buttonUp.addEventListener("click", () =>{
  let quantityCurrent  = getQuantityProduct();
  quantityCurrent += 1;
  quantity.innerHTML = quantityCurrent;
})

const slider = document.querySelector(".slide-track");
document.querySelector(".left").onclick = () => {
  // Cuộn sang trái 300px
  slider.scrollBy({ left: -300, behavior: 'smooth' });
};
document.querySelector(".right").onclick = () => {
  // Cuộn sang phải 300px
  slider.scrollBy({ left: 300, behavior: 'smooth' }  
)};

const addCart = document.querySelector(".detail-product__action--add");
addCart.addEventListener("click" , () => {
  if (!currentProduct) return;
  const currentQuantity = getQuantityProduct();
  if (currentQuantity <= 0) {
    alert("Vui long chon so luong");
    return;
  }
  const activeColor = document.querySelector(".detail-product__colors .active");
  const activeSize =  document.querySelector(".detail-product__sizes .active")

    if (!activeColor) {
      alert("Vui lòng chọn màu");
      return;
    }

    if (!activeSize) {
      alert("Vui lòng chọn size");
      return;
    }


  const productToCard = {
    id: currentProduct.id,
    title: currentProduct.title,
    price: currentProduct.price,
    image: currentProduct.image,
    color: activeColor.innerHTML,
    size:activeSize.innerHTML,
  }
  addToCart(productToCard, currentQuantity);
  alert("Da them vao gio hang");
})

