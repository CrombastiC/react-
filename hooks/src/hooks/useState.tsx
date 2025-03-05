import { useState } from 'react'

function App() {
  //基本数据类型
  // const [str,setStr]=useState('test')//字符串 布尔值 数字 
  // //复杂数据类型 数组 对象
  // const [arr,setArr]=useState([1,2,3])
  // const handleClick = () => {
  //  setStr('test1')
  //  //添加
  //   setArr([...arr,4])
  //   //移除
  //   setArr(arr.filter(item=>item!==2))
  //   //修改
  //   setArr(arr.map(item=>item===1?100:item))
  //   //指定位置添加
  //   const start=0
  //   const end=2//不包含
  //   setArr([...arr.slice(start,end),5,...arr.slice(end)])
  //   //排序
  //   setArr([...arr.sort((a,b)=>a-b)])

   

  // }
   //对象的操作
   const [obj,setObj]=useState(()=>{
    //处理逻辑 一定要返回值
    //只会初始化执行一次
    const data=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
    return {name:'test',age:18,data}
    
   })
   const changeTime = () => {
    //解构的方式
    // setObj({...obj,age:20})
    //更加语义化的方式
   setObj(Object.assign({},obj,{age:20}))
   }
  return(
    <>
    {/* <h1>{str}</h1>
    <h1>{arr}</h1> */}
    <h1>{JSON.stringify(obj)}</h1>
    <button onClick={changeTime }>更改值</button>
    </>
  )
}


export default App
