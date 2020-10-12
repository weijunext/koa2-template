const router = require('koa-router')();
const fs = require('fs');
const request = require('../utils/request').upload;

router.post('/transmission/upload', async (ctx, next) => {
  const { url, token, ...restParam } = ctx.request.body;
  const file = ctx.request.files && ctx.request.files.file;
  ctx.request.socket.setTimeout(0);
  if (!file) {
    ctx.body = {
      code: 400,
      msg: '请上传文件'
    };
    return;
  }
  const formData = {
    ...restParam,
    file: {
      value: fs.createReadStream(file.path),
      options: {
        filename: file.name
      }
    }
  };

  const opts = token ? { headers: { access_token: token } } : {};
  try {
    const result = await request(url, formData, opts);
    ctx.body = result;
  } catch (e) {
    e;
  }
});

module.exports = router;
