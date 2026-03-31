document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // Bien tam de luu email nguoi dung dang can khoi tao lai mat khau
    let emailToReset = "";

    // --- BUOC 1: XAC NHAN EMAIL CO TON TAI TRONG HE THONG KHONG ---
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngan load lai trang khi bam submit
        
        // Lay gia tri email tu o input
        const enteredEmail = emailForm.querySelector('input[type="email"]').value.trim();
        
        // Lay danh sach tat ca tai khoan tu LocalStorage
        const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        
        // Kiem tra email nhap vao co khop voi tai khoan nao khong
        const userExists = allUsers.some(user => user.email === enteredEmail);
        
        if (userExists) {
            // Neu ton tai: Luu email vao bien tam va chuyen sang form nhap mat khau moi
            emailToReset = enteredEmail;
            step1.style.display = 'none';
            step2.style.display = 'block';
        } else {
            // Neu khong: Bao loi cho nguoi dung
            alert("Email nay chua duoc dang ky trong he thong!");
        }
    });

    // --- BUOC 2: CAP NHAT MAT KHAU MOI VAO LOCALSTORAGE ---
    newPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Lay mat khau moi tu o input
        const newPassword = newPasswordForm.querySelector('input[type="password"]').value.trim();
        
        // Lay lai danh sach user moi nhat tu LocalStorage
        let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        
        // Tim user co email trung khop va cap nhat mat khau moi
        allUsers = allUsers.map(user => {
            if (user.email === emailToReset) {
                user.password = newPassword; // Ghi de mat khau cu
            }
            return user;
        });
        
        // Luu lai mang danh sach user da cap nhat vao LocalStorage
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        
        alert('Doi mat khau thanh cong! Vui long dang nhap lai voi mat khau moi.');
        
        // Chuyen huong nguoi dung ve trang dang nhap
        window.location.href = 'login.html'; 
    });
});