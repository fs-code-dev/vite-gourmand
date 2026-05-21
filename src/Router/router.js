import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";


import { initMenus } from "../assets/js/menus.js";
import { initMenusDetail } from "../assets/js/menus-detail.js";
import { initAuth } from "../assets/js/auth.js";
import { initUserSpace } from "../assets/js/userSpace.js";
import { initMateriel } from "../assets/js/materiel.js";
import { initUsers } from "../assets/js/users.js";
import { initStats } from "../assets/js/stats.js";
import { initOrder } from "../assets/js/order.js";

const route404 = new Route("/404", "Page introuvable", "/src/pages/404.html");

const getRouteByUrl = (url) => {
  return allRoutes.find(route => route.url === url) || route404;
};

export const LoadContentPage = async () => {
  const path = window.location.pathname;
  const actualRoute = getRouteByUrl(path);

  try {
    const res = await fetch(actualRoute.pathHtml);

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status} lors du chargement de ${actualRoute.pathHtml}`);
    }

    const html = await res.text();
    const app = document.getElementById("app");
    app.innerHTML = html;

    if (actualRoute.pathJS) {
      const scriptName = actualRoute.pathJS.replace("/src/assets/js/", "");

      if (scriptName === "menus.js") initMenus();
      else if (scriptName === "menus-detail.js") initMenusDetail();
      else if (scriptName === "auth.js") initAuth();
      else if (scriptName === "userSpace.js") initUserSpace();
      else if (scriptName === "materiel.js") initMateriel();
      else if (scriptName === "users.js") initUsers();
      else if (scriptName === "stats.js") initStats();
      else if (scriptName === "order.js") initOrder();
    }

    window.scrollTo(0, 0);
    document.title = actualRoute.title + " - " + websiteName;

  } catch (error) {
    console.error("Erreur de routage :", error);
    document.getElementById("app").innerHTML = `
      <div class="container text-center mt-5">
        <h1 class="text-danger">Oups, une erreur est survenue !</h1>
        <p>Impossible de charger la page demandée.</p>
        <a href="/" class="btn btn-primary mt-3" data-link>Retour à l'accueil</a>
      </div>
    `;
  }
};

document.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (link && link.matches("[data-link]")) {
    e.preventDefault();
    window.history.pushState({}, "", link.href);
    LoadContentPage();
  }
});

window.onpopstate = LoadContentPage;
LoadContentPage();