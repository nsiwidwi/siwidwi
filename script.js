(function () {
  "use strict";

  var STR = {
    en: {
      nav: {
        brand: "Portfolio",
        about: "About",
        skills: "Skills",
        work: "Work",
        contact: "Contact",
      },
      hero: {
        eyebrow: "Hello, I'm",
        sub:
          "Designer & developer crafting thoughtful digital experiences. I build modern landing pages that help businesses grow and convert more users.",
        workPrimary: "View work",
        workSecondary: "Lihat karya",
        contactPrimary: "Get in touch",
        contactSecondary: "Hubungi saya",
      },
      about: { title: "About" },
      skills: {
        title: "Skills",
        lead: "Core technologies I use to build for the web.",
        html: "Semantic structure, accessibility, and meaningful markup.",
        css: "Layout, responsive design, motion, and visual polish.",
        js: "Interactivity, behavior, and dynamic user experiences.",
      },
      gallery: {
        title: "Photo gallery",
        cap1: "Workspace & focus",
        cap2: "Design craft",
        cap3: "Code on screen",
        cap4: "Creative flow",
      },
      work: {
        title: "Selected work",
        tagWeb: "Web",
        tagMobile: "Web",
        tagBrand: "Brand",
        viewPrimary: "View project",
        viewSecondary: "Lihat proyek",
        p1: { title: "Mister Aloy - Personal Branding Website Design" },
        p2: { title: "Coffee Shop Landing Page - Modern UI & Elegant Design" },
        p3: { title: "Saas Landing Page - Modern UI & Elegant Design" },
      },
      contact: {
        title: "Contact",
        lead: "Open to collaborations and available for freelance work. Say hello.",
        whatsappPrimary: "Message on WhatsApp",
        whatsappSecondary: "Chat di WhatsApp",
        portfolioPrimary: "See portfolio",
        portfolioSecondary: "Lihat portofolio",
      },
      footer: { built: "Built with HTML, CSS & JS." },
    },
    id: {
      nav: {
        brand: "Portofolio",
        about: "Tentang",
        skills: "Keahlian",
        work: "Karya",
        contact: "Kontak",
      },
      hero: {
        eyebrow: "Halo, saya",
        sub:
          "Desainer dan pengembang yang merancang pengalaman digital yang matang dan bermakna. Saya membangun landing page modern yang membantu bisnis berkembang dan mengonversi lebih banyak pengguna.",
        workPrimary: "Lihat karya",
        workSecondary: "View work",
        contactPrimary: "Hubungi saya",
        contactSecondary: "Get in touch",
      },
      about: { title: "Tentang" },
      skills: {
        title: "Keahlian",
        lead: "Teknologi inti yang saya gunakan untuk membangun web.",
        html: "Struktur semantik, aksesibilitas, dan penandaan yang bermakna.",
        css: "Tata letak, desain responsif, motion, dan penyempurnaan visual.",
        js: "Interaktivitas, perilaku, dan pengalaman pengguna yang dinamis.",
      },
      gallery: {
        title: "Galeri foto",
        cap1: "Ruang kerja & fokus",
        cap2: "Kerajinan desain",
        cap3: "Kode di layar",
        cap4: "Alur kreatif",
      },
      work: {
        title: "Karya pilihan",
        tagWeb: "Web",
        tagMobile: "Seluler",
        tagBrand: "Brand",
        viewPrimary: "Lihat proyek",
        viewSecondary: "View project",
        p1: { title: "Mister Aloy - Desain Website Personal Branding" },
        p2: { title: "Landing Page Kedai Kopi - UI Modern & Desain Elegan" },
        p3: { title: "Landing Page SaaS - UI Modern & Desain Elegan" },
      },
      contact: {
        title: "Kontak",
        lead: "Terbuka untuk kolaborasi dan tersedia untuk pekerjaan lepas. Silakan menghubungi.",
        whatsappPrimary: "Chat di WhatsApp",
        whatsappSecondary: "Message on WhatsApp",
        portfolioPrimary: "Lihat portofolio",
        portfolioSecondary: "See portfolio",
      },
      footer: { built: "Dibuat dengan HTML, CSS & JS." },
    },
  };

  function getByPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc != null ? acc[key] : undefined;
    }, obj);
  }

  function applyLang(lang) {
    if (lang !== "id" && lang !== "en") lang = "en";
    var bundle = STR[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var val = getByPath(bundle, key);
      if (typeof val === "string") el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!key) return;
      var val = getByPath(bundle, key);
      if (typeof val === "string") el.setAttribute("alt", val);
    });

    document.querySelectorAll("[data-lang]").forEach(function (el) {
      var lg = el.getAttribute("data-lang");
      el.hidden = lg !== lang;
    });

    try {
      localStorage.setItem("siteLang", lang);
    } catch (e) {}

    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-set") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  var stored =
    typeof localStorage !== "undefined" ? localStorage.getItem("siteLang") : null;
  applyLang(stored === "id" ? "id" : "en");

  document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-set") || "en");
    });
  });

  document.documentElement.classList.add("anim-ready");

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  var prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var fadeEls = document.querySelectorAll("[data-fade]");
  fadeEls.forEach(function (el) {
    el.classList.add("js-ready");
  });

  if (!prefersReduced) {
    requestAnimationFrame(function () {
      fadeEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var revealSelector = "[data-reveal], [data-reveal-child]";
  var revealEls = document.querySelectorAll(revealSelector);

  var workCards = document.querySelectorAll(".work-card[data-reveal-child]");
  workCards.forEach(function (card, i) {
    card.style.setProperty("--i", String(i));
  });

  var skillCards = document.querySelectorAll(".skill-card[data-reveal-child]");
  skillCards.forEach(function (card, i) {
    card.style.setProperty("--i", String(i));
  });

  if (prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add("is-in-view");
    });
    var footer = document.querySelector(".fade-footer");
    if (footer) footer.classList.add("is-visible");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove("is-out-view");
          el.classList.add("is-in-view");
        } else {
          el.classList.remove("is-in-view");
          el.classList.add("is-out-view");
        }
      });
    },
    {
      root: null,
      rootMargin: "-8% 0px -8% 0px",
      threshold: 0.08,
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  var footer = document.querySelector(".fade-footer");
  if (footer) {
    var footerObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) footer.classList.add("is-visible");
          else footer.classList.remove("is-visible");
        });
      },
      { threshold: 0.2 }
    );
    footerObs.observe(footer);
  }
})();
