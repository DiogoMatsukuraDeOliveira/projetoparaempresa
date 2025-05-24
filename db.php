<?php
// db.php
$host    = 'localhost';
$db      = 'empresa';
$user    = 'root';
$pass    = ''; // sua senha no MySQL
$options = [
  PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
];
try {
  $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, $options);
} catch (PDOException $e) {
  die("Erro na conexão: " . $e->getMessage());
}
