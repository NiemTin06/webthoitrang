// --- LAY VA HIEN THI HEADER ---
fetch("headeradmin.html")
  .then(res => res.text())
  .then(data => {
    // Chen noi dung header vao class .header
    document.querySelector(".header").innerHTML = data;
  })
  .then(_ => {
    // --- LAY VA HIEN THI SIDEBAR (NAV) ---
    fetch("navadmin.html")
      .then(res => res.text())
      .then(data => {
        // Chen noi dung sidebar vao class .sidebar
        document.querySelector(".sidebar").innerHTML = data;

        // --- XU LY NUT BAM TOGGLE SIDEBAR ---
        const bars = document.querySelector("#button-toggle");
        const sidebar = document.querySelector(".sidebar");
        
        // Bat/tat class "active" khi click vao nut bars
        bars.addEventListener("click", () => {
          sidebar.classList.toggle("active");
        });
      });
  });

// --- LAY VA HIEN THI FOOTER ---
fetch("footeradmin.html")
  .then(res => res.text())
  .then(data => {
    // Chen noi dung footer vao class .footer
    document.querySelector(".footer").innerHTML = data;
  });