import ReactDOM from 'react-dom/client'
import './index.css'

const Message = () => {
  return <div>消息提示</div>
}
interface Item {
  messageContainer: HTMLElement
  root: ReactDOM.Root
}
const queue: Item[] = []
window.onShow = () => {
  const messageContainer = document.createElement('div')
  messageContainer.className = 'message'
  messageContainer.style.top = `${queue.length * 50}px`
  document.body.appendChild(messageContainer)
  //容器关联组件
  //容器关联成根组件
  const root = ReactDOM.createRoot(messageContainer)
  root.render(<Message />)

  queue.push({
    messageContainer,
    root
  })

  setTimeout(() => {
    const item = queue.find(i => i.messageContainer === messageContainer)!;
    item.root.unmount()
    document.body.removeChild(messageContainer)
    queue.splice(queue.indexOf(item), 1)
    
  }, 2000)
}
//TS声明扩充
declare global {
  interface Window {

    onShow: () => void;
  }
}
