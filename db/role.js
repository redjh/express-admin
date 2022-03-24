const { executeSql, executeTransaction } = require("./db");

const getRoles = () => {
  const sql = "select * from role";
  return executeSql(sql);
};

const getRoleById = id => {
  const sql = "select * from role  where id=? ";
  return executeSql(sql, id);
};

const deleteRole = id => {
  const sql = "delete from role where id=?";
  return executeSql(sql, id);
};

const insertRole = role => {
  const sql = "insert into role set ?";
  return executeSql(sql, role);
};

const updateRole = role => {
  const sql = "update role set ? where id = ?";
  return executeSql(sql, role, role.id);
};

/**
 * 通过用户ID查询角色信息
 * @param {String} userId 用户ID
 * @returns roleIds 用户角色ID
 */
const getRolesByUser = userId => {
  const sql = "select role_id from role_user where user_id=?";
  return executeSql(sql, userId);
};

module.exports = {
  getRoles,
  getRoleById,
  deleteRole,
  insertRole,
  updateRole,
  getRolesByUser,
};
