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

const i18n = {
  zh: {
    home_title: "循序渐进学习网络爬虫",
    home_subtitle: "关键概念、练习与项目，配套中英双语。",
    home_cta: "开始学习",
    card_concepts_title: "关键概念",
    card_concepts_desc: "清晰解释、常见误区与术语。",
    card_exercises_title: "练习",
    card_exercises_desc: "带输入输出示例的动手任务。",
    card_projects_title: "小项目",
    card_projects_desc: "实用型先行，技术型跟进。",
    card_assessment_title: "评估",
    card_assessment_desc: "测验、Rubric 与徽章体系。"
  },
  en: {
    home_title: "Learn Web Scraping, Step by Step",
    home_subtitle: "Concepts, practice, and projects with bilingual support.",
    home_cta: "Start Learning",
    card_concepts_title: "Concepts",
    card_concepts_desc: "Clear explanations, pitfalls, and terms.",
    card_exercises_title: "Exercises",
    card_exercises_desc: "Hands-on tasks with input/output examples.",
    card_projects_title: "Mini Projects",
    card_projects_desc: "Practical first, technical next.",
    card_assessment_title: "Assessment",
    card_assessment_desc: "Quizzes, rubrics, and badges."
  }
};

const applyI18n = (lang) => {
  const dict = i18n[lang] || i18n.zh;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });
};

