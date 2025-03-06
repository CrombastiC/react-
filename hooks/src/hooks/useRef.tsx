import { useRef, useState } from 'react';
//注意事项
//1.组件重新渲染不会重新初始化useRef的值
//2.改变ref.current的值不会引起组件重新渲染,因为是一个普通js对象
//3.useRef的值不能作为依赖项传入useEffect,因为不是响应式数据
//4.useRef不能直接或者子组件的实例，需要使用forwardRef
function App() {
  //通过ref操作dom元素
  const divRef = useRef<HTMLDivElement>(null);
  //null|undefined
  //1.null表示空对象，但是未来会赋值一个对象 2.解引用 a=null
  //2.undefined表示可能有值，但是没有被定义
  const handleClick = () => {
    console.log(divRef.current);
    if (divRef.current) {
      divRef.current.style.color = 'red';
    }
  }

  //数据存储
  const num = useRef(0);
  const [count, setCount] = useState(0);
  const handleClickAdd = () => {
    setCount(count + 1);
    //这里无法记录旧值，因为调用setCount会导致页面重新渲染
    //解决方案：1.使用useRef 2.放到全局变量中
    //因为重新渲染不会重新初始化useRef的值
    num.current = count;
  };

  return (
    <div>
      <h1>标题</h1>
      <div ref={divRef}>测试</div>

      <button onClick={handleClick}>获取dom元素</button>
      <div>-------------------</div>
      <div>旧值: {num.current}</div>
      <div>当前值: {count}</div>
      <button onClick={handleClickAdd}>增加计数: {count}</button>
    </div>
  )
}
export default App;
