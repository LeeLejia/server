'use strict'
var mongo = require('./mongo_knowu')
var config = require('config')
var express = require('express')
var utils = require('./utils/utils')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

app.post('/wiki/addArticle',urlencodedParser, function(req, res){
   var info = ''
   try{
     info = JSON.parse(req.body.info)
   }catch(e){
      console.log(`JSON转换失败：${e}`)
   }
   var log = {
    platform: req.body.platform,
    type: req.body.type,
    user: req.body.user,
    ip: utils.get_client_ip(req),
    msg: req.body.msg,
    info: info,
    call_stack: req.body.call_stack
  }
  mongo.insertLog(log)
  res.end(JSON.stringify({status:'ok'}))
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
