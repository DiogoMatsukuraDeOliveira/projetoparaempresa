<?php
// history.php — mostra o histórico do usuário logado (sem segundo login)
session_start();
require __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}

$user_id  = $_SESSION['user_id'];
$username = $_SESSION['username'] ?? 'Usuário';

$stmt = $conn->prepare("
  SELECT id, model, `date`, photo, created_at
  FROM records
  WHERE user_id = :uid
  ORDER BY created_at DESC
");
$stmt->execute([':uid' => $user_id]);
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);

// opções de filtros
$years  = array_unique(array_map(fn($r)=>date('Y', strtotime($r['date'])), $records));
sort($years);
$models = array_unique(array_map(fn($r)=>$r['model'], $records));
sort($models);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Histórico de Cambios</title>
  <!-- cache-bust para evitar CSS antigo em cache -->
  <link rel="stylesheet" href="/projetoparaempresa/css/history2.css?v=<?php echo time(); ?>">
</head>
<body>
  <header class="header">
    <div class="left">
      <button id="globalBackBtn" onclick="window.location.href='index.php'">← Voltar</button>
      <h1>Histórico de Cambios</h1>
    </div>
    <div class="right">
      <span class="hello">👋 <?= htmlspecialchars($username) ?></span>
      <a class="logout" href="logout.php">Sair</a>
    </div>
  </header>

  <div id="toggleFiltersContainer">
    <button id="toggleFiltersBtn">Mostrar Filtros</button>
  </div>

  <section id="filters">
    <label for="yearFilter">Ano</label>
    <select id="yearFilter">
      <option value="">Todos</option>
      <?php foreach ($years as $y): ?>
        <option value="<?= $y ?>"><?= $y ?></option>
      <?php endforeach; ?>
    </select>

    <label for="monthFilter">Mês</label>
    <select id="monthFilter">
      <option value="">Todos</option>
      <?php for ($m=1; $m<=12; $m++):
        $mv = str_pad($m, 2, '0', STR_PAD_LEFT);
        $mn = DateTime::createFromFormat('!m', $mv)->format('F');
      ?>
        <option value="<?= $mv ?>"><?= $mn ?></option>
      <?php endfor; ?>
    </select>

    <label for="dayFilter">Dia</label>
    <select id="dayFilter">
      <option value="">Todos</option>
      <?php for ($d=1; $d<=31; $d++):
        $dv = str_pad($d, 2, '0', STR_PAD_LEFT); ?>
        <option value="<?= $dv ?>"><?= $d ?></option>
      <?php endfor; ?>
    </select>

    <label for="modelFilter">Modelo</label>
    <select id="modelFilter">
      <option value="">Todos</option>
      <?php foreach ($models as $m): ?>
        <option value="<?= htmlspecialchars($m) ?>"><?= htmlspecialchars($m) ?></option>
      <?php endforeach; ?>
    </select>
  </section>

  <main id="historyContent">
    <h2>Conteúdo do Histórico (<?= count($records) ?>)</h2>

    <?php if (empty($records)): ?>
      <p class="empty">Nenhum registro encontrado para você ainda.</p>
    <?php else: ?>
      <div id="historyList">
        <?php foreach ($records as $r):
          $Y = date('Y', strtotime($r['date']));
          $M = date('m', strtotime($r['date']));
          $D = date('d', strtotime($r['date']));
          $modelSafe = htmlspecialchars($r['model']);
          $dateSafe  = htmlspecialchars($r['date']);
        ?>
          <div class="history-item"
               data-year="<?= $Y ?>"
               data-month="<?= $M ?>"
               data-day="<?= $D ?>"
               data-model="<?= $modelSafe ?>">

            <div class="image-wrap">
              <?php if (!empty($r['photo'])): ?>
                <img src="uploads/<?= htmlspecialchars($r['photo']) ?>" alt="foto">
              <?php else: ?>
                <div class="no-photo">Sem foto</div>
              <?php endif; ?>
            </div>

            <div class="meta">
              <div class="id">#<?= (int)$r['id'] ?></div>
              <div class="model"><?= $modelSafe ?></div>
              <div class="date"><?= $dateSafe ?></div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </main>

  <script src="/projetoparaempresa/javascript/history.js" defer></script>
</body>
</html>
