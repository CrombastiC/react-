import React, {lazy,Suspense} from "react";
import NewCard from './components/NewCard'
import {Skeleton} from './components/skeleton'
//1.第一个参数静态字符串，是一个数组
//2.第二个参数是对应里面的变量${}
// const div=function(strArr:TemplateStringsArray, ...args:unknown[]){
//   return strArr.reduce((result,str,i)=>{
//     return result+str+(args[i]||'')
//   },'')
// }
// const a=div`
//   color:red;
//   height:${100}px;
//   width:${100}px;
// `
// const AsyncComponent=lazy(()=>import('./components/Async'))
const App:React.FC=()=>{
  return(
    <>
    {/* <Suspense fallback={<div>loading...</div>}>
      <AsyncComponent/>
    </Suspense> */}
    <Suspense fallback={<Skeleton/>}>
      <NewCard/>
    </Suspense>
    </>
  )
}
export default App;
