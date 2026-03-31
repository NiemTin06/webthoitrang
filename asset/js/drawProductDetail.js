export const drawProductDetail = (element) => {
  // --- LAY CAC PHAN TU GIAO DIEN (UI) ---
  const title = document.querySelector(".detail-product__title");
  const priceCurrent = document.querySelector(".detail-product__price--current");
  const priceOld = document.querySelector(".detail-product__price--old");
  const stock = document.querySelector(".detail-product__stock");
  const image = document.querySelector(".detail-product__image img");
  const colors = document.querySelector(".detail-product__options--color");
  const sizes = document.querySelector(".detail-product__options--size");
  const breadcrumbItems = document.querySelectorAll(".breadcrumb__item");

  // --- CAP NHAT BREADCRUMB (DUONG DAN DIEU HUONG) ---
  // Gan link cho danh muc va ten san pham hien tai
  breadcrumbItems[1].innerHTML = `<a href="productlist.html?category=${element.category}"> ${element.category_breadcrumb} </a>`;
  breadcrumbItems[2].innerHTML = element.title;  

  // --- HIEN THI THONG TIN CO BAN ---
  title.textContent = element.title;
  priceCurrent.textContent = element.price.toLocaleString() + "d";
  image.src = element.image;
  image.alt = element.title;

  // --- XU LY GIA CU VA GIAM GIA ---
  if (parseInt(element.discount_percent) != 0) {
    priceOld.innerHTML = `${element.original_price.toLocaleString()}d`;
    // Them class va attribute de hien thi tag giam gia (vi du: -10%)
    priceCurrent.classList.add('detail-product__discountPercent');
    priceCurrent.setAttribute('data-discount', `-${element.discount_percent}%`);
  }

  // --- HIEN THI DANH SACH MAU SAC ---
  let text = "";
  element.colors.forEach((e, index) => {
    // Mau dau tien se duoc dat o trang thai 'active'
    text += ` <button class="detail-product__btn detail-product__btn--colors-option ${index === 0 ? 'active' : ''}">${e}</button>`;
  });
  colors.innerHTML = text;
  
  // --- HIEN THI DANH SACH KICH THUOC (SIZE) ---
  text = "";
  element.sizes.forEach((e, index) => {
    // Size dau tien se duoc dat o trang thai 'active'
    text += ` <button class="detail-product__btn detail-product__btn--sizes-option ${index === 0 ? 'active' : ''}">${e}</button>`;
  });
  sizes.innerHTML = text;

  // --- XU LY SU KIEN CLICK CHON OPTION ---
  const btnColors = document.querySelectorAll(".detail-product__btn--colors-option");
  const btnSizes = document.querySelectorAll(".detail-product__btn--sizes-option");

  // Click chon mau sac
  btnColors.forEach((e) => {
    e.addEventListener("click", () => { 
      // Xoa active cua tat ca cac nut mau sac khac
      btnColors.forEach((item) => item.classList.remove("active"));
      e.classList.add("active"); // Them active cho nut vua bam

      // Khi doi mau, reset size ve mac dinh (size dau tien)
      btnSizes.forEach(size => size.classList.remove("active"));
      btnSizes[0].classList.add("active");
    });
  });

  // Click chon kich thuoc
  btnSizes.forEach((e) => {
    e.addEventListener("click", () => { 
      // Xoa active cua tat ca cac nut size khac
      btnSizes.forEach((item) => item.classList.remove("active"));
      e.classList.add("active");
    });
  });

  // Hien thi so luong ton kho
  stock.innerHTML = `So luong: ${element.quantity}`;
}