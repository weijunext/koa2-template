const Redis = require('ioredis');
const requestConfig = require('../config/redis_config');

const options = {
  host: requestConfig.redisHost, // Redis host
  port: requestConfig.redisPort, // Redis port
};
const redis = new Redis(options);

// use
// redis.set('token', 'result.access_token');
// redis.get('token', (err, result) => {
//   console.log(err, result);
// });

module.exports = redis;
