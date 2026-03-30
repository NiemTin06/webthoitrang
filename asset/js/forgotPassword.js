document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById('emailForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');

    // Tạo một biến tạm để "nhớ" email người dùng vừa nhập
    let emailToReset = "";

    // BƯỚC 1: XÁC NHẬN EMAIL
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Ngăn load lại trang
        
        // 1. Lấy giá trị email người dùng nhập (Giả sử thẻ input có type="email")
        const enteredEmail = emailForm.querySelector('input[type="email"]').value.trim();
        
        // 2. Lấy danh sách tài khoản từ LocalStorage
        const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        
        // 3. Kiểm tra xem email này có tồn tại trong hệ thống không
        const userExists = allUsers.some(user => user.email === enteredEmail);
        
        if (userExists) {
            // Nếu có: Lưu lại email vào biến tạm và chuyển sang Bước 2
            emailToReset = enteredEmail;
            step1.style.display = 'none';
            step2.style.display = 'block';
        } else {
            // Nếu không: Báo lỗi
            alert("Email này chưa được đăng ký trong hệ thống!");
        }
    });

    // BƯỚC 2: CẬP NHẬT MẬT KHẨU MỚI
    newPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Lấy mật khẩu mới người dùng vừa nhập (Giả sử thẻ input có type="password")
        const newPassword = newPasswordForm.querySelector('input[type="password"]').value.trim();
        
        // (Tùy chọn) Nếu bạn có ô Nhập lại mật khẩu, bạn có thể kiểm tra khớp mật khẩu ở đây
        
        // 2. Lấy lại danh sách user từ LocalStorage
        let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        
        // 3. Tìm user có email khớp với emailToReset và cập nhật mật khẩu
        allUsers = allUsers.map(user => {
            if (user.email === emailToReset) {
                user.password = newPassword; // Đổi thành mật khẩu mới
            }
            return user;
        });
        
        // 4. Lưu danh sách đã được cập nhật trở lại LocalStorage
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        
        alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
        
        // Chuyển về trang đăng nhập (thường file đăng nhập là login.html)
        window.location.href = 'login.html'; 
    });
});