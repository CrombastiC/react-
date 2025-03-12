//useid react18新增的hook，用于生成稳定的唯一标识符，主要用于解决SSR场景下的ID不一致的问题，或者需要对组件生成唯一ID的场景
import React, { useId } from 'react';


const App: React.FC = () => {
  const id: string = useId();
  const id2: string = useId();
  // const id1 = useId();
  //用法2
  //在服务端渲染的时候可能生成123，客户端渲染的时候可能生成456
  //所以我们可以通过useId传入一个固定的值，这样就能保证服务端和客户端生成的ID是一样的
  console.log(id);
  return (
    <div>
      <label >这是一个输入框</label>
      <input aria-describedby={id2} type="text" id={id} />
      <p id={id2}>这是一个输入框</p>
    </div>
  );
};
export default App;
