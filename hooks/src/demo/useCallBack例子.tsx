//useCallBack用于优化性能，返回一个记忆化的回调函数，可以减少不必要的重新渲染，用于缓存组件内的函数，避免函数的重复创建
//useCallBack适合用于缓存函数，useMemo适合用于有计算结果的缓存

import React, { useState, useCallback } from 'react';
const map=new WeakMap();
let count=1;
const App: React.FC = () => {
  const [input, setInput] = useState('');
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  if(!map.has(handleInputChange)){
    map.set(handleInputChange,count++);
  }
  console.log(map.get(handleInputChange));
  return (
    <>
      <input type="text" value={input} onChange={handleInputChange} />
    </>
  )
}
export default App;
