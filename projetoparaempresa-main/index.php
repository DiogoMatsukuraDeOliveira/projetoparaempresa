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
  <link rel="stylesheet" href="/css/styles.css">
  <!-- JS com defer -->
  <script src="/javascript/index.js" defer></script>
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="topo-icone">
        <a href="/admin.html">
          <img src="/img/icons8-administrador-masculino-50.png" alt="Administrador">
        </a>
      </div>
      <h1>Cadastro de Cambios</h1>
    </header>
    <main>
      <!-- Formulário -->
      <section class="card">
        <form id="dataForm" class="form-grid" novalidate>
          <div class="form-group">
            <label for="name">Nome</label>
            <select id="name" required>
              <option value="" disabled selected>Selecione o nome</option>
              <option value="Tiozinho">Tiozinho</option>
              <option value="Bruninho">Bruninho</option>
              <option value="Benzema">Benzema</option>
              <option value="Gabriel">Gabriel</option>
              <option value="Alisson">Alisson</option>
            </select>
          </div>
          <div class="form-group">
            <label for="model">Modelo</label>
            <select id="model" required>
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
            <input type="text" id="modelOtherInput" placeholder="Digite o modelo">
          </div>
          <div class="form-group">
            <label for="date">Data</label>
            <input type="date" id="date" required>
          </div>
          <div class="form-group">
            <label for="photo">Foto</label>
            <input type="file" id="photo" accept="image/*" capture required>
          </div>
          <div class="form-actions form-group-full">
            <!-- Aqui é submit -->
            <button type="submit" id="submitBtn" class="btn btn-primary">Cadastrar</button>
            <button type="button" id="historyBtn" class="btn btn-secondary">Acessar Histórico</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</body>
</html>
