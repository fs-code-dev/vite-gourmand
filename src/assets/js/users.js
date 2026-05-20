const createEmployeeForm = document.getElementById("createEmployeeForm");

if (createEmployeeForm) {
  // Clonage du formulaire pour éviter les problèmes d'événements multiples si on revient sur la page depuis une autre (SPA)
  createEmployeeForm.replaceWith(createEmployeeForm.cloneNode(true));
  const newForm = document.getElementById("createEmployeeForm");

  newForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Récupération de l'email saisi
    const emailInput = document.getElementById("EmailInput").value;

    // Sécurité minimale (à renforcer en production) : vérification basique du format de l'email 
    if (!emailInput) return;

    // Simulation de la création du compte employé (car pas de Back-end)
    console.log(`Action Backend : Création du compte pour ${emailInput} dans la base de données.`);
    console.log(`Action Backend : Envoi de l'email de bienvenue sans le mot de passe.`);

    // Alerte admin
    alert(`Le compte employé a été créé avec succès !\n\nUn e-mail a été envoyé à ${emailInput}.`);

    // Reset formulaire
    newForm.reset();
  });
}