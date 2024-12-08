const senhas = {
    '2231': 'admin',
    'tio2231': 'Tiozinho',
    'bru2231': 'Bruninho',
    'b2231': 'Benzema',
    'g2231': 'Gabriel',
    'a2231': 'Alisson',
};

let currentUser = null; // Variável global para armazenar o usuário logado

document.getElementById('enterBtn').addEventListener('click', function () {
    const senha = document.getElementById('password').value;
    const nomeUsuario = senhas[senha];

    if (nomeUsuario) {
        // Configurar o usuário logado
        currentUser = nomeUsuario;

        // Exibir interface de histórico
        document.getElementById('passwordForm').style.display = 'none';
        document.getElementById('filters').style.display = 'block'; // Mostrar filtros
        document.getElementById('historyContent').style.display = 'block';

        // Exibir os produtos dependendo do tipo de usuário
        loadUserHistory();
    } else {
        alert('Senha incorreta!');
    }
});

// Carregar os produtos do usuário logado ou todos os produtos se for admin
function loadUserHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];

    // Obter os valores dos filtros
    const monthFilter = document.getElementById('monthFilter').value;

    // Filtrar o histórico com base no nome e mês
    const filteredHistory = history.filter(entry => {
        let match = true;

        // Filtra por mês, se fornecido
        if (monthFilter) {
            const entryMonth = entry.date.split('-')[1]; // Extrai o mês da data (assumindo formato YYYY-MM-DD)
            if (entryMonth !== monthFilter) {
                match = false;
            }
        }

        return match;
    });

    // Se for admin, exibe todos os produtos, caso contrário, filtra por usuário
    const userHistory = currentUser === 'admin' ? filteredHistory : filteredHistory.filter(entry => entry.name === currentUser);

    // Ordenar os produtos pelo modelo ou outro critério, se necessário
    const sortedHistory = userHistory.sort((a, b) => a.model.localeCompare(b.model));

    renderHistoryList(sortedHistory);
}

// Função para renderizar a lista de produtos
function renderHistoryList(history) {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Limpar a lista anterior

    if (history.length === 0) {
        historyList.innerHTML = '<p>Nenhum produto encontrado.</p>';
    } else {
        history.forEach((entry, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('history-entry');
            entryDiv.innerHTML = `
                <p>Nome: ${entry.name}</p>
                <p>Modelo: ${entry.model}</p>
                <p>Data: ${entry.date}</p>
                <img src="${entry.photo}" alt="Foto" width="100">
            `;
            historyList.appendChild(entryDiv);
        });
    }
}

// Atualizar histórico sempre que o filtro for alterado
document.getElementById('monthFilter').addEventListener('change', loadUserHistory);
