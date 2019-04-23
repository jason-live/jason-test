// const url = require('url')

const str = 'https://www.google.com:8080/a/b?x=1&y=2&y=3&y=4'

// console.log(url.parse(str))
/** 
 * 如果需要将query参数转为对象，则可以为url.parse函数的第二个参数传true，如console.log(url.parse(str, true))，打印结果如下：
*/
// console.log(url.parse(str, true))

/** 
 * 除了用url.parse方法解析url，还可以通过构造函数URL，创建一个实例，其中带有解析后的数据。
实例有一个toString方法，可以将实例解析为字符串url。
*/
const { URL } = require('url')
const urlObj = new URL(str)

console.log(urlObj)
console.log(urlObj.toString())