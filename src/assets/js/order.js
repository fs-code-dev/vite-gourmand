export function initOrder() {
  // Données de démo pour l'utilisateur et le menu sélectionné
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify({ id: 1, firstname: "STL", lastname: "Lya", email: "client@test.fr", phone: "0601020304" }));
  }
  if (!localStorage.getItem("selectedMenu")) {
    localStorage.setItem("selectedMenu", JSON.stringify({ id: 1, title: "Menu Terroir Démo", minPersons: 4, price: 15.00 }));
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const menu = JSON.parse(localStorage.getItem("selectedMenu"));

  const redirect = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const get = (id) => document.getElementById(id);

  // Affichage du menu sélectionné (pour rappel, c'est une démo, donc on affiche juste les infos de base)
  setTimeout(() => {
    console.log("Initialisation des calculs de commande...");

    // Remplissage des textes et infos du menu
    if (get("firstname")) get("firstname").value = user.firstname || "";
    if (get("lastname")) get("lastname").value = user.lastname || "";
    if (get("email")) get("email").value = user.email || "";
    if (get("phone")) get("phone").value = user.phone || "";
    if (get("menu-name")) get("menu-name").textContent = menu.title;
    if (get("menu-min-persons")) get("menu-min-persons").textContent = menu.minPersons;
    if (get("unit-price")) get("unit-price").textContent = parseFloat(menu.price).toFixed(2);

    // Configuration de l'input convives
    const peopleInput = get("people");
    if (peopleInput) {
      peopleInput.value = menu.minPersons;
      peopleInput.min = menu.minPersons;
    }

    // Fonction de calcul du prix total
    function updatePrice() {
      console.log("Calcul en cours...");
      
      const pInput = get("people");
      const cInput = get("city");
      const dInput = get("distanceKm");
      const validateBtn = get("validate");
      const errorMsg = get("people-error");

      let nb = pInput ? parseInt(pInput.value, 10) : 0;
      if (isNaN(nb) || nb < 0) nb = 0;

      // Validation convives
      if (nb < menu.minPersons) {
        errorMsg?.classList.remove("d-none");
        if (validateBtn) validateBtn.disabled = true;
      } else {
        errorMsg?.classList.add("d-none");
        if (validateBtn) validateBtn.disabled = false;
      }

      // Prix de base
      const basePrice = menu.price * nb;

      // Remise de 10%
      let discount = 0;
      const discountRow = get("discount-row");
      if (nb >= (menu.minPersons + 5)) {
        discount = basePrice * 0.10;
        if (discountRow) {
          discountRow.classList.remove("d-none");
          discountRow.classList.add("d-flex");
        }
      } else {
        if (discountRow) {
          discountRow.classList.add("d-none");
          discountRow.classList.remove("d-flex");
        }
      }

      // Livraison
      const city = cInput ? cInput.value.trim().toLowerCase() : "";
      const km = dInput ? parseFloat(dInput.value) : 0;
      let delivery = 0;
      if (city && city !== "bordeaux") {
        delivery = 5 + (isNaN(km) ? 0 : km) * 0.59;
      }

      // Total
      const total = basePrice - discount + delivery;

      // Affichage des résultats
      if (get("price")) get("price").textContent = basePrice.toFixed(2);
      if (get("discount")) get("discount").textContent = discount.toFixed(2);
      if (get("delivery")) get("delivery").textContent = delivery.toFixed(2);
      if (get("total")) get("total").textContent = total.toFixed(2);
    }

   
    if (get("people")) get("people").addEventListener("input", updatePrice);
    if (get("city")) get("city").addEventListener("input", updatePrice);
    if (get("distanceKm")) get("distanceKm").addEventListener("input", updatePrice);

   
    updatePrice();

  
    const validateBtn = get("validate");
    if (validateBtn) {
      validateBtn.addEventListener("click", () => {
        alert("Commande validée avec succès ! (Mode démo).");
        localStorage.removeItem("selectedMenu");
        redirect("/userSpace");
      });
    }

  }, 100); 
}