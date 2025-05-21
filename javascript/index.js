// Mostra/esconde o "Outro" e aplica required dinamicamente
function checkModel(select) {
  const modelOtherDiv = document.getElementById('modelOther');
  const modelOtherInput = document.getElementById('modelOtherInput');
  if (select.value === 'Outro') {
    modelOtherDiv.style.display = 'block';
    modelOtherInput.setAttribute('required', '');
  } else {
    modelOtherDiv.style.display = 'none';
    modelOtherInput.removeAttribute('required');
  }
}

// Preenche o campo de data com a data de hoje
function setDateToToday() {
  const dateInput = document.getElementById('date');
  const today = new Date();
  dateInput.value = today.toISOString().split('T')[0];
}

// Salva no localStorage
function saveToLocalStorage(entry) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  history.push(entry);
  localStorage.setItem('history', JSON.stringify(history));
}

// Lida com o envio do formulário
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const modelSelect = document.getElementById('model').value;
  const model = modelSelect === 'Outro'
    ? document.getElementById('modelOtherInput').value
    : modelSelect;
  const date = document.getElementById('date').value;
  const photoFile = document.getElementById('photo').files[0];

  if (name && model && date && photoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      saveToLocalStorage({ name, model, date, photo: e.target.result });
      alert('Dados salvos no histórico com sucesso!');
      document.getElementById('dataForm').reset();
      document.getElementById('modelOther').style.display = 'none';
    };
    reader.readAsDataURL(photoFile);
  }
}

// Espera o DOM estar pronto para registrar eventos
document.addEventListener('DOMContentLoaded', () => {
  setDateToToday();

  // Change listener para o select de modelo
  document.getElementById('model')
    .addEventListener('change', e => checkModel(e.target));

  // Listener de submit
  document.getElementById('dataForm')
    .addEventListener('submit', handleFormSubmit);
});