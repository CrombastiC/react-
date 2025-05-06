import { useRouteError } from "react-router"
export default function Error(){
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>出错了</h1>
      <p>抱歉，您访问的页面不存在。</p>
    </div>
  )
}
