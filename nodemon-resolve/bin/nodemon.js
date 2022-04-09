#!/usr/bin/env node

// 入口文件
const cli = require('../lib/cli');
const nodemon = require('../lib/');
// 解析参数
const options = cli.parse(process.argv);

// 入口程序
nodemon(options);

const fs = require('fs');

// checks for available update and returns an instance
const pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));

if (pkg.version.indexOf('0.0.0') !== 0 && options.noUpdateNotifier !== true) {
  require('update-notifier')({ pkg }).notify();
}
