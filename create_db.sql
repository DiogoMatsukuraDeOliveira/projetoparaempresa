-- Cria o banco (ajuste se já existir)
CREATE DATABASE IF NOT EXISTS empresa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE empresa;

-- Tabela de usuários
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username  VARCHAR(100) NOT NULL,
  password  VARCHAR(255) NOT NULL,
  role      ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de registros (montagens)
DROP TABLE IF EXISTS records;
CREATE TABLE records (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    INT UNSIGNED NOT NULL,
  model      VARCHAR(120) NOT NULL,
  `date`     DATE NOT NULL,              -- data escolhida no formulário
  photo      VARCHAR(255) NULL,          -- nome do arquivo em /uploads
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- quando foi cadastrado
  PRIMARY KEY (id),
  KEY idx_records_user_id (user_id),
  KEY idx_records_date (date),
  CONSTRAINT fk_records_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
