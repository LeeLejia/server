'use strict'
var mongo = require('./mongo')
var config = require('config')
var express = require('express')
var utils = require('./utils/utils')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

app.post('/addLog',urlencodedParser, function(req, res){
  console.log(utils.get_client_ips)
  console.log(req)
   var response = {
    type: req.body.type,
    user: req.body.user,
    ip: '',
    msg: req.body.msg,
    info: (req.body.info && JSON.parse(req.body.info)) || null,
    call_stack: req.body.call_stack
  }
  console.log(response);
  res.end(JSON.stringify(response));
  res.send('oh hai')
})

// 初始化 mongodb和服务
mongo.initDB(function (err) {
  if (err) {
    console.log('init db error:', err)
    throw err
  }
  if (!module.parent) {
    app.listen(config.get('port'))
    console.log(`server start at port:${config.get('port')}`)
  }
})
