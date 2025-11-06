// ============================================================================
// VALIDATION EN TEMPS RÉEL ET ENVOI AJAX
// ============================================================================

// ============================================================================
// FONCTIONS DE VALIDATION
// ============================================================================

/**
 * Valider un prénom ou nom
 */
function validateName(value) {
  if (!value || value.trim() === "") {
    return "Ce champ est obligatoire";
  }
  if (value.length < 2) {
    return "Minimum 2 caractères";
  }
  if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
    return "Seules les lettres, espaces et tirets sont autorisés";
  }
  return null; // Pas d'erreur
}

/**
 * Valider un email
 */
function validateEmail(value) {
  if (!value || value.trim() === "") {
    return "Ce champ est obligatoire";
  }

  // Regex email simple mais efficace
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Format d'email invalide";
  }

  return null;
}

/**
 * Valider un mot de passe (complexité)
 */
function validatePassword(value) {
  if (!value || value.trim() === "") {
    return "Ce champ est obligatoire";
  }

  if (value.length < 8) {
    return "Au moins 8 caractères requis";
  }

  // Au moins une minuscule
  if (!/[a-z]/.test(value)) {
    return "Au moins une minuscule requise";
  }

  // Au moins une majuscule
  if (!/[A-Z]/.test(value)) {
    return "Au moins une majuscule requise";
  }

  // Au moins un chiffre
  if (!/[0-9]/.test(value)) {
    return "Au moins un chiffre requis";
  }

  // Au moins un caractère spécial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return "Au moins un caractère spécial requis (!@#$%^&*...)";
  }

  return null;
}

/**
 * Valider confirmation mot de passe
 */
function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Ce champ est obligatoire";
  }

  if (password !== confirmPassword) {
    return "Les mots de passe ne correspondent pas";
  }

  return null;
}

// ============================================================================
// AFFICHAGE DES ERREURS
// ============================================================================

/**
 * Afficher une erreur sous un champ
 */
function showError(fieldId, message) {
  const errorElement = document.getElementById(`error-${fieldId}`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement && message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    inputElement.classList.add("invalid");
    inputElement.classList.remove("valid");
  }
}

/**
 * Effacer l'erreur d'un champ
 */
function clearError(fieldId) {
  const errorElement = document.getElementById(`error-${fieldId}`);
  const inputElement = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = "";
    errorElement.style.display = "none";
    inputElement.classList.remove("invalid");
    inputElement.classList.add("valid");
  }
}

/**
 * Afficher un message global
 */
function showMessage(message, type = "error") {
  const messageElement = document.getElementById("form-message");
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.style.display = "block";
  }
}

/**
 * Effacer le message global
 */
function clearMessage() {
  const messageElement = document.getElementById("form-message");
  if (messageElement) {
    messageElement.style.display = "none";
  }
}

// ============================================================================
// FORMULAIRE D'INSCRIPTION
// ============================================================================

function initRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const prenomInput = document.getElementById("prenom");
  const nomInput = document.getElementById("nom");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");

  // ========================================================================
  // VALIDATION EN TEMPS RÉEL (pendant la saisie)
  // ========================================================================

  // Prénom
  prenomInput.addEventListener("blur", function () {
    const error = validateName(this.value);
    if (error) {
      showError("prenom", error);
    } else {
      clearError("prenom");
    }
  });

  // Nom
  nomInput.addEventListener("blur", function () {
    const error = validateName(this.value);
    if (error) {
      showError("nom", error);
    } else {
      clearError("nom");
    }
  });

  // Email (validation + vérification si existe déjà)
  emailInput.addEventListener("blur", function () {
    const error = validateEmail(this.value);
    if (error) {
      showError("email", error);
    } else {
      // Vérifier si l'email existe déjà (AJAX)
      fetch("api/check-email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            showError("email", "Cet email est déjà utilisé");
          } else {
            clearError("email");
          }
        });
    }
  });

  // Mot de passe
  passwordInput.addEventListener("input", function () {
    const error = validatePassword(this.value);
    if (error) {
      showError("password", error);
    } else {
      clearError("password");
    }

    // Re-valider la confirmation si déjà remplie
    if (confirmPasswordInput.value) {
      const confirmError = validateConfirmPassword(
        this.value,
        confirmPasswordInput.value
      );
      if (confirmError) {
        showError("confirm_password", confirmError);
      } else {
        clearError("confirm_password");
      }
    }
  });

  // Confirmation mot de passe
  confirmPasswordInput.addEventListener("input", function () {
    const error = validateConfirmPassword(passwordInput.value, this.value);
    if (error) {
      showError("confirm_password", error);
    } else {
      clearError("confirm_password");
    }
  });

  // ========================================================================
  // SOUMISSION DU FORMULAIRE (AJAX)
  // ========================================================================

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearMessage();

    // Valider tous les champs
    let hasErrors = false;

    const prenomError = validateName(prenomInput.value);
    if (prenomError) {
      showError("prenom", prenomError);
      hasErrors = true;
    }

    const nomError = validateName(nomInput.value);
    if (nomError) {
      showError("nom", nomError);
      hasErrors = true;
    }

    const emailError = validateEmail(emailInput.value);
    if (emailError) {
      showError("email", emailError);
      hasErrors = true;
    }

    const passwordError = validatePassword(passwordInput.value);
    if (passwordError) {
      showError("password", passwordError);
      hasErrors = true;
    }

    const confirmError = validateConfirmPassword(
      passwordInput.value,
      confirmPasswordInput.value
    );
    if (confirmError) {
      showError("confirm_password", confirmError);
      hasErrors = true;
    }

    // Si erreurs, arrêter
    if (hasErrors) {
      showMessage("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }

    // Désactiver le bouton pendant l'envoi
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Inscription en cours...";

    // Préparer les données
    const formData = {
      prenom: prenomInput.value.trim(),
      nom: nomInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    // Envoyer via AJAX
    fetch("api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showMessage(
            "Inscription réussie ! Redirection vers la page de connexion...",
            "success"
          );

          // Redirection après 2 secondes
          setTimeout(() => {
            window.location.href = "connexion.php";
          }, 2000);
        } else {
          // Afficher les erreurs
          if (data.errors) {
            Object.keys(data.errors).forEach((field) => {
              showError(field, data.errors[field]);
            });
          }

          showMessage(data.message || "Erreur lors de l'inscription", "error");
          submitBtn.disabled = false;
          submitBtn.textContent = "S'inscrire";
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        showMessage("Erreur de connexion au serveur", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "S'inscrire";
      });
  });
}

// ============================================================================
// FORMULAIRE DE CONNEXION
// ============================================================================

function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Validation simple à la perte de focus
  emailInput.addEventListener("blur", function () {
    const error = validateEmail(this.value);
    if (error) {
      showError("email", error);
    } else {
      clearError("email");
    }
  });

  passwordInput.addEventListener("blur", function () {
    if (!this.value) {
      showError("password", "Ce champ est obligatoire");
    } else {
      clearError("password");
    }
  });

  // Soumission du formulaire
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearMessage();

    // Validation
    let hasErrors = false;

    const emailError = validateEmail(emailInput.value);
    if (emailError) {
      showError("email", emailError);
      hasErrors = true;
    }

    if (!passwordInput.value) {
      showError("password", "Ce champ est obligatoire");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Désactiver le bouton
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Connexion en cours...";

    // Envoyer via AJAX
    fetch("api/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          showMessage("Connexion réussie ! Redirection...", "success");

          // Redirection
          setTimeout(() => {
            window.location.href = "index.php";
          }, 1000);
        } else {
          showMessage(
            data.message || "Email ou mot de passe incorrect",
            "error"
          );
          submitBtn.disabled = false;
          submitBtn.textContent = "Se connecter";
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        showMessage("Erreur de connexion au serveur", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = "Se connecter";
      });
  });
}

/* ============================================================================
PSEUDO-CODE COMPLET

FONCTION validateName(value)
    SI vide → erreur "obligatoire"
    SI < 2 caractères → erreur "minimum 2"
    SI caractères invalides → erreur "lettres uniquement"
    RETOURNER null (pas d'erreur)

FONCTION validateEmail(value)
    SI vide → erreur "obligatoire"
    SI format invalide → erreur "format email"
    RETOURNER null

FONCTION validatePassword(value)
    SI vide → erreur "obligatoire"
    SI < 8 caractères → erreur
    SI pas de minuscule → erreur
    SI pas de majuscule → erreur
    SI pas de chiffre → erreur
    SI pas de spécial → erreur
    RETOURNER null

FONCTION initRegisterForm
    Récupérer tous les inputs
    
    POUR chaque input
        Au blur → valider
        SI erreur → afficher
        SINON → effacer erreur
    
    Email : vérifier si existe (AJAX)
    
    À la soumission
        Valider tous les champs
        SI erreurs → arrêter
        Désactiver bouton
        Envoyer fetch POST api/register.php
        SI succès → rediriger connexion.php
        SINON → afficher erreurs

FONCTION initLoginForm
    Similaire mais plus simple
    Juste email + password
    Redirection vers index.php

============================================================================ */
