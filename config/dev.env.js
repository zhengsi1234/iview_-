'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //开发环境的请求地址
  API_URL: '"http://www.szscrc.com"'
})
