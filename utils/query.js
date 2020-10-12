const mysql = require('mysql');
const MYSQL_CONFIG = require('../config/mysql_config');

const pool = mysql.createPool(MYSQL_CONFIG);

const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, val, (err, fields) => {
          if (err) {
            reject(err)
          } else {
            resolve(fields);
            connection.release()
          }
        })
      }
    })
  })
};
// 用于事务
const connectHandle = () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      if (!connection) {
        console.error('数据库连接出错，请查看数据库是否已开启');
        reject(err)
      }
      console.error('链接错误：' + err.stack + '\n' + '链接ID：' + connection.threadId)
      reject(err)
    } else {
      resolve(connection)
    }
  })
});

module.exports = {
  query,
  connectHandle
};