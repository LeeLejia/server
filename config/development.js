'use strict';

module.exports = {
  ...require('./default'),
  mongodb: {
    uri: process.env.MONGODB,
    debug: false,
  },
  redis:{
    port : 6379,
    host : 'xxxx',
    password: 'xxx'
  }
};
