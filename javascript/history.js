const senhas = {
    '2231': 'admin',
    'tio2231': 'Tiozinho',
    'bruninho2231': 'Bruninho',
    'benzema2231': 'Benzema',
    'gabriel2231': 'Gabriel',
    'alisson2231': 'Alisson',
};

document.getElementById('enterBtn').addEventListener('click', function () {
    const senha = document.getElementById('password').value;
    const nomeUsuario = senhas[senha];

    if (nomeUsuario) {
        // Exibir interface de histórico
        document.getElementById('passwordForm').style.display = 'none';
        document.getElementById('filters').style.display = 'block';
        document.getElementById('historyContent').style.display = 'block';

        // Filtrar e exibir o histórico
        filterHistory(nomeUsuario !== 'admin' ? nomeUsuario : null);
    } else {
        alert('Senha incorreta!');
    }
});

function filterHistory(userName = null) {
    const nameFilter = document.getElementById('nameFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
    const history = JSON.parse(localStorage.getItem('history')) || [];

    const filteredHistory = history.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0');

        const matchesUser = userName ? entry.name === userName : true;
        const matchesName = !nameFilter || entry.name === nameFilter;
        const matchesMonth = !monthFilter || entryMonth === monthFilter;

        return matchesUser && matchesName && matchesMonth;
    });

    renderHistoryList(filteredHistory);
}

document.getElementById('exportBtn').addEventListener('click', function () {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.length === 0) {
        alert('Nenhum dado disponível para exportar!');
        return;
    }

    // Criar o arquivo JSON
    const jsonData = JSON.stringify(history, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Criar um link para download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'historico_com_fotos.json';
    link.click();

    // Liberar o objeto URL
    URL.revokeObjectURL(url);
});

function renderHistoryList(history) {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<p>Nenhum dado encontrado com os filtros aplicados.</p>';
    } else {
        history.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('history-entry');
            entryDiv.innerHTML = `
                <p>Nome: ${entry.name}</p>
                <p>Modelo: ${entry.model}</p>
                <p>Data: ${entry.date}</p>
                <img src="${entry.photo}" alt="Foto" width="100">
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editEntry(${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteEntry(${index})">❌</button>
                </div>
            `;
            historyList.appendChild(entryDiv);
        });
    }
}

window.editEntry = function (index) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const entry = history[index];

    const newName = prompt('Digite o novo nome:', entry.name);
    const newModel = prompt('Digite o novo modelo:', entry.model);
    const newDate = prompt('Digite a nova data:', entry.date);

    if (newName && newModel && newDate) {
        history[index] = { ...entry, name: newName, model: newModel, date: newDate };
        localStorage.setItem('history', JSON.stringify(history));
        filterHistory();
    }
};

window.deleteEntry = function (index) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    if (confirm('Você tem certeza que deseja remover esta entrada?')) {
        history.splice(index, 1);
        localStorage.setItem('history', JSON.stringify(history));
        filterHistory();
    }
};

// Atualizar a lista de histórico ao mudar os filtros
document.getElementById('nameFilter').addEventListener('change', () => filterHistory());
document.getElementById('monthFilter').addEventListener('change', () => filterHistory());
