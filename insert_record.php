<?php
// insert_record.php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $user_id = $_POST['user_id'];

  // Seleciona entre modelo padrão ou personalizado
  $model = $_POST['model'] === 'Outro' && !empty($_POST['model_other'])
           ? $_POST['model_other']
           : $_POST['model'];

  $date = $_POST['date'];

  // Faz upload da foto
  $photoFilename = null;
  if (!empty($_FILES['photo']['name']) && $_FILES['photo']['error'] === 0) {
    $ext = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
    $photoFilename = uniqid('img_') . ".$ext";
    move_uploaded_file(
      $_FILES['photo']['tmp_name'],
      __DIR__ . "/uploads/$photoFilename"
    );
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
