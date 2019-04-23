const http = require('http');
const url = require('url');
const fs = require('fs');
const process = require('process');
const bufferSplit = require('./buffer-split');

const port = '4040';
const hostname = '127.0.0.1';

const UPLOAD_HTML_PATH = '/upload.html';
const UPLOAD_PATH = '/upload';

const server = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url);
  if (pathname === UPLOAD_HTML_PATH) {
    fs.readFile(`${process.cwd()}/node/upload/upload.html`, (error, buffer) => {
      if (error) {
        response.write('500');
        response.end();
        return;
      };
      response.write(buffer);
      response.end();
      return;
    });
    return;
  };
  if (pathname === UPLOAD_PATH) {
    const boundary = `--${request.headers['content-type'].split(';')[1].trim().split('=')[1]}`;

    console.log('boundary', boundary);
    
    let arr = [];
    let buffer = null;
    request.on('data', (buffer) => {
      arr.push(buffer);
    });
    request.on('end', () => {
      buffer = Buffer.concat(arr);
      console.log(buffer.toString());

      // 1. 用<分隔符>切分数据
      let result = bufferSplit(buffer, boundary)
      console.log(result.map(item => item.toString()))

      // 2. 删除数组头尾数据
      result.pop()
      result.shift()
      console.log(result.map(item => item.toString()))

      // 3. 将每一项数据头尾的的\r\n删除
      result = result.map(item => item.slice(2, item.length - 2))
      console.log(result.map(item => item.toString()))

      // 4. 将每一项数据中间的\r\n\r\n删除，得到最终结果
      result.forEach(item => {
        console.log(bufferSplit(item, '\r\n\r\n').map(item => item.toString()))

        let [info, data] = bufferSplit(item, '\r\n\r\n')  // 数据中含有文件信息，保持为Buffer类型

        info = info.toString()  // info为字段信息，这是字符串类型数据，直接转换成字符串，若为文件信息，则数据中含有一个回车符\r\n，可以据此判断数据为文件还是为普通数据。

        if (info.indexOf('\r\n') >= 0) {  // 若为文件信息，则将Buffer转为文件保存
          // 获取字段名
          let infoResult = info.split('\r\n')[0].split('; ')
          let name = infoResult[1].split('=')[1]
          name = name.substring(1, name.length - 1)

          // 获取文件名
          let filename = infoResult[2].split('=')[1]
          filename = filename.substring(1, filename.length - 1)
          console.log(name)
          console.log(filename)

          // 将文件存储到服务器
          fs.writeFile(`${process.cwd()}/node/upload/upload.txt`, data, err => {
            if (err) {
              console.log(err)
            } else {
              console.log('文件上传成功')
            }
          })
        } else {  // 若为数据，则直接获取字段名称和值
          let name = info.split('; ')[1].split('=')[1]
          name = name.substring(1, name.length - 1)
          const value = data.toString()
          console.log(name, value)
        }
      });
      response.write('success');
      response.end();
      return;
    });
    return;
  };
  response.write('404');
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`listen on http://${hostname}:${port}`);
});

/** 
 * 文件上传的全部内容
 * 
 * 通过分析上面这个例子中，服务端接收到的数据，可以得到以下信息：

  表单上传的数据，被分隔符“------WebKitFormBoundarylI8qyTHI39TNTbno”隔开，分隔符在每次上传时都不同。分隔符数据可以从req.headers['content-type']中获取，如：const boundary = '--' + req.headers['content-type'].split('; ')[1].split('=')[1]。
  前两段数据中，分别可以获取到表单上传的字段名name="username"，以及数据“lee”。
  第三段数据中，多了一个字段filename="upload.txt"，它表示的是文件的原始名称。以及可以获取到文件类型“Content-Type: text/plain”，表示这是一个文本文件。最后是文件的内容“upload”。
  由此可以看出，文件上传数据虽然有些乱，但还是有规律的，那么处理思路就是按照规律，将数据切割之后，取出其中有用的部分。
 * 
 * ------WebKitFormBoundarylI8qyTHI39TNTbno
  Content-Disposition: form-data; name="username"

  348842258@qq.com
  ------WebKitFormBoundarylI8qyTHI39TNTbno
  Content-Disposition: form-data; name="password"

  3333
  ------WebKitFormBoundarylI8qyTHI39TNTbno
  Content-Disposition: form-data; name="file"; filename="upload.txt"
  Content-Type: text/plain

  这是一个测试文件上传的文件

  你好啊！

  我不好！

  真的吗？

  MMB

  ------WebKitFormBoundarylI8qyTHI39TNTbno--
 * 
*/