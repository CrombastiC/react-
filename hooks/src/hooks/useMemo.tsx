//useMemo 主要用于性能优化
//React.memo是一个react api 性能优化，通过记忆上一次的渲染结果，仅当pops发生变化时才会重新渲染
//react.memo只有在props发生变化时才会重新渲染子组件

//react组件重新渲染的条件
//1.组件的props发生变化
//2.组件的state发生变化
//3.useContext的值发生变化


//useMemo
import { useMemo, useReducer, useState } from "react";
const initData = [{
  id: 1,
  name: '商品1',
  price: 30,
  count: 1,
  isEdit: false
},
{
  id: 2,
  name: '商品2',
  price: 40,
  count: 2,
  isEdit: false
},
{
  id: 3,
  name: '商品3',
  price: 50,
  count: 3,
  isEdit: false
}]
type Date = typeof initData
const reducer = (state: Date, action: { type: 'add' | 'sub' | 'del' | 'edit' | 'updateName' | 'blur', id: number, newName?: string }) => {
  switch (action.type) {
    case 'add':
      return state.map(item =>
        item.id === action.id ? { ...item, count: item.count + 1 } : item
      );
    case 'sub':
      return state.map(item =>
        item.id === action.id ? { ...item, count: Math.max(0, item.count - 1) } : item
      );
    case 'edit':
      return state.map(item =>
        item.id === action.id ? { ...item, isEdit: !item.isEdit } : item
      )
    case 'del':
      return state.filter(item => item.id !== action.id)
    case 'updateName':
      return state.map(item =>
        item.id === action.id ? { ...item, name: action.newName! } : item
      )
    case 'blur':
      return state.map(item =>
        item.id === action.id ? { ...item, isEdit: false } : item
      )
    default:
      return state
  }
}
export const App = () => {
  const [search, setSearch] = useState('')
  const [data, dispatch] = useReducer(reducer, initData)
  //返回就是普通值而不是函数了
  const total = useMemo(() => {
    console.log('计算总价');
    return data.reduce((total, item) => total + item.price * item.count, 0)
  }, [data])
  return (
    <>
      <h1>购物车</h1>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
      <table cellSpacing={0} width={500} border={1}>
        <thead>
          <tr>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>商品数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item: any) => {
              return <tr key={item.id}>
                <td align="center">{
                  item.isEdit ? <input onBlur={() => dispatch({ type: 'blur', id: item.id })} onChange={(e) => dispatch({ type: 'updateName', id: item.id, newName: e.target.value })} type="text" value={item.name} /> : item.name
                }</td>
                <td align="center">{item.price}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: 'sub', id: item.id })}>-</button>
                  {item.count}
                  <button onClick={() => dispatch({ type: 'add', id: item.id })}>+</button>
                </td>
                <td align="center">{item.price * item.count}</td>
                <td align="center">
                  <button onClick={() => dispatch({ type: 'edit', id: item.id })}>编辑</button>
                  <button onClick={() => dispatch({ type: 'del', id: item.id })}>删除</button>
                </td>
              </tr>
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td align="right">总价:{total}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default App

