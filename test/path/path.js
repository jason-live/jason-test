/**
 * 值得一提的是path.resolve方法，它可以接收任意个参数，然后根据每个路径参数之间的关系，将路径最终解析为一个绝对路径。
__dirname指的是当前模块所在的绝对路径名称，它的值会自动根据当前的绝对路径变化，等同于path.dirname(__filename)的结果。
 */

const path = require('path')

const str = '/root/a/b/1.txt'

console.log(path.dirname(str))  // 获取文件目录：/root/a/b
console.log(path.basename(str)) // 获取文件名：1.txt
console.log(path.extname(str)) // 获取文件后缀：.txt
console.log(path.resolve(str, '../c', 'build', 'strict')) // 将路径解析为绝对路径：C:\root\a\b\c\build\strict
console.log(path.resolve(str, '../c', 'build', 'strict', '../..', 'assets')) // 将路径解析为绝对路径：C:\root\a\b\c\assets
console.log(path.resolve(__dirname, 'build')) // 将路径解析为绝对路径：C:\projects\nodejs-tutorial\lesson12\build