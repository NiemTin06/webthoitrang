document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. TINH NANG KIEM TRA MAT KHAU REAL-TIME (KHI DANG GO)
    // =========================================================
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordError = document.getElementById('passwordError');

    // Ham kiem tra xem hai o mat khau co trung khop khong
    function validatePassword() {
        // Neu o xac nhan dang trong thi xoa canh bao
        if (confirmPasswordInput.value === '') {
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
            return;
        }

        // So sanh gia tri cua hai o input
        if (passwordInput.value !== confirmPasswordInput.value) {
            // Neu khong khop: Them class bao do va hien thi dong thong bao
            confirmPasswordInput.classList.add('input-error'); 
            passwordError.style.display = 'block'; 
        } else {
            // Neu khop: Xoa bo cac canh bao
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
        }
    }

    // Lang nghe su kien 'input' de kiem tra ngay lap tuc khi nguoi dung go phim
    if (passwordInput && confirmPasswordInput) {
        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validatePassword);
    }


    // =========================================================
    // 2. XU LY LUU DU LIEU KHI NHAN "CREATE ACCOUNT" (SUBMIT FORM)
    // =========================================================
    const signupForm = document.querySelector('form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Ngan chan load lai trang

            // 1. Lay gia tri tu cac o nhap lieu trong Form
            const fullName = signupForm.querySelector('input[placeholder="Full Name"]').value.trim();
            const username = signupForm.querySelector('input[placeholder="Username"]').value.trim();
            const email = signupForm.querySelector('input[placeholder="Email Address"]').value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // Lay gia tri cua Role (Admin hoac User) dang duoc tich chon
            const role = signupForm.querySelector('input[name="role"]:checked').value;

            // 2. Kiem tra lan cuoi xem mat khau da khop chua truoc khi luu
            if (password !== confirmPassword) {
                alert("Mat khau xac nhan khong khop! Vui long kiem tra lai.");
                return;
            }

            // 3. Lay danh sach nguoi dung hien co tu LocalStorage
            let users = JSON.parse(localStorage.getItem('allUsers')) || [];

            // 4. Kiem tra xem Username hoac Email nay da ton tai trong he thong chua
            const isExisted = users.some(user => user.username === username || user.email === email);
            if (isExisted) {
                alert("Ten dang nhap hoac Email nay da duoc su dung!");
                return;
            }

            // 5. Tao doi tuong nguoi dung moi
            const newUser = {
                fullName: fullName,
                username: username,
                email: email,
                password: password, 
                role: role 
            };
            
            // Them vao mang danh sach
            users.push(newUser);

            // 6. Cap nhat mang moi tro lai LocalStorage
            localStorage.setItem('allUsers', JSON.stringify(users));

            alert("Dang ky thanh cong! Hien co " + users.length + " tai khoan trong he thong.");
            
            // Reset form va xoa cac class bao loi giao dien
            signupForm.reset();
            confirmPasswordInput.classList.remove('input-error');
            passwordError.style.display = 'none';

            // Chuyen huong sang trang dang nhap sau khi thanh cong
            window.location.href = "login.html";
        });
    }
});