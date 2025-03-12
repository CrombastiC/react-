import { useState, useDebugValue } from 'react';
const useCookie = (name: string, initValue: string = '') => {
  // 1.获取cookie
  const getCookie = () => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    return match ? match[2] : initValue;
  }
  const [cookie, setCookie] = useState(getCookie());
  // 2.更新cookie
  const updateCookie = (newValue: string) => {
    document.cookie = `${name}=${newValue}`;
    setCookie(newValue);
  }
  // 3.删除cookie
  const deleteCookie = () => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setCookie('');
  }
  // 4.调试 配合React DevTools使用
  useDebugValue(cookie,()=>{
    return `cookie:${cookie}`;
  });
  return [cookie, updateCookie, deleteCookie] as const;

}
export default function App() {
  const [cookie, updateCookie, deleteCookie] = useCookie('name', 'zhangsan');
  return (
    <>
      <div>
        {cookie}
      </div>
      <button onClick={() => updateCookie('newValue')}>Update Cookie</button>
      <button onClick={deleteCookie}>Delete Cookie</button>

    </>
  )
}
