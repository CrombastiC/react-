import { useSyncExternalStore } from "react"
//history api去实现跳转页面 监听 history 变化
export const useHistory=()=>{

  const subscribe = (callback:()=>void) => {
    //订阅浏览器 api
    //history底层 popstate
    //hash底层 hashchange
    window.addEventListener('popstate',callback)
    window.addEventListener('hashchange',callback)
    return()=>{
      //取消订阅
      window.removeEventListener('popstate',callback)
      window.removeEventListener('hashchange',callback)
    }
    //监听浏览器的前进后退,无法监听hash的变化
  }
  const getSnapshot = () => {
    return window.location.href
  }
  const url=useSyncExternalStore(subscribe,getSnapshot)

  const push=(url:string)=>{
    window.history.pushState({},'',
    url)
    window.dispatchEvent(new PopStateEvent('popstate'))

  }
  const replace=(url:string)=>{
    window.history.replaceState({},'',
    url)
      window.dispatchEvent(new PopStateEvent('popstate'))
  }
  return [url,push,replace]as const//元祖类型
}
