const router = require("express").Router();
const { token, ResponseBody } = require("../utils");

router.get("/", function (req, res) {
  res.send(new ResponseBody());
});

module.exports = {
  router,
};
