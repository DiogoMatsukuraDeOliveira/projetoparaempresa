// index.js

// 1) Mostrar/ocultar o campo "Outro"
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

// 2) Preencher o campo data com a data de hoje
function setDateToToday() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setDateToToday();

  // evento de mudança no select de modelo
  const modelSelect = document.getElementById('model');
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => checkModel(e.target));
  }

  // botão "Acessar Histórico"
  const historyBtn = document.getElementById('historyBtn');
  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      window.location.href = 'history.php';
    });
  }
});
