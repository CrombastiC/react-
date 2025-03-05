import { useEffect, useState } from "react"
const Child = (props) => {
  useEffect(() => {
    console.log('child useEffect')
    //做防抖操作
    const timer=setTimeout(()=>{
      fetch('/api/list?keyword=' + props.name)
    },500)
    return () => {
      console.log('child componentWillUnmount')
      clearTimeout(timer)
    }
  }, [props.name])
  return <div>child</div>
}
function App() {
//执行时机
//DidMount 组件渲染完成会立即执行 + DidUpdate 依赖更新会执行
//依赖项发生变化才会执行 空数组的情况下只会执行一次（初始化操作，详情页数据）
// 组件卸载时执行 清理函数组件更新之前执行
const [count, setCount] = useState(0)
const [name,setName] = useState('')
const [isShow,setIsShow] = useState(true)
  return (
    <div>
      <button onClick={()=>setIsShow(!isShow)}>显示/隐藏</button>
      <button onClick={()=>setCount(count+1)}>{count}</button>
      <input value={name} onChange={(e)=>{
        setName(e.target.value)
      }} type="text" />
      {isShow&&<Child name={name}/>}
    </div>)
}
export default App
