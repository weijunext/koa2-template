const jwt = require('jsonwebtoken');
const config = require('../../config/token_config');

exports.addToken = (userInfo) => {
  const token = jwt.sign({
    id: userInfo.id,
    user: userInfo.username,
  }, config.secret, { expiresIn: '2h' }); // 秒做单位用数字，不用字符串。如60，"2 days"，"10h"，"7d"
  return token;
}