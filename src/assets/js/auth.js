export function initAuth() {

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

// ===== SIGNUP =====
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const passwordInput = document.getElementById("PasswordInput");
    const validatePasswordInput = document.getElementById("ValidatePasswordInput");
    const passwordError = document.getElementById("passwordError");

    const password = passwordInput.value;
    const confirm = validatePasswordInput.value;

    if (password !== confirm) {
      passwordError.textContent = "Les mots de passe ne correspondent pas.";
      passwordError.classList.remove("d-none");
      return;
    }

    if (!passwordRegex.test(password)) {
      passwordError.textContent =
        "Mot de passe invalide (10 caractères, majuscule, minuscule, chiffre, spécial).";
      passwordError.classList.remove("d-none");
      return;
    }

    passwordError.classList.add("d-none");

    alert("Compte créé avec succès !");
 
    window.history.pushState({}, "", "/signin");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// ===== SIGNIN =====
const signinForm = document.getElementById("signinForm");

if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("EmailInput") || document.getElementById("email");
    const passwordInput = document.getElementById("PasswordInput") || document.getElementById("password");
    
    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    // SIMULATION : Connexion de l'Administrateur
    if (email === "admin@vitegourmand.fr" || email === "admin@vite-gourmand.fr") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 1,
          firstname: "Directeur",
          lastname: "Admin",
          email: email,
          phone: "0561000000",
          role: "admin"
        })
      );
      alert("Connexion réussie en tant qu'Administrateur !");
      
      window.history.pushState({}, "", "/adminSpace"); 
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

    // Connexion par défaut pour le Client de Test
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 2,
        firstname: "User",
        lastname: "Test",
        email: email || "user@test.fr",
        phone: "0600000000",
        role: "client"
      })
    );

    alert("Connexion réussie !");
   
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// ===== EDIT PASSWORD =====
const editPasswordForm = document.getElementById("editPasswordForm");

if (editPasswordForm) {
  editPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const passwordInput = document.getElementById("PasswordInput");
    const validatePasswordInput = document.getElementById("ValidatePasswordInput");
    const passwordError = document.getElementById("passwordError");

    const password = passwordInput.value;
    const confirm = validatePasswordInput.value;

    if (password !== confirm) {
      passwordError.textContent = "Les mots de passe ne correspondent pas.";
      passwordError.classList.remove("d-none");
      return;
    }

    if (!passwordRegex.test(password)) {
      passwordError.textContent = "Mot de passe invalide.";
      passwordError.classList.remove("d-none");
      return;
    }

    passwordError.classList.add("d-none");

    alert("Mot de passe modifié !");
    
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// ===== MODIFY USER INFO =====
const modifyUserInfoForm = document.getElementById("modifyUserInfoForm");

if (modifyUserInfoForm) {
  modifyUserInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    
    const fInput = document.getElementById("firstname");
    const lInput = document.getElementById("lastname");
    const pInput = document.getElementById("phone");

    if (fInput) currentUser.firstname = fInput.value;
    if (lInput) currentUser.lastname = lInput.value;
    if (pInput) currentUser.phone = pInput.value;

    localStorage.setItem("user", JSON.stringify(currentUser));

    alert("Informations mises à jour !");
    
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
}