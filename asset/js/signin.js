document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // PHAN 1: DAM BAO LUON CO TAI KHOAN MAC DINH (ADMIN & USER)
    // =========================================================
    
    // Lay danh sach user tu LocalStorage, neu chua co thi gan mang rong
    let existingUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

    // Danh sach cac tai khoan mau de test he thong
    const defaultUsers = [
        { fullName: "Quan tri vien", username: "admin", email: "admin@domain.com", password: "123", role: "admin" },
        { fullName: "Nguoi dung 1", username: "user1", email: "user1@domain.com", password: "123", role: "user" },
        { fullName: "Nguoi dung 2", username: "user2", email: "user2@domain.com", password: "123", role: "user" },
        { fullName: "Nguoi dung 3", username: "user3", email: "user3@domain.com", password: "123", role: "user" },
        { fullName: "Nguoi dung 4", username: "user4", email: "user4@domain.com", password: "123", role: "user" },
        { fullName: "Nguoi dung 5", username: "user5", email: "user5@domain.com", password: "123", role: "user" }
    ];

    let needToSave = false;

    // Duyet qua danh sach mac dinh, neu username chua ton tai thi moi them vao
    defaultUsers.forEach(defaultUser => {
        const isExist = existingUsers.some(user => user.username === defaultUser.username);
        if (!isExist) {
            existingUsers.push(defaultUser);
            needToSave = true; // Danh dau can luu lai vao LocalStorage
        }
    });

    // Neu co thay doi (them user moi) thi cap nhat lai LocalStorage
    if (needToSave) {
        localStorage.setItem('allUsers', JSON.stringify(existingUsers));
        console.log("Da bo sung cac tai khoan mac dinh vao he thong.");
    }


    // =========================================================
    // PHAN 2: XU LY LOGIC DANG NHAP (LAY TU FORM)
    // =========================================================
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // Chan load lai trang de xu ly bang Javascript
            e.preventDefault();

            // Lay du lieu nguoi dung nhap tu cac o input (loai bo khoang trang thua)
            const userInput = loginForm.querySelector('input[placeholder="Username or email"]').value.trim();
            const passInput = loginForm.querySelector('input[placeholder="Password"]').value.trim();

            // Lay danh sach tai khoan MOI NHAT tu LocalStorage
            const storedUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

            // Tim kiem tai khoan khop voi Username/Email va Mat khau
            const userMatch = storedUsers.find(user => 
                (user.username === userInput || user.email === userInput) && 
                user.password === passInput
            );

            // --- XU LY KET QUA DANG NHAP ---
            if (userMatch) {
                alert("Dang nhap thanh cong! Chao mung " + userMatch.fullName);
                
                // Luu thong tin nguoi dung hien tai vao 'currentUser' de su dung o cac trang khac
                localStorage.setItem('currentUser', JSON.stringify(userMatch));

                // Phan luong trang dich dua tren quyen (role)
                if (userMatch.role === 'admin') {
                    // Neu la Admin -> Chuyen den trang quan tri
                    window.location.href = 'dashboard.html'; 
                } else {
                    // Neu la User -> Chuyen den trang chu mua sam
                    window.location.href = 'index.html'; 
                }
            } else {
                // Thong bao neu sai thong tin
                alert("Tai khoan hoac mat khau khong chinh xac!");
            }
        });
    }
});