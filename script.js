const contentImage = document.getElementById('content-image');
const captionText = document.getElementById('caption-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const firstBtn = document.getElementById('first-btn');
const lastBtn = document.getElementById('last-btn');
const themeToggle = document.getElementById('theme-toggle');

let currentPage = 0;
let previousPage = currentPage;

const images = [
  { src: 'images/1.png', caption: 'Page 1 Description' },
  { src: 'images/2.png', caption: 'Page 2 Description' },
  { src: 'images/3.png', caption: 'Page 3 Description' },
  { src: 'images/4.png', caption: 'Page 4 Description' },
  { src: 'images/5.png', caption: 'Page 5 Description' },
  { src: 'images/6.png', caption: 'Page 6 Description' },
  { src: 'images/7.png', caption: 'Page 7 Description' },
  { src: 'images/8.png', caption: 'Page 8 Description' },
  { src: 'images/9.png', caption: 'Page 9 Description' },
  { src: 'images/10.png', caption: 'Page 10 Description' },
  { src: 'images/11.png', caption: 'Page 11 Description' },
  { src: 'images/12.png', caption: 'Page 12 Description' },
];

function updatePage() {
  preloadImages(); // Preload next/previous images
  // Check if we're moving forward or backward
  const isForward = currentPage > previousPage;

  // Add the appropriate animation class
  if (isForward) {
    contentImage.classList.remove('page-turn-reverse');
    contentImage.classList.add('page-turn');
  } else {
    contentImage.classList.remove('page-turn');
    contentImage.classList.add('page-turn-reverse');
  }

  // After the animation time, update the image and caption
  setTimeout(() => {
    contentImage.src = images[currentPage].src;
    captionText.textContent = images[currentPage].caption;

    // Reset the animation class after the transition
    contentImage.classList.remove('page-turn', 'page-turn-reverse');
  }, 1000); // Animation duration should match the CSS transition time (1s)

  previousPage = currentPage; // Update previous page after change
}

// Navigation Buttons
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updatePage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < images.length - 1) {
    currentPage++;
    updatePage();
  }
});

firstBtn.addEventListener('click', () => {
  currentPage = 0;
  updatePage();
});

lastBtn.addEventListener('click', () => {
  currentPage = images.length - 1;
  updatePage();
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  
  // Save theme to localStorage
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', currentTheme);
});

// Apply saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(savedTheme);

// Preload images
function preloadImages() {
  const nextPage = images[currentPage + 1];
  const prevPage = images[currentPage - 1];
  
  if (nextPage) {
    const imgNext = new Image();
    imgNext.src = nextPage.src;
  }
  
  if (prevPage) {
    const imgPrev = new Image();
    imgPrev.src = prevPage.src;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentPage > 0) {
    currentPage--;
    updatePage();
  }
  if (e.key === 'ArrowRight' && currentPage < images.length - 1) {
    currentPage++;
    updatePage();
  }
});

let touchStartX = 0;

contentImage.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

contentImage.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  
  if (touchStartX > touchEndX && currentPage < images.length - 1) {
    currentPage++;
    updatePage();
  } else if (touchStartX < touchEndX && currentPage > 0) {
    currentPage--;
    updatePage();
  }
});

function goToPage(index) {
  currentPage = index;
  updatePage();
}

// Initial Page Load
updatePage();

