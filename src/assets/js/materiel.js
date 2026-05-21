export function initMateriel() {
  
function initStatusSelects() {
  document.querySelectorAll('.statut-select').forEach(select => {

    select.addEventListener('change', function () {
      const container = this.closest('td');
      const alerte = container?.querySelector('.alerte-materiel');

      if (!alerte) return;

      if (this.value === "En attente du retour de matériel") {
        alerte.classList.remove('d-none');

        console.log("Simulation : email envoyé au client (retour matériel)");
        alert("Un email a été envoyé au client concernant le retour du matériel.");
      } else {
        alerte.classList.add('d-none');
      }
    });

  });
}

initStatusSelects();

}