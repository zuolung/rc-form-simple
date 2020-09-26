let exportPlugin = {};
if (process.env.NODE_ENV === "production") {
  exportPlugin = require("./lib/rcFormSimple.min.js");
} else {
  exportPlugin = require("./lib/rcFormSimple.min.js");
}

module.exports = exportPlugin;