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

const appJs = fs.readFileSync("public/assets/app.js", "utf8");
assert.ok(appJs.includes("setLanguage("), "Missing setLanguage()");
assert.ok(appJs.includes("localStorage"), "Missing localStorage usage");
assert.ok(appJs.includes("renderPath("), "Missing renderPath()");
assert.ok(appJs.includes("setRoute("), "Missing setRoute()");
assert.ok(appJs.includes("\"route\""), "Missing route localStorage key");
assert.ok(appJs.includes("renderAssessment("), "Missing renderAssessment()");
assert.ok(appJs.includes("renderConcepts("), "Missing renderConcepts()");

const pathHtml = fs.readFileSync("public/path.html", "utf8");
assert.ok(pathHtml.includes("data-page=\"path\""), "Missing data-page=\"path\"");

const assessmentHtml = fs.readFileSync("public/assessment.html", "utf8");
assert.ok(assessmentHtml.includes("data-page=\"assessment\""), "Missing data-page=\"assessment\"");

const conceptsHtml = fs.readFileSync("public/concepts.html", "utf8");
assert.ok(conceptsHtml.includes("data-page=\"concepts\""), "Missing data-page=\"concepts\"");
assert.ok(conceptsHtml.includes("id=\"conceptList\""), "Missing id=\"conceptList\"");

console.log("OK");
