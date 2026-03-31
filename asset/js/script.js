import { initStorage } from "./cart.js";

// --- LAY VA HIEN THI HEADER ---
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    // Chen noi dung header vao the co class .header
    document.querySelector(".header").innerHTML = data;

    // Lay thong tin nguoi dung dang dang nhap tu localStorage
    let user = JSON.parse(localStorage.getItem("currentUser"));
    const username = document.querySelector(".header__user span");
    
    // Hien thi ten nguoi dung len header
    if (user && username) {
      username.innerHTML = user.username;
    }

    // --- XU LY MENU MOBILE (SIDEBAR) ---
    const sidebar = document.querySelector(".header__sidebar ul");
    const bar = document.querySelector(".header i");
    
    if (bar && sidebar) {
      bar.addEventListener("click", () => {
        // Bat/tat class "active" de hien thi sidebar
        sidebar.classList.toggle("active");
      });
    }
  });

// --- LAY VA HIEN THI FOOTER ---
fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.querySelector(".footer").innerHTML = data;
  });

// Khoi tao du lieu gio hang (neu chua co)
initStorage();

// --- HIEU UNG XUAT HIEN KHI CUON TRANG (SCROLL REVEAL) ---
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    // Su dung IntersectionObserver de theo doi cac phan tu khi cuon trang
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Them class active khi phan tu vao vung nhin thay
                entry.target.classList.add("active");
            } else {
                // Xoa class active khi phan tu ra khoi vung nhin (tuy chon)
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.15, // Kich hoat khi thay 15% phan tu
        rootMargin: "0px 0px -50px 0px" 
    });

    // Bat dau theo doi tung phan tu co class .reveal
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});