const log4js = require('log4js');
const loggerConfig = require('../config/log4js_config');

// 加载配置文件
log4js.configure(loggerConfig);

const logger = {};

const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

// 封装错误日志
logger.logError = (error, resTime, requestBody) => {
  if (error) {
    errorLogger.error(formatError(error, resTime, requestBody));
  }
};

// 封装响应日志
logger.logResponse = (response, resTime, requestBody) => {
  if (response) {
    resLogger.info(formatRes(response, resTime, requestBody));
  }
};

// 封装控制台打印
logger.log = title => {
  return log4js.getLogger(title);
};

// 格式化响应日志
const formatRes = (response, resTime, requestBody) => {
  let logText = '';

  // 响应日志开始
  logText += '\n' + '*************** response log start ***************' + '\n';
  // 添加请求日志
  logText += formatReqLog(response.request, resTime, requestBody);
  // 响应状态码
  logText += 'response statusCode: ' + response.statusCode + '\n';
  // 响应内容
  logText += 'response body: ' + '\n' + JSON.stringify(response.body) + '\n';
  // 响应日志结束
  logText += '*************** response log end ***************' + '\n';

  return logText;
};

// 格式化错误日志
const formatError = (err, resTime, requestBody) => {
  let logText = '';

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n';
  // 添加请求日志
  logText += formatReqLog(err.options, resTime, requestBody);
  // 错误名称
  logText += 'err name: ' + err.name + '\n';
  // 错误信息
  logText += 'err message: ' + err.message + '\n';
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n';
  // 错误信息结束
  logText += '*************** error log end ***************' + '\n';

  return logText;
};

// 格式化请求日志
const formatReqLog = (req, resTime, requestBody) => {
  let logText = '';

  const method = req.method;
  // 访问方法
  logText += 'request method: ' + method + '\n';

  // 请求原始地址
  logText += 'request originalUrl:  ' + (req.uri && req.uri.href || req.uri) + '\n';

  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.uri.query) + '\n';
  } else {
    logText += 'request body: ' + '\n' + JSON.stringify(requestBody) + '\n';
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + 'ms' + '\n';

  return logText;
};

module.exports = logger;
