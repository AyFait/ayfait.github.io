/* assets/script/main.js
   Combined mobile menu + dark mode toggle + safe DOM handling
*/

(function () {
  // Run after DOM loaded
  function init() {
    // ===== Mobile menu toggle =====
    // toggleMenu can be called from inline onclick handlers,
    // but we also attach listener here if you prefer.
    window.toggleMenu = function toggleMenu() {
      const nav = document.getElementById("mobileNav");
      if (!nav) return;
      nav.classList.toggle("active");
    };

    // Also wire up any mobile-menu-btn if present
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", toggleMenu);
    }

    // ===== Dark mode toggle =====
    const toggleBtn = document.getElementById("darkModeToggle");

    function enableDarkMode(setText = true) {
      document.body.classList.add("dark-mode");
      if (setText && toggleBtn) toggleBtn.textContent = "☀️";
      try { localStorage.setItem("theme", "dark"); } catch (e) {}
    }

    function disableDarkMode(setText = true) {
      document.body.classList.remove("dark-mode");
      if (setText && toggleBtn) toggleBtn.textContent = "🌙";
      try { localStorage.setItem("theme", "light"); } catch (e) {}
    }

    // load saved preference
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") enableDarkMode(false);
      else disableDarkMode(false);
    } catch (e) {
      // localStorage may be unavailable in some contexts; ignore failures
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        if (document.body.classList.contains("dark-mode")) {
          disableDarkMode();
        } else {
          enableDarkMode();
        }
      });
    }

    // Optionally: respect system preference on first visit
    // (only if user has not explicitly chosen)
    try {
      const saved = localStorage.getItem("theme");
      if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        enableDarkMode(false);
      }
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
