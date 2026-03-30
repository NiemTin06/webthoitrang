import { initStorage } from "./cart.js";


fetch("header.html")
  .then (res => res.text())
  .then(data =>{
    document.querySelector(".header").innerHTML = data;
    let user = JSON.parse(localStorage.getItem("currentUser"));
    const username = document.querySelector(".header__user span");
    username.innerHTML = user.username;


    const sidebar = document.querySelector(".header__sidebar ul");
    const bar = document.querySelector(".header i");
    bar.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    })
  });

fetch("footer.html")
  .then (res => res.text())
  .then(data =>{
    document.querySelector(".footer").innerHTML = data    
  })           



  initStorage();


// --- SCROLL REVEAL EFFECT (ABOUT PAGE) ---
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.15, // Kích hoạt khi thấy 15% phần tử
        rootMargin: "0px 0px -50px 0px" 
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
});