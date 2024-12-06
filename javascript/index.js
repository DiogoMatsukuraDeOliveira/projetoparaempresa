function checkModel(select) {
    const modelOtherDiv = document.getElementById('modelOther');
    const modelOtherInput = document.getElementById('modelOtherInput');

    if (select.value === 'Outro') {
        modelOtherDiv.style.display = 'block';
        modelOtherInput.setAttribute('required', 'required');
    } else {
        modelOtherDiv.style.display = 'none';
        modelOtherInput.removeAttribute('required');
    }
}

function saveToLocalStorage(entry) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const modelSelect = document.getElementById('model').value;
    const model =
        modelSelect === 'Outro'
            ? document.getElementById('modelOtherInput').value
            : modelSelect;
    const date = document.getElementById('date').value;
    const photoFile = document.getElementById('photo').files[0];

    if (name && model && date && photoFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const entry = {
                name,
                model,
                date,
                photo: event.target.result,
            };

            saveToLocalStorage(entry);
            alert('Dados salvos no histórico com sucesso!');
            document.getElementById('dataForm').reset();
            document.getElementById('modelOther').style.display = 'none';
        };
        reader.readAsDataURL(photoFile);
    }
}

document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
