import React, { use, useMemo ,useState } from "react"
interface User {
  name: string,
  age: number,
  phone: string
}
//子组件
const UserCard =React.memo ((props: { user: User }) => {
  console.log('render子组件');
  const { user } = props
  const styles = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '10px',
    margin: '10px'
  }
  return <div style={styles}>
    <div>姓名：{user.name}</div>
    <div>年龄：{user.age}</div>
    <div>电话：{user.phone}</div>
  </div>
})
function App() {
  const [input, setInput] = useState('')
  const [user, setUser] = useState({
    name: 'frank',
    age: 18,
    phone: '84848484848',
  })
  const handleChangeUser = () => {
    setUser({
      ...user,
      name: input
    })
  }
  return (
    <>
      <button onClick={handleChangeUser}>更改user</button>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <UserCard user={user}></UserCard>

    </>
  )
}
export default App
