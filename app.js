var fs = require('fs');
var path = require('path');

var koa = require('koa');
var staticServe = require('koa-static');
var proxy = require('koa-proxy');

var app = new koa();

app.name = 'koa-site-start';
app.proxy = true; //如果为 true，则解析 "Host" 的 header 域，并支持 X-Forwarded-Host
app.subdomainOffset = 2; //默认为2，表示 .subdomains 所忽略的字符偏移量。
app.root = __dirname;

// static file dirs
// https://github.com/koajs/static
app.use(staticServe(path.join(__dirname, './public')));
app.use(staticServe(path.join(__dirname, './public2')));

// api proxy
// https://github.com/popomore/koa-proxy
app.use(proxy({
  host:  'http://www.baidu.com',
  map: function(path) {
    return path.replace(/^\/api\//, '/api/')
  }
}));

// 开启监听服务 port
var server = app.listen(3000);
