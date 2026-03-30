document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Lấy giá trị từ Form
        const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value;
        const username = signupForm.querySelector('input[placeholder="Username"]').value;
        const email = signupForm.querySelector('input[placeholder="Email Address"]').value;
        const password = signupForm.querySelector('input[placeholder="Password"]').value;
        const confirmPassword = signupForm.querySelector('input[placeholder="Confirm Password"]').value;
        
        // --- BỔ SUNG: Lấy giá trị của ô Role đang được chọn ---
        const role = signupForm.querySelector('input[name="role"]:checked').value;

        // 2. Kiểm tra mật khẩu khớp nhau
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // 3. Lấy danh sách người dùng hiện có từ LocalStorage
        // Nếu chưa có gì thì khởi tạo một mảng rỗng []
        let users = JSON.parse(localStorage.getItem('allUsers')) || [];

        // 4. Kiểm tra xem Username hoặc Email đã tồn tại chưa (Tránh trùng lặp)
        const isExisted = users.some(user => user.username === username || user.email === email);
        if (isExisted) {
            alert("Tên đăng nhập hoặc Email này đã được sử dụng!");
            return;
        }

        // 5. Thêm người dùng mới vào mảng
        const newUser = {
            fullName: fullName,
            username: username,
            email: email,
            password: password, 
            role: role // --- BỔ SUNG: Lưu thêm quyền (admin/user) vào đây ---
        };
        
        users.push(newUser);

        // 6. Lưu mảng mới trở lại LocalStorage
        localStorage.setItem('allUsers', JSON.stringify(users));

        alert("Đăng ký thành công! Hiện có " + users.length + " tài khoản trong hệ thống.");
        
        // Reset form sau khi đăng ký xong
        signupForm.reset();

        window.location.href = "login.html";
    });
});