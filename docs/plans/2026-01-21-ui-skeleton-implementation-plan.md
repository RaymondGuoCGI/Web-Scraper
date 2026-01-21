# UI Skeleton Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a static multi-page site skeleton that reads the JSON content and renders bilingual module cards with Python/JS toggles.

**Architecture:** Use plain HTML/CSS/JS with a small data loader that reads JSON files and hydrates templates on each page. Keep data in `data/` and UI assets in `public/`. Use querystring or localStorage to persist language and route selection.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

### Task 1: Add base HTML pages and shared layout

**Files:**
- Create: `public/index.html`
- Create: `public/path.html`
- Create: `public/concepts.html`
- Create: `public/assessment.html`
- Create: `public/assets/styles.css`
- Create: `public/assets/app.js`

**Step 1: Write the failing test**

Create a validation script `scripts/validate-ui.mjs` with required file checks:

```js
import fs from "fs";
import assert from "assert";

const requiredFiles = [
  "public/index.html",
  "public/path.html",
  "public/concepts.html",
  "public/assessment.html",
  "public/assets/styles.css",
  "public/assets/app.js"
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `Missing ${file}`);
}

console.log("OK");
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing public/index.html"

**Step 3: Write minimal implementation**

Create the HTML files with shared header/nav placeholders and `<script src="assets/app.js"></script>`.

Create `styles.css` with CSS variables, base typography, and layout.

Create `app.js` with a `ready()` no-op and basic language toggle placeholder.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public scripts/validate-ui.mjs
git commit -m "feat: add static UI skeleton"
```

### Task 2: Implement bilingual toggle and persist state

**Files:**
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/assets/app.js` contains `setLanguage(`
- `public/assets/app.js` contains `localStorage`

Example:

```js
const appJs = fs.readFileSync("public/assets/app.js", "utf8");
assert.ok(appJs.includes("setLanguage("), "Missing setLanguage()");
assert.ok(appJs.includes("localStorage"), "Missing localStorage usage");
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing setLanguage()"

**Step 3: Write minimal implementation**

Add `setLanguage(lang)` and `getLanguage()` to store in localStorage and update `data-lang` on `<html>`.  
Add two toggle buttons in header that call `setLanguage("zh")` / `setLanguage("en")`.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add bilingual toggle"
```

### Task 3: Render module cards from JSON on Learning Path page

**Files:**
- Modify: `public/path.html`
- Modify: `public/assets/app.js`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/path.html` contains `data-page="path"`
- `public/assets/app.js` contains `renderPath(`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderPath()"

**Step 3: Write minimal implementation**

Add `renderPath()` that:
- Loads `data/modules.json`
- Renders each module card with title (based on language)
- Shows time estimate and module id

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/path.html public/assets/app.js scripts/validate-ui.mjs
git commit -m "feat: render learning path modules"
```

### Task 4: Add Python/JS route tabs (UI only)

**Files:**
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/assets/app.js` contains `setRoute(`
- `public/assets/app.js` contains `localStorage` reference for route

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing setRoute()"

**Step 3: Write minimal implementation**

Add `setRoute(route)` and `getRoute()` that persist `python` / `js` in localStorage and update `data-route` on `<html>`.  
Add tabs in header with active state based on current route.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add route tabs"
```

### Task 5: Add Assessment page rendering from rubrics + quizzes (basic)

**Files:**
- Modify: `public/assessment.html`
- Modify: `public/assets/app.js`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/assessment.html` contains `data-page="assessment"`
- `public/assets/app.js` contains `renderAssessment(`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderAssessment()"

**Step 3: Write minimal implementation**

Render rubric dimensions and quiz counts per module.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assessment.html public/assets/app.js scripts/validate-ui.mjs
git commit -m "feat: render assessment overview"
```
