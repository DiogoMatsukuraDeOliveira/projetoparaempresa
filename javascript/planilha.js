let currentPage = 1;
const entriesPerPage = 5;

function loadHistory() {
  // Pega o array original e inverte
  const raw = JSON.parse(localStorage.getItem('history')) || [];
  const history = raw.slice().reverse();

  // Indexação ajustada para gravar warranty de volta em `raw`
  const indexed = history.map((entry, idx) => ({
    ...entry,
    __idx: raw.length - 1 - idx
  }));

  // lê filtros
  const nameVal = document.getElementById('filterName').value;
  let modelVal = document.getElementById('filterModel').value;
  const modelOther = document.getElementById('filterModelOther').value.trim();
  if (modelVal === 'Outro') modelVal = modelOther || '';

  const dayVal   = document.getElementById('filterDay').value;
  const monthVal = document.getElementById('filterMonth').value;
  const yearVal  = document.getElementById('filterYear').value;
  const fDay   = dayVal   ? parseInt(dayVal,   10) : null;
  const fMonth = monthVal ? parseInt(monthVal, 10) : null;
  const fYear  = yearVal  ? parseInt(yearVal,  10) : null;

  // aplica filtros
  const filtered = indexed.filter(item => {
    const [y,m,d] = item.date.split('-').map(Number);
    const okName  = nameVal  ? item.name  === nameVal  : true;
    const okModel = modelVal
      ? item.model.toLowerCase().includes(modelVal.toLowerCase())
      : true;
    const okDay   = fDay   ? d === fDay   : true;
    const okMonth = fMonth ? m === fMonth : true;
    const okYear  = fYear  ? y === fYear  : true;
    return okName && okModel && okDay && okMonth && okYear;
  });

  // paginação
  const totalPages = Math.max(1, Math.ceil(filtered.length / entriesPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * entriesPerPage;
  const pageData = filtered.slice(start, start + entriesPerPage);

  // renderiza tabela
  const tbody = document.querySelector('#historyTable tbody');
  tbody.innerHTML = '';
  pageData.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${start + i + 1}</td>
      <td>${item.name}</td>
      <td>${item.model}</td>
      <td>${item.date}</td>
      <td><img src="${item.photo}" style="width:100px"/></td>
      <td><input type="checkbox" class="warranty-checkbox"/></td>
    `;
    const chk = tr.querySelector('.warranty-checkbox');
    chk.checked = !!item.warranty;
    chk.addEventListener('change', () => {
      // atualiza no raw usando __idx
      raw[item.__idx].warranty = chk.checked;
      localStorage.setItem('history', JSON.stringify(raw));
    });
    tbody.appendChild(tr);
  });

  document.getElementById('pageNumber').textContent =
    `Página ${currentPage} de ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(dir) {
  currentPage += dir === 'next' ? 1 : -1;
  loadHistory();
}

function removeById() {
  const id = parseInt(document.getElementById('removeId').value, 10);
  if (!id) return;
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history = history.filter((_, i) => i + 1 !== id);
  localStorage.setItem('history', JSON.stringify(history));
  const maxPages = Math.max(1, Math.ceil(history.length / entriesPerPage));
  if (currentPage > maxPages) currentPage = maxPages;
  loadHistory();
}

// mostrar/ocultar campo "Outro" nos filtros
const filterModel = document.getElementById('filterModel');
const otherCont = document.getElementById('filterModelOtherContainer');
const filterModelOther = document.getElementById('filterModelOther');

filterModel.addEventListener('change', () => {
  if (filterModel.value === 'Outro') {
    otherCont.style.display = 'block';
  } else {
    otherCont.style.display = 'none';
    filterModelOther.value = '';
  }
});

// dispara filtros ao mudar qualquer campo
['filterName','filterModel','filterDay','filterMonth','filterYear']
  .forEach(id =>
    document.getElementById(id)
      .addEventListener('change', () => {
        currentPage = 1;
        loadHistory();
      })
  );

filterModelOther.addEventListener('input', () => {
  currentPage = 1;
  loadHistory();
});

// botão para limpar todos os filtros
document.getElementById('clearFiltersBtn')
  .addEventListener('click', () => {
    document.getElementById('filterName').value = '';
    document.getElementById('filterModel').value = '';
    otherCont.style.display = 'none';
    filterModelOther.value = '';
    document.getElementById('filterDay').value = '';
    document.getElementById('filterMonth').value = '';
    document.getElementById('filterYear').value = '';
    currentPage = 1;
    loadHistory();
  });

// paginação
document.getElementById('prevPage')
  .addEventListener('click', () => changePage('prev'));
document.getElementById('nextPage')
  .addEventListener('click', () => changePage('next'));

// carrega ao iniciar
window.onload = loadHistory;
