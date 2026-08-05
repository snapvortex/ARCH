/* Берём id проекта из адресной строки: project.html?id=3 */
const params = new URLSearchParams(location.search);
const id = parseInt(params.get('id'), 10) || 1;
const idx = Math.max(0, PROJECTS.findIndex(p => p.id === id));
const p = PROJECTS[idx];

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

/* Галерея */
const gallery = document.getElementById('pGallery');
if (p.gallery && p.gallery.length) {
  p.gallery.forEach(src => {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = p.title;
    gallery.appendChild(img);
  });
} else {
  document.getElementById('pGalleryWrap').style.display = 'none';
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