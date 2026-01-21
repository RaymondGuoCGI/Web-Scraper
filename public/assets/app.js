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

const renderCurrentPage = () => {
  const page = document.querySelector("[data-page]");
  if (!page) {
    return;
  }

  if (page.dataset.page === "path") {
    renderPath();
  }
};

ready(() => {
  const initialLang = getLanguage();
  setLanguage(initialLang);

  document.querySelectorAll(".toggle[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
