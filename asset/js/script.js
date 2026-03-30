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

