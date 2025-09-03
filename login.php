<?php
// login.php
session_start();
require __DIR__ . '/db.php';

// já logado? vai pro index
if (isset($_SESSION['user_id'])) {
  header('Location: index.php');
  exit;
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = trim($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';

  if ($username !== '' && $password !== '') {
    $stmt = $conn->prepare("SELECT id, username, password, role FROM users WHERE username = :u LIMIT 1");
    $stmt->execute([':u' => $username]);
    $u = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($u && $u['role'] === 'user' && password_verify($password, $u['password'])) {
      $_SESSION['user_id']   = $u['id'];
      $_SESSION['username']  = $u['username'];
      $_SESSION['user_role'] = 'user';
      header('Location: index.php');
      exit;
    } else {
      $error = 'Usuário ou senha inválidos';
    }
  } else {
    $error = 'Preencha usuário e senha';
  }
}

// carrega nomes só para sugestão (datalist)
$users = $conn->query("SELECT username FROM users WHERE role='user' ORDER BY username")->fetchAll(PDO::FETCH_COLUMN);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
  <link rel="stylesheet" href="/projetoparaempresa/css/styles.css">
  <style>
    body{
      font-family:'Inter',sans-serif;background:#f4f4f4;margin:0;padding:0;
      display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;
    }
    .login-card{max-width:420px;width:100%;background:#fff;padding:24px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,.1)}
    .login-card h1{margin:0 0 16px;text-align:center;color:#333}
    .login-card label{display:block;margin-top:12px;margin-bottom:4px;color:#333;font-weight:600}
    .login-card input{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font-size:14px}
    .login-card button{width:100%;margin-top:16px;padding:12px;font-size:16px;border:none;border-radius:6px;background:#0b67ff;color:#fff;cursor:pointer}
    .login-card button:hover{background:#0056b3}
    .error{color:#d00;margin-top:8px}
    .admin-link{margin-top:16px;text-align:center}
    .admin-link a{color:#0b67ff;text-decoration:none;font-weight:600}
    .admin-link a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="login-card">
    <h1>Entrar</h1>

    <?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>

    <form method="post" autocomplete="on">
      <label for="username">Usuário</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Digite seu usuário"
        list="usernames"
        required
        autocomplete="username"
        autocapitalize="none"
        autocorrect="off"
        spellcheck="false"
        inputmode="text"
      >
      <datalist id="usernames">
        <?php foreach ($users as $u): ?>
          <option value="<?= htmlspecialchars($u) ?>"></option>
        <?php endforeach; ?>
      </datalist>

      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        required
        autocomplete="current-password"
      >

      <button type="submit">Entrar</button>
    </form>

    <div class="admin-link">
      <a href="admin.php">Sou administrador</a>
    </div>
  </div>

  <script>
    // foco no usuário para facilitar o autofill
    document.getElementById('username')?.focus();
  </script>
</body>
</html>
