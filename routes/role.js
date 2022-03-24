const router = require("express").Router();
const { ResponseBody, routeHandler } = require("../utils");
const { getRoles, getRoleById, deleteRole, insertRole, updateRole } = require("../db/role");

// 新增角色
router.post("/", (req, res, next) => {
  routeHandler(insertRole, next, res, req.body);
});

// 删除角色
router.delete("/:id", (req, res, next) => {
  routeHandler(deleteRole, next, res, req.params.id);
});

// 更新角色
router.put("/", (req, res, next) => {
  routeHandler(updateRole, next, res, req.body);
});

// 查询角色列表
router.get("/list", async (req, res, next) => {
  try {
    const data = await getRoles();
    const rb = new ResponseBody();
    rb.data = data;
    res.send(rb);
  } catch (error) {
    next(error);
  }
});

// 通过ID查询角色
router.get("/:id", async (req, res, next) => {
  try {
    const data = await getRoleById(req.params.id);
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
