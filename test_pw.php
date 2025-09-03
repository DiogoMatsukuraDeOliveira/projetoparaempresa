<?php
require __DIR__.'/db.php';
$pw = $_GET['pw'] ?? 'QdTpgt'; // troque aqui se quiser ou passe ?pw=...
$out = ['testando_pw' => $pw, 'bateu_com' => null];

$stmt = $conn->query("SELECT id, username, role, password FROM users WHERE role='user'");
while ($u = $stmt->fetch(PDO::FETCH_ASSOC)) {
  if (password_verify($pw, $u['password'])) {
    $out['bateu_com'] = $u['username'];
    break;
  }
}
header('Content-Type: application/json; charset=utf-8');
echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
