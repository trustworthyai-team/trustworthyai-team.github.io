const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    toggle.focus();
  }
});
const search = document.querySelector('#publication-search');
const year = document.querySelector('#publication-year');
function filterPublications() {
  let count = 0;
  document.querySelectorAll('#publication-list .publication').forEach(row => {
    const visible = row.dataset.search.includes(search.value.trim().toLowerCase()) && (year.value === 'all' || row.dataset.year === year.value);
    row.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#result-count').textContent = `${count} publication${count === 1 ? '' : 's'}`;
  document.querySelector('#no-results').hidden = count !== 0;
}
search?.addEventListener('input', filterPublications);
year?.addEventListener('change', filterPublications);
const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('.photo-open').forEach(button => button.addEventListener('click', () => {
  const image = document.querySelector('#dialog-image');
  image.src = button.dataset.src;
  image.alt = button.dataset.caption;
  document.querySelector('#dialog-caption').textContent = button.dataset.caption;
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