const setLanguage = (lang) => {
  localStorage.setItem("lang", lang);
  document.documentElement.dataset.lang = lang;
  updateLanguageToggle(lang);
  applyI18n(lang);
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
        <a class="module-card" href="module.html?id=${mod.id}">
          <h3>${title}</h3>
          <div class="module-meta">${mod.time_estimate}</div>
          <div class="module-meta">${mod.id}</div>
        </a>
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
          const hintLabel = lang === "en" ? "Hints" : "提示";
          const solutionLabel = lang === "en" ? "Solution" : "参考解法";
          const inputLabel = lang === "en" ? "Input" : "输入";
          const outputLabel = lang === "en" ? "Output" : "输出";
          const hints = lang === "en" ? ex.hints_en : ex.hints_zh;
          const solution = lang === "en" ? ex.solution_en : ex.solution_zh;
          return `
            <article class="exercise-card">
              <h3>${title}</h3>
              <p>${prompt}</p>
              <details class="exercise-details">
                <summary>${hintLabel}</summary>
                <div class="detail-grid">
                  <div>
                    <strong>${inputLabel}:</strong>
                    <pre>${ex.input_example}</pre>
                  </div>
                  <div>
                    <strong>${outputLabel}:</strong>
                    <pre>${ex.output_example}</pre>
                  </div>
                </div>
                <p>${hints}</p>
                <p><strong>${solutionLabel}:</strong> ${solution}</p>
              </details>
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

const renderModule = async () => {
  const moduleDetail = document.getElementById("moduleDetail");
  if (!moduleDetail) {
    return;
  }

  const modules = await loadJson(["../data/modules.json", "data/modules.json"]);
  if (!modules) {
    moduleDetail.innerHTML = "<div class=\"card\">Failed to load module.</div>";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const moduleId = params.get("id");
  const moduleData = modules.find((mod) => mod.id === moduleId) || modules[0];
  if (!moduleData) {
    moduleDetail.innerHTML = "<div class=\"card\">Module not found.</div>";
    return;
  }

  const lang = getLanguage();
  const moduleTitle = lang === "en" ? moduleData.title_en : moduleData.title_zh;
  const concepts = moduleData.concepts || [];
  const exercises = moduleData.exercises || [];
  const projects = moduleData.projects || [];

  const conceptItems = concepts
    .map((concept) => {
      const title = lang === "en" ? concept.title_en : concept.title_zh;
      const summary = lang === "en" ? concept.summary_en : concept.summary_zh;
      return `
        <div class="card">
          <h3>${title}</h3>
          <p>${summary}</p>
        </div>
      `;
    })
    .join("");

  const exerciseItems = exercises
    .map((ex) => {
      const title = lang === "en" ? ex.title_en : ex.title_zh;
      const prompt = lang === "en" ? ex.prompt_en : ex.prompt_zh;
      const hints = lang === "en" ? ex.hints_en : ex.hints_zh;
      const solution = lang === "en" ? ex.solution_en : ex.solution_zh;
      return `
        <div class="card">
          <h3>${title}</h3>
          <p>${prompt}</p>
          <details class="exercise-details">
            <summary>${lang === "en" ? "Details" : "细节"}</summary>
            <div class="detail-grid">
              <div>
                <strong>${lang === "en" ? "Input" : "输入"}:</strong>
                <pre>${ex.input_example}</pre>
              </div>
              <div>
                <strong>${lang === "en" ? "Output" : "输出"}:</strong>
                <pre>${ex.output_example}</pre>
              </div>
            </div>
            <p>${hints}</p>
            <p><strong>${lang === "en" ? "Solution" : "参考解法"}:</strong> ${solution}</p>
          </details>
        </div>
      `;
    })
    .join("");

  const projectItems = projects
    .map((project) => {
      const title = lang === "en" ? project.title_en : project.title_zh;
      const reqs = lang === "en" ? project.requirements_en : project.requirements_zh;
      const reqItems = (reqs || []).map((item) => `<li>${item}</li>`).join("");
      return `
        <div class="card">
          <h3>${title}</h3>
          <ul>${reqItems}</ul>
        </div>
      `;
    })
    .join("");

  moduleDetail.innerHTML = `
    <section class="module-section">
      <h2>${moduleTitle}</h2>
      <div class="module-meta">${moduleData.time_estimate}</div>
    </section>
    <section class="module-section">
      <h3>${lang === "en" ? "Concepts" : "关键概念"}</h3>
      <div class="concept-grid">${conceptItems}</div>
    </section>
    <section class="module-section">
      <h3>${lang === "en" ? "Exercises" : "练习"}</h3>
      <div class="concept-grid">${exerciseItems}</div>
    </section>
    <section class="module-section">
      <h3>${lang === "en" ? "Projects" : "项目"}</h3>
      <div class="concept-grid">${projectItems}</div>
    </section>
  `;

  const quizLink = document.querySelector("[data-template='quiz.html?id=']");
  if (quizLink) {
    quizLink.setAttribute("href", `quiz.html?id=${moduleData.id}`);
  }
};

const renderQuiz = async () => {
  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");
  const quizSubmit = document.getElementById("quizSubmit");
  if (!quizForm || !quizResult || !quizSubmit) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const moduleId = params.get("id");

  const quizzes = await loadJson(["../data/quizzes.json", "data/quizzes.json"]);
  if (!quizzes) {
    quizForm.innerHTML = "<div class=\"card\">Failed to load quiz.</div>";
    return;
  }

  const quiz = quizzes.find((item) => item.module_id === moduleId) || quizzes[0];
  if (!quiz) {
    quizForm.innerHTML = "<div class=\"card\">Quiz not found.</div>";
    return;
  }

  const lang = getLanguage();
  quizForm.innerHTML = quiz.items
    .map((item, index) => {
      const question = lang === "en" ? item.question_en : item.question_zh;
      const options = lang === "en" ? item.options_en : item.options_zh;
      const optionsMarkup = options
        .map((opt, optIndex) => {
          return `
            <label class="quiz-option">
              <input type="radio" name="q${index}" value="${optIndex}" />
              <span>${opt}</span>
            </label>
          `;
        })
        .join("");
      return `
        <div class="quiz-question">
          <h3>${index + 1}. ${question}</h3>
          <div class="quiz-options">${optionsMarkup}</div>
        </div>
      `;
    })
    .join("");

  quizSubmit.onclick = () => {
    let correct = 0;
    quiz.items.forEach((item, index) => {
      const selected = quizForm.querySelector(`input[name=\"q${index}\"]:checked`);
      if (selected && parseInt(selected.value, 10) === item.answer) {
        correct += 1;
      }
    });

    const total = quiz.items.length;
    const score = total ? Math.round((correct / total) * 100) : 0;
    const scoreKey = `quiz:${moduleId || "default"}`;
    localStorage.setItem(scoreKey, String(score));

    quizResult.innerHTML = `<strong>Score:</strong> ${score}% (${correct}/${total})`;
  };
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

  if (page.dataset.page === "module") {
    renderModule();
  }

  if (page.dataset.page === "quiz") {
    renderQuiz();
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
