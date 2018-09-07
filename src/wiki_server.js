'use strict'
var mongo = require('./mongo/wiki')
var config = require('config')
var express = require('express')
var utils = require('./utils/utils')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

// 添加文章
app.post('/wiki/addArticle',urlencodedParser, function(req, res){
  var info = {}
  try{
    info = JSON.parse(req.body.info)
  }catch(e){
    console.log(`JSON转换失败：${e}`)
  }
  var article = {
    id: req.body.articleId,
    user: req.body.user,
    type: req.body.type,
    info: info,
    content: req.body.content
  }
  mongo.insertArticle(article)
  res.end(JSON.stringify({status: true}))
})

// 添加wiki
app.post('/wiki/addTree',urlencodedParser, function(req, res){
  var children = []
  var more = {}
  try{
    more = JSON.parse(req.body.more)
    children = JSON.parse(req.body.children)
  }catch(e){
    console.log(`JSON转换失败：${e}`)
    children = []
  }
  var tree = {
    id: req.body.treeId,
    user: req.body.user,
    name: req.body.name,
    more,
    article: req.body.articleId,
    children
  }
  mongo.insertTree(tree)
  res.end(JSON.stringify({status: true}))
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
