export function initAuth() {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  // Gestion de l'inscription
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const password = document.getElementById("PasswordInput")?.value;
      const confirm = document.getElementById("ValidatePasswordInput")?.value;
      const passwordError = document.getElementById("passwordError");

      if (password !== confirm) {
        passwordError.textContent = "Les mots de passe ne correspondent pas.";
        passwordError.classList.remove("d-none");
        return;
      }

      if (!passwordRegex.test(password)) {
        passwordError.textContent = "Le mot de passe doit contenir 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.";
        passwordError.classList.remove("d-none");
        return;
      }

      passwordError.classList.add("d-none");
      alert("Compte créé avec succès !");
 
      window.history.pushState({}, "", "/signin");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }

  // Gestion de la connexion
  const signinForm = document.getElementById("signinForm");
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("EmailInput") || document.getElementById("email");
      const passwordInput = document.getElementById("PasswordInput") || document.getElementById("password");
    
      const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
      const password = passwordInput ? passwordInput.value : "";
      const passwordError = document.getElementById("passwordError");

      // Compte d'administration pour la démonstration
      if (email === "anastasientsame@vitegourmand.fr" && password === "Ntsame_33@!") {
        localStorage.setItem("user", JSON.stringify({
          id: 1,
          firstname: "Anastasie",
          lastname: "NTSAME",
          email: email,
          phone: "0570000000",
          role: "admin"
        }));
        
        alert("Connexion réussie (Espace Administration).");
        window.history.pushState({}, "", "/adminSpace"); 
        window.dispatchEvent(new PopStateEvent("popstate"));
        return;
      }

      // Compte employé pour la démonstration
      if (email === "landry.ella@viteetgourmand.fr" && password === "Landry_31@!") {
        localStorage.setItem("user", JSON.stringify({
          id: 3,
          firstname: "Landry",
          lastname: "ELLA",
          email: email,
          phone: "0643000000",
          role: "employe"
        }));
        
        alert("Connexion réussie (Espace Employé).");
        window.history.pushState({}, "", "/employeSpace"); 
        window.dispatchEvent(new PopStateEvent("popstate"));
        return;
      }

      // Compte client par défaut pour la démonstration
      if (email && password.length >= 6) {
        localStorage.setItem("user", JSON.stringify({
          id: 2,
          firstname: "Lya",
          lastname: "STL",
          email: email || "lya.stl@test.fr",
          phone: "0600000000",
          role: "client"
        }));

        alert("Connexion réussie !");
        window.history.history.pushState({}, "", "/userSpace");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        alert("Identifiants invalides pour la démo.");
      }
    });
  }
}

// Modification du mot de passe
const editPasswordForm = document.getElementById("editPasswordForm");
if (editPasswordForm) {
  editPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mot de passe mis à jour.");
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// Mise à jour des informations de profil
const modifyUserInfoForm = document.getElementById("modifyUserInfoForm");
if (modifyUserInfoForm) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  
  if (document.getElementById("NomInput") && currentUser.lastname) document.getElementById("NomInput").value = currentUser.lastname;
  if (document.getElementById("PrenomInput") && currentUser.firstname) document.getElementById("PrenomInput").value = currentUser.firstname;
  if (document.getElementById("EmailInput") && currentUser.email) document.getElementById("EmailInput").value = currentUser.email;
  if (document.getElementById("GsmInput") && currentUser.phone) document.getElementById("GsmInput").value = currentUser.phone;

  modifyUserInfoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    currentUser.lastname = document.getElementById("NomInput")?.value.trim() || "";
    currentUser.firstname = document.getElementById("PrenomInput")?.value.trim() || "";
    currentUser.email = document.getElementById("EmailInput")?.value.trim() || "";
    currentUser.phone = document.getElementById("GsmInput")?.value.trim() || "";
   
    localStorage.setItem("user", JSON.stringify(currentUser));
    alert("Profil mis à jour.");
    
    window.history.pushState({}, "", "/userSpace");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}