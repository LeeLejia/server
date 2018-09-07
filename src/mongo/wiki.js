var config = require('config')
var article = require('../schema_definition/wiki/article')
var tree = require('../schema_definition/wiki/tree')

var mongoose = require('mongoose')

let _db, articleModel, treeModel

mongoose.Promise = global.Promise

/* 用于查看mongoose模块对mongodb操作的日志 */
mongoose.set('debug', config.get('mongodb.debug'))

module.exports = {
  initDB: (cb) => {
    _db = mongoose.connect(config.get('mongodb.uri'),{ useNewUrlParser: true }, function (err) {
      if (err) {
        console.error('mongodb connect fail', err)
      } else {
        console.info('mongodb connect successful')
        let article_schema = new mongoose.Schema(article.definition, article.options)
        articleModel = mongoose.model(article.options.collection, article_schema)

        let tree_schema = new mongoose.Schema(tree.definition, tree.options)
        treeModel = mongoose.model(tree.options.collection, tree_schema)
        console.info('mongodb init definition successful')
      }
      if (cb) cb(err)
    })
  },
  getArticleModel: () => {
    return articleModel
  },
  getTreeModel: () =>{
    return treeModel
  },
  insertArticle: (objs, cb) => {
    if (Array.isArray(objs)) {
      articleModel.insertMany(objs, cb)
    } else {
      articleModel.create(objs, cb)
    }
  },
  insertTree: (objs, cb) => {
    if (Array.isArray(objs)) {
      treeModel.insertMany(objs, cb)
    } else {
      treeModel.create(objs, cb)
    }
  },
  disconnect: () => {
    _db && _db.disconnect()
  }
}
