'use strict';

module.exports = {
  ...require('./default'),
  mongodb: {
    uri: process.env.MONGODB || "mongodb://mongodb/knowu",
    debug: false,
  },
  redis:{
    port : 6379,
    host : 'redis.wps.cn',
    password: 'abc123'
  }
};