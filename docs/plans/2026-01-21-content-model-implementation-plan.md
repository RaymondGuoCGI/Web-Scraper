# Content Model & Seed Data Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Define a static JSON content model and seed it with 1-2 example modules for the web scraping learning site.

**Architecture:** Store content in plain JSON files under a `data/` folder and validate them with a small Node script. The script acts as a lightweight test gate and ensures bilingual fields and required structures exist.

**Tech Stack:** Node.js (built-in `fs` and `assert`), static JSON files.

### Task 1: Add a failing validation script scaffold

**Files:**
- Create: `scripts/validate-data.mjs`

**Step 1: Write the failing test**

```js
// scripts/validate-data.mjs
import fs from "fs";
import assert from "assert";

const requiredFiles = [
  "data/modules.json",
  "data/quizzes.json",
  "data/rubrics.json"
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(file), `Missing ${file}`);
}

console.log("OK");
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "Missing data/modules.json"

**Step 3: Commit**

```bash
git add scripts/validate-data.mjs
git commit -m "test: add data validation scaffold"
```

### Task 2: Create JSON data files with minimal valid structure

**Files:**
- Create: `data/modules.json`
- Create: `data/quizzes.json`
- Create: `data/rubrics.json`

**Step 1: Write the failing test**

Add schema checks to `scripts/validate-data.mjs`:

```js
function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const modules = readJson("data/modules.json");
assert.ok(Array.isArray(modules), "modules.json must be an array");
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "modules.json must be an array"

**Step 3: Write minimal implementation**

Create `data/modules.json`:

```json
[]
```

Create `data/quizzes.json`:

```json
[]
```

Create `data/rubrics.json`:

```json
{
  "dimensions": []
}
```

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-data.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add data/modules.json data/quizzes.json data/rubrics.json scripts/validate-data.mjs
git commit -m "feat: add baseline data model files"
```

### Task 3: Expand validation for bilingual fields and required keys

**Files:**
- Modify: `scripts/validate-data.mjs`

**Step 1: Write the failing test**

Add checks:

```js
const requiredModuleKeys = ["id", "title_zh", "title_en", "time_estimate", "concepts", "exercises", "projects"];
for (const mod of modules) {
  for (const key of requiredModuleKeys) {
    assert.ok(mod[key] !== undefined, `Module missing ${key}`);
  }
  assert.ok(Array.isArray(mod.concepts), "concepts must be array");
  assert.ok(Array.isArray(mod.exercises), "exercises must be array");
  assert.ok(Array.isArray(mod.projects), "projects must be array");
}
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "Module missing id"

**Step 3: Write minimal implementation**

Seed `data/modules.json` with one module (Fundamentals) that includes bilingual fields, 2 concepts, 2 exercises, and 2 projects (practical then technical).

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-data.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add data/modules.json scripts/validate-data.mjs
git commit -m "feat: seed fundamentals module data"
```

### Task 4: Add second module and rubric + quiz seeds

**Files:**
- Modify: `data/modules.json`
- Modify: `data/quizzes.json`
- Modify: `data/rubrics.json`
- Modify: `scripts/validate-data.mjs`

**Step 1: Write the failing test**

Extend validation to require:
- At least 2 modules
- `quizzes.json` is array with `module_id` matching module ids
- `rubrics.json.dimensions` includes 5 required dimensions

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "Expected at least 2 modules"

**Step 3: Write minimal implementation**

Add module 2 (Parsing & Cleaning), with 2 concepts, 2 exercises, 2 projects.  
Seed `quizzes.json` with 3-5 items per module (ZH/EN).  
Seed `rubrics.json` with 5 dimensions and 0-4 level text.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-data.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add data/modules.json data/quizzes.json data/rubrics.json scripts/validate-data.mjs
git commit -m "feat: add second module and assessment seeds"
```

### Task 5: Document data model fields

**Files:**
- Create: `docs/data-model.md`

**Step 1: Write the failing test**

Add check in `scripts/validate-data.mjs`:

```js
assert.ok(fs.existsSync("docs/data-model.md"), "Missing docs/data-model.md");
```

**Step 2: Run test to verify it fails**

Run: `node scripts/validate-data.mjs`  
Expected: FAIL with "Missing docs/data-model.md"

**Step 3: Write minimal implementation**

Create `docs/data-model.md` describing the JSON schema, required fields, and bilingual conventions.

**Step 4: Run test to verify it passes**

Run: `node scripts/validate-data.mjs`  
Expected: PASS with "OK"

**Step 5: Commit**

```bash
git add docs/data-model.md scripts/validate-data.mjs
git commit -m "docs: add data model reference"
```
