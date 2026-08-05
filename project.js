/* Берём id проекта из адресной строки: project.html?id=3 */
const params = new URLSearchParams(location.search);
const id = parseInt(params.get('id'), 10) || 1;
const idx = Math.max(0, PROJECTS.findIndex(p => p.id === id));
const p = PROJECTS[idx];
const pad2 = n => String(n).padStart(2, '0');

/* Заголовок вкладки */
document.title = p.title + ' — ARX®';

/* Хиро */
const heroImg = document.getElementById('pHero');
heroImg.src = p.cover;
heroImg.alt = p.title;
document.getElementById('pNum').textContent = p.num;
document.getElementById('pTitle').textContent = p.title;
document.getElementById('pCredit').textContent = p.credit;

/* Характеристики */
const metaFields = [
  ['Типология', p.type],
  ['Год', p.year],
  ['Локация', p.location],
  ['Площадь', p.area],
  ['Статус', p.status]
];
const meta = document.getElementById('pMeta');
metaFields.forEach(([k, v]) => {
  const li = document.createElement('li');
  li.innerHTML = '<span>' + k + '</span><b>' + v + '</b>';
  meta.appendChild(li);
});

/* Описание */
document.getElementById('pLabel').textContent = p.num + ' — ' + p.title;
const text = document.getElementById('pText');
p.description.forEach(par => {
  const el = document.createElement('p');
  el.textContent = par;
  text.appendChild(el);
});

/* ---------- ГАЛЕРЕЯ-СЛАЙДЕР ---------- */
const galleryWrap = document.getElementById('pGalleryWrap');
const gallery = document.getElementById('pGallery');

if (!p.gallery || p.gallery.length === 0) {
  galleryWrap.style.display = 'none';
} else {
  /* создаём слайды */
  p.gallery.forEach((src, k) => {
    const slide = document.createElement('div');
    slide.className = 'pg-slide' + (k === 0 ? ' is-active' : '');
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = p.title + ' — фото ' + (k + 1);
    slide.appendChild(img);
    gallery.appendChild(slide);
  });

  /* панель управления */
  const ui = document.createElement('div');
  ui.className = 'pg-ui';
  ui.innerHTML =
    '<span class="pg-counter" id="pgCounter">' + pad2(1) + ' / ' + pad2(p.gallery.length) + '</span>' +
    '<button class="arrow" id="pgPrev" aria-label="Назад">←</button>' +
    '<button class="arrow" id="pgNext" aria-label="Вперёд">→</button>';
  galleryWrap.appendChild(ui);

  const gSlides = gallery.querySelectorAll('.pg-slide');
  const gCounter = document.getElementById('pgCounter');
  let gIdx = 0;

  function gShow(n) {
    gIdx = (n + gSlides.length) % gSlides.length;
    gSlides.forEach((s, k) => s.classList.toggle('is-active', k === gIdx));
    gCounter.textContent = pad2(gIdx + 1) + ' / ' + pad2(gSlides.length);
  }

  document.getElementById('pgNext').onclick = () => gShow(gIdx + 1);
  document.getElementById('pgPrev').onclick = () => gShow(gIdx - 1);

  /* стрелки на клавиатуре */
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') gShow(gIdx + 1);
    if (e.key === 'ArrowLeft') gShow(gIdx - 1);
  });

  /* свайпы на мобильных */
  let gx0 = null;
  gallery.addEventListener('touchstart', e => gx0 = e.touches[0].clientX, { passive: true });
  gallery.addEventListener('touchend', e => {
    if (gx0 === null) return;
    const dx = e.changedTouches[0].clientX - gx0;
    if (Math.abs(dx) > 50) { dx < 0 ? gShow(gIdx + 1) : gShow(gIdx - 1); }
    gx0 = null;
  }, { passive: true });

  /* если фото всего одно — прячем стрелки и счётчик */
  if (p.gallery.length < 2) ui.style.display = 'none';
}

/* Предыдущий / следующий проект */
const prevP = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
const nextP = PROJECTS[(idx + 1) % PROJECTS.length];
const prevLink = document.getElementById('pPrev');
const nextLink = document.getElementById('pNext');
prevLink.href = 'project.html?id=' + prevP.id;
prevLink.querySelector('b').textContent = prevP.title;
nextLink.href = 'project.html?id=' + nextP.id;
nextLink.querySelector('b').textContent = nextP.title;

document.getElementById('year').textContent = new Date().getFullYear();
