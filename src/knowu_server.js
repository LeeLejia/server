'use strict'
var mongo = require('./mongo_knowu')
var config = require('config')
var express = require('express')
var utils = require('./utils/utils')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

const prefix_path = "/knowu"
// 添加系统日志
app.post(`${prefix_path}/addSystemLog`,urlencodedParser, function(req, res){
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

// 添加使用日志
app.post(`${prefix_path}/addUserLog`,urlencodedParser, function(req, res){
  if(!req.body.userId) {
    res.end(JSON.stringify({status:'error',msg: 'bad user'}))
    return
  }
  var info = ''
  try{
    info = JSON.parse(req.body.info)
  }catch(e){
    onsole.log(`JSON转换失败：${e}`)
  }
  var log = {
   userId: req.body.userId,
   platform: req.body.platform,
   type: req.body.type,
   ip: utils.get_client_ip(req),
   info: info
 }
 mongo.insertUserLog(log)
 res.end(JSON.stringify({status:'ok'}))
})

// 添加用户
app.post(`${prefix_path}/addUser`,urlencodedParser, function(req, res){
  if(!req.body.phone || !req.body.wx){
    res.end(JSON.stringify({status:'error',msg:`bad ${(!req.body.phone)?'phone':'weixin'}`}))
    return
  }
  var more = ''
  try{
    more = JSON.parse(req.body.more)
  }catch(e){
    onsole.log(`JSON转换失败：${e}`)
  }
  mongo.getUserModel
  var user = {
   phone: req.body.phone,
   wx: req.body.wx,
   nick: req.body.nick,
   more: more
 }
 mongo.insertUser(user)
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