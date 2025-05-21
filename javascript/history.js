const senhas = {
  '2231': 'admin',
  'tio2231': 'Tiozinho',
  'bru2231': 'Bruninho',
  'b2231': 'Benzema',
  'g2231': 'Gabriel',
  'a2231': 'Alisson',
};
let currentUser = null;

const backGlobal  = document.getElementById('globalBackBtn');
const pwForm      = document.getElementById('passwordForm');
const toggleCont  = document.getElementById('toggleFiltersContainer');
const filters     = document.getElementById('filters');
const historyCont = document.getElementById('historyContent');
const toggleBtn   = document.getElementById('toggleFiltersBtn');

document.getElementById('enterBtn').addEventListener('click', () => {
  const pw   = document.getElementById('password').value.trim();
  const name = senhas[pw];
  if (!name) {
    alert('Senha incorreta!');
    return;
  }
  currentUser = name;

  // 1) adiciona classe que centraliza 'topo'
  document.body.classList.add('logged-in');

  // 2) exibe o botão global e esconde o form de senha
  backGlobal.style.display       = 'block';
  pwForm.style.display           = 'none';
  toggleCont.style.display       = 'block';
  historyCont.style.display      = 'block';
  filters.style.display          = 'none';
  toggleBtn.textContent          = 'Mostrar Filtros';

  // toggle de filtros
  toggleBtn.onclick = () => {
    if (filters.style.display === 'flex') {
      filters.style.display    = 'none';
      toggleBtn.textContent    = 'Mostrar Filtros';
    } else {
      filters.style.display    = 'flex';
      toggleBtn.textContent    = 'Ocultar Filtros';
    }
  };

  // listeners de filtros
  ['yearFilter','monthFilter','dayFilter','modelFilter']
    .forEach(id => document.getElementById(id)
      .addEventListener('change', loadUserHistory));

  loadUserHistory();
});

function loadUserHistory() {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const yf = document.getElementById('yearFilter').value;
  const mf = document.getElementById('monthFilter').value;
  const df = document.getElementById('dayFilter').value;
  const mod= document.getElementById('modelFilter').value;

  let filtered = history.filter(e => {
    const [y,m,d] = e.date.split('-');
    return (!yf || y===yf)
        && (!mf || m===mf)
        && (!df || d===df)
        && (!mod || e.model===mod);
  });

  if (currentUser !== 'admin') {
    filtered = filtered.filter(e => e.name === currentUser);
  }
  filtered.sort((a,b)=> a.model.localeCompare(b.model));
  renderHistoryList(filtered);
}

function renderHistoryList(list) {
  const container = document.getElementById('historyList');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p>Nenhum item encontrado.</p>';
    return;
  }
  list.forEach(e => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.innerHTML = `
      <p><strong>Nome:</strong> ${e.name}</p>
      <p><strong>Modelo:</strong> ${e.model}</p>
      <p><strong>Data:</strong> ${e.date}</p>
      <img src="${e.photo}" alt="Foto">
    `;
    container.appendChild(div);
  });
}

function renderHistoryList(list) {
  const container = document.getElementById('historyList');
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<p>Nenhum item encontrado.</p>';
    return;
  }

  // 1) Label de mais recente
  const recentLabel = document.createElement('div');
  recentLabel.className = 'history-label';
  recentLabel.innerHTML = '&#9650; Mais recente';  // ▲
  container.appendChild(recentLabel);

  // 2) Cada entrada
  list.forEach(e => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.innerHTML = `
      <p><strong>Nome:</strong> ${e.name}</p>
      <p><strong>Modelo:</strong> ${e.model}</p>
      <p><strong>Data:</strong> ${e.date}</p>
      <img src="${e.photo}" alt="Foto">
    `;
    container.appendChild(div);
  });

  // 3) Label de mais antiga
  const oldestLabel = document.createElement('div');
  oldestLabel.className = 'history-label';
  oldestLabel.innerHTML = '▼ Mais antiga';  // ▼
  container.appendChild(oldestLabel);
}
