// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
});

// Shrink header on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    }
});

// Scroll progress indicator
window.addEventListener("scroll", () => {
    const indicator = document.querySelector(".scroll-indicator");
    if (indicator) {
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const percentage = (window.scrollY / maxHeight) * 100;
        indicator.style.width = percentage + "%";
    }
});

// Fade-in animations
const fadeElements = document.querySelectorAll('.fade-in-up');

const handleScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);



// Sync header offset
(function syncHeaderOffset(){
const headerBar = document.querySelector('.header-bar');
function update() {
    if (!headerBar) return;
    document.body.style.paddingTop = headerBar.offsetHeight + 'px';
}
['load','resize','scroll'].forEach(ev => window.addEventListener(ev, update, {passive:true}));
update();
})();


// Mobile menu
(function () {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('site-nav');
  if (!header || !hamburger || !nav) return;

  const firstLink = nav.querySelector('a');

  function openMenu() {
    header.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    // Move focus to first nav link for keyboard users
    if (firstLink) firstLink.focus();
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onOutsideClick, true);
  }

  function closeMenu(restoreFocus = true) {
    header.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) hamburger.focus();
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onOutsideClick, true);
  }

  function toggleMenu() {
    if (header.classList.contains('menu-open')) closeMenu();
    else openMenu();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
    // Support Space/Enter on the hamburger even if default is blocked by browsers
    if ((e.key === ' ' || e.key === 'Enter') && e.target === hamburger) {
      e.preventDefault();
      toggleMenu();
    }
  }

  function onOutsideClick(e) {
    if (!header.classList.contains('menu-open')) return;
    const withinHeader = header.contains(e.target);
    const withinMenu = nav.contains(e.target);
    const isHamburger = e.target === hamburger;
    if (!withinHeader || (!withinMenu && !isHamburger)) {
      closeMenu(false);
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu if we leave mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && header.classList.contains('menu-open')) {
      closeMenu(false);
    }
  });
})();


// --- Two-card per slide carousel ---
(function () {
  const carousel = document.querySelector('.steps-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.steps-track');
  const slides = carousel.querySelectorAll('.slide');
  const prevBtn = carousel.querySelector('.steps-nav.prev');
  const nextBtn = carousel.querySelector('.steps-nav.next');
  const dots = carousel.querySelectorAll('.steps-dots .dot');

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  updateCarousel();
})();



// === Swipe Support for Steps Carousel ===
document.querySelectorAll('.steps-carousel').forEach(carousel => {
  const track = carousel.querySelector('.steps-track');
  const slides = carousel.querySelectorAll('.slide');
  const prevBtn = carousel.querySelector('.steps-nav.prev');
  const nextBtn = carousel.querySelector('.steps-nav.next');
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let slideIndex = 0;
  const totalSlides = slides.length;

  // Reuse your existing navigation functions
  const goToSlide = (index) => {
    slideIndex = Math.max(0, Math.min(index, totalSlides - 1));
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateDots();
  };

  const updateDots = () => {
    const dots = carousel.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === slideIndex);
    });
  };

  // Touch events
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) { // Swipe threshold
      if (diff > 0 && slideIndex < totalSlides - 1) {
        goToSlide(slideIndex + 1);
      } else if (diff < 0 && slideIndex > 0) {
        goToSlide(slideIndex - 1);
      }
    }
    isDragging = false;
  });

  // Hook buttons to same nav
  prevBtn.addEventListener('click', () => goToSlide(slideIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(slideIndex + 1));

  // Initialize
  goToSlide(0);
});
