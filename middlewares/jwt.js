//1、导入jsonwebtoken 包
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { secertKey, algorithm } = require("../config");
module.exports = function () {
  // 注册 expressJWT,通过 unless 控制不带api开头的接口不用鉴权
  // 解析出来的用户信息会挂载到 req.user 对象
  return expressJWT({
    secret: secertKey,
    algorithms: [algorithm],
  }).unless({
    path: ['/login'],
  });
};
