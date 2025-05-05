import { NavLink, useParams, useSearchParams, useLocation } from "react-router";

export default function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  //获取searchParams
  const id = searchParams.get("id");
  //获取params
  const { city, age } = useParams();
  //获取state
  const location = useLocation();
  const state = location.state;
  console.log(state);
  return (
    <div>
      <h1>About</h1>
      <NavLink to="/home">Go to Home</NavLink>
      <h2>id: {id}</h2>
      <h2>city: {city}</h2>
      <h2>age: {age}</h2>
      <h2>state: {state}</h2>
      <button onClick={() => setSearchParams({ id: "456" })}>Change id</button>
    </div>
  )
}
//跳转的方式
//1. 使用Link跳转 
//replace 是否替换当前历史记录
//state 传递数据
//relative 相对路径
//reloadDocument 是否重新加载页面
//preventScrollReset 是否阻止滚动重置
//viewTransition 是否启用视图过渡动画
{/* <Link to="/about" replace>Go to About</Link> */}
//2. 使用navLink跳转
//active 是否激活 当前路由和 to 是否匹配
//pending 是否正在加载 loader有数据要加载
//transitioning 过渡动画 通过 viewTransition 配置
{/* <NavLink to="/about" replace>Go to About</NavLink> */}
//3. 使用useNavigate跳转 一般用于编程式跳转
//参数一般放在 options 中
{/* const navigate = useNavigate();
<button onClick={() => navigate("/about")}>Go to About</button> */}
//replace 是否替换当前历史记录
{/* <button onClick={() => navigate("/about", { replace: true })}>Go to About</button> */}
//4.redirect 重定向

