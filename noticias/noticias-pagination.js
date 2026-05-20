(function () {
  const LISTING_ID = "listing-listing-noticias";
  const PAGE_SIZE = 12;

  function captureItems() {
    const grid = document.querySelector("#listing-listing-noticias .list.grid");
    if (!grid) return [];
    return Array.from(grid.querySelectorAll(".g-col-1"));
  }

  function restoreItemsToGrid(listGrid, items) {
    items.forEach((item) => {
      if (item.parentElement !== listGrid) {
        listGrid.appendChild(item);
      }
    });
  }

  function buildManualPagination(items, ul) {
    const total = Math.ceil(items.length / PAGE_SIZE);
    const nav = ul.closest(".listing-pagination");

    if (total <= 1) {
      if (nav) nav.classList.add("d-none");
      items.forEach((el) => {
        el.style.display = "";
      });
      return;
    }

    if (nav) nav.classList.remove("d-none");
    let current = 1;

    function show(page) {
      current = page;
      items.forEach((el, i) => {
        el.style.display =
          i >= (page - 1) * PAGE_SIZE && i < page * PAGE_SIZE ? "" : "none";
      });
      render();
    }

    function render() {
      ul.innerHTML = "";

      const prev = document.createElement("li");
      prev.className = "page-item" + (current === 1 ? " disabled" : "");
      prev.innerHTML =
        '<a class="page page-link" href="#" data-page="prev" aria-label="Página anterior">Anterior</a>';
      ul.appendChild(prev);

      for (let p = 1; p <= total; p++) {
        const li = document.createElement("li");
        li.className = "page-item" + (p === current ? " active" : "");
        li.innerHTML =
          '<a class="page page-link" href="#" data-page="' +
          p +
          '" aria-label="Página ' +
          p +
          '">' +
          p +
          "</a>";
        ul.appendChild(li);
      }

      const next = document.createElement("li");
      next.className = "page-item" + (current === total ? " disabled" : "");
      next.innerHTML =
        '<a class="page page-link" href="#" data-page="next" aria-label="Página siguiente">Siguiente</a>';
      ul.appendChild(next);

      ul.querySelectorAll(".page-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const v = link.getAttribute("data-page");
          if (v === "prev" && current > 1) show(current - 1);
          else if (v === "next" && current < total) show(current + 1);
          else if (v && !isNaN(Number(v))) show(Number(v));
        });
      });
    }

    show(1);
  }

  function setupPagination() {
    const container = document.getElementById(LISTING_ID);
    let ul = document.querySelector("#listing-noticias-pagination .pagination");
    const listGrid = container && container.querySelector(".list.grid");
    if (!container || !listGrid) return;

    const nav = document.getElementById("listing-noticias-pagination");
    if (nav && nav.parentElement !== container) {
      container.appendChild(nav);
    }
    ul = document.querySelector("#listing-noticias-pagination .pagination");
    if (!ul) return;

    const items =
      window.__NOTICIAS_ITEMS && window.__NOTICIAS_ITEMS.length
        ? window.__NOTICIAS_ITEMS
        : captureItems();
    if (!items.length) return;

    const list =
      window["quarto-listings"] && window["quarto-listings"][LISTING_ID];
    if (list) {
      list.page = items.length;
      list.update();
    }

    restoreItemsToGrid(listGrid, items);
    buildManualPagination(items, ul);
  }

  function scheduleSetup() {
    setTimeout(setupPagination, 50);
    setTimeout(setupPagination, 400);
    setTimeout(setupPagination, 900);
  }

  const origLoaded = window["quarto-listing-loaded"];
  window["quarto-listing-loaded"] = function () {
    if (typeof origLoaded === "function") origLoaded();
    scheduleSetup();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleSetup);
  } else {
    scheduleSetup();
  }
})();
