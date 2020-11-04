const router = require('koa-router')();
const { query } = require('../utils/query');
const { USER_LOGIN, UPDATE_TOKEN } = require('../utils/sql/user');
const { addToken } = require('../utils/token/addToken');

/**
 * 登录：先查询是否存在所登录的账号密码，如果存在，生成一个token一起返回给前端
 * 如果要直接用这个方法，请在数据库里做好表和字段的配置
 */
router.post('/login', async (ctx, next) => {
  try {
    const { username, passwordHex } = ctx.request.body;
    let res = await query(USER_LOGIN(username, passwordHex));
    let result = {};
    if (res.length) {
      delete res[0].password;
      // 生成token并存入user表
      let token = addToken({ id: res[0].id, username: res[0].username }); // token中要携带的信息，自己定义
      await query(UPDATE_TOKEN(res[0].id, token));
      result = {
        code: 200,
        data: {
          ...res[0],
          token,
        }
      };
    } else {
      result = {
        code: 401,
        msg: '登录用户不存在或密码输入错误',
        data: []
      }
    }
    ctx.body = result;
  } catch (e) {
    e;
  }
});

module.exports = router;