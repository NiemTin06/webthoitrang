export const drawProductDetail = (element) =>{
  const title = document.querySelector(".detail-product__title");
  const priceCurrent = document.querySelector(".detail-product__price--current");
  const priceOld = document.querySelector(".detail-product__price--old");
  const stock = document.querySelector(".detail-product__stock");
  const image = document.querySelector(".detail-product__image img");
  const colors = document.querySelector(".detail-product__options--color");
  const sizes = document.querySelector(".detail-product__options--size");
  const breadcrumbItems = document.querySelectorAll(".breadcrumb-item");
  breadcrumbItems[1].innerHTML =`<a href="productlist.html?category=${element.category}"> ${element.category_breadcrumb} </a>`
  
  breadcrumbItems[2].innerHTML = element.title;  

  title.textContent = element.title;
  priceCurrent.textContent = element.price.toLocaleString() + "đ";
  image.src = element.image;
  image.alt = element.title;

  if (parseInt(element.discount_percent) != 0){
    priceOld.innerHTML= `${element.original_price}đ`;
    priceCurrent.classList.add('detail-product__discountPercent');
    priceCurrent.setAttribute('data-discount', `-${element.discount_percent}%`);
  }
  let text = "";
  element.colors.forEach(e => {
    text += ` <button class="detail-product__btn detail-product__btn--colors-option">${e}</button>`
  });
  colors.innerHTML = text;
  
  
  text = "";
  element.sizes.forEach(e => {
    text += ` <button class="detail-product__btn detail-product__btn--sizes-option">${e}</button>`
  });
  sizes.innerHTML = text;
  const btnColors = document.querySelectorAll(".detail-product__btn--colors-option");
  const btnSizes = document.querySelectorAll(".detail-product__btn--sizes-option");

  btnColors.forEach((e) => {
    e.addEventListener("click", () => { 
      btnColors.forEach((item) => {
        item.classList.remove("active");
      });
    e.classList.add("active");
    btnSizes.forEach(size => size.classList.remove("active"));
    btnSizes[0].classList.add("active");

    });
  });
  btnSizes.forEach((e) => {
    e.addEventListener("click", () => { 
      btnSizes.forEach((item) => {
      item.classList.remove("active");
    });
    e.classList.add("active");
    });
  });

   stock.innerHTML =  `Số lượng: ${element.quantity}`;

}
