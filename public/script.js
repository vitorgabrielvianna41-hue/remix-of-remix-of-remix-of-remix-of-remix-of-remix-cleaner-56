/* Landing page interactions: promo date, curriculum tabs, FAQ, purchase toast */
(function () {
  function initLanding(root) {
    root = root || document;

    // ---- Promo end date (7 days from now) ----
    var dateEl = root.querySelector("#promo-end-date");
    if (dateEl) {
      var d = new Date();
      d.setDate(d.getDate() + 7);
      dateEl.textContent = d.toLocaleDateString("pt-BR");
    }

    // ---- Curriculum tabs ----
    var tabs = root.querySelectorAll(".curriculum-tab-btn");
    var panes = root.querySelectorAll(".curriculum-pane");
    var placeholder = root.querySelector("#curriculum-placeholder");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var level = tab.getAttribute("data-level");
        var isActive = tab.classList.contains("active");
        tabs.forEach(function (t) { t.classList.remove("active"); });
        panes.forEach(function (p) { p.classList.remove("active"); });
        if (isActive) {
          if (placeholder) placeholder.style.display = "";
          return;
        }
        tab.classList.add("active");
        var pane = root.querySelector("#pane-" + level);
        if (pane) pane.classList.add("active");
        if (placeholder) placeholder.style.display = "none";
      });
    });

    // ---- FAQ accordion ----
    root.querySelectorAll(".faq-item").forEach(function (item) {
      var trigger = item.querySelector(".faq-trigger");
      var content = item.querySelector(".faq-content");
      if (!trigger || !content) return;
      trigger.addEventListener("click", function () {
        var open = item.classList.contains("active");
        root.querySelectorAll(".faq-item.active").forEach(function (other) {
          other.classList.remove("active");
          var c = other.querySelector(".faq-content");
          if (c) c.style.maxHeight = "0px";
        });
        if (!open) {
          item.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    // ---- Live purchase toast ----
    var toast = root.querySelector("#purchase-notification");
    var timers = [];
    if (toast) {
      var names = [
        "Mariana S.", "Carolina R.", "Juliana L.", "Fernanda M.", "Camila A.",
        "Patrícia C.", "Amanda P.", "Larissa T.", "Bianca C.", "Renata M."
      ];
      var times = ["há poucos segundos", "há 1 minuto", "há 3 minutos", "há 6 minutos"];
      var nameEl = root.querySelector("#toast-name");
      var avatarEl = root.querySelector("#toast-avatar");
      var avatarList = (avatarEl && avatarEl.getAttribute("data-avatars") || "").split(",").filter(Boolean);
      var timeEl = root.querySelector("#toast-time");
      var closed = false;

      var closeBtn = root.querySelector("#toast-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          closed = true;
          toast.classList.remove("visible");
          timers.forEach(clearTimeout);
        });
      }

      var show = function () {
        if (closed) return;
        var idx = Math.floor(Math.random() * names.length);
        if (nameEl) nameEl.textContent = names[idx];
        if (avatarEl && avatarList.length) {
          avatarEl.src = avatarList[idx % avatarList.length];
          avatarEl.alt = names[idx];
        }
        if (timeEl) timeEl.textContent = times[Math.floor(Math.random() * times.length)];
        toast.classList.add("visible");
        timers.push(setTimeout(function () {
          toast.classList.remove("visible");
          timers.push(setTimeout(show, 12000 + Math.random() * 10000));
        }, 5500));
      };
      timers.push(setTimeout(show, 6000));
    }

    return function cleanup() { timers.forEach(clearTimeout); };
  }

  if (typeof window !== "undefined") window.initLanding = initLanding;
  if (typeof document !== "undefined" && !window.__LANDING_MANUAL_INIT__) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { initLanding(document); });
    } else {
      initLanding(document);
    }
  }
})();
