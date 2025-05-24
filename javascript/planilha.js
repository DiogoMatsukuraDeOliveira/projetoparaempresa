// planilha.js

let currentPage = 1;
const entriesPerPage = 5;

document.addEventListener('DOMContentLoaded', () => {
  const nameF     = document.getElementById('filterName');
  const modelF    = document.getElementById('filterModel');
  const otherCont = document.getElementById('filterModelOtherContainer');
  const otherIn   = document.getElementById('filterModelOther');
  const dayF      = document.getElementById('filterDay');
  const monthF    = document.getElementById('filterMonth');
  const yearF     = document.getElementById('filterYear');
  const clearBtn  = document.getElementById('clearFiltersBtn');
  const prevBtn   = document.getElementById('prevPage');
  const nextBtn   = document.getElementById('nextPage');
  const pageNum   = document.getElementById('pageNumber');
  const tbody     = document.querySelector('#historyTable tbody');
  const rows      = Array.from(tbody.querySelectorAll('tr'));

  // Função que exibe somente as linhas da página e filtros
  function loadTable() {
    // Lê valores dos filtros
    const nameVal  = nameF.value;
    let   modelVal = modelF.value;
    if (modelVal === 'Outro') {
      modelVal = otherIn.value.trim() || '';
    }
    const dayVal   = dayF.value;
    const monthVal = monthF.value;
    const yearVal  = yearF.value;

    // Filtra linhas
    const filtered = rows.filter(r => {
      const okName  = !nameVal  || r.dataset.name  === nameVal;
      const okModel = !modelVal || r.dataset.model === modelVal;
      const okDay   = !dayVal   || r.dataset.day   === dayVal;
      const okMonth = !monthVal || r.dataset.month === monthVal;
      const okYear  = !yearVal  || r.dataset.year  === yearVal;
      return okName && okModel && okDay && okMonth && okYear;
    });

    // Paginação
    const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * entriesPerPage;
    const pageRows = filtered.slice(start, start + entriesPerPage);

    // Exibe/oculta
    rows.forEach(r => r.style.display = 'none');
    pageRows.forEach(r => r.style.display = '');

    // Atualiza controles
    pageNum.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Listeners de filtros e paginação
  [nameF, modelF, dayF, monthF, yearF].forEach(el =>
    el.addEventListener('change', () => { currentPage = 1; loadTable(); })
  );
  otherIn.addEventListener('input', () => { currentPage = 1; loadTable(); });
  clearBtn.addEventListener('click', () => {
    nameF.value = '';
    modelF.value = '';
    otherIn.value = '';
    dayF.value = '';
    monthF.value = '';
    yearF.value = '';
    otherCont.style.display = 'none';
    currentPage = 1;
    loadTable();
  });
  prevBtn.addEventListener('click', () => { if (currentPage>1) { currentPage--; loadTable(); } });
  nextBtn.addEventListener('click', () => { currentPage++; loadTable(); });
  modelF.addEventListener('change', () => {
    if (modelF.value === 'Outro') {
      otherCont.style.display = 'block';
    } else {
      otherCont.style.display = 'none';
      otherIn.value = '';
    }
  });

  // Carrega pela primeira vez
  loadTable();
});
