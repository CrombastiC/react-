import { Outlet,useNavigation } from "react-router";
import {Spin,Alert} from "antd";
export default function Content() {
  const navigation=useNavigation();
  const idLoading=navigation.state==="loading";
  return<div>
      {idLoading?<Spin size='large' tip='Loading...'>
        <Alert message="Loading..." description="Please wait..." type="info" />
      </Spin>:
      <Outlet />
      }
      
    </div>
    // 三个状态
    // idle 空闲
    // loading 加载中 触发loader
    // submitting 提交中 触发action

}
