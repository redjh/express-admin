const fs = require("fs");
const path = require("path");

function addRoutes(app) {
  const pathname = path.join(__dirname, "./routes");
  const files = fs.readdirSync(pathname);
  files.forEach(file => {
    file = file.split(".")[0];
    const filePath = path.join(pathname, file);
    const { prefix, router } = require(filePath);
    console.log({ route: `/${file}` });
    app.use(`/${file}`, router);
  });
}
module.exports = addRoutes;
