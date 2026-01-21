import fs from "fs";
import assert from "assert";

const requiredFiles = [
  "public/index.html",
  "public/path.html",
  "public/concepts.html",
  "public/assessment.html",
  "public/practice.html",
  "public/module.html",
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
assert.ok(appJs.includes("conceptList"), "Missing conceptList usage");
assert.ok(appJs.includes("renderPractice("), "Missing renderPractice()");
assert.ok(appJs.includes("practiceList"), "Missing practiceList usage");
assert.ok(appJs.includes("renderModule("), "Missing renderModule()");

const pathHtml = fs.readFileSync("public/path.html", "utf8");
assert.ok(pathHtml.includes("data-page=\"path\""), "Missing data-page=\"path\"");
assert.ok(pathHtml.includes("practice.html"), "Missing practice link in path.html");
assert.ok(pathHtml.includes("module.html?id="), "Missing module detail link in path.html");

const assessmentHtml = fs.readFileSync("public/assessment.html", "utf8");
assert.ok(assessmentHtml.includes("data-page=\"assessment\""), "Missing data-page=\"assessment\"");

const conceptsHtml = fs.readFileSync("public/concepts.html", "utf8");
assert.ok(conceptsHtml.includes("data-page=\"concepts\""), "Missing data-page=\"concepts\"");
assert.ok(conceptsHtml.includes("id=\"conceptList\""), "Missing id=\"conceptList\"");

const practiceHtml = fs.readFileSync("public/practice.html", "utf8");
assert.ok(practiceHtml.includes("data-page=\"practice\""), "Missing data-page=\"practice\"");
assert.ok(practiceHtml.includes("id=\"practiceList\""), "Missing id=\"practiceList\"");

const moduleHtml = fs.readFileSync("public/module.html", "utf8");
assert.ok(moduleHtml.includes("data-page=\"module\""), "Missing data-page=\"module\"");
assert.ok(moduleHtml.includes("id=\"moduleDetail\""), "Missing id=\"moduleDetail\"");

const indexHtml = fs.readFileSync("public/index.html", "utf8");
assert.ok(indexHtml.includes("practice.html"), "Missing practice link in index.html");

console.log("OK");
