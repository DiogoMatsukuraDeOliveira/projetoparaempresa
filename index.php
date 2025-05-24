<?php
// index.php
require 'db.php';
$stmt  = $conn->query("SELECT id, username FROM users WHERE role='user'");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro de Cambios</title>
  <!-- Fonte Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <!-- CSS -->
  <link rel="stylesheet" href="css/index.css">
  <!-- JS com defer -->
  <script src="javascript/index.js" defer></script>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="topo-icone">
        <a href="admin.php">
          <img src="img/icons8-administrador-masculino-50.png" alt="Administrador">
        </a>
      </div>
      <h1>Cadastro de Cambios</h1>
    </header>
    <main>
      <section class="card">
        <form id="dataForm" class="form-grid"
              action="insert_record.php"
              method="post"
              enctype="multipart/form-data"
              novalidate>

          <div class="form-group">
            <label for="name">Nome</label>
            <select id="name" name="user_id" required>
              <option value="" disabled selected>Selecione o nome</option>
              <?php foreach($users as $u): ?>
                <option value="<?= $u['id'] ?>">
                  <?= htmlspecialchars($u['username']) ?>
                </option>
              <?php endforeach; ?>
            </select>
          </div>

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
