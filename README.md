# koa2完整后端模板（微信开发）

## 代码结构

```
│
├── bin                             # koa配置
│   ├── www                         # koa服务启动配置
├── config                          # 配置
│   ├── constants.js                # 请求接口的地址
│   └── log4js_config.json          # 生产环境架构打包配置
├── logs                            # 日志文件
├── node_modules                    # npm包
├── public                          # 前端业务执行码
├── routes                          # koa路由
│   └── transmission.js             # koa接口转发
├── utils                           # 公共方法
│   ├── log_util.js                 # 日志格式
│   └── request.js                  # request请求方法
├── .gitignore                      # git忽略的文件或文件夹
├── node_modules                    # npm包
├── app.js                          # 主入口
├── package-lock.json               # 依赖包锁定版本
├── package.json                    # 依赖包版本
├── README.md                       # 说明文档
│
```

## 项目配置修改
/bin/www  # 服务器端口（默认3306）、https配置（https配置默认注释掉，若关掉注释请自行配置端口）  
/config   # 服务器、数据库、redis、jssdk配置  
nw.js     # node注册windows服务配置  

## 安装依赖

npm install

## 项目启动

npm start
