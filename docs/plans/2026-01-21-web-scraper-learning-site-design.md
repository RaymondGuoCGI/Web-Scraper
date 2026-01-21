Web Scraper Learning Site Design
Date: 2026-01-21

Goal
- Build a bilingual (ZH/EN) learning website for web scraping.
- Audience: learners with basic Python/JS knowledge, not total beginners.
- Structure: modular learning path with concepts, exercises, and projects.
- Assessment: quizzes + badges + rubric-based project review.

Non-goals (for v1)
- No backend or user accounts.
- No server-side submission or grading.
- No advanced personalization.

Information Architecture
- Home
- Learning Path
- Key Concepts
- Exercises & Mini Projects
- Assessment & Badges
- Resources & Tools
- About

Module Structure (each module)
- Overview: goals, prerequisites, estimated time (hours range).
- Key Concepts: definition, pitfalls, use cases, glossary (ZH/EN).
- Exercises: basic + integrated, with sample input/output and hints.
- Mini Projects: practical first, then technical.
- Assessment: quiz + rubric checklist.
- Dual route: Python / JavaScript (Node.js) tabs.

Suggested Modules
1) Fundamentals of Web Scraping
2) HTML Parsing and Data Cleaning
3) Requests, Headers, Sessions, Cookies
4) Anti-scraping & Robustness (rate limit, retries, CAPTCHA basics)
5) Concurrency & Performance
6) Storage & Data Quality
7) Distributed Tasks & Scheduling
8) Compliance & Ethics

Projects (per module)
- Practical project first (e.g., news aggregator, price tracker, deduped feed).
- Technical project second (e.g., retry + rate limit, proxy pool, async crawl).
- Each project includes: requirements, acceptance criteria, challenges, extensions.

Assessment System
- Quizzes per module (ZH/EN question sets).
- Rubric dimensions (0-4 each):
  - Requirement completion
  - Code structure & maintainability
  - Robustness / anti-scraping handling
  - Data quality
  - Documentation & reproducibility
- Badges:
  - Module badges for passing quizzes
  - Level badges for project rubric thresholds

Bilingual Strategy
- Global language toggle in header; default to Chinese.
- Page titles: Chinese main + English subtitle.
- Body content uses language toggle rather than mixed paragraphs.

UI & Interactions
- Language toggle, Python/JS tabs, collapsible answers, progress tracker.
- Project checklist with local progress saved in localStorage.
- Accessibility: keyboard navigable, aria labels for toggles.

Data Model (static JSON)
- modules: id, title_zh, title_en, time_estimate, concepts[], exercises[], projects[].
- quizzes: module_id, items (zh/en), scoring rules.
- rubrics: dimension labels, level descriptions, examples.

Error Handling
- If data fails to load: show retry and offline notice.
- If toggle fails: fallback to Chinese/Python.

Testing (minimum)
- JSON schema validation.
- Render snapshot for main routes.
- Basic interaction tests (toggle, tabs, progress save).

Next Steps
- Build page templates and data JSON.
- Implement dual-language and dual-route toggles.
- Add sample modules and initial projects.
