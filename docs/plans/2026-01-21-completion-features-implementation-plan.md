# Completion Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the learning site with exercise details, interactive quizzes, progress/badges, and richer module data.

**Architecture:** Extend the existing JSON data model with exercise solutions and add UI renderers for practice, module detail, and quiz pages. Store completion state (quiz scores, checklist progress, badges) in localStorage.

**Tech Stack:** HTML, CSS, vanilla JavaScript, JSON data.

### Task 1: Extend data model with exercise solutions and add two more modules

**Files:**
- Modify: `data/modules.json`
- Modify: `scripts/validate-data.mjs`

**Step 1: Write the failing test**

Add checks in `scripts/validate-data.mjs`:
- Each exercise has `solution_zh` and `solution_en`
- At least 4 modules exist

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "Missing solution_zh" or "Expected at least 4 modules"

**Step 3: Write minimal implementation**

Add solution fields to existing exercises and add 2 new modules:
- Requests/Sessions
- Concurrency & Performance

Each new module should have 2 concepts, 2 exercises, 2 projects.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-data.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add data/modules.json scripts/validate-data.mjs
git commit -m "feat: extend modules with solutions and new modules"
```

### Task 2: Render exercise details (IO, hints, solutions) with collapsible panels

**Files:**
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to require:
- `renderPractice` includes `details` element string
- `renderModule` includes `solution` text

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing details" or "Missing solution"

**Step 3: Write minimal implementation**

Use `<details>` blocks to show input/output/hints/solutions for exercises on both Practice page and Module detail page.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add exercise details panels"
```

### Task 3: Add interactive quiz page and scoring

**Files:**
- Create: `public/quiz.html`
- Modify: `public/path.html`
- Modify: `public/module.html`
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to require:
- `public/quiz.html` exists with `data-page="quiz"`
- `renderQuiz(` in `app.js`
- `quiz.html?id=` links from module detail

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing public/quiz.html"

**Step 3: Write minimal implementation**

Create quiz page with question list, submit button, and score output.  
Save scores to localStorage keyed by module id.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/quiz.html public/module.html public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add quiz page and scoring"
```

### Task 4: Add progress and badge display

**Files:**
- Modify: `public/assessment.html`
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to require:
- `assessment.html` contains `id="progressBoard"`
- `app.js` contains `renderProgress(`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderProgress()"

**Step 3: Write minimal implementation**

Implement `renderProgress()` to show:
- Quiz completion per module
- Badge earned when quiz score >= 70% and practice checklist complete

Add a simple badge card UI.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assessment.html public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: add progress and badges"
```
