# Concepts Rendering Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Render module concepts on the Key Concepts page from `data/modules.json` with bilingual support.

**Architecture:** Extend the existing `app.js` renderer to load modules and build concept cards grouped by module. Use the page marker `data-page="concepts"` and reuse the language toggle state.

**Tech Stack:** HTML, CSS, vanilla JavaScript.

### Task 1: Add concepts page marker and containers

**Files:**
- Modify: `public/concepts.html`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/concepts.html` contains `data-page="concepts"`
- `public/concepts.html` contains `id="conceptList"`
- `public/assets/app.js` contains `renderConcepts(`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderConcepts()"

**Step 3: Write minimal implementation**

Add `data-page="concepts"` and a container `<div id="conceptList"></div>` to `concepts.html`.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/concepts.html scripts/validate-ui.mjs
git commit -m "feat: add concepts page container"
```

### Task 2: Render concept cards grouped by module

**Files:**
- Modify: `public/assets/app.js`
- Modify: `public/assets/styles.css`
- Modify: `scripts/validate-ui.mjs`

**Step 1: Write the failing test**

Extend `scripts/validate-ui.mjs` to verify:
- `public/assets/app.js` contains `renderConcepts(`
- `public/assets/app.js` contains `conceptList`

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-ui.mjs`  
Expected: FAIL with "Missing renderConcepts()"

**Step 3: Write minimal implementation**

Implement `renderConcepts()`:
- Load `data/modules.json`
- For each module, render module heading (title) and a list of concept cards
- Each concept card shows title, summary, pitfalls, use cases, and terms (based on language)

Add minimal styling in `styles.css` for concept sections and term chips.

Update `renderCurrentPage()` to call `renderConcepts()` when `data-page="concepts"`.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-ui.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add public/assets/app.js public/assets/styles.css scripts/validate-ui.mjs
git commit -m "feat: render concepts from modules"
```
