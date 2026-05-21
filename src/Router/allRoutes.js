import Route from "./Route.js";

// Routes de l'application
export const allRoutes = [
  // Accueil
  new Route("/", "Accueil", "/src/pages/home.html"),
  new Route("/404", "Page non trouvée", "/src/pages/404.html"),
  
  // Pages d'informations
  new Route("/cgv", "Conditions Générales de Vente", "/src/pages/cgv.html"),
  new Route("/mentions", "Mentions légales", "/src/pages/mentions.html"),
  new Route("/contact", "Formulaire de contact", "/src/pages/contact.html"),

  // Menus et Commandes
  new Route("/menus", "Menus", "/src/pages/menus.html", "/src/assets/js/menus.js"),
  new Route("/menusdetail", "Détail du menu", "/src/pages/menus-detail.html", "/src/assets/js/menus-detail.js"),
  new Route("/order", "Passer une commande", "/src/pages/order.html"),

  // AUTH (Authentification et Espace Client)
  new Route("/signin", "Se connecter", "/src/pages/users/signin.html", "/src/assets/js/auth.js"),
  new Route("/signup", "S'inscrire", "/src/pages/users/signup.html", "/src/assets/js/auth.js"),
  new Route("/userSpace", "Espace utilisateur", "/src/pages/users/userSpace.html", "/src/assets/js/userSpace.js"),
  new Route("/editPassword", "Modifier mon mot de passe", "/src/pages/users/editPassword.html", "/src/assets/js/auth.js"),
  new Route("/modifyUserInfo", "Modifier mes informations", "/src/pages/users/modifyUserInfo.html", "/src/assets/js/auth.js"),
  
  // ESPACE EMPLOYÉ
  new Route("/employeSpace", "Espace employé", "/src/pages/employe/employeSpace.html", "/src/assets/js/materiel.js"),

  // ADMIN
  new Route("/adminSpace", "Espace administrateur", "/src/pages/admin/adminSpace.html"),
  new Route("/admin/users", "Gestion des employés", "/src/pages/admin/users.html", "/src/assets/js/users.js"),
  new Route("/admin/stats", "Statistiques", "/src/pages/admin/stats.html", "/src/assets/js/stats.js"),
];
 
// Le titre s'affiche comme ceci : Route.titre - websiteName
export const websiteName = "Vite & Gourmand";