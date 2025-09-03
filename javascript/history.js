// /projetoparaempresa/javascript/history.js
document.addEventListener('DOMContentLoaded', () => {
  const listItems = Array.from(document.querySelectorAll('.history-item'));
  const content   = document.getElementById('historyContent');
  const toggleBox = document.getElementById('toggleFiltersContainer');
  const filtersBox= document.getElementById('filters');
  const toggleBtn = document.getElementById('toggleFiltersBtn');

  // Revela os contêineres escondidos pelo CSS
  if (content)   content.style.display   = 'block';
  if (toggleBox) toggleBox.style.display = 'block';

  // Se não há itens, não há o que fazer
  if (!listItems.length) return;

  // Toggle mostrar/ocultar filtros
  if (toggleBtn && filtersBox) {
    toggleBtn.addEventListener('click', () => {
      const vis = (filtersBox.style.display === 'block');
      filtersBox.style.display = vis ? 'none' : 'block';
      toggleBtn.textContent = vis ? 'Mostrar Filtros' : 'Esconder Filtros';
    });
  }

  const yearSel  = document.getElementById('yearFilter');
  const monthSel = document.getElementById('monthFilter');
  const daySel   = document.getElementById('dayFilter');
  const modelSel = document.getElementById('modelFilter');

  const hasAny = () =>
    (yearSel?.value || monthSel?.value || daySel?.value || modelSel?.value);

  function apply() {
    if (!hasAny()) {
      listItems.forEach(el => (el.style.display = ''));
      return;
    }
    const y = (yearSel?.value  || '').trim();
    const m = (monthSel?.value || '').trim();
    const d = (daySel?.value   || '').trim();
    const mdl = (modelSel?.value || '').trim();

    listItems.forEach(el => {
      const ok =
        (!y   || el.dataset.year  === y) &&
        (!m   || el.dataset.month === m) &&
        (!d   || el.dataset.day   === d) &&
        (!mdl || el.dataset.model === mdl);
      el.style.display = ok ? '' : 'none';
    });
  }

  [yearSel, monthSel, daySel, modelSel]
    .filter(Boolean)
    .forEach(s => s.addEventListener('change', apply));

  // Ao carregar, mostra tudo (sem filtro)
  listItems.forEach(el => (el.style.display = ''));
});
