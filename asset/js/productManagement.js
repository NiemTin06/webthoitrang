import { APIcategories, APIproduct } from "./contain.js";
import { drawProductManager } from "./drawProductManager.js";
import { addProduct, convertSlugText, deleteProduct, fetchApi, updateProduct } from "./function.js";
import { params } from "./variable.js";

// --- KHAI BAO CAC BIEN GIAO DIEN ---
const category = document.querySelector("#filter-category");
const size = document.querySelector("#filter-size");
const subCategory = document.querySelector("#filter-sub-category");
const sizeOptions = {
    quanAo: ["S", "M", "L", "XL", "XXL", "XXXL"],
    giay: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]
};

const pagePrev = document.querySelector("#paginationPrev");
const pageNext = document.querySelector("#paginationNext");
export const pageNumber = document.querySelector("#paginationNumber");
const overlay = document.querySelector(".overlay");

// --- XU LY THAY DOI CATEGORY (CAP NHAT SIZE VA SUB-CATEGORY) ---
category.addEventListener("change", () => {
    const categoryOption = category.value;
    let html = `<option value=""> Tat ca</option>`;
    
    // Do danh sach size tuong ung voi loai hang
    if (categoryOption === "ao" || categoryOption === "quan") {
        sizeOptions.quanAo.forEach(e => html += `<option value=${e}> ${e}</option>`);
        size.innerHTML = html;
    } else if (categoryOption == "giay") {
        sizeOptions.giay.forEach(e => html += `<option value=${e}> ${e}</option>`);
        size.innerHTML = html;
    }

    // Goi API lay danh muc con (sub-category) tuong ung
    const api = `${APIcategories}?category=${category.value}`;
    fetchApi(api).then(data => {
        let categories = data[0].sub_categories;
        let htmlSub = `<option value=""> Tat ca</option>`;
        categories.forEach(e => { htmlSub += `<option value="${e.sub_category}"> ${e.name}</option>` });
        subCategory.innerHTML = htmlSub;
    });
});

// Ve danh sach san pham quan ly lan dau
drawProductManager();

// --- XU LY BO LOC (FILTER FORM) ---
const form = document.querySelector("#product-filter__form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Cap nhat cac tham so loc vao bien params
    params.title = data.title;
    params.category = data.category;
    params.subCategory = data.subCategory;
    params.page = 1;
    params.limit = data.show || 12;
    params.sale = !!data.sale;
    params.new = !!data.new;
    if (data.minPrice) params.minPrice = data.minPrice;
    if (data.maxPrice) params.maxPrice = data.maxPrice;
    params.size = data.size;

    // Xu ly logic sap xep
    switch (data.sort) {
        case "price-asc": params.sort = "price"; params.order = "asc"; break;
        case "price-desc": params.sort = "price"; params.order = "desc"; break;
        case "quantity-asc": params.sort = "quantity"; params.order = "asc"; break;
        case "quantity-desc": params.sort = "quantity"; params.order = "desc"; break;
        case "discount": params.sort = "discount_percent"; params.order = "desc"; break;
        default: params.sort = ""; params.order = ""; break;
    }
    
    pageNumber.innerHTML = 1;
    drawProductManager(); // Ve lai danh sach sau khi loc
});

// --- XU LY PHAN TRANG ---
pageNext.addEventListener("click", () => {
    if (params.page < Math.ceil(params.lengthProduct / params.limit)) {
        params.page = parseInt(params.page) + 1;
        pageNumber.innerHTML = params.page;
        drawProductManager();
    }
});

pagePrev.addEventListener("click", () => {
    if (params.page > 1) {
        params.page = parseInt(params.page) - 1;
        pageNumber.innerHTML = params.page;
        drawProductManager();
    }
});

// --- DONG/MO POPUP THEM SAN PHAM ---
const addProductPopUp = document.querySelector("#add-product__popup");
const addProductButton = document.querySelector("#add-product__button");
const closeProductButoon = document.querySelector("#closeAddPopup");

