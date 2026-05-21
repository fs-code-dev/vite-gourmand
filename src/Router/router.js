import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Définition de la route de secours en cas de page non trouvée
const route404 = new Route("/404", "Page introuvable", "/src/pages/404.html");

// Fonction pour trouver la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  return allRoutes.find(route => route.url === url) || route404;
};

// Fonction principale pour charger le contenu de la page en fonction de la route
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
      
      try {
        const module = await import(`../assets/js/${scriptName}`);
        
        const functionName = `init${scriptName.replace(".js", "").charAt(0).toUpperCase() + scriptName.replace(".js", "").slice(1)}`;
      
        if (module[functionName]) {
          module[functionName]();
        } else if (module.init) {
          module.init();
        }
      } catch (err) {
        console.error(`Impossible de charger le module JS : ${scriptName}`, err);
      }
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

// Navigation SPA
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