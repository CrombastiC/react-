import './index.css'
import React from 'react'
//当在父组件里面写内容时，子组件会默认接收到props.children
//1.第一种写法 interface安装给props
interface Props {
  title?: string
  children?: React.ReactNode
  number?: number
  el?: React.ReactElement
  isShow?: boolean
  empty?: null
  object?: {
    name: string
    age: number
  }
  arr?: number[]
  func?: () => void
  callBack?: (param: string) => void
}
// export default function Card(props: Props){
//   return <div className="card">
//     <header>
//       <div>{props.title}</div>
//       <div>副标题</div>
//     </header>
//     <main>
//       <p>这是主体内容</p>
//     </main>
//     <footer>
//       <button>按钮1</button>
//       <button>按钮2</button>
//     </footer>

//   </div>
// }



//设置默认值 
//1.解构
//直接在参数里面设置默认值 例如 title = "默认值"
// export default function Card({title = "默认值"}: Props){
//2.声明一个默认对象
const defaultProps:Partial<Props> = {
  title: "默认值"
}
//传参还是些props
//const {title}={...defaultProps,...props}
//第二种写法 React.FC function component
const Card: React.FC<Props> = (props:Props) => {
  //兄弟传参
  //1.创建自定义事件
  const e=new Event('on-card')//随便写名字，只要不冲突原生就行
  const clickType = () => {
    //2.派发事件
    e.params={name:"兄弟组件传递的参数"}
    window.dispatchEvent(e)
  }
  //...............................................
  //...............................................
  const { title } = {...defaultProps, ...props}
  return <div className="card">
    <header>
      <div>{title}</div>
      <div>副标题</div>
    </header>
    <main>
      <p>{props.children}</p>
    </main>
    <footer>
      <button onClick={() => props.callBack && props.callBack("按钮1被点击")}>回调给父组件的按钮</button>
      <button onClick={clickType}>按钮2</button>
    </footer>

  </div>
}
export default Card

declare global {
  interface Event {
    params:{name:string}
  }
}
