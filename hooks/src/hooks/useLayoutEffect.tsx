//useEffect 与 useLayoutEffect 的区别
//执行时机 useEffect: 浏览器完成布局和绘制之后执行 useLayoutEffect: 浏览器完成布局之后，绘制之前执行
//执行方式 useEffect: 异步执行 useLayoutEffect: 同步执行
//dom 渲染 useEffect: 不会阻塞浏览器渲染 useLayoutEffect: 会阻塞浏览器渲染
//useLayoutEffect 适用于需要在浏览器渲染之前立即执行的操作，比如测量dom节点的大小
import { useEffect, useState } from "react"

function App() {
  const [count, setCount] = useState(0)
  //不阻塞dom
  useEffect(()=>{
    for(let i=0;i<1000;i++){
      setCount(count=>count+1)
    }
  },[])
  //阻塞dom
  // useLayoutEffect(()=>{
  //   for(let i=0;i<1000;i++){
  //     setCount(count=>count+1)
  //   }
  // },[])
  return(
    <div>
      <div>app</div>
      {
        Array.from({length:count}).map((_,index)=>(
          <div key={index}>{index}</div>
        ))
      }
    </div>
  )
}
export default
App
