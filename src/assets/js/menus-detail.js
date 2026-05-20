import { menus } from "./menus-data.js"; 

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

const menu = menus.find(m => m.id === id);

if (!menu) {
  console.error("Menu introuvable :", id);
} else {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("menuTitle", menu.title);
  setText("menuDescription", menu.description);
  setText("menuPrice", menu.price + " €");
  setText("menuMinPersons", `${menu.minPersons} personnes min.`);
  setText("menuTheme", menu.theme);
  setText("menuRegime", menu.regime);
  setText("menuStock", `${menu.stock} commandes restantes`);

  const img = document.getElementById("menuImage");
  if (img) {
    img.src = menu.image;
    img.alt = menu.title;
  }

  const conditions = document.getElementById("menuConditions");
  if (conditions && menu.conditions) {
    conditions.textContent = `⚠️ ${menu.conditions}`;
    conditions.classList.add("text-danger", "fw-bold");
  }

  const fields = [
    ["dishEntree", menu.entree],
    ["dishPlat", menu.plat],
    ["dishDessert", menu.dessert],
    ["allergenesEntree", `Allergènes : ${menu.allergenes_entree}`],
    ["allergenesPlat", `Allergènes : ${menu.allergenes_plat}`],
    ["allergenesDessert", `Allergènes : ${menu.allergenes_dessert}`],
  ];

  fields.forEach(([id, value]) => setText(id, value));
}

// ===== BUTTON ORDER =====
const orderBtn = document.getElementById("order-btn");

if (orderBtn) {
  orderBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.history.pushState({}, "", "/signin");
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

    localStorage.setItem("selectedMenu", JSON.stringify(menu));

    window.history.pushState({}, "", "/order");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}