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

const renderPractice = async () => {
  const practiceList = document.getElementById("practiceList");
  if (!practiceList) {
    return;
  }

  const modules = await loadJson(["../data/modules.json", "data/modules.json"]);
  if (!modules) {
    practiceList.innerHTML = "<div class=\"card\">Failed to load practice.</div>";
    return;
  }

  const lang = getLanguage();
  practiceList.innerHTML = modules
    .map((mod) => {
      const moduleTitle = lang === "en" ? mod.title_en : mod.title_zh;
      const exercises = mod.exercises || [];
      const projects = mod.projects || [];
      const practical = projects.filter((p) => p.type === "practical");
      const technical = projects.filter((p) => p.type === "technical");

      const exerciseCards = exercises
        .map((ex) => {
          const title = lang === "en" ? ex.title_en : ex.title_zh;
          const prompt = lang === "en" ? ex.prompt_en : ex.prompt_zh;
          return `
            <article class="exercise-card">
              <h3>${title}</h3>
              <p>${prompt}</p>
            </article>
          `;
        })
        .join("");

      const renderProject = (project) => {
        const title = lang === "en" ? project.title_en : project.title_zh;
        const reqs = lang === "en" ? project.requirements_en : project.requirements_zh;
        const reqItems = (reqs || []).map((item) => `<li>${item}</li>`).join("");
        return `
          <article class="project-card">
            <h3>${title}</h3>
            <ul>${reqItems}</ul>
          </article>
        `;
      };

      const practicalCards = practical.map(renderProject).join("");
      const technicalCards = technical.map(renderProject).join("");

      return `
        <section class="practice-section">
          <h2>${moduleTitle}</h2>
          <div class="practice-block">
            <h3>${lang === "en" ? "Exercises" : "练习"}</h3>
            <div class="practice-grid">${exerciseCards}</div>
          </div>
          <div class="practice-block">
            <h3>${lang === "en" ? "Practical Projects" : "实用型项目"}</h3>
            <div class="practice-grid">${practicalCards}</div>
          </div>
          <div class="practice-block">
            <h3>${lang === "en" ? "Technical Projects" : "技术型项目"}</h3>
            <div class="practice-grid">${technicalCards}</div>
          </div>
        </section>
      `;
    })
    .join("");
};

const renderConcepts = async () => {
  const conceptList = document.getElementById("conceptList");
  if (!conceptList) {
    return;
  }

  const modules = await loadJson(["../data/modules.json", "data/modules.json"]);
  if (!modules) {
    conceptList.innerHTML = "<div class=\"card\">Failed to load concepts.</div>";
    return;
  }

  const lang = getLanguage();
  conceptList.innerHTML = modules
    .map((mod) => {
      const moduleTitle = lang === "en" ? mod.title_en : mod.title_zh;
      const concepts = mod.concepts || [];
      const conceptCards = concepts
        .map((concept) => {
          const title = lang === "en" ? concept.title_en : concept.title_zh;
          const summary = lang === "en" ? concept.summary_en : concept.summary_zh;
          const pitfalls = lang === "en" ? concept.pitfalls_en : concept.pitfalls_zh;
          const useCases = lang === "en" ? concept.use_cases_en : concept.use_cases_zh;
          const terms = (concept.terms || [])
            .map((term) => {
              const label = lang === "en" ? term.en : term.zh;
              return `<span class="term">${label}</span>`;
            })
            .join("");

          return `
            <article class="concept-card">
              <h3>${title}</h3>
              <p>${summary}</p>
              <div class="concept-meta">
                <strong>${lang === "en" ? "Pitfalls" : "常见误区"}:</strong> ${pitfalls}
              </div>
              <div class="concept-meta">
                <strong>${lang === "en" ? "Use cases" : "应用场景"}:</strong> ${useCases}
              </div>
              <div class="term-row">${terms}</div>
            </article>
          `;
        })
        .join("");

      return `
        <section class="module-section">
          <h2>${moduleTitle}</h2>
          <div class="concept-grid">${conceptCards}</div>
        </section>
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

  if (page.dataset.page === "concepts") {
    renderConcepts();
  }

  if (page.dataset.page === "practice") {
    renderPractice();
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
