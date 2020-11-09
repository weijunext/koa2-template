const router = require('koa-router')();
const request = require('../utils/request').post;

router.prefix('/api');

router.post('/transmission', async (ctx, next) => {
  const { url, data } = ctx.request.body;
  const { access_token } = ctx.header;

  const opts = access_token ? { headers: { access_token } } : {};

  const result = await request(url, data, opts);
  ctx.body = result;
});
// get
// router.get('/transmission', async (ctx, next) => {
//   const { url, data } = ctx.request.query;

//   const { access_token } = ctx.header;
//   const opts = access_token ? { headers: { access_token } } : {};

//   const result = await request(url, data, opts);
//   ctx.body = result;
// });

module.exports = router;
