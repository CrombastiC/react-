import React from "react";
import { useRef } from "react";

//子组件
const Child = React.forwardRef<HTMLHeadingElement>((props, ref) => {
  return (
    <div>
      <p ref={ref}>子组件</p>
    </div>
  );
});
//父组件
function App() {
  //react18版本左右 useRef不是必传的
  //react 19版本左右 useRef是必传的

  const childRef = useRef<HTMLHeadingElement>(null);
  const getChild = () => {
    console.log(childRef.current);
  }
  return (
    <div>
      <h1 >父组件</h1>
      <button onClick={getChild}>获取子组件dom</button>
      <hr />
      <Child ref={childRef}/>
    </div>
  )
}

export default App;
