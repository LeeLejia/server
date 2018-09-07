'use strict'
var mongo = require('./mongo/wiki')
var config = require('config')
var express = require('express')
var utils = require('./utils/utils')
var app = express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))

const prefix = "/wiki"

// 添加文章
app.post(`${prefix}/addArticle`, urlencodedParser, function (req, res) {
  var info = {}
  try {
    info = JSON.parse(req.body.info)
  } catch (e) {
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
  res.end(JSON.stringify({ status: true }))
})

// 读取文章
app.get(`${prefix}/article/:id`, urlencodedParser, function (req, res) {
  let articleId = req.params.id
  if (!articleId) {
    res.end(JSON.stringify({ status: false, msg: 'bad articleId' }))
    return
  }
  mongo.getArticleModel().findOne({ id: articleId }, {__v:0}, function (err, adventure) {
    if (err) {
      res.end(JSON.stringify({ status: false, msg: err }))
      return
    }
    res.end(JSON.stringify({ status: !!adventure, article: adventure }))
  })
})

// 更新文章
app.post(`${prefix}/modifyArticle/:id`, urlencodedParser, function (req, res) {
  var info = {}
  try {
    info = JSON.parse(req.body.info)
  } catch (e) {
    console.log(`JSON转换失败：${e}`)
    info = null
  }
  var article = {id: req.params.id}
  req.body.type && (article.type = req.body.type)
  info && (article.info = info)
  req.body.content && (article.content = req.body.content)
  mongo.getArticleModel().findOneAndUpdate({ id: article.id }, { $set: article }, {new: true, fields: {__v:0}}, (err, adventure) => {
    if (err) {
      res.end(JSON.stringify({ status: false, msg: err }))
      return
    }
    res.end(JSON.stringify({ status: !!adventure, tree: adventure }))
  })
})

// 删除文章 todo:没有用户校验
app.get(`${prefix}/deleteArticle/:id`,urlencodedParser, function (req, res) {
  mongo.getArticleModel().deleteOne({ id: req.params.id }, (err) => {
    res.end(JSON.stringify({ status: !err}))
  })
})


// 添加wiki
app.post(`${prefix}/addTree`, urlencodedParser, function (req, res) {
  var children = []
  var more = {}
  try {
    more = JSON.parse(req.body.more)
    children = JSON.parse(req.body.children)
  } catch (e) {
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
  res.end(JSON.stringify({ status: true }))
})

// 读取wiki
app.get(`${prefix}/tree/:id`, urlencodedParser, function (req, res) {
  let wiki = req.params.id
  if (!wiki) {
    res.end(JSON.stringify({ status: false, msg: 'bad id' }))
    return
  }
  mongo.getTreeModel().findOne({ id: wiki }, {__v:0}, function (err, adventure) {
    if (err) {
      res.end(JSON.stringify({ status: false, msg: err }))
      return
    }
    res.end(JSON.stringify({ status: !!adventure, tree: adventure }))
  })
})

// 更新wiki
app.post(`${prefix}/modifyTree/:id`, urlencodedParser, function (req, res) {
  var data = ''
  req.on('data', (chunk) => { data += chunk })
  req.on('end', () => {
    let json = {}
    try {
      json = JSON.parse(data)
      if(json.id && json.id !== req.params.id){
        res.end(JSON.stringify({ status: false,msg:"bad id" }))
        return
      }
      delete json._id
      delete json.__v
      delete json.createdAt
      delete json.updateAt
      mongo.getTreeModel().findOneAndUpdate({ id: json.id }, { $set: json }, {new: true, fields: {__v:0}}, (err, adventure) => {
        if (err) {
          res.end(JSON.stringify({ status: false, msg: err }))
          return
        }
        res.end(JSON.stringify({ status: !!adventure, tree: adventure }))
      })
    } catch (err) {
      res.end(JSON.stringify({ status: false, msg: err }))
    }
  })
})

// 删除wiki todo:没有用户校验
app.get(`${prefix}/deleteWiki/:id`,urlencodedParser, function (req, res) {
  mongo.getTreeModel().deleteOne({ id: req.params.id }, (err) => {
    res.end(JSON.stringify({ status: !err}))
  })
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