addProductButton.addEventListener("click", () => {
    addProductPopUp.style.display = "block";
    overlay.classList.toggle("show");
});

closeProductButoon.addEventListener("click", () => {
    addProductPopUp.style.display = "none";
    overlay.classList.toggle("show");
});

// --- XU LY THEM SAN PHAM MOI ---
const formAdd = document.querySelector("#add-product__form");
formAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formAdd);
    const data = Object.fromEntries(formData.entries());
    
    // Tao object san pham moi tu form data
    const product = {
        id: Date.now(),
        title: data.title,
        slug: convertSlugText(data.title),
        search_key: convertSlugText(data.title),
        category: convertSlugText(data.category),
        category_breadcrumb: data.category,
        sub_category: convertSlugText(data.subCategory),
        sub_category_name: data.subCategory,
        price: Number(data.price) * (1 - Number(data.discount || 0) / 100),
        original_price: Number(data.price),
        discount_percent: Number(data.discount || 0),
        is_new: true,
        is_sale: Number(data.discount) > 0,
        quantity: Number(data.quantity),
        image: data.image,
        colors: data.colors.split(",").map(s => s.trim()),
        sizes: data.sizes.split(",").map(s => s.trim()),
        description: data.description
    };
    
    addProduct(APIproduct, product);
    overlay.classList.toggle("show");
});

// --- XU LY CAP NHAT SAN PHAM ---
const updatePopUp = document.querySelector("#update-product__popup");

// Ham do du lieu cu vao form update
const renderValue = (id) => {
    fetchApi(`${APIproduct}?id=${id}`).then(data => {
        const product = data[0];
        if (!product) return;
        document.querySelector("#id").value = product.id;
        document.querySelector("#update-title").value = product.title;
        document.querySelector("#update-category").value = product.category_breadcrumb;
        document.querySelector("#update-sub-category").value = product.sub_category_name;
        document.querySelector("#update-price").value = product.original_price;
        document.querySelector("#update-discount").value = product.discount_percent;
        document.querySelector("#update-quantity").value = product.quantity;
        document.querySelector("#update-image").value = product.image;
        document.querySelector("#update-colors").value = product.colors.join(",");
        document.querySelector("#update-sizes").value = product.sizes.join(",");
        document.querySelector("#update-description").value = product.description;
    });
};

// Su kien click vao vung quan ly (Update hoac Delete)
const productManager = document.querySelector(".product-manager");
productManager.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".product-manager__item");
    const id = cartItem.dataset.id;

    if (e.target.classList.contains("product-manager__action--update")) {
        renderValue(id);
        updatePopUp.style.display = "block";
        overlay.classList.toggle("show");
    }
    
    if (e.target.classList.contains("product-manager__action--delete")) {
        if(confirm("Ban co chac chan muon xoa?")) {
            deleteProduct(APIproduct, id);
            // Nen ve lai manager sau khi xoa
        }
    }
});

// Submit form cap nhat
const formUpdate = document.querySelector("#update-product__form");
formUpdate.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formUpdate);
    const data = Object.fromEntries(formData.entries());
    
    const product = {
        id: data.id,
        title: data.title,
        slug: convertSlugText(data.title),
        original_price: Number(data.price),
        discount_percent: Number(data.discount || 0),
        price: Number(data.price) * (1 - Number(data.discount || 0) / 100),
        quantity: Number(data.quantity),
        image: data.image,
        colors: data.colors.split(",").map(s => s.trim()),
        sizes: data.sizes.split(",").map(s => s.trim()),
        description: data.description
        // ... cac field khac tuong tu nhu addProduct
    };
    
    overlay.classList.toggle("show");
    updateProduct(APIproduct, product.id, product);
});

// Dong popup khi click vao lop phu (overlay)
overlay.addEventListener("click", () => {
    addProductPopUp.style.display = "none";
    updatePopUp.style.display = "none";
    overlay.classList.toggle("show");
});