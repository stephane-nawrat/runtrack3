<?php
// ============================================================================
// API : DÉCONNEXION
// ============================================================================

require_once '../config/database.php';

header('Content-Type: application/json');

// Détruire la session
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Déconnexion réussie'
]);
