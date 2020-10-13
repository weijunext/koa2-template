const request = require('./request').get;
const redis = require('./redis');
const jssdkConfig = require('../config/jssdk_config');

exports.updateWXToken = async () => {
  try {
    const url = jssdkConfig.getTokenUrl;
    const params = {
      grant_type: jssdkConfig.grant_type,
      appid: jssdkConfig.appid,
      secret: jssdkConfig.secret,
    };
    const opts = {};
    const result = await request(url, params, opts);
    if (result.access_token) {
      await redis.set('token', result.access_token);
      updateWXTicket();
    } else {
      console.log('获取token失败', result);
    }
  } catch (e) {
    e;
  }
};

const updateWXTicket = async () => {
  try {
    let token = '';
    await redis.get('token', (err, result) => {
      token = result;
    });
    const url = jssdkConfig.getTicketUrl;
    const params = {
      access_token: token,
      type: jssdkConfig.type,
    };
    const opts = {};
    const result = await request(url, params, opts);
    if (result.errcode === '0' || result.errcode === 0) {
      redis.set('ticket', result.ticket);
    } else {
      console.log('获取ticket失败', result);
    }
  } catch (e) {
    e;
  }
};
