
fetch("headeradmin.html")
  .then (res => res.text())
  .then(data =>{
    document.querySelector(".header").innerHTML = data;
  })
  .then(_ => {
    fetch("navadmin.html")  
      .then (res => res.text())
      .then(data =>{
        document.querySelector(".sidebar").innerHTML = data;
        const bars = document.querySelector("#button-toggle");
        const sidebar = document.querySelector(".sidebar");
        bars.addEventListener("click", () =>{
          sidebar.classList.toggle("active");
        })  
      })             
           
  });

fetch("footeradmin.html")  
  .then (res => res.text())
  .then(data =>{
    document.querySelector(".footer").innerHTML = data    
  })             
       
  
