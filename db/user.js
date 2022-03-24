const { executeSql } = require("./db");

const getUers = () => {
  const sql = "select * from user";
  return executeSql(sql);
};

const getUerById = id => {
  const sql = "select * from user where id=?";
  return executeSql(sql, id);
};

const getUerByUsername = username => {
  const sql = "select * from user where username=?";
  return executeSql(sql, username);
};

const deleteUer = id => {
  const sql = "delete from user where id=?";
  return executeSql(sql, id);
};

const insertUer = user => {
  const sql = "insert into user set ?";
  return executeSql(sql, user);
};

const updateUer = user => {
  const sql = "update user set ? where id = ?";
  return executeSql(sql, user, user.id);
};

module.exports = {
  getUers,
  getUerById,
  getUerByUsername,
  deleteUer,
  insertUer,
  updateUer,
};
