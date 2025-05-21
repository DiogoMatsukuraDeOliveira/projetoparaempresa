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

// IDs de filtro para facilitar iterações
const filterIds = ['yearFilter','monthFilter','dayFilter','modelFilter'];

// Evento de login
document.getElementById('enterBtn').addEventListener('click', () => {
  const pw   = document.getElementById('password').value.trim();
  const name = senhas[pw];
  if (!name) { alert('Senha incorreta!'); return; }
  currentUser = name;

  // Ajusta visibilidade
  document.body.classList.add('logged-in');
  backGlobal.style.display  = 'block';
  pwForm.style.display      = 'none';
  toggleCont.style.display  = 'block';
  historyCont.style.display = 'block';

  // Toggle de exibição de filtros
  toggleBtn.onclick = () => {
    if (filters.style.display === 'flex') {
      filters.style.display = 'none';
      toggleBtn.textContent = 'Mostrar Filtros';
    } else {
      filters.style.display = 'flex';
      toggleBtn.textContent = 'Ocultar Filtros';
    }
  };

  // Adiciona event listeners nos filtros, se existirem
  filterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', loadUserHistory);
  });

  // Carrega histórico inicial
  loadUserHistory();
});

// Carrega e filtra histórico
function loadUserHistory() {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const yf = document.getElementById('yearFilter').value;
  const mf = document.getElementById('monthFilter').value;
  const df = document.getElementById('dayFilter').value;
  const mod = document.getElementById('modelFilter').value;

  let filtered = history.filter(e => {
    const [y,m,d] = e.date.split('-');
    return (!yf || y===yf)
        && (!mf || m===mf)
        && (!df || d===df)
        && (!mod|| e.model===mod);
  });

  // Restringe a usuários não-admin
  if (currentUser !== 'admin')
    filtered = filtered.filter(e => e.name === currentUser);

  // Inverte a ordem: último fica em cima
  filtered.reverse();
  renderHistoryList(filtered);
}

// Renderiza lista com setas de primeiro e último
function renderHistoryList(list) {
  const container = document.getElementById('historyList');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p>Nenhum item encontrado.</p>';
    return;
  }

  // Label de início
  const firstLabel = document.createElement('div');
  firstLabel.className = 'arrow-label';
  firstLabel.textContent = '⬆ Primeiro';
  container.appendChild(firstLabel);

  // Entradas
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

  // Label de fim
  const lastLabel = document.createElement('div');
  lastLabel.className = 'arrow-label';
  lastLabel.textContent = 'Último ⬇';
  container.appendChild(lastLabel);
}