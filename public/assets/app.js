const ready = (fn) => {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const setLanguage = (lang) => {
  localStorage.setItem("lang", lang);
  document.documentElement.dataset.lang = lang;
  updateLanguageToggle(lang);
};

const getLanguage = () => {
  return localStorage.getItem("lang") || "zh";
};

const updateLanguageToggle = (lang) => {
  document.querySelectorAll(".toggle[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
};

ready(() => {
  const initialLang = getLanguage();
  setLanguage(initialLang);

  document.querySelectorAll(".toggle[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
