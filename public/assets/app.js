const ready = (fn) => {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const getLanguage = () => {
  return localStorage.getItem("lang") || "zh";
};

const updateLanguageToggle = (lang) => {
  document.querySelectorAll(".toggle[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
};

const setLanguage = (lang) => {
  localStorage.setItem("lang", lang);
  document.documentElement.dataset.lang = lang;
  updateLanguageToggle(lang);
  renderCurrentPage();
};

const getRoute = () => {
  return localStorage.getItem("route") || "python";
};

const updateRouteToggle = (route) => {
  document.querySelectorAll(".toggle[data-route]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.route === route);
  });
};

const setRoute = (route) => {
  localStorage.setItem("route", route);
  document.documentElement.dataset.route = route;
  updateRouteToggle(route);
  renderCurrentPage();
};

const loadJson = async (paths) => {
  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (!res.ok) {
        continue;
      }
      return await res.json();
    } catch (err) {
      // Try next path.
    }
  }
  return null;
};

const renderPath = async () => {
  const grid = document.getElementById("moduleGrid");
  if (!grid) {
    return;
  }

  const modules = await loadJson(["../data/modules.json", "data/modules.json"]);
  if (!modules) {
    grid.innerHTML = "<div class=\"card\">Failed to load modules.</div>";
    return;
  }

  const lang = getLanguage();
  grid.innerHTML = modules
    .map((mod) => {
      const title = lang === "en" ? mod.title_en : mod.title_zh;
      return `
        <article class="module-card">
          <h3>${title}</h3>
          <div class="module-meta">${mod.time_estimate}</div>
          <div class="module-meta">${mod.id}</div>
        </article>
      `;
    })
    .join("");
};

const renderAssessment = async () => {
  const rubricList = document.getElementById("rubricList");
  const quizSummary = document.getElementById("quizSummary");
  if (!rubricList || !quizSummary) {
    return;
  }

  const rubrics = await loadJson(["../data/rubrics.json", "data/rubrics.json"]);
  const quizzes = await loadJson(["../data/quizzes.json", "data/quizzes.json"]);
  const modules = await loadJson(["../data/modules.json", "data/modules.json"]);

  if (!rubrics || !quizzes || !modules) {
    rubricList.innerHTML = "<div class=\"card\">Failed to load rubrics.</div>";
    quizSummary.innerHTML = "<div class=\"card\">Failed to load quizzes.</div>";
    return;
  }

  const lang = getLanguage();
  rubricList.innerHTML = rubrics.dimensions
    .map((dim) => {
      const title = lang === "en" ? dim.title_en : dim.title_zh;
      const levelCount = Array.isArray(dim.levels) ? dim.levels.length : 0;
      return `
        <div class="card">
          <h3>${title}</h3>
          <div class="module-meta">Levels: ${levelCount}</div>
        </div>
      `;
    })
    .join("");

  const quizCounts = quizzes.reduce((acc, quiz) => {
    acc[quiz.module_id] = (acc[quiz.module_id] || 0) + quiz.items.length;
    return acc;
  }, {});

  quizSummary.innerHTML = modules
    .map((mod) => {
      const title = lang === "en" ? mod.title_en : mod.title_zh;
      const count = quizCounts[mod.id] || 0;
      return `
        <article class="module-card">
          <h3>${title}</h3>
          <div class="module-meta">Questions: ${count}</div>
        </article>
      `;
    })
    .join("");
};

const renderCurrentPage = () => {
  const page = document.querySelector("[data-page]");
  if (!page) {
    return;
  }

  if (page.dataset.page === "path") {
    renderPath();
  }

  if (page.dataset.page === "assessment") {
    renderAssessment();
  }
};

ready(() => {
  const initialRoute = getRoute();
  setRoute(initialRoute);

  const initialLang = getLanguage();
  setLanguage(initialLang);

  document.querySelectorAll(".toggle[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.querySelectorAll(".toggle[data-route]").forEach((btn) => {
    btn.addEventListener("click", () => setRoute(btn.dataset.route));
  });
});
