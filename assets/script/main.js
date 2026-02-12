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

    // ===== Count-up stats =====
    const countupNodes = document.querySelectorAll(".countup[data-countup-target]");
    if (countupNodes.length) {
      const animateCountup = function (node) {
        if (node.dataset.countupDone === "true") return;
        node.dataset.countupDone = "true";

        const endValue = parseInt(node.dataset.countupTarget, 10);
        if (!Number.isFinite(endValue)) return;

        const prefix = node.dataset.countupPrefix || "";
        const suffix = node.dataset.countupSuffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = function (now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(endValue * eased);
          node.textContent = prefix + current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCountup(entry.target);
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.35 });

        countupNodes.forEach(function (node) {
          observer.observe(node);
        });
      } else {
        countupNodes.forEach(function (node) {
          animateCountup(node);
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
