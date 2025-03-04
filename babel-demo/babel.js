import babel from '@babel/core'
// import presetenv from '@babel/preset-env'// es6-es5
// import react from '@babel/preset-react'//支持 jsx
import fs from 'node:fs'
const code = fs.readFileSync('./test.js', 'utf-8')
//箭头函数转 function
//types 包含了各种 ast 的方法
const transformFunction=({types:t})=>{
  return{
    name:'transformfunction',
    visitor:{
      //匹配
      ArrowFunctionExpression(path){
        console.log(path.node)

        const node = path.node

        const arrowFunction =t.functionExpression(
          null,//匿名函数
          node.params,//参数
          t.blockStatement([t.returnStatement(node.body)]),//函数体
          node.async//是否是异步函数
        )
        path.replaceWith(arrowFunction)
      }
    }
  }
}
const result = babel.transformSync(code,{
  // presets: [
  //   //entry usage
  //   //usage 按需引入 entry 手动引入
  //   [presetenv,{useBuiltIns: 'usage',corejs: 3}],
  //   react
  // ],
  plugins:[transformFunction]
})

console.log(result.code)
