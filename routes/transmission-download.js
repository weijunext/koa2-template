const router = require('koa-router')();
const request = require('../utils/request').download;

const isJsonString = str => {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

const getParam = (url, name) => {
  const search = url;
  const pattern = new RegExp('[?&]' + name + '=([^&]+)', 'g');
  const matcher = pattern.exec(search);
  let items = null;
  if (null != matcher) {
    try {
      items = decodeURIComponent(decodeURIComponent(matcher[1]));
    } catch (e) {
      try {
        items = decodeURIComponent(matcher[1]);
      } catch (e) {
        items = matcher[1];
      }
    }
  }
  return items;
};

router.get('/transmission/download', async (ctx, next) => {
  const { url } = ctx.request;
  const requestUrl = getParam(url, 'url');
  const dataStr = getParam(url, 'data');
  const data = isJsonString(dataStr) ? JSON.parse(dataStr) : {};
  const { access_token } = ctx.header;
  const opts = access_token ? { headers: { access_token } } : {};
  try {
    const result = await request(requestUrl, data, opts);
    ctx.body = result && result.data ? result.data : '';
  } catch (e) {
    e;
  }
});

module.exports = router;
