// 用户登录
const USER_LOGIN = (username, passwordHex) => `SELECT * FROM user WHERE username="${username}" AND passwordHex="${passwordHex}";`

// 更新token
const UPDATE_TOKEN = (id, token) => `UPDATE user SET token="${token}" WHERE id="${id}";`

module.exports = {
  USER_LOGIN,
  UPDATE_TOKEN,
}