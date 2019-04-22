const fs = require('fs');
const process = require('process');

/**
 * fs.writeFile的主要参数：
 * 第一个参数为写入的文件路径
 * 第二个参数为写入内容（可为<string> | <Buffer> | <TypedArray> | <DataView>）
 * 第三个参数为回调函数，传入数据为error对象，其为null时表示成功。
*/
fs.writeFile(`${process.cwd()}/test/fs.txt`, 'test', (error) => {
  if (error) {
    console.log('写入文件失败', error);
    return;
  }
  console.log('写入成功');
})

/** 
 * fs.readFile主要参数：
 * 第一个参数为读取的文件路径
 * 第二个参数为回调函数。回调函数传入第一个参数为error对象，其为null时表示成功，第二个为数据，可为<string> | <Buffer>。
*/
fs.readFile(`${process.cwd()}/test/fs.txt`, (error, data) => {
  if (error) {
    console.log('读取文件失败', error);
    return;
  }
  console.log('读取文件成功', data.toString());
})