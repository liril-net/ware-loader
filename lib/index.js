var loaderUtils = require('loader-utils')
var wrapped = require('wrapped')

var map = {
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t',
  '\\v': '\v',
  '\\"': '"',
  "\\'": "'",
  '\\\\': '\\'
}

module.exports = function(source) {
  var ctx = this

  ctx.cacheable && ctx.cacheable()

  source = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/^"|"$/g, '')
    .replace(/\\(.)/g, function(char) {
      return map[char] || char
    })

  var options = loaderUtils.getOptions(ctx) || {}
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

      wrapped(middleware[i++]).apply(ctx, [source, next])
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
