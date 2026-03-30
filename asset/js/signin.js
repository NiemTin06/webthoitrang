document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // PHẦN 1: ĐẢM BẢO LUÔN CÓ TÀI KHOẢN MẶC ĐỊNH (ADMIN & USER)
    // =========================================================
    let existingUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    const defaultUsers = [
        { fullName: "Quản trị viên", username: "admin", email: "admin@domain.com", password: "123", role: "admin" },
        { fullName: "Người dùng 1", username: "user1", email: "user1@domain.com", password: "123", role: "user" },
        { fullName: "Người dùng 2", username: "user2", email: "user2@domain.com", password: "123", role: "user" },
        { fullName: "Người dùng 3", username: "user3", email: "user3@domain.com", password: "123", role: "user" },
        { fullName: "Người dùng 4", username: "user4", email: "user4@domain.com", password: "123", role: "user" },
        { fullName: "Người dùng 5", username: "user5", email: "user5@domain.com", password: "123", role: "user" }
    ];

    let needToSave = false;

    defaultUsers.forEach(defaultUser => {
        const isExist = existingUsers.some(user => user.username === defaultUser.username);
        if (!isExist) {
            existingUsers.push(defaultUser);
            needToSave = true; 
        }
    });

    if (needToSave) {
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        console.log("Đã bổ sung các tài khoản mặc định vào hệ thống.");
    }


    // =========================================================
    // PHẦN 2: XỬ LÝ LOGIC ĐĂNG NHẬP (LẤY TỪ FORM)
    // =========================================================
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Chặn load lại trang
            e.preventDefault();

            // Lấy dữ liệu người dùng nhập vào 2 ô input
            const userInput = loginForm.querySelector('input[placeholder="Username or email"]').value.trim();
            const passInput = loginForm.querySelector('input[placeholder="Password"]').value.trim();

            // Lấy danh sách tài khoản MỚI NHẤT từ LocalStorage
            const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

            // Tìm kiếm xem có tài khoản nào khớp không
            const userMatch = storedUsers.find(user => 
                (user.username === userInput || user.email === userInput) && 
                user.password === passInput
            );

            // Xử lý kết quả phân luồng
            if (userMatch) {
                alert("Đăng nhập thành công! Chào mừng " + userMatch.fullName);
                
                // Lưu trạng thái đã đăng nhập
                localStorage.setItem('currentUser', JSON.stringify(userMatch));

                if (userMatch.role === 'admin') {
                    // Nếu là Admin -> Sang trang Dashboard
                    window.location.href = 'dashboard.html'; 
                } else {
                    // Nếu là User -> Sang Trang chủ
                    window.location.href = 'index.html'; 
                }
            } else {
                alert("Tài khoản hoặc mật khẩu không chính xác!");
            }
        });
    }
});