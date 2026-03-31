// --- LOGIC CHAY BANNER SLIDESHOW ---

// Lay tat ca cac phan tu hinh anh trong banner
const slides = document.querySelectorAll('.banner__image');
let current = 0; // Bien theo doi chi so anh dang hien thi

// Ham thuc hien viec hien thi anh theo chi so (index)
const showSlide = (index) => {
    // An tat ca cac slide bang cach xoa class 'show'
    slides.forEach(slide => slide.classList.remove('show'));
    
    // Hien thi slide được chi dinh bang cach them class 'show'
    slides[index].classList.add('show');
}

// Thiet lap thoi gian tu dong chuyen slide
setInterval(() => {
    // Tang chi so current, dung phep chia lay du (%) de quay lai 0 khi den anh cuoi
    current = (current + 1) % slides.length;
    
    // Goi ham hien thi anh moi
    showSlide(current);
}, 3000); // Thoi gian cho la 3000ms (tuong duong 3 giay)