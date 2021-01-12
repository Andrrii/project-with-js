'use strict';

let path = require('path');
module.exports = {
  mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {},
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": false,
      "url": false,
      "vm": false,
      "querystring": false,
      "os": false,
      "constants": false,
      "assert": false,
      "util": false,
      "buffer": false,
      'child_process':false,
      'worker_threads':false
   }
  }
};