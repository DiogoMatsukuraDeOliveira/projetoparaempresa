// javascript/planilha.js

let currentPage = 1;
const entriesPerPage = 5;

function loadHistory() {
  // recupera o histórico e anexa o índice original a cada item
  let history = JSON.parse(localStorage.getItem('history')) || [];
  const indexed = history.map((entry, idx) => ({ ...entry, __idx: idx }));

  // lê filtros
  const nameVal  = document.getElementById('filterName').value;
  const modelVal = document.getElementById('filterModel').value;
  const dayVal   = document.getElementById('filterDay').value;
  const monthVal = document.getElementById('filterMonth').value;
  const yearVal  = document.getElementById('filterYear').value;

  const fDay   = dayVal   ? parseInt(dayVal,   10) : null;
  const fMonth = monthVal ? parseInt(monthVal, 10) : null;
  const fYear  = yearVal  ? parseInt(yearVal,  10) : null;

  // aplica filtros
  const filtered = indexed.filter(item => {
    const [yStr, mStr, dStr] = item.date.split('-');
    const y = parseInt(yStr,10), m = parseInt(mStr,10), d = parseInt(dStr,10);

    const okName  = nameVal  ? item.name  === nameVal  : true;
    const okModel = modelVal ? item.model === modelVal : true;
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

  // renderiza
  const tableBody = document.querySelector('#historyTable tbody');
  tableBody.innerHTML = '';
  pageData.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${start + idx + 1}</td>
      <td>${item.name}</td>
      <td>${item.model}</td>
      <td>${item.date}</td>
      <td><img src="${item.photo}" alt="Foto do Cambio" style="width:100px"/></td>
      <td><input type="checkbox" class="warranty-checkbox" /></td>
    `;
    // configura checkbox de garantia
    const checkbox = tr.querySelector('.warranty-checkbox');
    // marca se já estava salvo
    checkbox.checked = !!item.warranty;
    // ao mudar, salva no localStorage
    checkbox.addEventListener('change', () => {
      history[item.__idx].warranty = checkbox.checked;
      localStorage.setItem('history', JSON.stringify(history));
    });

    tableBody.appendChild(tr);
  });

  // atualiza controles
  document.getElementById('pageNumber').textContent =
    `Página ${currentPage} de ${totalPages}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(direction) {
  if (direction === 'next') currentPage++;
  else if (direction === 'prev') currentPage--;
  loadHistory();
}

function removeById() {
  const id = parseInt(document.getElementById('removeId').value, 10);
  if (isNaN(id)) return;
  let history = JSON.parse(localStorage.getItem('history')) || [];
  history = history.filter((_, i) => i + 1 !== id);
  localStorage.setItem('history', JSON.stringify(history));

  const maxPages = Math.max(1, Math.ceil(history.length / entriesPerPage));
  if (currentPage > maxPages) currentPage = maxPages;
  loadHistory();
}

// eventos
document.getElementById('filterForm').addEventListener('submit', e => {
  e.preventDefault();
  currentPage = 1;
  loadHistory();
});
['filterName','filterModel','filterDay','filterMonth','filterYear'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    currentPage = 1;
    loadHistory();
  });
});
document.getElementById('prevPage').addEventListener('click', () => changePage('prev'));
document.getElementById('nextPage').addEventListener('click', () => changePage('next'));

window.onload = loadHistory;
