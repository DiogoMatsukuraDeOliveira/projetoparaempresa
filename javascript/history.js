// history.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleFiltersBtn');
  const filters   = document.getElementById('filters');
  const yearF     = document.getElementById('yearFilter');
  const monthF    = document.getElementById('monthFilter');
  const dayF      = document.getElementById('dayFilter');
  const modelF    = document.getElementById('modelFilter');
  const items     = Array.from(document.getElementsByClassName('history-item'));

  // Toggle de visibilidade dos filtros
  toggleBtn.addEventListener('click', () => {
    if (filters.style.display === 'flex' || filters.style.display === 'block') {
      filters.style.display = 'none';
      toggleBtn.textContent = 'Mostrar Filtros';
    } else {
      filters.style.display = 'flex';
      toggleBtn.textContent = 'Ocultar Filtros';
    }
  });

  // Função que aplica os filtros
  function applyFilters() {
    const yf   = yearF.value;
    const mf   = monthF.value;
    const df   = dayF.value;
    const modf = modelF.value;

    items.forEach(item => {
      const okYear  = !yf   || item.dataset.year  === yf;
      const okMonth = !mf   || item.dataset.month === mf;
      const okDay   = !df   || item.dataset.day   === df;
      const okMod   = !modf || item.dataset.model === modf;
      item.style.display = (okYear && okMonth && okDay && okMod) ? '' : 'none';
    });
  }

  // Listeners de mudança em cada filtro
  [yearF, monthF, dayF, modelF].forEach(sel =>
    sel.addEventListener('change', applyFilters)
  );
});
