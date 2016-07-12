const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');

const morgan = require('morgan');
const compression = require('compression')

const app = express();

app
  .use(compression())
  .use(morgan('combined'))
  .use('/api/v1/', proxy('127.0.0.1:3000', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return path;
    },
    limit: '10mb'
  }))
  .use('/', proxy('127.0.0.1:3001', {
    forwardPath: function(req, res) {
      var path = url.parse(req.url).path;
      return /^\/src|jspm_packages|node_modules/.test(path) ? path : '/'
    },
    limit: '10mb'
  }))
  .listen(3003);
