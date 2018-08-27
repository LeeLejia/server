'use strict';

module.exports = {
  ...require('./default'),
  mongodb: {
    uri: process.env.MONGODB || 'mongodb://cjwddz:imjia123@127.0.0.1/knowuLog',
    debug: true,
  },
  redis: {
    port : 6379,
    host : 'localhost',
    password: ''
  }
};