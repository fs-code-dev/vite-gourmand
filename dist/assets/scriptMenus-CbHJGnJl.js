import{menus as e}from"./scriptMenusData-Chkgk4wx.js";function t(){function t(e){let t=document.getElementById(`menusContainer`);t&&(t.innerHTML=e.map(e=>`
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm border-0 border-bottom border-4 border-primary">
          <img src="${e.image}" class="card-img-top menu-img" alt="${e.title}" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="fw-bold text-dark">${e.title}</h5>
            <p class="text-muted small">${e.description}</p>

            <div class="mt-auto">
              <div class="d-flex justify-content-between mb-3">
                <span class="badge bg-secondary">${e.theme}</span>
                <span class="badge bg-success">${e.regime}</span>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-2 border-top pt-3">
                <strong class="fs-5">${e.price} €</strong>
                <button onclick="goToDetail(${e.id})" class="btn btn-primary btn-sm">
                  Voir le détail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join(``))}function n(){let n=document.getElementById(`prixMax`)?.value,r=document.getElementById(`prixMin`)?.value,i=document.getElementById(`theme`)?.value,a=document.getElementById(`regime`)?.value,o=document.getElementById(`nbMin`)?.value,s=[...e];n&&(s=s.filter(e=>e.price<=Number(n))),r&&(s=s.filter(e=>e.price>=Number(r))),i&&(s=s.filter(e=>e.theme===i)),a&&(s=s.filter(e=>e.regime===a)),o&&(s=s.filter(e=>e.minPersons>=Number(o))),t(s)}function r(e){window.history.pushState({},``,`/menusdetail?id=${e}`),window.dispatchEvent(new PopStateEvent(`popstate`))}window.goToDetail=r,document.onclick=null,document.addEventListener(`click`,function(r){r.target&&r.target.id===`applyFilters`&&(r.preventDefault(),n()),r.target&&r.target.id===`resetFilters`&&(r.preventDefault(),[`prixMax`,`prixMin`,`theme`,`regime`,`nbMin`].forEach(e=>{let t=document.getElementById(e);t&&(t.value=``)}),t(e))}),t(e)}export{t as initMenus};