const fs = require("fs");

let file = fs.readFileSync("./staj.pdf", { encoding: "binary" });
fs.writeFileSync("./staj3.pdf", file, { encoding: "binary" });
