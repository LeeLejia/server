var config = require('config')
var log_define = require('./schema_definition')
var mongoose = require('mongoose')

let _db, _schema, logModel

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
        _schema = new mongoose.Schema(log_define.definition, log_define.options)
        logModel = mongoose.model(log_define.options.collection, _schema)
      }
      if (cb) cb(err)
    })
  },
  getLogModel: () => {
    return logModel
  },
  insert: (objs, cb) => {
    if (Array.isArray(objs)) {
      logModel.insertMany(objs, cb)
    } else {
      logModel.create(objs, cb)
    }
  },
  disconnect: () => {
    _db && _db.disconnect()
  }
}
