import swc from '@swc/core';

const result = swc.transformFileSync('./test.js', {
  jsc: {
    parser: {
      syntax: 'ecmascript',
      jsx : true,
    },
    target: 'es5',
  }
})

console.log(result.code)
