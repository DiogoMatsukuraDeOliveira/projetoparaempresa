function checkModel(select) {
    const modelOther = document.getElementById('modelOther');
    if (select.value === 'Outro') {
        modelOther.style.display = 'block';
        modelOther.required = true;
    } else {
        modelOther.style.display = 'none';
        modelOther.required = false;
    }
}

document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;  // Agora o nome vem do select
    const model =
        document.getElementById('model').value === 'Outro'
            ? document.getElementById('modelOtherInput').value
            : document.getElementById('model').value;
    const date = document.getElementById('date').value;
    const photo = document.getElementById('photo').files[0];

    if (name && model && date && photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const entry = {
                name: name,
                model: model,
                date: date,
                photo: event.target.result,
            };

            const history = JSON.parse(localStorage.getItem('history')) || [];
            history.push(entry);
            localStorage.setItem('history', JSON.stringify(history));

            alert('Dados salvos no histórico com sucesso!');
            document.getElementById('dataForm').reset();
        };
        reader.readAsDataURL(photo);
    }
});

const correctPassword = '2231'; // Defina a senha correta aqui

document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const password = document.getElementById('password').value;

    if (password === correctPassword) {
        // Ocultar o formulário de senha
        document.getElementById('passwordForm').style.display = 'none';
        
        // Mostrar o histórico
        const historyDiv = document.getElementById('history');
        historyDiv.style.display = 'block';

        // Recupera e exibe o histórico de funcionários
        const history = JSON.parse(localStorage.getItem('history')) || [];
        historyDiv.innerHTML = '';

        if (history.length === 0) {
            historyDiv.innerHTML = '<p>Nenhum dado no histórico.</p>';
        } else {
            history.forEach((entry) => {
                const entryDiv = document.createElement('div');
                entryDiv.innerHTML = `
                    <p>Nome: ${entry.name}</p>
                    <p>Modelo: ${entry.model}</p>
                    <p>Data: ${entry.date}</p>
                    <img src="${entry.photo}" alt="Foto" width="100">
                `;
                historyDiv.appendChild(entryDiv);
            });
        }
    } else {
        alert('Senha incorreta!');
    }
});
