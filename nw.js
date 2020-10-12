/**
 * windows注册服务
 * 1.修改配置
 * 2.执行命令node nw.js
 * 删除服务命令：sc delete [ServiceName]
 */
let Service = require('node-windows').Service;

let svc = new Service({
  name: 'service name', // 修改：服务名称
  description: 'desc', // 修改：描述
  script: './bin/www' //nodejs项目要启动的文件路径
});

svc.on('install', () => {
  svc.start();
});

svc.install();