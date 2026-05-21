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

    localStorage.setItem(
      "user",
      JSON.stringify({
        firstname: "User",
        lastname: "Test",
        email: "user@test.fr",
        phone: "0600000000",
      })
    );

    alert("Connexion réussie !");
    window.history.pushState({}, "", "/userspace");
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
    window.history.pushState({}, "", "/userspace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// ===== MODIFY USER INFO =====
const modifyUserInfoForm = document.getElementById("modifyUserInfoForm");

if (modifyUserInfoForm) {
  modifyUserInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Informations mises à jour !");
    window.history.pushState({}, "", "/userspace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
}