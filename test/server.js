const http = require('http');
const childProcess = require('child_process');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // 需要注意的是，必须调用response.end方法结束请求，否则前端会一直处于等待状态，response.end方法也可以用来向前端返回数据。
  res.write('a')
  res.write('b')
  res.write('c')
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  childProcess.exec(`start http://${hostname}:${port}`);
})