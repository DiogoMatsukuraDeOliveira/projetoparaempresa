<?php
session_start();
require 'db.php';

// → LOGIN DO FUNCIONÁRIO
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
  $pw   = $_POST['password'];
  $stmt = $conn->query("SELECT id,password FROM users WHERE role='user'");
  foreach ($stmt->fetchAll() as $u) {
    if (password_verify($pw, $u['password'])) {
      $_SESSION['history_user'] = $u['id'];
      header('Location: history.php');
      exit;
    }
  }
  $error = "Senha inválida";
}

// se não logado, mostra form
if (!isset($_SESSION['history_user'])): ?>
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Histórico de Cambios</title>
    <link rel="stylesheet" href="css/history.css">
  </head>
  <body>
    <h1>Histórico de Cambios</h1>
    <?php if (!empty($error)): ?>
      <p class="error"><?= $error ?></p>
    <?php endif; ?>

    <div id="passwordForm">
      <label for="password">Digite a senha para acessar o histórico:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        autocomplete="current-password"
        required
      >
      <div id="buttonContainer">
        <button id="backBtn" onclick="window.location.href='index.php'">Voltar</button>
        <button id="enterBtn">Entrar</button>
      </div>
    </div>

    <script src="javascript/history.js"></script>
  </body>
  </html>
<?php exit; endif;

// → JÁ AUTENTICADO: BUSCA REGISTROS
$user_id = $_SESSION['history_user'];
$stmt = $conn->prepare("
  SELECT id, model, `date`, photo
  FROM records
  WHERE user_id = :uid
  ORDER BY created_at DESC
");
$stmt->execute([':uid' => $user_id]);
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Histórico de Cambios</title>
  <link rel="stylesheet" href="css/history.css">
</head>
<body>
  <h1>Histórico de Cambios</h1>

  <button id="globalBackBtn" onclick="window.location.href='index.php'">
    ← Voltar
  </button>

  <div id="toggleFiltersContainer">
    <button id="toggleFiltersBtn">Mostrar Filtros</button>
  </div>

  <div id="filters" style="display:none;">
    <label for="yearFilter">Ano:</label>
    <select id="yearFilter">
      <option value="">Todos</option>
      <?php 
        $years = array_unique(array_map(fn($r)=>date('Y',strtotime($r['date'])),$records));
        sort($years);
        foreach($years as $y): ?>
          <option value="<?= $y ?>"><?= $y ?></option>
      <?php endforeach; ?>
    </select>

    <label for="monthFilter">Mês:</label>
    <select id="monthFilter">
      <option value="">Todos</option>
      <?php for($m=1;$m<=12;$m++): 
        $mv = str_pad($m,2,'0',STR_PAD_LEFT); ?>
        <option value="<?= $mv ?>"><?= DateTime::createFromFormat('!m',$mv)->format('F') ?></option>
      <?php endfor; ?>
    </select>

    <label for="dayFilter">Dia:</label>
    <select id="dayFilter">
      <option value="">Todos</option>
      <?php for($d=1;$d<=31;$d++):
        $dv = str_pad($d,2,'0',STR_PAD_LEFT); ?>
        <option value="<?= $dv ?>"><?= $d ?></option>
      <?php endfor; ?>
    </select>

    <label for="modelFilter">Modelo:</label>
    <select id="modelFilter">
      <option value="">Todos</option>
      <?php 
        $models = array_unique(array_map(fn($r)=>$r['model'],$records));
        sort($models);
        foreach($models as $m): ?>
          <option value="<?= htmlspecialchars($m) ?>"><?= htmlspecialchars($m) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div id="historyContent">
    <h2>Conteúdo do Histórico</h2>
    <div id="historyList">
      <?php foreach($records as $r): 
        $Y = date('Y', strtotime($r['date']));
        $M = date('m', strtotime($r['date']));
        $D = date('d', strtotime($r['date']));
      ?>
        <div class="history-item"
             data-year="<?= $Y ?>"
             data-month="<?= $M ?>"
             data-day="<?= $D ?>"
             data-model="<?= htmlspecialchars($r['model']) ?>">
          <strong>#<?= $r['id'] ?></strong>
          — <?= htmlspecialchars($r['model']) ?>
          (<?= $r['date'] ?>)
          <?php if($r['photo']): ?>
            <img src="uploads/<?= $r['photo'] ?>" width="40">
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <script src="javascript/history.js"></script>
</body>
</html>
