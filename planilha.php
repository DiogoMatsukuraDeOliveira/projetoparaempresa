<?php
session_start();
require 'db.php';
if (!isset($_SESSION['admin_user'])) {
  header('Location: admin.php');
  exit;
}

$stmt = $conn->query("
  SELECT r.id, u.username, r.model, r.`date`, r.photo, r.created_at
  FROM records r
  JOIN users u ON u.id = r.user_id
  ORDER BY r.created_at DESC
");
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Histórico de Cambios</title>
  <link rel="stylesheet" href="css/planilha.css"/>
</head>
<body>
  <a id="backButton" href="index.php" aria-label="Voltar">Voltar</a>
  
  <div class="container">
    <h1>Histórico de Cambios</h1>

    <section class="card" id="filters">
      <form id="filterForm">
        <label for="filterName">Nome:</label>
        <select id="filterName">
          <option value="">Todos</option>
          <?php 
            $names = array_unique(array_map(fn($r)=>$r['username'],$records));
            sort($names);
            foreach($names as $n): ?>
              <option value="<?= htmlspecialchars($n) ?>"><?= htmlspecialchars($n) ?></option>
          <?php endforeach; ?>
        </select>

        <label for="filterModel">Modelo:</label>
        <select id="filterModel">
          <option value="">Todos</option>
          <?php 
            $mods = array_unique(array_map(fn($r)=>$r['model'],$records));
            sort($mods);
            foreach($mods as $m): ?>
              <option value="<?= htmlspecialchars($m) ?>"><?= htmlspecialchars($m) ?></option>
          <?php endforeach; ?>
        </select>

        <div id="filterModelOtherContainer" style="display:none;">
          <label for="filterModelOther">Digite o modelo:</label>
          <input type="text" id="filterModelOther" placeholder="Modelo personalizado"/>
        </div>

        <label for="filterDay">Dia:</label>
        <select id="filterDay">
          <option value="">Todos</option>
          <?php for($d=1;$d<=31;$d++): 
            $dv = str_pad($d,2,'0',STR_PAD_LEFT); ?>
            <option value="<?= $dv ?>"><?= $d ?></option>
          <?php endfor; ?>
        </select>

        <label for="filterMonth">Mês:</label>
        <select id="filterMonth">
          <option value="">Todos</option>
          <?php for($m=1;$m<=12;$m++):
            $mv = str_pad($m,2,'0',STR_PAD_LEFT);
            $mn = DateTime::createFromFormat('!m',$mv)->format('F');
          ?>
            <option value="<?= $mv ?>"><?= $mn ?></option>
          <?php endfor; ?>
        </select>

        <label for="filterYear">Ano:</label>
        <input type="number" id="filterYear" placeholder="Ano" min="2000" max="2100"/>

        <button type="button" id="clearFiltersBtn">Remover Filtros</button>
      </form>
    </section>

    <div class="table-wrapper">
      <table id="historyTable">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Modelo</th><th>Data</th><th>Foto</th><th>Cadastrado Em</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach($records as $r): ?>
            <tr data-name="<?= htmlspecialchars($r['username']) ?>"
                data-model="<?= htmlspecialchars($r['model']) ?>"
                data-day="<?= date('d',strtotime($r['date'])) ?>"
                data-month="<?= date('m',strtotime($r['date'])) ?>"
                data-year="<?= date('Y',strtotime($r['date'])) ?>">
              <td><?= $r['id'] ?></td>
              <td><?= htmlspecialchars($r['username']) ?></td>
              <td><?= htmlspecialchars($r['model']) ?></td>
              <td><?= $r['date'] ?></td>
              <td>
                <?php if($r['photo']): ?>
                  <img src="uploads/<?= $r['photo'] ?>" width="40">
                <?php endif; ?>
              </td>
              <td><?= $r['created_at'] ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <div id="pagination">
      <button id="prevPage">Anterior</button>
      <span id="pageNumber">Página 1</span>
      <button id="nextPage">Próxima</button>
    </div>
  </div>

  <script src="javascript/planilha.js"></script>
</body>
</html>
