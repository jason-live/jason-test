// querystring用来对url中的query字符串进行解析，常用的方法有querystring.parse和querystring.stringify

// querystring.parse
const querystring = require('querystring')

console.log(querystring.parse('foo=bar&abc=xyz&abc=123'))

// querystring.stringify
// querystring.stringify用于将对象转换为URL查询字符串。
console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))