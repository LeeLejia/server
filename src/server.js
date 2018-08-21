'use strict'
var mongo = require('./mongo').default

mongo.initDB(function (err) {
  if (err) {
    console.log('init db error:', err)
    throw err
  }
  if (!module.parent) {

    var http = require('http');

    http.createServer(function (request, response) {
      console.log(request)
      response.writeHead(200, {'Content-Type': 'text/plain'})
      // 发送响应数据 "Hello World"
      response.end('Hello World\n');
    }).listen(config.get('port'))
    // 终端打印如下信息
    console.log('Server running at http://127.0.0.1:8888/')
  }
})
