import React, { useCallback, useState } from "react";
interface Props {
  user: {
    name: string
    age: number
  },
  callback: () => void
}
const Child = React.memo((props: Props) => {
  console.log('child render');
  return <>
    <div>Name: {props.user.name}</div>
    <div>Age: {props.user.age}</div>
  </>


})

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
  });
  const callback = useCallback(() => {
    console.log('callback');
  }, []);
  return (
    <div>
      <Child callback={callback} user={user} />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
export default App;
