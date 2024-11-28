const senhas = {
    '2231': 'admin',
    'tio2231': 'Tiozinho',
    'bruninho2231': 'Bruninho',
    'benzema2231': 'Benzema',
    'gabriel2231': 'Gabriel',
    'alisson2231': 'Alisson',
};

document.getElementById('enterBtn').addEventListener('click', function() {
    const senha = document.getElementById('password').value;
    const nomeUsuario = senhas[senha];

    if (nomeUsuario) {
        // Esconder o formulário de senha e mostrar os filtros e o conteúdo do histórico
        document.getElementById('passwordForm').style.display = 'none';
        document.getElementById('filters').style.display = 'block';
        document.getElementById('historyContent').style.display = 'block';

        // Carregar o histórico do localStorage
        const history = JSON.parse(localStorage.getItem('history')) || [];

        // Filtrar o histórico com base no nome do usuário
        let filteredHistory = history;
        if (nomeUsuario !== 'admin') {
            filteredHistory = history.filter(entry => entry.name === nomeUsuario);
        }

        // Função para filtrar o histórico com base no nome e mês
        function filterHistory() {
            const nameFilter = document.getElementById('nameFilter').value;
            const monthFilter = document.getElementById('monthFilter').value;

            let filteredHistoryTemp = filteredHistory;

            // Aplicar filtros de nome e mês
            filteredHistoryTemp = filteredHistoryTemp.filter(entry => {
                const entryDate = new Date(entry.date);
                const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0');
                const entryName = entry.name;

                const matchesName = !nameFilter || entryName === nameFilter;
                const matchesMonth = !monthFilter || entryMonth === monthFilter;

                return matchesName && matchesMonth;
            });

            // Atualizar a lista de histórico
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = '';
            if (filteredHistoryTemp.length === 0) {
                historyList.innerHTML = '<p>Nenhum dado encontrado com os filtros aplicados.</p>';
            } else {
                filteredHistoryTemp.forEach((entry, index) => {
                    const entryDiv = document.createElement('div');
                    entryDiv.classList.add('history-entry');
                    entryDiv.innerHTML = `
                        <p>Nome: ${entry.name}</p>
                        <p>Modelo: ${entry.model}</p>
                        <p>Data: ${entry.date}</p>
                        <img src="${entry.photo}" alt="Foto" width="100">
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="editEntry(${history.indexOf(entry)})">✏️</button>
                            <button class="delete-btn" onclick="deleteEntry(${history.indexOf(entry)})">❌</button>
                        </div>
                    `;
                    historyList.appendChild(entryDiv);
                });
            }
        }

        // Atualizar a lista de histórico quando os filtros mudam
        document.getElementById('nameFilter').addEventListener('change', filterHistory);
        document.getElementById('monthFilter').addEventListener('change', filterHistory);

        // Mostrar o histórico filtrado inicialmente
        filterHistory();
    } else {
        alert('Senha incorreta!');
    }
});

// Função para editar uma entrada
window.editEntry = function(index) {
    const history = JSON.parse(localStorage.getItem('history')) || []; // Certifique-se de obter o histórico atualizado
    const entry = history[index];

    const newName = prompt("Digite o novo nome:", entry.name);
    const newModel = prompt("Digite o novo modelo:", entry.model);
    const newDate = prompt("Digite a nova data:", entry.date);

    if (newName && newModel && newDate) {
        // Atualiza a entrada no histórico
        entry.name = newName;
        entry.model = newModel;
        entry.date = newDate;

        // Atualiza o histórico no localStorage
        localStorage.setItem('history', JSON.stringify(history));

        // Atualiza a exibição do histórico
        filterHistory(); // Chama a função para atualizar a exibição do histórico
    }
}

window.deleteEntry = function(index) {
    const history = JSON.parse(localStorage.getItem('history')) || []; // Certifique-se de obter o histórico atualizado
    const confirmDelete = confirm("Você tem certeza que deseja remover esta entrada?");
    if (confirmDelete) {
        history.splice(index, 1); // Remove a entrada do array

        // Atualiza o histórico no localStorage
        localStorage.setItem('history', JSON.stringify(history));

        // Atualiza a exibição do histórico
        filterHistory(); // Chama a função para atualizar a exibição do histórico
    }
}