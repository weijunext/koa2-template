const { verifyToken } = require('./verifyToken');
const config = require('../../config/token_config');

// exports.checkToken = async (ctx, next) => {
async function checkToken (ctx, next) {
  let url = ctx.request.url;
  // 登录 不用检查
  if (url === "/login" || url === "/" || url.indexOf('.') >=0) await next();
  else {
    let token = ctx.request.headers["access_token"];
    // 解码
    let isNotExpire = await verifyToken(token, config.secret);
    if (isNotExpire) {
      // 未过期
      await next();
    } else {
      //过期
      ctx.body = {
        code: 401,
        msg: 'token 已过期，请重新登录',
        data: ''
      };
    }
  }
}
module.exports = checkToken
