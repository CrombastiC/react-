import { useReducer ,useState} from "react";

export const App=()=> {
  //useSate的实现方法
  // const [count,setCount]=useState(0)
  //useReducer的实现方法
  //默认值
  const initState={
    count:0
  }
  type State=typeof initState
  //初始化函数 只走一次 修饰默认值 不传就用默认值
  const initFn=(initState:State)=>{
    return initState
  }
  //处理函数 默认不执行 只有在dispatch的时候才会执行
  const reducer=(state:State,action:{type:'add'|'sub'})=>{
    switch(action.type){
      case 'add':
        return {count:state.count+1}
      case 'sub':
        return {count:state.count-1}
        default:
          return state  
    }
    
  }
  //第一个参数是状态
  //第二个参数是默认值
  //第三个参数是初始化函数 可以不传
  const [state,dispatch]=useReducer(reducer,initState,initFn)
  return(
    <>
    {/* <button onClick={()=>setCount(count+1)}>+1</button>
    <button onClick={()=>setCount(count-1)}>-1</button>
    <p>{count}</p> */}
    <button onClick={()=>dispatch({type:'add'})}>+1</button>
    <button onClick={()=>dispatch({type:'sub'})}>-1</button>
    <p>{state.count}</p>
    </>
  )
}
export default App;
