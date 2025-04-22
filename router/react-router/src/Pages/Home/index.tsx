import { NavLink, useLocation, useParams } from "react-router";
export default function Home() {
  //1.使用useParams获取路由参数
  const { id } = useParams();
  //2.使用useLocation获取路由信息
  const location = useLocation();
  console.log(location.search);//获取路由参数,但是需要解码
  return (
    <div>
      <h1>Home</h1>
      <h2>id: {id}</h2>
      {/* 使用searchParams */}
      {/* <NavLink to="/about?id=123">Go to About</NavLink> */}
      {/*使用params */}
      {/* <NavLink to="/about/beijing/20">Go to About</NavLink> */}
      {/* 使用state ,缺点只存在于当前会话*/}
      <NavLink to="/about" state={{ id: 123 }}>Go to About</NavLink>
    </div>
  );
}
