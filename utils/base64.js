const fs = require("fs");
const path = require("path");

const base64_decode = (base64Image, file) => {
  var img = Buffer.from(base64Image, "base64");
  const __dirname = path.resolve();
  const newPath = path.join(__dirname, "/uploads/orders", file)
  fs.writeFileSync(newPath, img);
  console.log("******** File created from base64 encoded string ********");
  return `/uploads/orders/${file}`
};
module.exports = {
  base64_decode,
};
