<?php
$host = '127.0.0.1';
$db   = 'empresa';
$user = 'root';
$pass = 'root'; // padrão MAMP
$port = 8889;

$options = [
  PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4',
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
];

try {
  $conn = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass, $options);
} catch (PDOException $e) {
  die("Erro na conexão: " . $e->getMessage());
}
