const rp = require('request-promise');
const axios = require('axios');
const config = require('../config/constants');
const logger = require('./log_util');

const requestConfig = {
  baseUrl: config.baseUrl,
  resolveWithFullResponse: false
};

const rpWithLogger = (options, bodyKey) => {
  const startTime = new Date();
  let ms = 0;
  return rp(options).then(
    res => {
      ms = new Date() - startTime;
      logger.logResponse(res, ms, options[bodyKey]);
      return res.body;
    },
    err => {
      ms = new Date() - startTime;
      logger.logError(err, ms, options[bodyKey]);
      return { code: 504, msg: '网关超时', err };
    }
  );
};

exports.get = (uri, param = {}, opts) => {
  const options = {
    uri,
    method: 'GET',
    qs: param,
    ...requestConfig,
    ...opts
  };
  return rpWithLogger(options, 'param');
};

exports.post = (uri, body, opts) => {
  const options = {
    uri,
    method: 'POST',
    body: body,
    ...requestConfig,
    ...opts,
    json: true,
    resolveWithFullResponse: true
  };
  return rpWithLogger(options, 'body');
};

exports.pac = (uri, body, opts) => {
  const options = {
    uri,
    method: 'POST',
    body: body,
    ...opts,
    json: true,
    resolveWithFullResponse: true,
  };
  return rpWithLogger(options, 'body');
};

exports.upload = (uri, formData, opts) => {
  const options = {
    uri,
    method: 'POST',
    formData: formData,
    ...requestConfig,
    ...opts
  };
  return rp(options);
};

exports.download = (uri, param = {}, opts) => {
  // 此处用 axios 请求，定义 responseType 为 stream 进行下载
  return axios.get(config.baseUrl + uri, {
    responseType: 'stream', // 注意此处要用 stream
    params: param,
    data: {},
    ...opts
  });
};
