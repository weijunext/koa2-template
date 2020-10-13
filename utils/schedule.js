const schedule = require('node-schedule');
const { updateWXToken } = require('./updateToken');

// 其他规则见 https://www.npmjs.com/package/node-schedule
// 第一种写法，每两小时的第0分钟（微信可用）
let wxTokenRule = new schedule.RecurrenceRule();
wxTokenRule.hour = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
wxTokenRule.minute = 0;

// 第一种写法，每分钟第10秒
// let rule = new schedule.RecurrenceRule();
// rule.second = 10;

// 第二种写法
// let rule = '30 10 2 10 * *'; // 每月10号早上2点10分10秒

// 微信token，7200秒，2小时
function getWXToken() {
  schedule.scheduleJob(wxTokenRule, () => {
    updateWXToken();
  })
};

module.exports = {
  getWXToken
};
