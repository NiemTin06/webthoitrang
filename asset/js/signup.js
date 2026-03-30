document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. TÍNH NĂNG KIỂM TRA MẬT KHẨU REAL-TIME
    // =========================================================
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');

    // Hàm kiểm tra mật khẩu
    function validatePassword() {
        // Nếu ô xác nhận mật khẩu đang trống thì ẩn báo lỗi đi
        if (confirmPasswordInput.value === '') {
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
            return;
        }

        // Nếu mật khẩu không khớp
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.classList.add('input-error'); // Đổi viền thành đỏ
            passwordError.style.display = 'block'; // Hiện chữ cảnh báo
        } else {
            // Nếu khớp thì xóa đỏ, ẩn cảnh báo
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
        }
    }

    // Bắt sự kiện 'input' (khi người dùng gõ từng ký tự)
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validatePassword);
    }


    // =========================================================
    // 2. XỬ LÝ LƯU DỮ LIỆU KHI NHẤN "CREATE ACCOUNT"
    // =========================================================
    const signupForm = document.querySelector('form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Lấy giá trị từ Form
            const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
            const username = signupForm.querySelector('input[placeholder="Username"]').value.trim();
            const email = signupForm.querySelector('input[placeholder="Email Address"]').value.trim();
            
            // Tận dụng luôn biến lấy theo ID ở trên cho ngắn gọn
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Lấy giá trị của ô Role đang được chọn
            const role = signupForm.querySelector('input[name="role"]:checked').value;

            // 2. Kiểm tra lại lần chót xem mật khẩu khớp nhau chưa
            if (password !== confirmPassword) {
                alert("Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.");
                return;
            }

            // 3. Lấy danh sách người dùng hiện có từ LocalStorage
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
                role: role 
            };
            
            users.push(newUser);

            // 6. Lưu mảng mới trở lại LocalStorage
            localStorage.setItem('allUsers', JSON.stringify(users));

            alert("Đăng ký thành công! Hiện có " + users.length + " tài khoản trong hệ thống.");
            
            // Reset form sau khi đăng ký xong
            signupForm.reset();
            
            // Ẩn viền đỏ (nếu có) sau khi reset
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';

            // Chuyển sang trang đăng nhập
            window.location.href = "login.html";
        });
    }
});