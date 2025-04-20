const child_process = require("child_process");
const fs = require("fs");

const COMMIT_ID = child_process.execSync("git rev-parse HEAD").toString().trim().slice(0, 7);
const { version, version_tag } = require("../package.json");
const Year = new Date().getFullYear();
const tag = version_tag;

console.log(`
> Version: ${version}
> Commit: ${COMMIT_ID}
> Year: ${Year}
> Tag: ${tag || "None"}
`);

let fullVersion;

if (tag) {
   fullVersion = `${Year}.${version}-${tag}`;
} else {
    fullVersion = `${Year}.${version}`;
}
console.log(`> Full version: ${fullVersion}`);
const writeString = `export const version = ${fullVersion}; export const commit_id = ${COMMIT_ID};`;
const outfile = "/build/version.js";
console.log(`Writing version to ${outfile}...`);
fs.writeFile(`.${outfile}`, writeString, { encoding: "utf-8" }, err => {
    if (err) {
        return console.error(err);
    }
});
console.log("Done!");