import { useRef, useState } from "react";

function App() {
  const timer = useRef<null | NodeJS.Timeout>(null);
  const [count, setCount] = useState(0);
  const handleClick = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    //每隔1秒加1
    timer.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 100);
  }
  const end = () => {
    if (timer.current) {
      clearInterval(timer.current);
      setCount(0);
    }
  }
  return (
    <div>
      <h1>计时器场景</h1>

      <p>Count: {count}</p>
      <button onClick={handleClick}>Start</button>
      <button onClick={end}>Stop</button>
    </div>
  )
}
export default App;
