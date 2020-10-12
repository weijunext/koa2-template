module.exports = {
  appenders: {
    // 默认日志
    console: {
      type: 'console',
    },
    //错误日志
    errorLogger: {
      // category: 'errorLogger', //logger名称
      type: 'dateFile', //日志类型
      filename: 'logs/error/error', // 日志输出位置
      alwaysIncludePattern: true, // 是否总是有后缀名
      pattern: 'yyyy-MM-dd.log', // 后缀
    },
    //响应日志
    resLogger: {
      // category: 'resLogger',
      type: 'dateFile',
      filename: 'logs/response/response',
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd.log',
    },
  },
  //设置logger名称对应的的日志等级
  categories: {
    default: {
      appenders: ['console'],
      level: 'All',
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error',
    },
    resLogger: {
      appenders: ['resLogger'],
      level: 'all',
    },
  },
};
