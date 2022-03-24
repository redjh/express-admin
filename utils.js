const snakeCase = require("lodash.snakecase");
const camelCase = require("lodash.camelcase");
const jwt = require("jsonwebtoken");
const { secertKey, algorithm } = require("./config");

/**
 * 接口响应消息对象
 */
function ResponseBody(status = 200, message = "success", data) {
  this.status = status;
  this.message = message;
  this.data = data;
}

/**
 *  新增 | 修改 | 删除 路由请求 通用处理器函数
 * @param {Function}} executor sql查询执行函数
 * @param {Function}} next next函数
 * @param {Response} response 响应对象
 * @param {Object | String | Number} params sql查询参数
 */
async function routeHandler(executor, next, response, params) {
  try {
    const { affectedRows } = await executor(params);
    if (affectedRows === 0) {
      response.send(new ResponseBody(500, "failed"));
    } else {
      response.send(new ResponseBody());
    }
  } catch (error) {
    next(error);
  }
}

/**
 * 生成token，含三个组成部分，分别是
 * header：头部
 * playload：负载
 * expiresIn：过期时间
 */
function token(username, roleId, expiresIn = 600 * 1000) {
  return jwt.sign({ username, roleId }, secertKey, { expiresIn, algorithm });
}

/**
 * 工具函数：
 * foo_bar --> fooBar
 * @param {*} obj
 * @returns
 */
function objKeyToCamelCase(obj) {
  const temp = {};
  Object.keys(obj).forEach(key => {
    temp[camelCase(key)] = obj[key];
  });
  return temp;
}

/**
 * 工具函数：
 * fooBar --> foo_bar
 * @param {*} obj
 * @returns
 */
function objKeyToSnakeCase(obj) {
  const temp = {};
  Object.keys(obj).forEach(key => {
    temp[snakeCase(key)] = obj[key];
  });
  return temp;
}

/**
 * 工具函数：
 * 数组转树
 * @param {Array<{}>} arr 数组
 * @returns Tree
 */
function arrayToTree(arr) {
  let len = arr.length;
  let temp = [];
  let i = 0;
  let node = arr[i];
  while (true) {
    // child是根节点
    if (node.parentId === "-1") {
      if (temp.indexOf(node) === -1) {
        temp.push(node);
      }
      node = arr[++i];
    } else {
      const parent = arr.find(m => m.id === node.parentId);
      // node 是子节点
      if (parent) {
        if (!Array.isArray(parent.children)) {
          parent.children = [];
        }
        if (parent.children.indexOf(node) === -1) {
          parent.children.push(node);
        }
        node = parent;
      } else {
        // node 是一个孤立节点
        if (temp.indexOf(node) === -1) {
          temp.push(node);
        }
        node = arr[++i];
      }
    }
    if (i >= len) break;
  }
  return temp;
}
/**
 * 处理权限数据
 * @param {Array} arr 权限数据
 * @returns authorities
 */
function handleAuthorities(arr) {
  let result = {};
  let menus = arr
    .filter(({ resourceType }) => resourceType === 1 || resourceType === 2)
    .map(({ id, path, name, icon, parentId }) => {
      return { id, path, name, icon, parentId };
    });
  result.menus = arrayToTree(menus);
  result.routes = arr
    .filter(({ resourceType, component }) => {
      return (resourceType === 2 || resourceType === 3) && component;
    })
    .map(({ id, path, component }) => {
      return { id, path, component };
    });
  result.authorities = arr
    .filter(({ resourceType }) => resourceType === 3)
    .map(({ authKey }) => authKey);
  return result;
}

module.exports = {
  ResponseBody,
  token,
  routeHandler,
  objKeyToSnakeCase,
  objKeyToCamelCase,
  arrayToTree,
  handleAuthorities,
};
