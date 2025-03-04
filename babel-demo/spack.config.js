const {config}=require ('@swc/core/spack')
const path=require('path')
//必须是 cjs 暂不支持 esm 
module.exports={
  entry:{
    web:path.join(__dirname,'./src/index.js')
  },
  output:{
    path:path.join(__dirname,'./dist'),
    name:'test.js'
  },
}
