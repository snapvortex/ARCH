/* ---------- Слайдер ---------- */
const slides = [...document.querySelectorAll('.slide')];
const capNum = document.getElementById('capNum'),
      capTitle = document.getElementById('capTitle'),
      capCredit = document.getElementById('capCredit'),
      caption = document.getElementById('caption'),
      counter = document.getElementById('counter');
let i = 0, timer;
const pad = n => String(n).padStart(2, '0');

function show(n) {
  i = (n + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
  const d = slides[i].dataset;
  capNum.textContent = d.num;
  capTitle.textContent = d.title;
  capCredit.textContent = d.credit;
  counter.textContent = pad(i + 1) + ' / ' + pad(slides.length);
  caption.classList.remove('anim');
  void caption.offsetWidth;
  caption.classList.add('anim');
}

const next = () => show(i + 1),
      prev = () => show(i - 1);

function autoplay() {
  clearInterval(timer);
  timer = setInterval(next, 6000);
}

document.getElementById('next').onclick = () => { next(); autoplay(); };
document.getElementById('prev').onclick = () => { prev(); autoplay(); };

addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { next(); autoplay(); }
  if (e.key === 'ArrowLeft') { prev(); autoplay(); }
});

/* свайпы на мобильных */
let x0 = null;
const hero = document.querySelector('.hero');
hero.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
hero.addEventListener('touchend', e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); autoplay(); }
  x0 = null;
}, { passive: true });
autoplay();

/* ---------- Меню ---------- */
const btn = document.getElementById('menuBtn');
btn.onclick = () => document.body.classList.toggle('menu-open');
document.querySelectorAll('.overlay-nav a').forEach(a =>
  a.addEventListener('click', () => document.body.classList.remove('menu-open')));

/* ---------- Появление секций ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();