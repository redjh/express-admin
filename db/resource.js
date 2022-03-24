const { executeSql } = require("./db");

const getResources = () => {
  const sql = `
  select
    id,
    name,
    resource_type,
    parent_id,
    path,
    icon,
    component,
    auth_key,
    sort_num
  from 
    resource 
  order by sort_num asc`;
  return executeSql(sql);
};

const getResourceById = id => {
  const sql = "select * from resource where id=?";
  return executeSql(sql, id);
};

const deleteResource = id => {
  const sql = "delete from resource where id=?";
  return executeSql(sql, id);
};

const insertResource = resource => {
  const sql = "insert into resource set ?";
  return executeSql(sql, resource);
};

const updateResource = resource => {
  const sql = "update resource set ? where id = ?";
  return executeSql(sql, resource, resource.id);
};

/**
 * 根据角色id查询用户权限
 * @param {String} roleId 角色ID
 * @returns
 */
const getUserAuthorities = roleId => {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = "select authorities from role  where id=? ";
      let data = await executeSql(sql, roleId);
      let authorities = [];
      if (data && data[0]) {
        authorities = data[0]?.authorities?.split(",");
      }
      if (authorities.length) {
        const condition = authorities.map(item => `'${item}'`).join(",");
        sql = `
        SELECT
          id,
          name,
          resource_type,
          parent_id,
          path,
          icon,
          component,
          auth_key,
          sort_num
        FROM
          resource 
        where id in (${condition}) order by sort_num asc`;
        data = await executeSql(sql);
        resolve(data);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getResources,
  getResourceById,
  deleteResource,
  insertResource,
  updateResource,
  getUserAuthorities,
};
