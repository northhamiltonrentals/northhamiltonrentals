// ── Mobile nav toggle ────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Active nav link ──────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  }
});

// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(form)
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:40px 20px">
            <div style="font-size:3rem;margin-bottom:16px">✅</div>
            <h3 style="color:var(--navy);margin-bottom:8px">Message Received!</h3>
            <p>We'll get back to you within a few hours. For faster service, call or text us directly.</p>
          </div>`;
      } else { throw new Error(); }
    } catch {
      btn.textContent = orig;
      btn.disabled = false;
      alert('Something went wrong. Please call or text us directly.');
    }
  });
}
