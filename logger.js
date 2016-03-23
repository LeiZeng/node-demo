var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var logger = express()

// error handlers
// catch 404 and forwarding to error handler
logger.use((err, req, res, next) => {
  err = err || new Error('Not Found')
  !res.statusCode && res.status(404)
  next(err)
})

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'production') {
  var logToFile = (filename) => {
    return fs.createWriteStream(path.join(filename), {
      flags: 'a'
    })
  }
  logger
  .use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400
    },
    stream: logToFile(path.join(__dirname, '/error.log'))
  }))
  .use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode >= 400
    },
    stream: logToFile(path.join(__dirname, '/access.log'))
  }))
} else {
  logger
  .use((err, req, res, next) => {
    next(err)
  })
  .use(morgan('dev'))
}

// production error handler
// no stacktraces leaked to user
logger.use((err, req, res, next) => {
  var code
  if (err) {
    code = err.code || 500
  } else if (req.errors) {
    code = (req.errors && req.errors.length)
      ? Math.max(req.errors.map((error) => {
        return error.code
      }))
      : req.errors.code
  } else {
    return next()
  }
  res.status(code || res.statusCode || 500).send({
    errors: req.errors
  })

  next(err)
})

module.exports = logger
