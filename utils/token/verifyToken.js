const jwt = require('jsonwebtoken');
const config = require('../../config/token_config');

exports.verifyToken = (token) => {
  const verifyResult = jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return false;
    } else {
      // console.log(decoded);
      return true;
    }
  });
  return verifyResult
}