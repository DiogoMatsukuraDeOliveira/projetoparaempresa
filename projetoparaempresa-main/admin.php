<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        /* Resetando margens e preenchimento */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Estilos gerais do body */
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }

        /* Estilos do contêiner de login */
        .login-container {
            text-align: center;
            padding: 30px;
            border: 2px solid #ccc;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        /* Estilos do título */
        h2 {
            margin-bottom: 20px;
            font-size: 20px;
            color: #333;
        }

        /* Estilos dos campos de input */
        input {
            width: 100%;
            padding: 12px;
            margin-bottom: 20px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
        }

        input:focus {
            border-color: #007bff;
        }

        /* Contêiner para os botões */
        .button-container {
            display: flex; /* Usando flexbox */
            justify-content: center; /* Alinha os botões no centro */
            gap: 10px; /* Espaço entre os botões */
        }

        /* Botões */
        button, #backButton {
            padding: 12px 20px;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            width: 120px;
        }

        button {
            background-color: #007bff;
            color: white;
            border: none;
        }

        button:hover {
            background-color: #0056b3;
        }

        #backButton {
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }

        #backButton:hover {
            background-color: #e53935;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Por favor, insira a senha para acessar a planilha</h2>
        <form id="loginForm">
            <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Senha" 
                autocomplete="current-password" 
                required
            >
            <div class="button-container">
                <button type="button" id="backButton" onclick="window.location.href='index.html'">Voltar</button>
                <button id="enterBtn">Entrar</button>
            </div>
        </form>
    </div>

    <script>
        // Senha para acessar a página
        const correctPassword = '2231';

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const password = document.getElementById('password').value;

            if (password === correctPassword) {
                window.location.href = 'planilha.html'; // Redireciona para a página de planilha
            } else {
                alert('Senha incorreta!');
            }
        });
    </script>
</body>
</html>
