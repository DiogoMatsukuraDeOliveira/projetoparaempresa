<?php
// insert_record.php
session_start();
require __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $user_id = $_SESSION['user_id']; // vem da sessão

  // Seleciona entre modelo padrão ou personalizado
  $model = $_POST['model'] === 'Outro' && !empty($_POST['model_other'])
           ? $_POST['model_other']
           : $_POST['model'];

  $date = $_POST['date'];

  // Upload da foto
  $photoFilename = null;
  if (!empty($_FILES['photo']['name']) && $_FILES['photo']['error'] === 0) {
    $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
    $photoFilename = uniqid('img_') . ".$ext";
    // garanta que a pasta exista
    if (!is_dir(__DIR__ . '/uploads')) { @mkdir(__DIR__ . '/uploads', 0775, true); }
    move_uploaded_file($_FILES['photo']['tmp_name'], __DIR__ . "/uploads/$photoFilename");
  }

  // Insere no banco
  $sql  = "INSERT INTO records (user_id, model, `date`, photo)
           VALUES (:u, :m, :d, :p)";
  $stmt = $conn->prepare($sql);
  $stmt->execute([
    ':u' => $user_id,
    ':m' => $model,
    ':d' => $date,
    ':p' => $photoFilename
  ]);

  header('Location: index.php?success=1');
  exit;
}
