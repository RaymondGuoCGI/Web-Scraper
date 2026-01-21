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
