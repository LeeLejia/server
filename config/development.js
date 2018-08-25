'use strict';

module.exports = {
  ...require('./default'),
  mongodb: {
    uri: process.env.MONGODB || 'mongodb://calculate:calculate@120.131.11.64:991/performance',
    debug: true,
  },
  redis: {
    port : 6379,
    host : 'localhost',
    password: ''
  }
};