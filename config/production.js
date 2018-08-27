'use strict';

module.exports = {
  ...require('./default'),
  mongodb: {
    uri: process.env.MONGODB || 'mongodb://cjwddz:imjia123@127.0.0.1/knowuLog',
    debug: false,
  },
  redis:{
    port : 6379,
    host : 'redis.wps.cn',
    password: 'abc123'
  }
};