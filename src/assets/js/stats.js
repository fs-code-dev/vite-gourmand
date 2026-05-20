let myChart = null; 

// SIMULATION DES DONNÉES NoSQL
const mockNoSqlData = [
  { id: 1, menu: "Classique", price: 25, date: "2026-04-10" },
  { id: 2, menu: "Noël", price: 35, date: "2026-12-24" },
  { id: 3, menu: "Classique", price: 25, date: "2026-04-12" },
  { id: 4, menu: "Pâques", price: 30, date: "2026-03-28" },
  { id: 5, menu: "Événement", price: 40, date: "2026-05-15" },
  { id: 6, menu: "Classique", price: 25, date: "2026-04-20" },
  { id: 7, menu: "Pâques", price: 30, date: "2026-03-29" },
];

// INITIALISATION DU GRAPHIQUE (Chart.js)
function initChart() {
  const ctx = document.getElementById('ordersChart');
  if (!ctx) return; 

  // Calcul du nombre de commandes par menu à partir des données simulées
  const menuCounts = {
    "Classique": mockNoSqlData.filter(d => d.menu === "Classique").length,
    "Noël": mockNoSqlData.filter(d => d.menu === "Noël").length,
    "Pâques": mockNoSqlData.filter(d => d.menu === "Pâques").length,
    "Événement": mockNoSqlData.filter(d => d.menu === "Événement").length,
  };
  if (myChart !== null) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(menuCounts),
      datasets: [{
        label: 'Nombre de commandes',
        data: Object.values(menuCounts),
        backgroundColor: ['#0d6efd', '#dc3545', '#198754', '#ffc107'],
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });
}

// LOGIQUE DE CALCUL DU CHIFFRE D'AFFAIRES (CA) AVEC FILTRES
function calculateCA() {
  const filterMenu = document.getElementById('filterMenu').value;
  const filterStartDate = document.getElementById('filterStartDate').value;
  const filterEndDate = document.getElementById('filterEndDate').value;

  let filteredData = mockNoSqlData;

  // Filtre par menu
  if (filterMenu !== "all") {
    filteredData = filteredData.filter(order => order.menu === filterMenu);
  }

  // Filtre par dates
  if (filterStartDate) {
    filteredData = filteredData.filter(order => new Date(order.date) >= new Date(filterStartDate));
  }
  if (filterEndDate) {
    filteredData = filteredData.filter(order => new Date(order.date) <= new Date(filterEndDate));
  }

  // Calcul des totaux
  const totalOrders = filteredData.length;
  const totalCA = filteredData.reduce((sum, order) => sum + order.price, 0);

  // Mise à jour du DOM
  document.getElementById('kpiOrders').textContent = totalOrders;
  document.getElementById('kpiCA').textContent = totalCA;
}

setTimeout(() => {
  initChart();
  calculateCA(); 
}, 100);

// Écouteur sur le bouton de calcul
const btn = document.getElementById('calculateCABtn');
if (btn) {
  // Remplacement pour éviter les doublons liés au routeur
  btn.replaceWith(btn.cloneNode(true));
  document.getElementById('calculateCABtn').addEventListener('click', calculateCA);
}