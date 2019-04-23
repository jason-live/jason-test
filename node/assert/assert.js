/** 
 * 通常可以在一个模块或函数的每个阶段使用assert，或者在对函数传参进行assert校验，以保证代码运行的正确性。
*/
// const assert = require('assert')
// assert(2 > 1, '2 > 1')
// assert(1 > 2, '1 > 2')

/** 
 * assert.deepStrictEqual
 * 
 * assert.deepStrictEqual(actual, expected[, message])用于对actual 参数和 expected的深度比较，即不仅校验它们是否相等，同时也要校验它们的成员之间是否相等。
assert.deepStrictEqual在校验对象或数组时比较有用。
assert.deepStrictEqual的比较相当于===，也就是不仅是值相等，值的类型也要相等。
*/

// 使用assert.deepStrictEqual比较对象：
const assert = require('assert')
const obj1 = {
  a: 1,
  b: 2,
  children: {
    c: 3
  }
}

const obj2 = {
  a: 1,
  b: 2,
  children: {
    c: 3
  }
}

const obj3 = {
  a: 1,
  b: 2,
  children: {
    c: '3'
  }
}

assert.deepStrictEqual(obj1, obj2, 'obj1 !== obj2')
assert.deepStrictEqual(obj1, obj3, 'obj1 !== obj3')