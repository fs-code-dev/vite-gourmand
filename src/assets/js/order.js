export function initOrder() {
  
const user = JSON.parse(localStorage.getItem("user"));
const menu = JSON.parse(localStorage.getItem("selectedMenu"));

const redirect = (path) => {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

// Redirections si pas de user ou pas de menu
if (!user) {
  console.warn("Utilisateur non connecté");
  redirect("/signin");
} else if (!menu) {
  console.warn("Aucun menu sélectionné");
  redirect("/menus");
} else {

  const get = (id) => document.getElementById(id);

  // USER INFOS
  get("firstname").value = user.firstname || "";
  get("lastname").value = user.lastname || "";
  get("email").value = user.email || "";
  get("phone").value = user.phone || "";

  // MENU INFOS
  get("menu-name").textContent = menu.title;
  get("menu-min-persons").textContent = menu.minPersons;
  get("unit-price").textContent = menu.price;

  const peopleInput = get("people");
  const cityInput = get("city");
  const distanceInput = get("distanceKm");
  const validateBtn = get("validate");
  const errorMsg = get("people-error");

  peopleInput.value = menu.minPersons;
  peopleInput.min = menu.minPersons;

  const BORDEAUX = "bordeaux";

  function updatePrice() {
    let nb = parseInt(peopleInput.value, 10);
    if (isNaN(nb)) nb = 0;

    // validation du nombre de personnes
    if (nb < menu.minPersons) {
      errorMsg?.classList.remove("d-none");
      validateBtn.disabled = true;
    } else {
      errorMsg?.classList.add("d-none");
      validateBtn.disabled = false;
    }

    const basePrice = menu.price * nb;

    // remise 
    let discount = 0;
    const discountRow = get("discount-row");

    if (nb >= menu.minPersons + 5) {
      discount = basePrice * 0.10;
      discountRow?.classList.remove("d-none");
    } else {
      discountRow?.classList.add("d-none");
    }

    // commande à livrer en dehors de Bordeaux
    const city = cityInput.value.trim().toLowerCase();
    const km = parseFloat(distanceInput.value) || 0;

    let delivery = 0;
    if (city && city !== BORDEAUX) {
      delivery = 5 + km * 0.59;
    }

    const total = basePrice - discount + delivery;

    get("price").textContent = basePrice.toFixed(2);
    get("discount").textContent = discount.toFixed(2);
    get("delivery").textContent = delivery.toFixed(2);
    get("total").textContent = total.toFixed(2);
  }

  peopleInput.addEventListener("input", updatePrice);
  cityInput.addEventListener("input", updatePrice);
  distanceInput.addEventListener("input", updatePrice);

  updatePrice();

  // validation commande
  validateBtn.addEventListener("click", () => {
    const address = get("address").value.trim();
    const date = get("date").value;
    const time = get("time").value;

    if (!address || !cityInput.value || !date || !time) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    console.log("Commande :", {
      menuId: menu.id,
      people: peopleInput.value,
      total: get("total").textContent,
      date,
      time
    });

    alert("Commande validée");

    localStorage.removeItem("selectedMenu");
    redirect("/userSpace");
  });
}
}