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

console.log("OK");
