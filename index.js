var express = require('express')
var config = require('config')
var bodyParser = require('body-parser')

var logger = require('./logger')
var app = require('./app')

var server = require(config.get('protocol') || 'http').createServer()
var application = express()

app.set('port', process.env.PORT || config.get('port') || 3000)

application.use(bodyParser.json())
application.use(bodyParser.urlencoded({extended: true}))
application.use(app)
application.use(logger)

server.on('request', application)
server.listen(
  app.get('port'),
  () => console.log('server start listening on ' + app.get('port'))
)
