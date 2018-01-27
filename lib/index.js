var loaderUtils = require('loader-utils')
var wrap = require('wrap-fn')

module.exports = function(source) {
  var ctx = this

  ctx.cacheable && ctx.cacheable()

  source = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '\n')

  var options = loaderUtils.getOptions(ctx)
  var middleware = [].concat(options.middleware || [])

  if (options.async) {
    var callback = ctx.async()
    var i = 0
    var l = middleware.length

    function next(err, source) {
      if (err) return ctx.emitError(err)

      if (i === l) {
        if (!options.raw) {
          source = 'module.exports = ' + JSON.stringify(source)
        }
        return callback(null, source)
      }

      wrap(middleware[i++], next).apply(ctx, [source])
    }

    next(null, source)
  } else {
    middleware.forEach(fn => {
      source = fn.apply(ctx, [source])
    })

    if (!options.raw) {
      source = 'module.exports = ' + JSON.stringify(source)
    }

    return source
  }
}
