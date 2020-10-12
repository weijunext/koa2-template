const schedule = require('node-schedule');

// 其他规则见 https://www.npmjs.com/package/node-schedule
// 第一种写法，每两小时的第0分钟（微信可用）
let rule = new schedule.RecurrenceRule();
rule.hour = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
rule.minute = 0;

// 第一种写法，每分钟第10秒
// let rule = new schedule.RecurrenceRule();
// rule.second = 10;

// 第二种写法
// let rule = '30 10 2 10 * *'; // 每月10号早上2点10分10秒

function getList() {
  schedule.scheduleJob(rule, () => {
    // 定时执行的函数
  })
};
module.exports = {
  getList
};
