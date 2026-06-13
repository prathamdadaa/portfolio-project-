/* ============================================================
   Captain's Trade Co. — Portfolio Website
   FILE: js/script.js
   STRUCTURE:
     1. Scroll Reveal Animation (Intersection Observer)
     2. Smooth Nav Active State (optional enhancement)
     3. Contact Form Handler (placeholder)
============================================================ */


/* ── 1. SCROLL REVEAL ANIMATION ── */
/*
   Adds the class "visible" to any element with class "reveal"
   when it enters the viewport. Uses IntersectionObserver for
   performance — avoids scroll event listeners.
*/
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Staggered delay — each element in view gets +80ms offset */
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);

          /* Stop observing once revealed — no need to re-trigger */
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 } /* trigger when 12% of element is visible */
  );

  revealEls.forEach((el) => observer.observe(el));
})();


/* ── 2. NAV ACTIVE STATE ON SCROLL ── */
/*
   Highlights the correct nav link as the user scrolls
   through each section.
*/
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';               /* reset all */
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--gold)';  /* highlight active */
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => highlightObserver.observe(sec));
})();


/* ── 3. CONTACT FORM HANDLER ── */
/*
   Intercepts the form submit, validates basic fields, and
   shows a success message. Replace the console.log with your
   real API call (e.g. EmailJS, Formspree, or a backend route).
*/
(function initContactForm() {
  const btn = document.querySelector('.contact-form .btn-primary');
  if (!btn) return;

  btn.addEventListener('click', function () {
    /* Grab form field values */
    const inputs  = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    const data    = {};
    let   isValid = true;

    inputs.forEach((input) => {
      const key   = input.placeholder || input.tagName.toLowerCase();
      const value = input.value.trim();

      /* Simple required-field check */
      if (!value) {
        input.style.borderColor = 'rgba(139,58,26,0.8)'; /* rust red */
        isValid = false;
      } else {
        input.style.borderColor = '';
        data[key] = value;
      }
    });

    if (!isValid) {
      showToast('Please fill in all fields before sending.', 'error');
      return;
    }

    /* ─── Replace this block with your actual API call ─── */
    console.log('Form data ready to send:', data);
    /* Example: await fetch('/api/contact', { method:'POST', body: JSON.stringify(data) }) */
    /* ───────────────────────────────────────────────────── */

    showToast('Message sent! I\'ll get back to you within 24 hours. ⚓', 'success');

    /* Clear fields on success */
    inputs.forEach((input) => (input.value = ''));
  });
})();


/* ── HELPER: Toast Notification ── */
function showToast(message, type) {
  /* Remove any existing toast */
  const existing = document.getElementById('ctc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'ctc-toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position:        'fixed',
    bottom:          '32px',
    left:            '50%',
    transform:       'translateX(-50%)',
    padding:         '16px 32px',
    background:      type === 'success' ? 'var(--gold)' : '#8b3a1a',
    color:           type === 'success' ? '#0d1b2a' : '#f0e8d5',
    fontFamily:      "'Cinzel', serif",
    fontSize:        '0.88rem',
    letterSpacing:   '0.12em',
    zIndex:          '999',
    boxShadow:       '0 4px 24px rgba(0,0,0,0.4)',
    transition:      'opacity 0.4s',
    borderRadius:    '0',
  });

  document.body.appendChild(toast);

  /* Auto-remove after 4 seconds */
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
