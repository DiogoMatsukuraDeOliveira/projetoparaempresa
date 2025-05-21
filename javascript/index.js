// Confirma carregamento
console.log('index.js carregado');

// Show/hide "Outro" field
function checkModel(select) {
  const otherDiv = document.getElementById('modelOther');
  const otherInput = document.getElementById('modelOtherInput');
  if (select.value === 'Outro') {
    otherDiv.style.display = 'block';
    otherInput.setAttribute('required', '');
  } else {
    otherDiv.style.display = 'none';
    otherInput.removeAttribute('required');
  }
}

// Preenche data de hoje
function setDateToToday() {
  const dateInput = document.getElementById('date');
  dateInput.value = new Date().toISOString().split('T')[0];
}

// Salva no localStorage
function saveToLocalStorage(entry) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  history.push(entry);
  localStorage.setItem('history', JSON.stringify(history));
}

// Lida com clique em Cadastrar
function handleFormSubmit() {
  const name = document.getElementById('name').value;
  const modelSelect = document.getElementById('model').value;
  const model = modelSelect === 'Outro'
    ? document.getElementById('modelOtherInput').value
    : modelSelect;
  const date = document.getElementById('date').value;
  const photoFile = document.getElementById('photo').files[0];

  if (!name || !model || !date || !photoFile) {
    alert('Preencha todos os campos e selecione uma foto.');
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    saveToLocalStorage({ name, model, date, photo: e.target.result });
    alert('Dados salvos com sucesso!');
    document.getElementById('dataForm').reset();
    document.getElementById('modelOther').style.display = 'none';
  };
  reader.readAsDataURL(photoFile);
}

// Setup initial events
document.addEventListener('DOMContentLoaded', () => {
  setDateToToday();
  document.getElementById('model')
    .addEventListener('change', e => checkModel(e.target));
  document.getElementById('submitBtn')
    .addEventListener('click', handleFormSubmit);
  document.getElementById('historyBtn')
    .addEventListener('click', () => window.location.href = '/history.html');
});