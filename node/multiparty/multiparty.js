// 第三方 multiparty 库
/** 
 * 它会在field事件中，将数据信息的字段名和值返回。在file事件中，将文件的字段名和信息返回。

上传成功后，会在指定的文件夹创建一个上传的文件，并会将文件重命名（如：IqUHkFe0u2h2TsiBztjKxoBR.jpg），以防止重名。

若上传出现失败，已保存的文件会自动删除。

close事件表示表单数据全部解析完成，用户可以在其中处理已经接收到的信息。
*/
const http = require('http')
const multiparty = require('multiparty')

const server = http.createServer((req, res) => {
  const form = new multiparty.Form({
    uploadDir: './upload' // 指定文件存储目录
  })

  form.parse(req) // 将请求参数传入，multiparty会进行相应处理

  form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
    console.log(name, value)
  })

  form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
    console.log(name, file)
  })

  form.on('close', () => {  // 表单数据解析完成，触发close事件
    console.log('表单数据解析完成')
  })
})

server.listen(8080)