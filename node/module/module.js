
/** 
 * 若此时项目目录下的node_modules文件夹下存在module2.js文件，则会引用该文件。
若不存在，则会查找系统的node_modules文件夹下，即全局安装的模块，是否存在module2。
若还不存在该模块，则会报错。
通过require导入的模块，可以被任意命名，因此写成const a = require('module2')也是可以的。
*/
const a = require('./a');

console.log(a);
