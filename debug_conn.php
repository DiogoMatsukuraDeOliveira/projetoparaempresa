<?php
require __DIR__.'/db.php';
$info = $conn->query("SELECT DATABASE() AS db, @@port AS port")->fetch(PDO::FETCH_ASSOC);
$rows = $conn->query("SELECT COUNT(*) AS n FROM users")->fetch(PDO::FETCH_ASSOC);
var_dump($info, $rows);
