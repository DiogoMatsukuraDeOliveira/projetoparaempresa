<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
  $pw   = $_POST['password'];
  $stmt = $conn->prepare("SELECT id,password FROM users WHERE role='admin'");
  $stmt->execute();
  $u = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($u && password_verify($pw, $u['password'])) {
    $_SESSION['admin_user'] = $u['id'];
    header('Location: planilha.php');
    exit;
  }
  $error = "Senha de administrador inválida";
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
  <style>
    /* (copie aqui seu CSS de admin.html) */
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;background:#f4f4f4}
    .login-container{text-align:center;padding:30px;border:2px solid #ccc;border-radius:10px;background:#fff;box-shadow:0 4px 8px rgba(0,0,0,0.1);max-width:400px;width:100%}
    h2{margin-bottom:20px;color:#333}
    input{width:100%;padding:12px;margin-bottom:20px;font-size:16px;border:1px solid #ccc;border-radius:5px;outline:none}
    input:focus{border-color:#007bff}
    .button-container{display:flex;justify-content:center;gap:10px}
    button,#backButton{padding:12px 20px;font-size:16px;border:none;border-radius:5px;cursor:pointer;width:120px}
    button{background:#007bff;color:#fff}
    button:hover{background:#0056b3}
    #backButton{background:#f44336}
    #backButton:hover{background:#e53935}
    .error{color:red;margin-bottom:10px;}
  </style>
</head>
<body>
  <div class="login-container">
    <h2>Por favor, insira a senha para acessar a planilha</h2>
    <?php if (!empty($error)): ?>
      <p class="error"><?= $error ?></p>
    <?php endif; ?>
    <form method="post" id="loginForm">
      <input
        type="password"
        name="password"
        placeholder="Senha"
        autocomplete="current-password"
        required
      >
      <div class="button-container">
        <button type="button" id="backButton" onclick="window.location.href='index.php'">Voltar</button>
        <button type="submit">Entrar</button>
      </div>
    </form>
  </div>
</body>
</html>
