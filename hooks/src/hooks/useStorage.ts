import { useSyncExternalStore } from "react"
export const useStorage = (key:string,initialValue:any) => {
  //订阅者
  const subscribe = (callback:()=>void) => {
    //订阅浏览器 api
    window.addEventListener('storage',callback)
    return()=>{
      //取消订阅
      window.removeEventListener('storage',callback)
    }

  }

  const getSnapshot = () => {
    return localStorage.getItem(key) ?JSON.parse(localStorage.getItem(key)!): initialValue
  }
  const res = useSyncExternalStore(subscribe,getSnapshot )
  const updateStorage = (value:any) => {
    localStorage.setItem(key,JSON.stringify(value))
    //手动触发订阅者
    window.dispatchEvent(new StorageEvent('storage'))
  }
  return [res,updateStorage]
}
