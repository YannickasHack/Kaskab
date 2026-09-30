/* ============================================
   KASKAB — Interactions premium
   ============================================ */

// ===== 1. LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('loading');
  }, 900);
});
document.body.classList.add('loading');

// ===== 2. CURSEUR CUSTOM =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Effet hover sur éléments interactifs
document.querySelectorAll('[data-cursor="hover"], a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    follower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    follower.classList.remove('hover');
  });
});

// ===== 3. SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / height) * 100;
  scrollProgress.style.width = progress + '%';
});

// ===== 4. NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== 5. MENU MOBILE =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
  });
});

// ===== 6. NAV LINK ACTIF AU SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + id) {
          item.classList.add('active');
        }
      });
    }
  });
});

// ===== 7. ANIMATIONS SCROLL (IntersectionObserver) =====
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('animated'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

animateElements.forEach(el => observer.observe(el));

// ===== 8. COMPTEURS ANIMÉS =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = target / 60;
      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== 9. ROTATION DE MOTS DANS LE HERO =====
const words = ["l'image", "le design", "le digital", "la tech"];
const wordEl = document.getElementById('wordRotate');
let wordIndex = 0;

setInterval(() => {
  wordEl.style.opacity = 0;
  wordEl.style.transform = 'translateY(-10px)';
  wordEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    wordEl.textContent = words[wordIndex];
    wordEl.style.opacity = 1;
    wordEl.style.transform = 'translateY(0)';
  }, 320);
}, 2600);

// ===== 10. FILTRES PORTFOLIO =====
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    items.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.classList.remove('hidden');
        item.style.animation = 'none';
        setTimeout(() => {
          item.style.animation = 'fadeIn 0.6s ease forwards';
        }, 10);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Inject keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
document.head.appendChild(style);

// ===== 11. LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCat = document.getElementById('lightboxCat');
const lightboxClose = document.getElementById('lightboxClose');

items.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.querySelector('h4').textContent;
    const cat = item.querySelector('.overlay-cat').textContent;

    lightboxImg.src = img.src;
    lightboxTitle.textContent = title;
    lightboxCat.textContent = cat;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== 12. EFFET TILT 3D SUR LES CARTES SERVICES =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;

    // Glow follow cursor
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.setProperty('--mx', x + 'px');
      glow.style.setProperty('--my', y + 'px');
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== 13. BOUTONS MAGNÉTIQUES =====
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== 14. FORMULAIRE =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<span>✓ Message envoyé !</span>';
    btn.style.background = '#10B981';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });
}

// ===== 15. PARALLAX LÉGER SUR LES BLOBS =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blobs = document.querySelectorAll('.hero-blob');
  blobs.forEach((blob, i) => {
    blob.style.transform = `translateY(${scrollY * (0.1 + i * 0.05)}px)`;
  });
});

console.log('%c KASKAB ', 'background:#E30613;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px;', 'Bibliothèque créative chargée avec succès ✦');