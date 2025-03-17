import React from "react";

//1.第一个参数静态字符串，是一个数组
//2.第二个参数是对应里面的变量${}
const div=function(strArr:TemplateStringsArray, ...args:any[]){
  return strArr.reduce((result,str,i)=>{
    return result+str+(args[i]||'')
  },'')
}
const a=div`
  color:red;
  height:${100}px;
  width:${100}px;
`
console.log(a)
const App:React.FC=()=>{
  return(
    <>
    </>
  )
}
export default App;
