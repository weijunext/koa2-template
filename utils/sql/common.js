// 查询
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName};`

// 插入数据
const BATCH_INSERT_TABLE = (tableName, { key, val }) => `INSERT INTO ${tableName}(${key}) VALUES (${val});`

// 更新数据
const UPDATE_TABLE = (tableName, { primaryKey, primaryVal }, { key, val }) => `UPDATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal});`

// 删除
const DELETE_TABLE = (tableName, { primaryKey, primaryVal }) => `DELETE FROM user WHERE(${primaryKey}=${primaryVal});`

module.exports = {
  QUERY_TABLE,
  BATCH_INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
}