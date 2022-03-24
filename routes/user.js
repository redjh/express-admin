const router = require("express").Router();
const { ResponseBody, routeHandler, handleAuthorities } = require("../utils");
const { getUserAuthorities } = require("../db/resource");
const {
  getUers,
  getUerById,
  getUerByUsername,
  deleteUer,
  insertUer,
  updateUer,
} = require("../db/user");

// 新增用户
router.post("/", (req, res, next) => {
  const user = req.body;
  routeHandler(insertUer, next, res, user);
});

// 删除用户
router.delete("/:id", (req, res, next) => {
  routeHandler(deleteUer, next, res, req.params.id);
});

// 更新用户
router.put("/", (req, res, next) => {
  const user = req.body;
  routeHandler(updateUer, next, res, user);
});

// 查询用户权限数据
router.get("/authorities", async (req, res, next) => {
  try {
    const data = await getUserAuthorities(req.user.roleId);
    const rb = new ResponseBody();
    rb.data = handleAuthorities(data);
    res.send(rb);
  } catch (error) {
    next(error);
  }
});

// 查询用户列表
router.get("/list", async (req, res, next) => {
  try {
    const data = await getUers();
    const rb = new ResponseBody();
    rb.data = data;
    res.send(rb);
  } catch (error) {
    next(error);
  }
});

// 通过ID查询用户
router.get("/:id", async (req, res, next) => {
  try {
    const data = await getUerById(req.params.id);
    const rb = new ResponseBody();
    rb.data = data && data[0];
    res.send(rb);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  router,
};
