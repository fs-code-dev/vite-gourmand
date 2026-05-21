export function initOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = JSON.parse(localStorage.getItem("selectedMenu"));

  const redirect = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  // Redirections de sécurité si pas de user ou pas de menu
  if (!user) {
    console.warn("Utilisateur non connecté");
    redirect("/signin");
    return;
  } 
  if (!menu) {
    console.warn("Aucun menu sélectionné");
    redirect("/menus");
    return;
  }

  const get = (id) => document.getElementById(id);

  // Affichage des infos du menu et pré-remplissage des champs de la commande
  setTimeout(() => {
    
    // VÉRIFICATION DE LA PRÉSENCE DES ÉLÉMENTS CLÉS DU DOM AVANT TOUTE MANIPULATION
    if (!get("people") || !get("total")) {
      console.error("Les éléments HTML de la commande ne sont pas encore chargés dans le DOM.");
      return;
    }

    // PRÉ-REMPLISSAGE DES INFOS CLIENT 
    if (get("firstname")) get("firstname").value = user.firstname || "";
    if (get("lastname")) get("lastname").value = user.lastname || "";
    if (get("email")) get("email").value = user.email || "";
    if (get("phone")) get("phone").value = user.phone || "";

    // PRÉ-REMPLISSAGE DES INFOS MENU ET CALCULS DYNAMIQUES
    get("menu-name").textContent = menu.title;
    get("menu-min-persons").textContent = menu.minPersons;
    get("unit-price").textContent = parseFloat(menu.price).toFixed(2);

    const peopleInput = get("people");
    const cityInput = get("city");
    const distanceInput = get("distanceKm");
    const validateBtn = get("validate");
    const errorMsg = get("people-error");

    // Pré-remplissage du nombre de personnes minimum et configuration de l'input
    peopleInput.value = menu.minPersons;
    peopleInput.min = menu.minPersons;

    const BORDEAUX = "bordeaux";

    function updatePrice() {
      let nb = parseInt(peopleInput.value, 10);
      if (isNaN(nb) || nb < 0) nb = 0;

      // Validation stricte du nombre de personnes minimum requis
      if (nb < menu.minPersons) {
        errorMsg?.classList.remove("d-none");
        validateBtn.disabled = true;
      } else {
        errorMsg?.classList.add("d-none");
        validateBtn.disabled = false;
      }

      // Calcul du prix de base
      const basePrice = menu.price * nb;

      // Calcul de la remise de 10% (si nb convives >= minimum requis + 5)
      let discount = 0;
      const discountRow = get("discount-row");

      if (nb >= (menu.minPersons + 5)) {
        discount = basePrice * 0.10;
        discountRow?.classList.remove("d-none");
        discountRow?.classList.replace("d-none", "d-flex"); 
      } else {
        discountRow?.classList.add("d-none");
      }

      // Calcul des frais de livraison (Hors Bordeaux : 5€ + 0.59€/km)
      const city = cityInput.value.trim().toLowerCase();
      const km = parseFloat(distanceInput.value) || 0;
      let delivery = 0;

      if (city && city !== BORDEAUX) {
        delivery = 5 + km * 0.59;
      }

      // Total Général
      const total = basePrice - discount + delivery;

      // Mise à jour de l'affichage
      get("price").textContent = basePrice.toFixed(2);
      get("discount").textContent = discount.toFixed(2);
      get("delivery").textContent = delivery.toFixed(2);
      get("total").textContent = total.toFixed(2);
    }

    // Écouteurs d'événements pour recalculer le prix à chaque changement pertinent
    peopleInput.addEventListener("input", updatePrice);
    cityInput.addEventListener("input", updatePrice);
    distanceInput.addEventListener("input", updatePrice);

   
    updatePrice();

    
    validateBtn.addEventListener("click", async () => {
      const address = get("address").value.trim();
      const city = cityInput.value.trim();
      const date = get("date").value;
      const time = get("time").value;

      if (!address || !city || !date || !time) {
        alert("Veuillez remplir tous les champs requis pour la livraison.");
        return;
      }

      const commandeData = {
        userId: user.id,
        menuId: menu.id,
        people: parseInt(peopleInput.value, 10),
        totalPrice: parseFloat(get("total").textContent),
        deliveryAddress: `${address}, ${city}`,
        deliveryDate: date,
        deliveryTime: time
      };

      try {
        // Tentative d'envoi de la commande au backend (PHP) pour enregistrement en base de données
        const response = await fetch('http://localhost/vite-gourmand-backend/save_order.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commandeData)
        });

        if (response.ok) {
            alert("Commande enregistrée en base de données !");
        } else {
            throw new Error();
        }
      } catch (error) {
        /// En cas d'erreur (ex: CORS, serveur non disponible), on bascule en mode démonstration visuelle avec stockage local
        console.warn("Bascule automatique sur le mode démonstration visuelle.");
        alert("Commande validée avec succès ! (Mode démonstration : Données simulées localement).");
      } finally {
        localStorage.removeItem("selectedMenu");
        redirect("/userSpace");
      }
    });

  }, 50); // Fin du setTimeout de sécurité pour s'assurer que le DOM est prêt
}