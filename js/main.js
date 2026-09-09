// Main JavaScript for Maktab Veb-sayti

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Mobile Dropdown toggles
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (link && dropdown && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        if (dropdown) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });

  // Animated Counter for Statistics
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function countUp() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText.replace('+', '').replace('%', '');
      const speed = 200;
      const inc = target / speed;

      let current = 0;
      const updateCount = () => {
        current += inc;
        if (current < target) {
          stat.innerText = Math.ceil(current) + (stat.getAttribute('data-suffix') || '');
          setTimeout(updateCount, 15);
        } else {
          stat.innerText = target + (stat.getAttribute('data-suffix') || '');
        }
      };
      updateCount();
    });
  }

  // Trigger counter when stats section is in view
  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      const sectionPos = statsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos && !animated) {
        countUp();
        animated = true;
      }
    });
  }

  // Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Modal for Gallery
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" src="" alt="Full view">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-content');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Contact Form Submission Mock
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.");
      contactForm.reset();
    });
  }
});
