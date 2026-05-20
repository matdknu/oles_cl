(function () {
  function activateListingImages(root) {
    var scope = root || document.getElementById("listing-listing-noticias");
    if (!scope) return;
    scope.querySelectorAll("img[data-src]").forEach(function (img) {
      if (!img.getAttribute("src")) {
        img.setAttribute("src", img.getAttribute("data-src"));
      }
    });
  }

  function hookList() {
    var list = window["quarto-listings"] && window["quarto-listings"]["listing-listing-noticias"];
    if (!list) return false;
    list.on("updated", function () {
      activateListingImages();
    });
    activateListingImages();
    return true;
  }

  var origLoaded = window["quarto-listing-loaded"];
  window["quarto-listing-loaded"] = function () {
    if (typeof origLoaded === "function") origLoaded();
    hookList();
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (!hookList()) {
      setTimeout(hookList, 100);
      setTimeout(hookList, 500);
    }
  });
})();
