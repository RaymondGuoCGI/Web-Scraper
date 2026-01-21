# Practice + Module Detail + Bilingual Home Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a practice/projects page, a module detail page, and bilingual home content switching.

**Architecture:** Extend existing static pages and `app.js` renderers to load from `data/modules.json`. Add a simple i18n layer for home content using `data-i18n` attributes. Use querystring `?id=` for module detail.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

### Task 1: Add practice page skeleton and nav link

**Files:**
- Create: `public/practice.html`
- Modify: `public/index.html`
- Modify: `public/path.html`
- Modify: `public/concepts.html`
- Modify: `public/assessment.html`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/practice.html` exists
- `public/practice.html` contains `data-page="practice"`
- `public/assets/app.js` contains `renderPractice(`
- Nav in `public/index.html` includes `practice.html`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing public/practice.html"

**Step 3: Write minimal implementation**

Add `practice.html` with a container `<div id="practiceList"></div>` and a nav link to Practice.  
Add the same nav link to other pages.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/*.html scripts/validate-ui.mjs
git commit -m "feat: add practice page skeleton"
```

### Task 2: Render exercises and projects on practice page

**Files:**
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/assets/app.js` contains `renderPractice(`
- `public/assets/app.js` contains `practiceList`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderPractice()"

**Step 3: Write minimal implementation**

Implement `renderPractice()`:
- Load `data/modules.json`
- For each module, render exercises (titles + prompts) and projects (practical then technical)
- Use language selection for titles and text

Add minimal styling for practice sections, exercise cards, and project cards.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: render practice content"
```

### Task 3: Add module detail page with querystring

**Files:**
- Create: `public/module.html`
- Modify: `public/path.html`
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/module.html` exists and contains `data-page="module"`
- `public/assets/app.js` contains `renderModule(`
- `public/path.html` contains `module.html?id=`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing public/module.html"

**Step 3: Write minimal implementation**

Create `module.html` with a container `<div id="moduleDetail"></div>`.  
Update `renderPath()` to link each module card to `module.html?id=<module id>`.  
Implement `renderModule()` to show module overview, concepts, exercises, and projects for the selected id.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/module.html public/path.html public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add module detail page"
```

### Task 4: Add bilingual content switching for home page

**Files:**
- Modify: `public/index.html`
- Modify: `public/assets/app.js`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/index.html` contains `data-i18n=` attributes
- `public/assets/app.js` contains `applyI18n(`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing applyI18n()"

**Step 3: Write minimal implementation**

Add `data-i18n` keys for home title, subtitle, and feature cards.  
Implement `applyI18n(lang)` with a small in-file dictionary and update textContent.  
Call `applyI18n()` inside `setLanguage()`.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/index.html public/assets/app.js scripts/validate-ui.mjs
git commit -m "feat: add bilingual home copy"
```
