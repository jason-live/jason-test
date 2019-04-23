const fs = require('fs');
const url = require('url');
const process = require('process');
const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = '4040';

const formPath = '/form_post.html';
const loginPath = '/login';

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  console.log('pathname', pathname);
  console.log('query', query);
  if (pathname === formPath) {
    fs.readFile(`${process.cwd()}/test/www/${pathname}`, (error, buffer) => {
      if (error) {
        console.log('读取文件失败', error);
        response.write('服务异常');
        response.end();
        return;
      };
      response.write(buffer);
      response.end();
    })
    return;
  }
  if (pathname === loginPath) {
    // 用于存储data事件获取的Buffer数据。
    const bufferArray = [];
    let post = '';
    request.on('data', (buffer) => {
      console.log('buffer：', buffer.toString());
      bufferArray.push(buffer);
    });
    request.on('end', () => {
      // Buffer 类是一个全局变量，使用时无需 require('buffer').Buffer。
      // Buffer.concat方法用于合并Buffer数组。
      const buffer = Buffer.concat(bufferArray);
      // 已知Buffer数据只是字符串，则可以直接用toString将其转换成字符串。
      post = querystring.parse(buffer.toString())
      console.log('post：', post)
    });
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.write('登陆成功');
    response.end();
    return;
  }
  response.write('404');
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
})

