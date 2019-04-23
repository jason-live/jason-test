const http = require('http');
const fs = require('fs');
const process = require('process');

const hostname = '127.0.0.1';
const port = '4040';

/**
 * 响应请求
    如上面的例子，可以根据客户端的请求做出回应，如返回静态文件。
    数据交互
    定义接口，客户端根据接口，与服务端进行数据交互。
    例如在一个购物流程中，客户端向服务端请求商品数据，展现给客户，客户在购买时，客户端将购买的商品信息发送给服务端处理。
    数据库
    对数据库中存储的数据进行读写操作。
 */
const server = http.createServer((request, response) => {
  console.log(request.url);
  fs.readFile(`${process.cwd()}/test/www/${request.url}`, (error, buffer) => {
    if (error) {
      console.log('读取文件失败', error);
      response.write('404');
      response.write('Not Found');
      response.end();
      return;
    }
    response.write(buffer);
    response.end();
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});