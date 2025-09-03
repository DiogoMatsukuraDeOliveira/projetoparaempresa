<?php
// seed_users.php — reset total e semeadura de users
require __DIR__ . '/db.php';

try {
  // 1) limpar na ordem correta por causa da FK (records -> users)
  $conn->exec("DELETE FROM records");
  $conn->exec("DELETE FROM users");
  $conn->exec("ALTER TABLE users AUTO_INCREMENT = 1");

  // 2) lista de usuários (senha em texto será hasheada)
  $users = [
    ['Admin',        'admin', '2231'],
    ['Funcionario1', 'user',  'QdTpgt'],
    ['Funcionario2', 'user',  'T0btqs'],
    ['Funcionario3', 'user',  '26PmQa'],
    ['Funcionario4', 'user',  'BO8lBT'],
    ['Funcionario5', 'user',  '3ocB9a'],
    ['Funcionario6', 'user',  'Za92n4'],
  ];

  // 3) inserir
  $stmt = $conn->prepare(
    "INSERT INTO users (username, password, role)
     VALUES (:u, :p, :r)"
  );

  foreach ($users as [$username, $role, $plain]) {
    $hash = password_hash($plain, PASSWORD_DEFAULT);
    $stmt->execute([
      ':u' => $username,
      ':p' => $hash,
      ':r' => $role,
    ]);
  }

  echo "Reset feito e usuários inseridos com sucesso.\n";
} catch (PDOException $e) {
  echo "Erro: " . $e->getMessage() . "\n";
}