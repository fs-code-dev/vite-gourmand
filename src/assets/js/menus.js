import { menus } from "./menus-data.js";
function displayMenus(list) {
  const container = document.getElementById("menusContainer");
  if (!container) return;

  container.innerHTML = list.map(menu => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${menu.image}" class="card-img-top menu-img" alt="${menu.title}">
        <div class="card-body d-flex flex-column">
          <h5>${menu.title}</h5>
          <p class="text-muted">${menu.description}</p>

          <div class="mt-auto">
            <div class="d-flex justify-content-between">
              <span class="badge bg-secondary">${menu.theme}</span>
              <span class="badge bg-success">${menu.regime}</span>
            </div>

            <div class="d-flex justify-content-between mt-2">
              <strong>${menu.price} €</strong>
              <button onclick="goToDetail(${menu.id})" class="btn btn-primary btn-sm">
                Détail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function applyFilters() {
  const prixMax = document.getElementById("prixMax")?.value;
  const prixMin = document.getElementById("prixMin")?.value;
  const theme = document.getElementById("theme")?.value;
  const regime = document.getElementById("regime")?.value;
  const nbMin = document.getElementById("nbMin")?.value;

  let filtered = [...menus];

  if (prixMax) filtered = filtered.filter(m => m.price <= Number(prixMax));
  if (prixMin) filtered = filtered.filter(m => m.price >= Number(prixMin));
  if (theme) filtered = filtered.filter(m => m.theme === theme);
  if (regime) filtered = filtered.filter(m => m.regime === regime);
  if (nbMin) filtered = filtered.filter(m => m.minPersons >= Number(nbMin));

  displayMenus(filtered);
}

function goToDetail(id) {
  window.history.pushState({}, "", `/menusdetail?id=${id}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

window.goToDetail = goToDetail;

document.getElementById("applyFilters")?.addEventListener("click", applyFilters);

document.getElementById("resetFilters")?.addEventListener("click", () => {
  ["prixMax", "prixMin", "theme", "regime", "nbMin"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  displayMenus(menus);
});

displayMenus(menus);