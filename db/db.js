const mysql = require("mysql");
const config = require("../config");
const { v4: uuidv4 } = require("uuid");
const { objKeyToSnakeCase, objKeyToCamelCase } = require("../utils");
const pool = mysql.createPool(config.mysql);

/**
 * sql执行器
 * @param {String} sql sql语句
 * @param  {...any} args sql参数
 * @returns Promise
 */
const executeSql = (sql, ...args) => {
  return new Promise((resolve, reject) => {
    // 添加时间戳和ID
    if (sql.trim().startsWith("insert")) {
      const now = Date.now();
      args[0] = objKeyToSnakeCase(args[0]);
      args[0].created_time = now;
      args[0].updated_time = now;
      args[0].id = uuidv4();
    }
    // 更新时间戳
    if (sql.trim().startsWith("update")) {
      args[0] = objKeyToSnakeCase(args[0]);
      args[0].updated_time = Date.now();
    }
    pool.query(sql, args, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        try {
          if (Array.isArray(res)) {
            res = res.map(item => {
              if (typeof item === "object") {
                return objKeyToCamelCase(item);
              }
              return item;
            });
          } else if (typeof values === "object") {
            res = objKeyToCamelCase(res);
          }
          resolve(res);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

/**
 * mysql 事务执行器
 * @param {Array<{sql:string,values:Array}>} sqlArr
 * @returns Promise
 */
const executeTransaction = sqlArr => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err);
      }
      // 将待执行sql语句包装成promise
      const queryList = sqlArr.map(({ sql, values }) => {
        return new Promise((sqlResolve, sqlReject) => {
          if (!Array.isArray(values) && values) {
            values = [values];
          }
          if (Array.isArray(values)) {
            values = values.map(item => {
              if (typeof item === "object") {
                return objKeyToSnakeCase(item);
              }
              return item;
            });
          }

          connection.query(sql, values, function (error, results, fields) {
            if (error) {
              sqlReject(error);
            } else {
              sqlResolve(results);
            }
          });
        });
      });

      // 开启事务
      connection.beginTransaction(function (err) {
        if (err) {
          reject(err);
        } else {
          // 执行所有sql语句
          Promise.all(queryList)
            .then(results => {
              // 事务提交
              connection.commit(function (err) {
                if (err) {
                  // 提交失败，回滚
                  connection.rollback(function () {
                    reject(err);
                    connection.release();
                  });
                } else {
                  resolve(results);
                  connection.release();
                }
              });
            })
            .catch(reason => {
              // 事务回滚
              connection.rollback(function () {
                reject(reason);
                connection.release();
              });
            });
        }
      });
    });
  });
};

module.exports = {
  executeSql,
  executeTransaction,
};
