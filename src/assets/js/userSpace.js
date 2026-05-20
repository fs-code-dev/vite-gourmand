const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.history.pushState({}, "", "/signin");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const title = document.querySelector("h1");
if (title && user) {
  title.textContent = `Mon compte utilisateur - ${user.firstname}`;
}