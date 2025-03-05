
import { Input, List } from "antd"
import React, { useState, useTransition } from "react"

interface Item {
  id: number
  name: string
  address: string
}
export const App = () => {
  const [val, setVal] = useState('')
  const [list, setList] = useState<Item[]>([])
  const [isPending,startTransition] = useTransition()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log(value)
    setVal(value)
    fetch('/api/list?keyword=' + value)
      .then(res => res.json())
      .then(res => {
        startTransition(()=>{ setList(res.list)})
       
      })
  }
  return (

    <>
      <div>
        <Input value={val} onChange={handleChange} />
        {isPending&&<div>loading...</div>}
        <List
          dataSource={list}
          renderItem={(item: Item) => <List.Item>
            <List.Item.Meta title={item.name} description={item.address} />
          </List.Item>}
        >
        </List>
      </div>
    </>
  )
}
export default App
