// import {createMemoryRouter,createHashRouter, createBrowserRouter } from "react-router";
import  { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Layout from "../layout";
//createHashRouter 不需要配置404 有#
//createBrowserRouter 需要配置404
//createMemoryRouter 路由存在内存里,一般用在非浏览器场合
//createStaticRouter 服务器端渲染 SEO优化
const sleep=(ms:number)=>new Promise((resolve)=>setTimeout(resolve,ms));
//子路由不需要添加/
//子路由默认是不显示的，需要父路由通过outlet组件显示
//子路由层级可以无限嵌套，但是一般是2到3层
const router = createBrowserRouter([
  {
    // path: "/index",
    Component: Layout,
    children: [
      {
        path: "home/:id",
        index: true,//默认路由
        Component: Home,
      },
      {
        path: "about/:city/:age",
        lazy:async()=>{
          await sleep(2000);
          const about=await import("../Pages/About");
          return {
            Component:about.default
          }
        }
      },
    ],
  },
]);
export default router;
