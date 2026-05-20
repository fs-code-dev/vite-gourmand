import Route from "./Route.js";

// Routes de l'application
export const allRoutes = [
  // Accueil
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/404", "Page non trouvée", "/pages/404.html"),
  
  // Pages d'informations
  new Route("/cgv", "Conditions Générales de Vente", "/pages/cgv.html"),
  new Route("/mentions", "Mentions légales", "/pages/mentions.html"),
  new Route("/contact", "Formulaire de contact", "/pages/contact.html"),

  // Menus et Commandes
  new Route("/menus", "Menus", "/pages/menus.html", "/src/assets/js/menus.js"),
  new Route("/menusdetail", "Détail du menu", "/pages/menus-detail.html", "/src/assets/js/menus-detail.js"),
  new Route("/order", "Passer une commande", "/pages/order.html"),

  // AUTH (Authentification et Espace Client)
  new Route("/signin", "Se connecter", "/pages/users/signin.html", "/src/assets/js/auth.js"),
  new Route("/signup", "S'inscrire", "/pages/users/signup.html", "/src/assets/js/auth.js"),
  new Route("/userSpace", "Espace utilisateur", "/pages/users/userSpace.html", "/src/assets/js/userSpace.js"),
  new Route("/editPassword", "Modifier mon mot de passe", "/pages/users/editPassword.html", "/src/assets/js/auth.js"),
  new Route("/modifyUserInfo", "Modifier mes informations", "/pages/users/modifyUserInfo.html", "/src/assets/js/auth.js"),
  
  // ESPACE EMPLOYÉ
  new Route("/employeSpace", "Espace employé", "/pages/employe/employeSpace.html", "/src/assets/js/materiel.js"),

  // ADMIN
  new Route("/adminSpace", "Espace administrateur", "/pages/admin/adminSpace.html"),
  new Route("/admin/users", "Gestion des employés", "/pages/admin/users.html", "/src/assets/js/users.js"),
  new Route("/admin/stats", "Statistiques", "/pages/admin/stats.html", "/src/assets/js/stats.js"),
];
 
// Le titre s'affiche comme ceci : Route.titre - websiteName
export const websiteName = "Vite & Gourmand";