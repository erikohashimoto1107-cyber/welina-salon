/* Welina — Landing Page Scripts */

/* ── Nav: スクロールで背景フロスト ── */
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── ハンバーガーメニュー（SP） ── */
const hamburger = document.getElementById('navHamburger');
const drawer    = document.getElementById('navDrawer');

const openDrawer = () => {
  hamburger.setAttribute('aria-expanded', 'true');
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('drawer-open');    // ナビロゴ・CTAを隠す
};

const closeDrawer = () => {
  hamburger.setAttribute('aria-expanded', 'false');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.body.classList.remove('drawer-open'); // ナビロゴ・CTAを戻す
};

hamburger.addEventListener('click', () => {
  const isOpen = drawer.classList.contains('is-open');
  if (isOpen) closeDrawer();
  else openDrawer();
});

/* ドロワー内リンクをタップしたら閉じる */
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

/* Escape キーで閉じる */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
    closeDrawer();
    hamburger.focus();
  }
});

/* ── スクロール表示アニメーション ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── FAQ アコーディオン ── */
document.querySelectorAll('.faq-item__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');
    // 他を閉じる（アコーディオン動作）
    document.querySelectorAll('.faq-item.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-item__answer').setAttribute('aria-hidden', 'true');
    });
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-item__answer').setAttribute('aria-hidden', 'false');
    }
  });
});

/* ── スムーススクロール（Safari 対応） ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
