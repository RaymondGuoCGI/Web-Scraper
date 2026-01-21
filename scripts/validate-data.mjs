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

assert.ok(fs.existsSync("docs/data-model.md"), "Missing docs/data-model.md");

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const modules = readJson("data/modules.json");
assert.ok(Array.isArray(modules), "modules.json must be an array");
assert.ok(modules.length > 0, "Expected at least 1 module");
assert.ok(modules.length >= 4, "Expected at least 4 modules");

const requiredModuleKeys = [
  "id",
  "title_zh",
  "title_en",
  "time_estimate",
  "concepts",
  "exercises",
  "projects"
];

for (const mod of modules) {
  for (const key of requiredModuleKeys) {
    assert.ok(mod[key] !== undefined, `Module missing ${key}`);
  }
  assert.ok(Array.isArray(mod.concepts), "concepts must be array");
  assert.ok(Array.isArray(mod.exercises), "exercises must be array");
  assert.ok(Array.isArray(mod.projects), "projects must be array");
  for (const ex of mod.exercises) {
    assert.ok(ex.solution_zh, "Missing solution_zh");
    assert.ok(ex.solution_en, "Missing solution_en");
  }
}

const moduleIds = new Set(modules.map((m) => m.id));

const quizzes = readJson("data/quizzes.json");
assert.ok(Array.isArray(quizzes), "quizzes.json must be an array");
for (const quiz of quizzes) {
  assert.ok(quiz.module_id, "Quiz missing module_id");
  assert.ok(moduleIds.has(quiz.module_id), `Unknown module_id: ${quiz.module_id}`);
}

const rubrics = readJson("data/rubrics.json");
assert.ok(rubrics && typeof rubrics === "object", "rubrics.json must be an object");
assert.ok(Array.isArray(rubrics.dimensions), "rubrics.dimensions must be an array");

const requiredDimensions = [
  "completion",
  "structure",
  "robustness",
  "data_quality",
  "documentation"
];

const dimensionIds = new Set(rubrics.dimensions.map((d) => d.id));
for (const dim of requiredDimensions) {
  assert.ok(dimensionIds.has(dim), `Missing rubric dimension: ${dim}`);
}

console.log("OK");
