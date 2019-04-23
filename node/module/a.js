/** 
 * module1.js对外输出了module.exports，module.exports为一个对象，它含有a和b属性。
  module1.js中虽然定义了变量c，但它只在module1.js这个模块中存在，从外部无法访问。
  在require.js中引用module1.js，必须使用相对路径或绝对路径。
  若引用时不带路径，而是直接使用模块名称，则会默认引用项目目录下的node_modules文件夹下的模块，如：
*/

// module.exports.a = 1;
// module.exports.b = 2;

// let c = 3;

module.exports = {
  a: 1,
  b: 2
};
/** 
 * 在引用模块时，只能接收到{}，也就是说exports只支持exports.a = 1;这样的语法。
如果要将整个模块直接定义为一个对象、函数、变量、类，则需要使用module.exports = 123。
*/
exports = {
  a: 1,
  b: 2
};