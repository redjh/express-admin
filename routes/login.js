const router = require("express").Router();
const { ResponseBody, token, handleAuthorities } = require("../utils");
const { getUerByUsername } = require("../db/user");
const { getRolesByUser } = require("../db/role");
const { getUserAuthorities } = require("../db/resource");

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;
  try {
    const data = await getUerByUsername(username);
    if (data && data[0]) {
      const user = data[0];
      if (password === user.password) {
        const authorities = await getUserAuthorities(user.roleId);
        const rb = new ResponseBody(200, "登录成功", {
          token: token(username, user.roleId),
          ...handleAuthorities(authorities),
        });
        res.send(rb);
      } else {
        res.send(new ResponseBody(500, "登录失败，账号或密码错误"));
      }
    } else {
      res.send(new ResponseBody(500, "登录失败，账号或密码错误"));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = {
  prefix: true,
  router,
};
