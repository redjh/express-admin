module.exports = function (err, req, res, next) {
  console.log("服务器异常：", err);
  if (err.name === "UnauthorizedError") {
    return res.status(401).send("token不合法");
  }
  res.status(500).send("服务器异常");
};
