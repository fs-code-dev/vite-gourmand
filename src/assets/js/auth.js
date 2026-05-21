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

const appContainer = document.getElementById("app"); 

if (window.location.pathname === "/modifyUserInfo" || window.location.hash === "#modifyUserInfo") {
  if (appContainer) {
    appContainer.innerHTML = `
      <div class="hero-scene text-center text-white bg-dark py-5">
        <div class="hero-scene-content"><h1 class="fw-bold">Mes informations</h1></div>
      </div>
      <div class="container py-5" style="max-width: 800px;">
        <form id="modifyUserInfoForm" class="card shadow-sm border-0 p-4 mb-4 border-top border-4 border-primary">
          <div class="row g-3">
            <h5 class="fw-bold mb-3 border-bottom pb-2">Identité & Contact</h5>
            <div class="col-md-6">
              <label for="NomInput" class="form-label fw-bold">Nom</label>
              <input type="text" class="form-control" id="NomInput" placeholder="Votre nom" required>
            </div>
            <div class="col-md-6">
              <label for="PrenomInput" class="form-label fw-bold">Prénom</label>
              <input type="text" class="form-control" id="PrenomInput" placeholder="Votre prénom" required>
            </div>
            <div class="col-md-6">
              <label for="EmailInput" class="form-label fw-bold">Email</label>
              <input type="email" class="form-control" id="EmailInput" required>
            </div>
            <div class="col-md-6">
              <label for="GsmInput" class="form-label fw-bold">Téléphone (GSM)</label>
              <input type="tel" class="form-control" id="GsmInput" required>
            </div>
            <h5 class="fw-bold mb-3 mt-4 border-bottom pb-2">Adresse de livraison par défaut</h5>
            <div class="col-12">
              <label for="inputAddress" class="form-label fw-bold">Adresse</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="Numéro, nom de rue" required>
            </div>
            <div class="col-md-6">
              <label for="inputCity" class="form-label fw-bold">Ville</label>
              <input type="text" class="form-control" id="inputCity" required>
            </div>
            <div class="col-md-6">
              <label for="inputState" class="form-label fw-bold">Région</label>
              <select id="inputState" class="form-select" required>
                <option value="" selected disabled>Choisissez...</option>
                <option value="OCC">Occitanie</option>
                <option value="Autre">Autres</option>
              </select>
            </div>
            <div class="col-12 mt-4">
              <button type="submit" class="btn btn-primary w-100">Enregistrer les modifications</button>
            </div>
          </div>
        </form>
        <div class="d-flex justify-content-between pt-3 border-top">
          <a href="/userSpace" class="text-decoration-none">Retour à mon espace</a>
        </div>
      </div>
    `;
  }
}


const modifyUserInfoForm = document.getElementById("modifyUserInfoForm");
if (modifyUserInfoForm) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  
  if (document.getElementById("NomInput") && currentUser.lastname) document.getElementById("NomInput").value = currentUser.lastname;
  if (document.getElementById("PrenomInput") && currentUser.firstname) document.getElementById("PrenomInput").value = currentUser.firstname;
  if (document.getElementById("EmailInput") && currentUser.email) document.getElementById("EmailInput").value = currentUser.email;
  if (document.getElementById("GsmInput") && currentUser.phone) document.getElementById("GsmInput").value = currentUser.phone;

  modifyUserInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    
    if (document.getElementById("NomInput")) currentUser.lastname = document.getElementById("NomInput").value.trim();
    if (document.getElementById("PrenomInput")) currentUser.firstname = document.getElementById("PrenomInput").value.trim();
    if (document.getElementById("EmailInput")) currentUser.email = document.getElementById("EmailInput").value.trim();
    if (document.getElementById("GsmInput")) currentUser.phone = document.getElementById("GsmInput").value.trim();

    localStorage.setItem("user", JSON.stringify(currentUser));
    alert("Vos informations personnelles ont été mises à jour avec succès ! (Mode Démo).");
    
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
