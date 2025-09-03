<?php
// index.php
session_start();
require __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}

// opcional: pegar nome para exibir no topo
$username = $_SESSION['username'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro de Cambios</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/projetoparaempresa/css/styles.css">
  <script src="/projetoparaempresa/javascript/index.js" defer></script>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="topo-icone">
        <a href="admin.php"><img src="img/icons8-administrador-masculino-50.png" alt="Administrador"></a>
      </div>
      <h1>Cadastro de Cambios</h1>
      <div style="margin-left:auto;display:flex;gap:12px;align-items:center">
        <span>👋 <?= htmlspecialchars($username) ?></span>
        <a href="logout.php" class="btn btn-secondary">Sair</a>
      </div>
    </header>

    <main>
      <section class="card">
        <form id="dataForm" class="form-grid"
              action="insert_record.php"
              method="post"
              enctype="multipart/form-data"
              novalidate>

          <!-- REMOVIDO o campo Nome: o user vem da sessão -->

          <div class="form-group">
            <label for="model">Modelo</label>
            <select id="model" name="model" required>
              <option value="" disabled selected>Selecione o modelo</option>
              <option value="G5-1.6">G5 1.6</option>
              <option value="Fire-1.4">Fire 1.4</option>
              <option value="Fire-EVO">Fire Evo</option>
              <option value="AP">AP</option>
              <option value="Fusca">Fusca 8x31</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div class="form-group form-group-full" id="modelOther" style="display:none;">
            <label for="modelOtherInput">Especifique o Modelo</label>
            <input type="text" id="modelOtherInput" name="model_other" placeholder="Digite o modelo">
          </div>

          <div class="form-group">
            <label for="date">Data</label>
            <input type="date" id="date" name="date" required>
          </div>

          <div class="form-group">
            <label for="photo">Foto</label>
            <input type="file" id="photo" name="photo" accept="image/*" capture required>
          </div>

          <div class="form-actions form-group-full">
            <button type="submit" id="submitBtn" class="btn btn-primary">Cadastrar</button>
            <button type="button"
                    id="historyBtn"
                    class="btn btn-secondary"
                    onclick="window.location.href='history.php'">
              Acessar Histórico
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</body>
</html>
