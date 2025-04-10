const track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 1; // Start at 1 (first real slide)
let interval;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Update slides list after DOM change
slides = Array.from(track.children);

function setSlidePosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Initial position
window.addEventListener('load', () => {
  setSlidePosition();
  autoSlide();
});

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function checkLoop() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  if (slides[currentIndex].isEqualNode(firstClone)) {
    track.style.transition = 'none';
    currentIndex = 1;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  } else if (slides[currentIndex].isEqualNode(lastClone)) {
    track.style.transition = 'none';
    currentIndex = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }
}

nextBtn.addEventListener('click', () => {
  if (currentIndex >= slides.length - 1) return;
  currentIndex++;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateCarousel();
});

track.addEventListener('transitionend', checkLoop);

// ⏱️ Auto Slide Every 3 Seconds
function autoSlide() {
  interval = setInterval(() => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    updateCarousel();
  }, 2000);
}

window.addEventListener('resize', setSlidePosition);
