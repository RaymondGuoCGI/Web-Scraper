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

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

const modules = readJson("data/modules.json");
assert.ok(Array.isArray(modules), "modules.json must be an array");
assert.ok(modules.length > 0, "Expected at least 1 module");

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
}

console.log("OK");
