-- ============================================================================
-- CRÉATION DE LA BASE DE DONNÉES
-- ============================================================================

-- Supprimer la base si elle existe déjà (pour tests)
DROP DATABASE IF EXISTS phase02_runtrack3;

-- Créer la base de données
CREATE DATABASE phase02_runtrack3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser cette base
USE phase02_runtrack3;

-- ============================================================================
-- CRÉATION DE LA TABLE utilisateurs
-- ============================================================================

CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================================
-- INSERTION DE 10 UTILISATEURS
-- ============================================================================

INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com'),
('Martin', 'Sophie', 'sophie.martin@example.com'),
('Bernard', 'Pierre', 'pierre.bernard@example.com'),
('Dubois', 'Marie', 'marie.dubois@example.com'),
('Thomas', 'Luc', 'luc.thomas@example.com'),
('Robert', 'Claire', 'claire.robert@example.com'),
('Petit', 'Antoine', 'antoine.petit@example.com'),
('Richard', 'Emma', 'emma.richard@example.com'),
('Durand', 'Lucas', 'lucas.durand@example.com'),
('Leroy', 'Julie', 'julie.leroy@example.com');

-- Vérifier l'insertion
SELECT * FROM utilisateurs;