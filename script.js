/* ===== Interaksi portofolio Finza Dwi Kirana ===== */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  /* 1. Menu mobile */
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.querySelector('i').className = 'fa-solid fa-bars';
  };
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* 2. Navbar bayangan + tombol kembali ke atas */
  const toTop = document.createElement('button');
  toTop.id = 'back-to-top';
  toTop.setAttribute('aria-label', 'Kembali ke atas');
  toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(toTop);

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    toTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 3. Menu aktif sesuai section (scroll spy) */
  const setActive = id => {
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
  };
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* 4. Animasi muncul saat scroll */
  const revealEls = document.querySelectorAll(
    '#tentang .grid > *, #organisasi .grid > *, #kompetisi .grid > *, #galeri .grid > *, #galeri .mt-16, #kontak .grid > *'
  );
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    revealObs.observe(el);
  });

  /* 5. Animasi bar skill (tinggi asli dibaca dari atribut style) */
  const bars = document.querySelectorAll('.skill-bar');
  bars.forEach(b => { b.dataset.level = b.style.height; b.style.height = '0%'; });
  const skillObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.skill-bar').forEach(b => { b.style.height = b.dataset.level; });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  const skillBox = document.getElementById('keahlian');
  if (skillBox) skillObs.observe(skillBox);
});
