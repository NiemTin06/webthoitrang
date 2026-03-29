document.addEventListener('DOMContentLoaded', () => {
    // 1. Chọn form đăng nhập
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Chặn load lại trang (quan trọng!)
            e.preventDefault();

            // 2. Lấy dữ liệu người dùng nhập vào 2 ô input
            const userInput = loginForm.querySelector('input[placeholder="Username or email"]').value.trim();
            const passInput = loginForm.querySelector('input[placeholder="Password"]').value.trim();

            // 3. Lấy danh sách tài khoản đã lưu từ LocalStorage (key là 'allUsers')
            const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

            // 4. Tìm kiếm xem có tài khoản nào khớp không
            const userMatch = storedUsers.find(user => 
                (user.username === userInput || user.email === userInput) && 
                user.password === passInput
            );

            // 5. Xử lý kết quả
            if (userMatch) {
                alert("Đăng nhập thành công! Chào mừng " + userMatch.fullName);
                
                // Lưu trạng thái đã đăng nhập (tùy chọn)
                localStorage.setItem('currentUser', JSON.stringify(userMatch));

                // CHUYỂN TRANG: Bạn đổi 'index.html' thành file trang chủ của bạn
                window.location.href = 'index.html'; 
            } else {
                alert("Tài khoản hoặc mật khẩu không chính xác!");
            }
        });
    }
});