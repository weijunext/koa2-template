/**
 * 微信相关请求
 */
const router = require('koa-router')();
const sha1 = require("sha1");
const redis = require("../utils/redis");
const jssdkConfig = require('../config/jssdk');
const { getNonceStr } = require('../utils/sign');

// 获取jssdk信息，可用于前端获取jssdk信息，实现分享链接卡片、获取公众号/小程序头像等功能
router.post('/getJSConfig', async (ctx, next) => {
  try {
    let ticket = '';
    await redis.get('ticket', (err, result) => {
      ticket = result;
    })
    const timestamp = Date.parse(new Date()) / 1000;
    const nonceStr = getNonceStr(15);
    const url = ctx.request.body.url;
    const signature = sha1(`jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`);

    const result = {
      appId: jssdkConfig.appid,
      timestamp,
      signature,
      nonceStr
    };
    ctx.body = result;
  } catch (e) {
    e;
  }
});

module.exports = router;