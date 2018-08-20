import { MongoClient } from 'mongodb'
import config from 'config'

let _db, _schema, statisticsModel

var statistics_define = require('./schema_definition')
var mongoose = require('mongoose')

mongoose.Promise = global.Promise

/* 用于查看mongoose模块对mongodb操作的日志 */
mongoose.set('debug', config.get('mongodb.debug'))

export default {
  initDB: (cb) => {
    _db = mongoose.connect(config.get('mongodb.uri'), function (err) {
      if (err) {
        console.error('mongodb connect fail', err)
      } else {
        console.info('mongodb connect successful')
        _schema = new mongoose.Schema(statistics_define.definition, statistics_define.options)
        statisticsModel = mongoose.model(statistics_define.options.collection, _schema)
      }
      if (cb) cb(err)
    })
  },
  getStatisticsModel: () => {
    return statisticsModel
  },
  insert: (objs, cb) => {
    if (Array.isArray(objs)) {
      statisticsModel.insertMany(objs, cb)
    } else {
      statisticsModel.create(objs, cb)
    }
  },
  disconnect: () => {
    _db && _db.disconnect()
  }
}
