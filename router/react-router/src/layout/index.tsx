import { Layout as AntdLayout } from "antd";
import Header from "./Header";
import Content from "./Content";
import Menu from "./Menu";

export default function Layout() {
  return <AntdLayout>
    <AntdLayout.Sider>
      <Menu />
    </AntdLayout.Sider>
    <AntdLayout>
      <Header />
      <Content />
    </AntdLayout>
  </AntdLayout>
} 
