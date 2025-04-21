// import {createMemoryRouter,createHashRouter, createBrowserRouter } from "react-router";
import  { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import About from "../Pages/About";
//createHashRouter 不需要配置404 有#
//createBrowserRouter 需要配置404
//createMemoryRouter 路由存在内存里,一般用在非浏览器场合
//createStaticRouter 服务器端渲染 SEO优化
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: About,
  },
]);
export default router;
