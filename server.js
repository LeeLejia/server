'use strict'
require('babel-core/register')
require('babel-polyfill')

var Koa = require('koa')
var app = new Koa()
var compress = require('koa-compress')
var helmet = require('koa-helmet')
var config = require('config')
var convert = require('koa-convert')
var serve = require('koa-static')
var cors = require('kcors')
var body = require('./middlewares/body').default

app.use(compress())
app.use(body({
  keepRaw: true
}))
app.use(convert(serve(__dirname + '/static')))
app.use(helmet())
app.use(cors())
require('./routes').default(app)

var mongo = require('./mongo').default

mongo.initDB(function (err) {
  if (err) {
    console.log('init db error:', err)
    throw err
  }
  if (!module.parent) {
    app.listen(config.get('port'), function (err) {
      if (err) {
        console.error('app launch failed', err)
        throw err
      } else {
        console.log('app listening on port:' + config.get('port'))
      }
    })
  }
})
