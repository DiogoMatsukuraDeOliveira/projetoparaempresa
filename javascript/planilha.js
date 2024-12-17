let currentPage = 1; // Página atual
const entriesPerPage = 5; // Número de entradas por página

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const tableBody = document.querySelector('#historyTable tbody');
    const filterName = document.getElementById('filterName').value;
    const filterModel = document.getElementById('filterModel').value;
    const filterMonth = document.getElementById('filterMonth').value;
    const filterYear = document.getElementById('filterYear').value;

    // Limpa a tabela antes de adicionar os dados
    tableBody.innerHTML = '';

    // Filtra os dados com base nos filtros selecionados
    const filteredHistory = history.filter(entry => {
        const entryDate = new Date(entry.date);
        const entryMonth = String(entryDate.getMonth() + 1).padStart(2, '0');
        const entryYear = entryDate.getFullYear();

        const matchesName = filterName ? entry.name === filterName : true;
        const matchesModel = filterModel ? entry.model === filterModel : true;
        const matchesMonth = filterMonth ? entryMonth === filterMonth : true;
        const matchesYear = filterYear ? entryYear == filterYear : true;

        return matchesName && matchesModel && matchesMonth && matchesYear;
    });

    // Calcula o número total de páginas
    const totalPages = Math.ceil(filteredHistory.length / entriesPerPage);

    // Exibe os dados da página atual
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const pageData = filteredHistory.slice(startIndex, endIndex);

    // Exibe os dados da página
    pageData.forEach((entry, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = startIndex + index + 1; // ID numérico incremental

        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;

        const modelCell = document.createElement('td');
        modelCell.textContent = entry.model;

        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;

        const photoCell = document.createElement('td');
        const photoImage = document.createElement('img');
        photoImage.src = entry.photo;
        photoImage.alt = 'Foto do Cambio';
        photoImage.style.width = '100px'; // Ajuste o tamanho da imagem
        photoCell.appendChild(photoImage);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(modelCell);
        row.appendChild(dateCell);
        row.appendChild(photoCell);

        tableBody.appendChild(row);
    });

    // Atualiza a exibição da página
    document.getElementById('pageNumber').textContent = `Página ${currentPage} de ${totalPages}`;

    // Desabilita o botão de próxima página se estiver na última página
    document.getElementById('nextPage').disabled = currentPage === totalPages;

    // Desabilita o botão de página anterior se estiver na primeira página
    document.getElementById('prevPage').disabled = currentPage === 1;
}

function changePage(direction) {
    if (direction === 'next') {
        currentPage++;
    } else if (direction === 'prev') {
        currentPage--;
    }
    loadHistory();
}

document.getElementById('filterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    currentPage = 1; // Volta para a primeira página ao aplicar filtros
    loadHistory();
});

function removeById() {
    const removeId = parseInt(document.getElementById('removeId').value);
    if (isNaN(removeId)) return;

    let history = JSON.parse(localStorage.getItem('history')) || [];
    history = history.filter((entry, index) => index + 1 !== removeId); // Remove pela posição no array (ID = index + 1)

    localStorage.setItem('history', JSON.stringify(history));
    loadHistory();
}

// Carrega os dados ao carregar a página
window.onload = loadHistory;
