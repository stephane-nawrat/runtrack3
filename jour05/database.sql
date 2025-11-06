-- ============================================================================
-- CRÉATION BASE DE DONNÉES ET TABLE
-- ============================================================================

-- Supprimer si existe
DROP DATABASE IF EXISTS phase02_projet;

-- Créer la base
CREATE DATABASE phase02_projet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utiliser la base
USE phase02_projet;

-- Créer la table utilisateurs
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Utilisateur de test (mot de passe : Test1234!)
INSERT INTO utilisateurs (nom, prenom, email, password) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Vérifier
SELECT * FROM utilisateurs;