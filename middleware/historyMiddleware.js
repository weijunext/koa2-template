const history = require('connect-history-api-fallback')

const historyMiddleware = options => {
  const middleware = history(options)
  const noop = () => { }

  return async (ctx, next) => {
    middleware(ctx, null, noop)
    await next()
  }
}

module.exports = historyMiddleware
