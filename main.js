/* ============================================================
   main.js — Shared UI Logic
   Elevate Youth Foundation
   ============================================================ */

// ─── Scroll-Triggered Animations ─────────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

document.addEventListener('DOMContentLoaded', () => {
  // Observe all animated elements
  document.querySelectorAll('.fade-up, .slide-left, .slide-right').forEach(el => {
    animObserver.observe(el);
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Profile icon for logged in users
  const topLoginBtn = document.getElementById('loginBtn');
  if (topLoginBtn && localStorage.getItem('ey_loggedIn')) {
    const profileIcon = document.createElement('img');
    profileIcon.src = 'amma.jpeg';
    profileIcon.alt = 'Amma Profile Image';
    profileIcon.style.width = '32px';
    profileIcon.style.height = '32px';
    profileIcon.style.borderRadius = '50%';
    profileIcon.style.marginRight = '12px';
    profileIcon.style.objectFit = 'cover';
    profileIcon.style.verticalAlign = 'middle';
    topLoginBtn.parentNode.insertBefore(profileIcon, topLoginBtn);
  }
});

// ─── Toast Notification ───────────────────────────────────
let toastContainer;
function showToast(message, duration = 3200) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ─── Shared Nav HTML Builder ──────────────────────────────
// (not needed; nav is inlined per page for clarity)
