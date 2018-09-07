var config = require('config')
var log_define = require('../schema_definition/knowu/log')
var user_log_define = require('../schema_definition/knowu/user_log')
var user_define = require('../schema_definition/knowu/user')
var mongoose = require('mongoose')

let _db, logModel, userLogModel, userModel

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
        let _log_schema = new mongoose.Schema(log_define.definition, log_define.options)
        logModel = mongoose.model(log_define.options.collection, _log_schema)
        let _user_log_schema = new mongoose.Schema(user_log_define.definition, user_log_define.options)
        userLogModel = mongoose.model(user_log_define.options.collection, _user_log_schema)
        let _user_schema = new mongoose.Schema(user_define.definition, user_define.options)
        userModel = mongoose.model(user_define.options.collection, _user_schema)
        console.info('mongodb init definition successful')
      }
      if (cb) cb(err)
    })
  },
  getLogModel: () => {
    return logModel
  },
  getUserLogModel: () =>{
    return userLogModel
  },
  getUserModel: ()=>{
    return userModel
  },
  insertUserLog: (objs, cb) => {
    if (Array.isArray(objs)) {
      userLogModel.insertMany(objs, cb)
    } else {
      userLogModel.create(objs, cb)
    }
  },
  insertUser: (objs, cb) => {
    if (Array.isArray(objs)) {
      userModel.insertMany(objs, cb)
    } else {
      userModel.create(objs, cb)
    }
  },
  insertLog: (objs, cb) => {
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
