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

// Lida com clique ou toque em Cadastrar
function handleFormSubmit(event) {
  // Em eventos touchend, o event.target pode não ser o botão,
  // então prevenimos o padrão apenas quando disponível
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

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

  const submitBtn = document.getElementById('submitBtn');
  // Suporta tanto clique quanto toque no iOS
  submitBtn.addEventListener('click', handleFormSubmit);
  submitBtn.addEventListener('touchend', handleFormSubmit);

  document.getElementById('historyBtn')
    .addEventListener('click', () => window.location.href = '/history.html');
});
