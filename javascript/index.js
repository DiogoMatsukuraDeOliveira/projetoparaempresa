// index.js

console.log('index.js carregado');

// 1) Mostrar/ocultar "Outro"
function checkModel(select) {
  const otherDiv   = document.getElementById('modelOther');
  const otherInput = document.getElementById('modelOtherInput');
  if (select.value === 'Outro') {
    otherDiv.style.display = 'block';
    otherInput.setAttribute('required', '');
  } else {
    otherDiv.style.display = 'none';
    otherInput.removeAttribute('required');
  }
}

// 2) Data de hoje
function setDateToToday() {
  const dateInput = document.getElementById('date');
  dateInput.value = new Date().toISOString().slice(0,10);
}

// 3) Salvar com controle de cota e alerta
const MAX_HISTORY_ENTRIES = 20;
function saveToLocalStorage(entry) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('history')) || [];
  } catch {
    history = [];
  }

  history.push(entry);
  // mantém só os últimos N registros
  if (history.length > MAX_HISTORY_ENTRIES) {
    history = history.slice(-MAX_HISTORY_ENTRIES);
  }

  try {
    localStorage.setItem('history', JSON.stringify(history));
  } catch (e) {
    if (e.name.includes('QuotaExceeded')) {
      // remove o mais antigo e tenta de novo
      history.shift();
      localStorage.setItem('history', JSON.stringify(history));
      alert('Limite de armazenamento atingido: a entrada mais antiga foi removida para abrir espaço.');
    } else {
      console.error('Erro inesperado ao salvar:', e);
      throw e;
    }
  }
}

// 4) Manipula o submit do form
function handleFormSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('submitBtn');

  if (btn.disabled) return;       // já está processando
  btn.disabled = true;
  btn.textContent = 'Processando…';

  // coleta dados
  const name       = document.getElementById('name').value.trim();
  const modelSel   = document.getElementById('model').value;
  const model      = modelSel === 'Outro'
                       ? document.getElementById('modelOtherInput').value.trim()
                       : modelSel;
  const date       = document.getElementById('date').value;
  const photoFile  = document.getElementById('photo').files[0];

  if (!name || !model || !date || !photoFile) {
    alert('Preencha todos os campos e selecione uma foto.');
    btn.disabled = false;
    btn.textContent = 'Cadastrar';
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    try {
      saveToLocalStorage({ name, model, date, photo: e.target.result });
      alert('Dados salvos com sucesso!');
      const form = document.getElementById('dataForm');
      form.reset();
      document.getElementById('modelOther').style.display = 'none';
      setDateToToday();
      document.getElementById('name').focus();
    } catch {
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Cadastrar';
    }
  };
  reader.onerror = () => {
    alert('Falha ao ler a foto. Tente outro arquivo.');
    btn.disabled = false;
    btn.textContent = 'Cadastrar';
  };
  reader.readAsDataURL(photoFile);
}

// 5) Inicializa listeners
document.addEventListener('DOMContentLoaded', () => {
  setDateToToday();
  document.getElementById('model')
          .addEventListener('change', e => checkModel(e.target));

  // usa o submit do form
  const form = document.getElementById('dataForm');
  form.addEventListener('submit', handleFormSubmit);

  // botão de histórico continua redirecionando
  document.getElementById('historyBtn')
          .addEventListener('click', () => {
            window.location.href = '/history.html';
          });
});
