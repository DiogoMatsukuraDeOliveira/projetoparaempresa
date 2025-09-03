<?php
// update_users.php — atualiza nomes e senhas sem apagar records
require __DIR__ . '/db.php';

// mapeia usuarios antigos -> [novo_nome, senha_em_texto]
$map = [
  'Funcionario1' => ['Tiozinho',  'QdTpgt'],
  'Funcionario2' => ['Robson',    'T0btqs'],
  'Funcionario3' => ['Alisson',   '26PmQa'],
  'Funcionario4' => ['Benzema',   'BO8lBT'],
  'Funcionario5' => ['Bruno',     '3ocB9a'],
  'Funcionario6' => ['Gabriel',   'Za92n4'],
];

// garante que o admin exista e esteja correto (opcional)
$adminHash = password_hash('2231', PASSWORD_DEFAULT);
$conn->prepare("
  INSERT INTO users (username, password, role)
  VALUES ('Admin', :p, 'admin')
  ON DUPLICATE KEY UPDATE password = VALUES(password), role='admin'
")->execute([':p' => $adminHash]);

// para cada placeholder, atualiza o nome e a senha
$sel = $conn->prepare("SELECT id FROM users WHERE username = :old LIMIT 1");
$upd = $conn->prepare("UPDATE users SET username = :new, password = :pwd, role = 'user' WHERE id = :id");
$ins = $conn->prepare("INSERT INTO users (username, password, role) VALUES (:new, :pwd, 'user')");

foreach ($map as $old => [$new, $plain]) {
  $hash = password_hash($plain, PASSWORD_DEFAULT);

  $sel->execute([':old' => $old]);
  $row = $sel->fetch(PDO::FETCH_ASSOC);

  if ($row) {
    $upd->execute([':new' => $new, ':pwd' => $hash, ':id' => $row['id']]);
    echo "Atualizado: $old → $new\n";
  } else {
    // se não existe FuncionarioX (por já ter sido renomeado), garante inserção do novo
    $ins->execute([':new' => $new, ':pwd' => $hash]);
    echo "Inserido: $new\n";
  }
}

echo "Concluído.\n";
