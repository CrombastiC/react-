import React, { useImperativeHandle, useState } from "react";
import { useRef } from "react";
interface childRef{
  name:string,
  age:number,
  addCount:()=>void,
  subCount:()=>void
}
//forwardRef 在19版本废除了，并且props和ref进行了合并
// const child=({ref}:{ref:React.Ref<childRef>})=>{}
//子组件
const Child = React.forwardRef<childRef>((props, ref) => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      name: '子组件',
      age: 18,
      addCount: () => {
        setCount(count + 1);
      },
      subCount: () => {
        setCount(count - 1);
      }

    };
  });
  return (
    <div>
      <p >子组件</p>
      <div>flag:{flag ? 'true' : 'false'}</div>
      <button onClick={() => setFlag(!flag)}>Toggle</button>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
});
interface formRef{
  name:string,
  validate:()=>void
  reset:()=>void
}
const Form = React.forwardRef<formRef>((props, ref) => {
  const [form,setForm]=useState({username:'',password:'',email:''});
  const validate=()=>{
    console.log('校验');
  }
  const reset=()=>{
   setForm({username:'',password:'',email:''});
  }
  useImperativeHandle(ref,()=>{
    return{
      name:'表单',
      validate,
      reset
    };
  });
  
  return (
    <div>
      <form >
        <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        <input value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      </form>
    </div>
  )
});
//父组件
function App() {
  //react18版本左右 useRef不是必传的
  //react 19版本左右 useRef是必传的

  const childRef = useRef<childRef>(null);
  const formRef = useRef<formRef>(null);
  const getChild = () => {
    console.log(childRef.current?.name);
  }
  return (
    <div>
      <h1 >父组件</h1>
      <button onClick={getChild}>获取子组件dom</button>
      <button onClick={()=>childRef.current?.addCount()}>操作子组件信息+1</button>
      <button onClick={()=>childRef.current?.subCount()}>操作子组件信息-1</button>
      <hr />
      <Child ref={childRef}/>
      <hr />
      <button onClick={() => formRef.current?.validate()}>校验</button>
      <button onClick={() => formRef.current?.reset}>重置</button>
      <Form ref={formRef} /> {/* Update ref for Form */}
    </div>
  )
}

export default App;

//useImperativeHandle的执行时机
// 1.如果不传入第三个参数，那么useImperativeHandle会在组件挂载时执行一次，状态更新时都执行一次
//2.如果传入第三个参数，并且是一个空数组，那么useImperativeHandle只会在组件挂载时执行一次，状态更新不会执行
//3.如果传入第三个参数，并且是一个数组，那么useImperativeHandle会在组件挂载时执行一次，状态更新时只有数组中的值发生变化时才会执行
