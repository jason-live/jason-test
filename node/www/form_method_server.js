const fs = require('fs');
const process = require('process');
const url = require('url');
const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = '4040';
const METHOD_GET_TYPE = 'GET';
const METHOD_POST_TYPE = 'POST';

const FORM_GET_HTML_PATH = '/form_method.html';
const FORM_GET_LOGIN_PATH = '/login_get';
const FORM_POST_LOGIN_PATH = '/login_post';

const server = http.createServer((request, response) => {
  const { method } = request;
  console.log(method);

  if (METHOD_GET_TYPE === method) {
    /**
     * urlString指传入一个url地址的字符串
　　　* 第二个参数（可省）传入一个布尔值，默认为false，为true时，返回的url对象中，query的属性为一个对象。
　　　* 第三个参数（可省）传入一个布尔值，默认为false，为true时，额，我也不知道有什么不同，可以去看看API
     */
    const { pathname, query } = url.parse(request.url, true);
    console.log(pathname);
    if (FORM_GET_HTML_PATH === pathname) {
      fs.readFile(`${process.cwd()}/test/www${FORM_GET_HTML_PATH}`, (error, buffer) => {
        if (error) {
          response.write('服务异常');
          response.end();
          return;
        }
        response.write(buffer);
        response.end();
        return;
      })
      return;
    }
    if (FORM_GET_LOGIN_PATH === pathname) {
      console.log(query);
      response.writeHead(200, { 'COntent-Type': 'text/plain; charset=utf-8'});
      response.write('登陆成功');
      response.write('\n');
      // response.write(query.toString());
      response.end();
      return;
    }
    response.write('404');
    response.end();
    return;
  }
  if (METHOD_POST_TYPE === method) {
    const { pathname } = url.parse(request.url, true);
    console.log(pathname);
    if (FORM_POST_LOGIN_PATH === pathname) {
      const body = [];
      let bodyOjb = {};
      request.on('data', (buffer) => {
        body.push(buffer);
      })
      request.on('end', () => {
        bodyOjb = querystring.parse(Buffer.concat(body).toString())
        console.log('bodyOjb：', bodyOjb)
      })
      response.writeHead(200, { 'COntent-Type': 'text/plain; charset=utf-8' });
      response.write('登陆成功');
      // response.write('\n');
      response.write(JSON.stringify(bodyOjb));
      response.end();
      return;
    }
    response.write('404 111');
    response.end();
    return;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});