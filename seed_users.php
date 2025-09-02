<?php
// seed_users.php
require __DIR__ . '/db.php';

$users = [
  // username,   role,    senha_em_texto
  ['Admin',      'admin', '2231'],
  ['Funcionario1','user', 'QdTpgt'],
  ['Funcionario2','user', 'T0btqs'],
  ['Funcionario3','user', '26PmQa'],
  ['Funcionario4','user', 'BO8lBT'],
  ['Funcionario5','user', '3ocB9a'],
  ['Funcionario6','user', 'Za92n4'],
];

$sql = "INSERT INTO users (username, password, role)
        VALUES (:u, :p, :r)
        ON DUPLICATE KEY UPDATE
          password = VALUES(password),
          role     = VALUES(role)";

$stmt = $conn->prepare($sql);

foreach ($users as [$username, $role, $plain]) {
  $hash = password_hash($plain, PASSWORD_DEFAULT);
  $stmt->execute([
    ':u' => $username,
    ':p' => $hash,
    ':r' => $role
  ]);
}

echo "Usuários semeados com sucesso.\n";
echo "Login admin: username=Admin, senha=2231\n";
echo "Funcionários: Funcionario1..6, senhas conforme o script.\n";
