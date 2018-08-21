'use strict';
import base from './default';

module.exports = {
  ...base,
  mongodb: {
    uri: process.env.MONGODB || 'mongodb://calculate:calculate@172.31.252.213/performance',
    debug: false,
  },
  redis:{
    port : 6379,
    host : 'redis.wps.cn',
    password: 'abc123'
  },
  queue: {
    retryDelay: 5000
  },
  python:{
    linux: 'python3',
    win: 'C:\Users\admin\AppData\Local\Programs\Python\Python35\python.exe',
    calculate: '../calculate_single.py',
    leftMemory: 1024, // 内存大于多少 M才执行脚本
  }
};