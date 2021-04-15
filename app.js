const Koa = require('koa');
const cors = require('koa2-cors'); //跨域处理
const app = new Koa();
const fs = require('fs');
const static = require('koa-static');
const json = require('koa-json');
const koaBody = require('koa-body');
const logger = require('./utils/log_util');
const schedule = require('./utils/schedule');

app.use(cors());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1024 * 1024 * 1024, // 文件大小限制1GB
    },
  })
);
app.use(json());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

/* 注册路由 */
const registerRouters = path => {
  let files = fs.readdirSync(path);
  files.forEach(file_name => {
    let file_dir = path + '/' + file_name;
    let file_stat = fs.statSync(file_dir);

    if (file_stat.isDirectory()) {
      registerRouters(file_dir);
    }
    if (file_stat.isFile()) {
      let router = require(file_dir);
      for (let i = 0; i < router.stack.length; i++) {
        const path = router.stack[i].path;
        app.use(router.routes(), router.allowedMethods());
        logger.log('SERVER_INDEX').debug('已注册 ' + path);
      }
    }
  });
};
registerRouters('./routes');

app.use(static(__dirname + '/public'));

schedule.getWXToken();

module.exports = app;
