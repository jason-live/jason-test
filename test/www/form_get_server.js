const http = require('http');
const fs = require('fs');
const process = require('process');
const url = require('url');

const hostname = '127.0.0.1';
const port = '4040';

const formPath = '/form_get.html';
const loginPath = '/login';

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  if (pathname === formPath) {
    fs.readFile(`${process.cwd()}/test/www/${pathname}`,(error, buffer) => {
      if (error) {
        console.log('读取文件失败', error);
        response.write('404 找不到页面');
        response.end();
        return;
      }
      response.write(buffer);
      response.end();
    });
    return;
  }
  if (pathname === loginPath) {
    console.log('用户名：', query.username);
    console.log('密码：', query.passport);
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.write('登陆成功！', 'utf-8');
    response.end();
    return;
  }
  response.write('404');
  response.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})