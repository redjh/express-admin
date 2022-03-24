const router = require("express").Router();
const { ResponseBody, routeHandler, arrayToTree } = require("../utils");
const {
  getResources,
  getResourceById,
  deleteResource,
  insertResource,
  updateResource,
} = require("../db/resource");

// 新增资源
router.post("/", (req, res, next) => {
  routeHandler(insertResource, next, res, req.body);
});

// 删除资源
router.delete("/:id", (req, res, next) => {
  routeHandler(deleteResource, next, res, req.params.id);
});

// 更新资源
router.put("/", (req, res, next) => {
  routeHandler(updateResource, next, res, req.body);
});

// 查询资源列表
router.get("/list", async (req, res, next) => {
  try {
    const data = await getResources();
    const rb = new ResponseBody();
    rb.data = arrayToTree(data);
    res.send(rb);
  } catch (error) {
    next(error);
  }
});

// 通过ID查询资源
router.get("/:id", async (req, res, next) => {
  try {
    const data = await getResourceById(req.params.id);
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
