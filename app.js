const express = require("express");
const { jwt, errorHandler } = require("./middlewares");

const app = express();
const port = 5000;

app.disable("etag");

// 接收application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// 接收application/json
app.use(express.json());

app.use((req, res, next) => {
  console.log("url:", req.url, req.params);
  next();
});

// 使用jwt鉴权
app.use(jwt());
// 挂载路由
const addRoutes = require("./router");
addRoutes(app);

// 捕获异常
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
