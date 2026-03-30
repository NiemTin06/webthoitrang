

const slides = document.querySelectorAll('.banner__image');
let current = 0;
const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('show'));
    slides[index].classList.add('show');
  }

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 3000); // 3 giây chuyển 1 lần

